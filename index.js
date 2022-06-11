// b6IK5Yc5OmiUvuss
// portfolio_admin
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://portfolio_admin:b6IK5Yc5OmiUvuss@cluster0.4isnb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    
    try {
        await client.connect();
        const projectCollection = client.db('portfolio_projects').collection('projects');

        app.get('/projects', async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects)
        })
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(query);
            res.send(project);
        });
    }
    finally {
        
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running Portfolio Server');
});
app.listen(port, () => {
    console.log('Listening to port',port);
})