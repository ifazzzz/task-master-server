const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wbjzicb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const myTasksCollection = client.db("task-master").collection("my-tasks");
const completedTasks = client.db("task-master").collection("completed-tasks")
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
        app.get('/myTask', async(req, res)=> {
            const email = req.query.email;
            const query = {email : email};
            const result = await myTasksCollection.find(query).toArray();
            res.send(result)
        })
        app.post('/completedTask', async(req, res)=> {
            const task = req.body;
            const result = await completedTasks.insertOne(task);
            res.send(result)
        })
        app.get('/completedTask', async(req, res)=> {
            const email = req.query.email;
            const query = {email: email}
            const result = await completedTasks.find(query).toArray();
            res.send(result)
        })
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id : ObjectId(id)}
            const result = await myTasksCollection.deleteOne(filter);
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