const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
const dboper = require('./operations'); 

 
//Saber que nos conectamos a la database
const url = 'mongodb://localhost:27017/';

//Accedemos a a la database que creamos
const dbname = 'conFusion';

//Manejamos los errores 
MongoClient.connect(url).then((client) => {

    //Verificamos que no sea  nulo en dado caso marcar error
    assert.strictEqual(err, null);

    console.log('Connected Correctly to server');

    const db = client.db(dbname);

       dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));