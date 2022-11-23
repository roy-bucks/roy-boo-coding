const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');



exports.dbConnect = async () => {

    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    console.log("uri: ", uri);
    
    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    mongoose.connect(uri).then(() => {
        console.log("Successfully connected to the database");
    }).catch((err) => {
        console.log(err)
        console.log('Could not connect to the database. Will attempt to reconnect later...');
    });
};

// exports.dbDisconnect = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// };