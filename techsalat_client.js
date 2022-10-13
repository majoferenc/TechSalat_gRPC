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

function main() {
  const target = 'localhost:50051';
  const client = new salats_proto.TechSalat(target,
                                       grpc.credentials.createInsecure()); 
  client.GetSalats(null, function(err, response) {
    console.log(response.message);
  });
}

main();
