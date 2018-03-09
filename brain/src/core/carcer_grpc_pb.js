// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var carcer_pb = require('./carcer_pb.js');

function serialize_carcer_proto_BrainMessage(arg) {
  if (!(arg instanceof carcer_pb.BrainMessage)) {
    throw new Error('Expected argument of type carcer_proto.BrainMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_carcer_proto_BrainMessage(buffer_arg) {
  return carcer_pb.BrainMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_carcer_proto_BrainRequest(arg) {
  if (!(arg instanceof carcer_pb.BrainRequest)) {
    throw new Error('Expected argument of type carcer_proto.BrainRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_carcer_proto_BrainRequest(buffer_arg) {
  return carcer_pb.BrainRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_carcer_proto_ServiceMessage(arg) {
  if (!(arg instanceof carcer_pb.ServiceMessage)) {
    throw new Error('Expected argument of type carcer_proto.ServiceMessage');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_carcer_proto_ServiceMessage(buffer_arg) {
  return carcer_pb.ServiceMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_carcer_proto_ServiceReply(arg) {
  if (!(arg instanceof carcer_pb.ServiceReply)) {
    throw new Error('Expected argument of type carcer_proto.ServiceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_carcer_proto_ServiceReply(buffer_arg) {
  return carcer_pb.ServiceReply.deserializeBinary(new Uint8Array(buffer_arg));
}


var CarcerService = exports.CarcerService = {
  connect: {
    path: '/carcer_proto.Carcer/connect',
    requestStream: false,
    responseStream: false,
    requestType: carcer_pb.BrainRequest,
    responseType: carcer_pb.ServiceReply,
    requestSerialize: serialize_carcer_proto_BrainRequest,
    requestDeserialize: deserialize_carcer_proto_BrainRequest,
    responseSerialize: serialize_carcer_proto_ServiceReply,
    responseDeserialize: deserialize_carcer_proto_ServiceReply,
  },
  createChannel: {
    path: '/carcer_proto.Carcer/createChannel',
    requestStream: true,
    responseStream: true,
    requestType: carcer_pb.BrainMessage,
    responseType: carcer_pb.ServiceMessage,
    requestSerialize: serialize_carcer_proto_BrainMessage,
    requestDeserialize: deserialize_carcer_proto_BrainMessage,
    responseSerialize: serialize_carcer_proto_ServiceMessage,
    responseDeserialize: deserialize_carcer_proto_ServiceMessage,
  },
};

exports.CarcerClient = grpc.makeGenericClientConstructor(CarcerService);
