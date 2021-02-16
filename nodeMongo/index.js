const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
//Saber que nos conectamos a la database
const url = 'mongodb://localhost:27017/';

//Accedemos a a la database que creamos
const dbname = 'conFusion';

//Manejamos los errores 
MongoClient.connect(url, (err, client) => {

    //Verificamos que no sea  nulo en dado caso marcar error
    assert.strictEqual(err, null);

    console.log('Connected Correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Uthapizza", "description": "test"}, (err, result)=>{
        assert.strictEqual(err, null);
        console.log('After Insert:\n');
        console.log(result.ops); 

        collection.find({}).toArray((err, docs)=>{
            assert.strictEqual(err, null);

            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err,result)=>{
                assert.strictEqual(err,null);

                client.close();
            });
        });
    });
});