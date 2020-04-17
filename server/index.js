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
    var response = new NtwSurveyStatus.statusUpdateReply();

    //Pass the response
    callback(null, response);
  });
}

//Wireless Survey
function streamLteSurvey(call, callback) {
  //How handle the client request
  call.on("data", (lteRecord) => {
    var value =
      lteRecord.getPci() +
      "|" +
      lteRecord.getRsrp() +
      "|" +
      lteRecord.getLatitude() +
      "|" +
      lteRecord.getLongitude() +
      "\n";

    //console.log(mcc);
    if (lteRecord.getServingcell().array[0]) {
      console.log(value);
      streamCoverage.write(value);
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
    //statusUpdate: statusUpdate,
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
