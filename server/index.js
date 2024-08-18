const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//config
require('dotenv').config();
const app = express();


const port = process.env.PORT || 5000;


//middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    // "clcient",
    // server-side
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(express.json());
// app.use(cookieParser());

// jwt validation middleware
const verifyToken = async (req, res, next) => {

  // console.log('jtw header:', req.headers.authorization)

  const initialToken = await req.headers.authorization
  // console.log('jtw header initialToken :::>', initialToken)

  // for local storage only
  if (!initialToken) {
    return res.status(401).send({ message: 'Unauthorized access!!' });
  }
  // validate local storage token
  const token = await initialToken.split(' ')[1];

  // const token = req?.cookies?.token;
  // console.log('token :::>', token)

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access...' });
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('err token :::>', err)
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      // console.log(decoded)
      req.decoded = decoded
      next()
    })
  }
}

//creating Token
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log("user for token", user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });

  res
    // .cookie("token", token, cookieOptions)
    // .send({ success: true });
    .send({ token });
});

//clearing Token
app.get("/logout", async (req, res) => {
  const user = req.body;
  console.log("logging out", user);
  res
    // .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});

//routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});


//connection to mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqvcpai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqvcpai.mongodb.net/`;




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    // =================================
    // DB Collections' Connection
    // =================================
    const productsCollection = client.db("kenakataDB").collection("products");



    // =================================
    // Admin verify 
    // =================================

    // verify admin access after jwt validation
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      // console.log('from verify admin -->', email);
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.isAdmin === true;

      if (!isAdmin) {
        return res.status(403).send({ message: "Unauthorized!!" });
      }

      next();
    }


    // =================================
    // API Connections for users
    // =================================

    // Get all users' data 
    app.get('/users', verifyToken, async (req, res) => {
      const results = await usersCollection.find().toArray();
      // console.log(results)
      res.send(results);
    });

    // Get a specific users' data by email
    app.get('/users/:email', async (req, res) => {
      const mail = req.params?.email;
      // console.log(mail, req.decoded.email)
      // if (mail !== req.decoded.email) {
      //   res.status(403).send({ message: 'Unauthorized email access....' });
      // }
      const results = await usersCollection.find({ email: mail }).toArray();
      // console.log(results)
      res.send(results);
    });

    // Post users registration data
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      // console.log(newUser);
      const result = await usersCollection.insertOne(newUser);
      // console.log(result);
      res.send(result);
    })

    // Patch a users' admin role by id
    app.patch('/adminRole/:id', verifyToken, verifyAdmin, async (req, res) => {
      try {
        const id = req.params?.id; // Extract the user id from the request parameters
        const updateBody = req.body; // Extract the new status from the request body
        // console.log('updateBody -->',updateBody);
        const query = { _id: new ObjectId(id) }
        const updateDoc = {
          $set: {
            isAdmin: updateBody.status
          },
        }
        const results = await usersCollection.updateOne(query, updateDoc);

        // console.log(results)
        res.send(results);
      }
      catch (err) {
        // If an error occurs during execution, catch it here
        console.error('Error updating user status:', err);
        // Send an error response to the client
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Patch a users' data by id
    app.patch('/update_user/:id', verifyToken, verifyAdmin, async (req, res) => {
      try {
        const id = req.params?.id; // Extract the user id from the request parameters
        const updateBody = req.body; // Extract the new status from the request body
        // console.log('updateBody -->',updateBody);
        const query = { _id: new ObjectId(id) }
        const updateDoc = {
          $set: {
            status: updateBody.status
          },
        }
        const results = await usersCollection.updateOne(query, updateDoc);

        // console.log(results)
        res.send(results);
      }
      catch (err) {
        // If an error occurs during execution, catch it here
        console.error('Error updating user status:', err);
        // Send an error response to the client
        res.status(500).json({ message: 'Internal server error' });
      }
    });


    // Update users registration data by email
    app.put('/update/:email', async (req, res) => {
      // console.log(req.params?.email);
      const mail = req.params?.email;
      const request = req.body;
      const query = { email: mail };
      const options = { upsert: true };
      const data = {
        $set: {
          ...request,
        }
      }
      const result = await usersCollection.updateOne(query, data, options);
      // console.log(result);
      res.send(result);
    });

    // =================================
    // API Connections for pagination
    // =================================

    
    // Get tests lists count for pagination
    app.get('/pagination', async (req, res) => {
      const date = req.query?.date
      const category = req.query?.category
      const search = req.query?.search
      const brand = req.query?.brand
      const price = parseFloat(req.query?.price)

      let query = {      }

      if (price) {
        query = { ...query, Price: { $lte: price } };
      }
      if (search) {
        query = { ...query, ProductName: { $regex: search, $options: 'i' } };
      }
      if (date !== 'Invalid date') {
        query = { ...query, AddedDateTime: { $gte: date } };
      }
      if (category) {
        query = { ...query, Category: { $eq: category } };
      }
      if (brand) {
        query = { ...query, BrandName: { $eq: brand } };
      }

      
      const counts = await productsCollection.countDocuments(query);

      // it provides a number with object form
      res.send({ counts });
    })

    // =================================
    // API Connections for products
    // =================================

    // Get products' data i
    app.get('/products', async (req, res) => {
      const results = await productsCollection.find().toArray();
      res.send(results);
    });

    // Get query products' data i
    app.get('/queryProducts', async (req, res) => {
      try {
        const size = parseInt(req.query.size)
        const page = parseInt(req.query.page) - 1
        const date = req.query?.date
        const category = req.query?.category
        const search = req.query?.search
        const brand = req.query?.brand
        const price = parseFloat(req.query?.price)
        const sortDate = req.query?.sortDate
        const sortPrice = req.query?.sortPrice
        // console.log(size, page, date, category, search);

        let query = {};

        if (price) {
          query = { ...query, Price: { $lte: price } };
        }
        if (search) {
          query = { ...query, ProductName: { $regex: search, $options: 'i' } };
        }
        if (date !== 'Invalid date') {
          query = { ...query, AddedDateTime: { $gte: date } };
        }
        if (category) {
          query = { ...query, Category: { $eq: category } };
        }
        if (brand) {
          query = { ...query, BrandName: { $eq: brand } };
        }

        // Set sorting order
         let sortOptions = {};
         if (sortDate) {
             sortOptions.AddedDateTime = sortDate === 'dsc' ? -1 : 1;
         }
         if (sortPrice) {
             sortOptions.Price = sortPrice === 'dsc' ? -1 : 1;
         }

        const results = await productsCollection
          .find(query)
          .sort(sortOptions)
          .skip(page * size)
          .limit(size)
          .toArray();

        res.send(results);
      }
      catch (err) {
        // If an error occurs during execution, catch it here
        console.error('Error updating user status:', err);
        // Send an error response to the client
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // =================================================================


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
