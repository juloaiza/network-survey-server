// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// *
// Defines the survey messages that are sent from the Network Survey Android App to the remote server.
"use strict";
var grpc = require("grpc");
var src_main_proto_wireless_survey_pb = require("../protos/wireless_survey_pb.js");
var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb.js");

function serialize_CdmaRecord(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.CdmaRecord)) {
    throw new Error("Expected argument of type CdmaRecord");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CdmaRecord(buffer_arg) {
  return src_main_proto_wireless_survey_pb.CdmaRecord.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_CdmaSurveyResponse(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.CdmaSurveyResponse)) {
    throw new Error("Expected argument of type CdmaSurveyResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CdmaSurveyResponse(buffer_arg) {
  return src_main_proto_wireless_survey_pb.CdmaSurveyResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_GsmRecord(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.GsmRecord)) {
    throw new Error("Expected argument of type GsmRecord");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GsmRecord(buffer_arg) {
  return src_main_proto_wireless_survey_pb.GsmRecord.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_GsmSurveyResponse(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.GsmSurveyResponse)) {
    throw new Error("Expected argument of type GsmSurveyResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GsmSurveyResponse(buffer_arg) {
  return src_main_proto_wireless_survey_pb.GsmSurveyResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_LteRecord(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.LteRecord)) {
    throw new Error("Expected argument of type LteRecord");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LteRecord(buffer_arg) {
  return src_main_proto_wireless_survey_pb.LteRecord.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_LteSurveyResponse(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.LteSurveyResponse)) {
    throw new Error("Expected argument of type LteSurveyResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LteSurveyResponse(buffer_arg) {
  return src_main_proto_wireless_survey_pb.LteSurveyResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_UmtsRecord(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.UmtsRecord)) {
    throw new Error("Expected argument of type UmtsRecord");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UmtsRecord(buffer_arg) {
  return src_main_proto_wireless_survey_pb.UmtsRecord.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_UmtsSurveyResponse(arg) {
  if (!(arg instanceof src_main_proto_wireless_survey_pb.UmtsSurveyResponse)) {
    throw new Error("Expected argument of type UmtsSurveyResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UmtsSurveyResponse(buffer_arg) {
  return src_main_proto_wireless_survey_pb.UmtsSurveyResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

var WirelessSurveyService = (exports.WirelessSurveyService = {
  streamGsmSurvey: {
    path: "/WirelessSurvey/StreamGsmSurvey",
    requestStream: true,
    responseStream: false,
    requestType: src_main_proto_wireless_survey_pb.GsmRecord,
    responseType: src_main_proto_wireless_survey_pb.GsmSurveyResponse,
    requestSerialize: serialize_GsmRecord,
    requestDeserialize: deserialize_GsmRecord,
    responseSerialize: serialize_GsmSurveyResponse,
    responseDeserialize: deserialize_GsmSurveyResponse,
  },
  streamCdmaSurvey: {
    path: "/WirelessSurvey/StreamCdmaSurvey",
    requestStream: true,
    responseStream: false,
    requestType: src_main_proto_wireless_survey_pb.CdmaRecord,
    responseType: src_main_proto_wireless_survey_pb.CdmaSurveyResponse,
    requestSerialize: serialize_CdmaRecord,
    requestDeserialize: deserialize_CdmaRecord,
    responseSerialize: serialize_CdmaSurveyResponse,
    responseDeserialize: deserialize_CdmaSurveyResponse,
  },
  streamUmtsSurvey: {
    path: "/WirelessSurvey/StreamUmtsSurvey",
    requestStream: true,
    responseStream: false,
    requestType: src_main_proto_wireless_survey_pb.UmtsRecord,
    responseType: src_main_proto_wireless_survey_pb.UmtsSurveyResponse,
    requestSerialize: serialize_UmtsRecord,
    requestDeserialize: deserialize_UmtsRecord,
    responseSerialize: serialize_UmtsSurveyResponse,
    responseDeserialize: deserialize_UmtsSurveyResponse,
  },
  streamLteSurvey: {
    path: "/WirelessSurvey/StreamLteSurvey",
    requestStream: true,
    responseStream: false,
    requestType: src_main_proto_wireless_survey_pb.LteRecord,
    responseType: src_main_proto_wireless_survey_pb.LteSurveyResponse,
    requestSerialize: serialize_LteRecord,
    requestDeserialize: deserialize_LteRecord,
    responseSerialize: serialize_LteSurveyResponse,
    responseDeserialize: deserialize_LteSurveyResponse,
  },
});

exports.WirelessSurveyClient = grpc.makeGenericClientConstructor(
  WirelessSurveyService
);
