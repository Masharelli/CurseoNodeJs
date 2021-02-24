const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
const dboper = require('./operations'); 

 
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
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                        });
                    });
                });
        });
    });
});