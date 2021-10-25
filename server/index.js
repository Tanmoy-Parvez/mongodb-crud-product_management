const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// user: mydbuser1
// pass: QArJAflQ44U5HtBM

const uri =
  "mongodb+srv://mydbuser1:QArJAflQ44U5HtBM@cluster0.wh888.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("programmer");
    const usersCollections = database.collection("users");

    //GET API
    app.get("/users", async (req, res) => {
      const cursor = usersCollections.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollections.findOne(query);
      res.send(result);
    });

    //POST API
    app.post("/users", async (req, res) => {
      const newUsers = req.body;
      const result = await usersCollections.insertOne(newUsers);
      console.log("Hitting the post", req.body);
      console.log("added user", result);
      res.json(result);
    });

    // UPDATE API
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await usersCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log("Update user", result);
      res.json(result);
    });

    // DELETE API
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollections.deleteOne(query);
      console.log("deleted user", result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Hello from server");
});
