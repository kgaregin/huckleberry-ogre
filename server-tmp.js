const http = require('http');
const port = 8080;
const address = '127.0.0.1';

const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const DB_URI = "mongodb://huckleberryogre:iamcook1@ogre-cluster-shard-00-00-rymlw.mongodb.net:27017,ogre-cluster-shard-00-01-rymlw.mongodb.net:27017,ogre-cluster-shard-00-02-rymlw.mongodb.net:27017/ogre-cluster?ssl=true&replicaSet=ogre-cluster-shard-0&authSource=admin";

const findDocuments = (db) => {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray((err, docs) => {
    console.log("Found the following records");
    console.dir(docs);
  });
}

const insertDocuments = (db) => {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], (err, result) => {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
  });
}

MongoClient.connect(DB_URI, (err, db) => {
  // insertDocuments(db);
  findDocuments(db);
  db.close();
});

http.createServer( (request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(port, address);

console.dir(`Server being listened on ${address}:${port}`)
