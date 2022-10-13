const PROTO_PATH = __dirname + '/techsalat.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const salats_proto = grpc.loadPackageDefinition(packageDefinition).techsalat;

function GetSalats(call, callback) {
  callback(null, {message: 'Hello from Salats API'});
}

function main() {
  const server = new grpc.Server();
  server.addService(salats_proto.TechSalat.service, {GetSalats: GetSalats});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server started.');
  });
}

main();
