const axios = require("axios");

var NtwSurveyStatus = require("../server/protos/network-survey-status_pb");
var services = require("../server/protos/network-survey-status_grpc_pb");

var WirelessMessage = require("../server/protos/wireless_survey_pb");
var servicesW = require("../server/protos/wireless_survey_grpc_pb");

var grpc = require("grpc");
var fs = require("fs");

var streamCoverage = fs.createWriteStream("coverage.csv", {
  flags: "w", // 'a' means appending (old data will be preserved)
});

function startConnection(call, callback) {
  var reply = new NtwSurveyStatus.ConnectionReply();
  //console.log(JSON.stringify(call));
  reply.setConnectionAccept(true);
  console.log("device connected");
  callback(null, reply);
}

function statusUpdate(call, callback) {
  call.on("data", (request) => {
    var value =
      request.getDeviceName() +
      "-" +
      request.getLatitude() +
      "-" +
      request.getLongitude();

    console.log(value);
  });

  call.on("error", (error) => {
    console.log(error);
  });

  call.on("end", () => {
    //var response = new NtwSurveyStatus.statusUpdateReply();
    //Pass the response
    //callback(null, response);
    console.log("end NtwSurveyStatus Service");
  });
}

//Wireless Survey
function streamLteSurvey(call, callback) {
  //How handle the client request
  call.on("data", (lteRecord) => {
    let pci = lteRecord.getPci();
    let rsrp = lteRecord.getRsrp();
    let lat = lteRecord.getLatitude();
    let lng = lteRecord.getLongitude();

    //Check about this issue
    let value = pci + "|" + rsrp + "|" + lat + "|" + lng + "\n";
    let valueJson = {
      pci: pci.array[0],
      rsrp: rsrp.array[0],
      lat: lat,
      lng: lng,
    };
    //----------------

    if (lteRecord.getServingcell().array[0]) {
      //console.log(value);
      console.log(valueJson);
      streamCoverage.write(value);

      //Post to webserver
      axios
        .post("http://localhost:3000/newstream", valueJson)
        .then((res) => {
          //console.log(`statusCode: ${res.statusCode}`);
          //console.log(res);
        })
        .catch((error) => {
          //console.error(error);
        });
    }
  });

  call.on("error", (error) => {
    console.log(error);
  });

  call.on("end", () => {
    //var response =  new WirelessMessage.lteSurveyResponse();
    //Nothing to set in response due to null message check proto
    //callback(null, null);
    console.log("end");
  });
}

function main() {
  var server = new grpc.Server();

  server.addService(services.NetworkSurveyStatusService, {
    startConnection: startConnection,
    statusUpdate: statusUpdate,
  });

  server.addService(servicesW.WirelessSurveyService, {
    streamLteSurvey: streamLteSurvey,
  });

  server.bind("0.0.0.0:2621", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port 127.0.0.1:2621");
}

main();

//https://medium.com/@akhaku/protobuf-definition-best-practices-87f281576f31
//https://adityasridhar.com/posts/how-to-effectively-use-grpc-streams-in-nodejs

//SSE
// Require needed modules and initialize Express app
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware for GET /events endpoint
function eventsHandler(req, res, next) {
  // Mandatory headers and http status to keep connection open
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  // After client opens connection send all nests as string
  const data = `data: ${JSON.stringify(nests)}\n\n`;
  res.write(data);

  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((c) => c.id !== clientId);
  });
}

// Iterate clients list and use write res object method to send new nest
function sendEventsToAll(newNest) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(newNest)}\n\n`));
}

// Middleware for POST /nest endpoint
async function addNest(req, res, next) {
  const newNest = req.body;
  nests.push(newNest);

  // Send recently added nest as POST result
  res.json(newNest);

  // Invoke iterate and send function
  return sendEventsToAll(newNest);
}

// Set cors and bodyParser middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define endpoints
app.post("/newstream", addNest);
app.get("/events", eventsHandler);
app.get("/status", (req, res) => res.json({ clients: clients.length }));

const PORT = 3000;

let clients = [];
let nests = [];

// Start server on 3000 port
app.listen(process.env.PORT || PORT, () =>
  console.log(`server-sent events (SSE) listening on port ${PORT}`)
);
