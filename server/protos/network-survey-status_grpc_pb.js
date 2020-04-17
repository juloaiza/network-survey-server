// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// *
// Defines the status messages that are sent from the Network Survey Android App to the remote server.
'use strict';
var grpc = require('grpc');
var protos_network$survey$status_pb = require('../protos/network-survey-status_pb.js');

function serialize_ConnectionReply(arg) {
  if (!(arg instanceof protos_network$survey$status_pb.ConnectionReply)) {
    throw new Error('Expected argument of type ConnectionReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ConnectionReply(buffer_arg) {
  return protos_network$survey$status_pb.ConnectionReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ConnectionRequest(arg) {
  if (!(arg instanceof protos_network$survey$status_pb.ConnectionRequest)) {
    throw new Error('Expected argument of type ConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ConnectionRequest(buffer_arg) {
  return protos_network$survey$status_pb.ConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeviceStatus(arg) {
  if (!(arg instanceof protos_network$survey$status_pb.DeviceStatus)) {
    throw new Error('Expected argument of type DeviceStatus');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeviceStatus(buffer_arg) {
  return protos_network$survey$status_pb.DeviceStatus.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_StatusUpdateReply(arg) {
  if (!(arg instanceof protos_network$survey$status_pb.StatusUpdateReply)) {
    throw new Error('Expected argument of type StatusUpdateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_StatusUpdateReply(buffer_arg) {
  return protos_network$survey$status_pb.StatusUpdateReply.deserializeBinary(new Uint8Array(buffer_arg));
}


// package messaging;
//
var NetworkSurveyStatusService = exports.NetworkSurveyStatusService = {
  startConnection: {
    path: '/NetworkSurveyStatus/StartConnection',
    requestStream: false,
    responseStream: false,
    requestType: protos_network$survey$status_pb.ConnectionRequest,
    responseType: protos_network$survey$status_pb.ConnectionReply,
    requestSerialize: serialize_ConnectionRequest,
    requestDeserialize: deserialize_ConnectionRequest,
    responseSerialize: serialize_ConnectionReply,
    responseDeserialize: deserialize_ConnectionReply,
  },
  statusUpdate: {
    path: '/NetworkSurveyStatus/StatusUpdate',
    requestStream: true,
    responseStream: false,
    requestType: protos_network$survey$status_pb.DeviceStatus,
    responseType: protos_network$survey$status_pb.StatusUpdateReply,
    requestSerialize: serialize_DeviceStatus,
    requestDeserialize: deserialize_DeviceStatus,
    responseSerialize: serialize_StatusUpdateReply,
    responseDeserialize: deserialize_StatusUpdateReply,
  },
};

exports.NetworkSurveyStatusClient = grpc.makeGenericClientConstructor(NetworkSurveyStatusService);
