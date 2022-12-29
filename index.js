const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wbjzicb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const myTasksCollection = client.db("task-master").collection("my-tasks");

app.get('/', (req, res) => {
    res.send('task server running')
})

async function run(){
    try{
        app.post('/addTask', async(req, res)=> {
            const data = req.body;
            const result = await myTasksCollection.insertOne(data);
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(err=> console.error(err))

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
})