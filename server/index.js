var NtwSurveyStatus = require("../server/protos/network-survey-status_pb");
var services = require("../server/protos/network-survey-status_grpc_pb");

var grpc = require("grpc");

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

function main() {
  var server = new grpc.Server();

  server.addService(services.NetworkSurveyStatusService, {
    startConnection: startConnection,
    statusUpdate: statusUpdate,
  });
  server.bind("0.0.0.0:2621", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port 127.0.0.1:2621");
}

main();
