const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoKerberosError } = require('mongodb');

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}


const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();



app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  const { userId, card } = req.body;

  const newCard = {Card:card,UserId:userId};
  var error = '';

  try
  {
    const db = client.db("COP4331Cards");
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }

  cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});
app.post('/api/register', async (req, res, next) =>
{


  const {newLogin, newPwd, newName, newUserID} = req.body;
  const newUser = {Login:newLogin, Password:newPwd, Name:newName, UserID:newUserID};
  var ret;
  var error = '';
  // First step: see if there is already a user with the same login
  try {
    const db = client.db("LargeProjectTesting");
    const results = await db.collection('Users').find({Login:newLogin}).toArray();

    // This if statement ensures that a result was found
    if(results.length > 0)
    {
      // If statement that checks if there is a duplicate login
      if(results[0].Login.toString().toLowerCase().localeCompare(newLogin.toString().toLowerCase() == 0))
      {
        // If so, then output an error
        error = "Login Name already taken";
        ret = {error: error};
        res.status(200).json(ret);
        return;
      }
    }
    
  }
  catch(e)
  {
    error = e.toString();
  }
  // Actually push the new user into the database
  try{
    const db = client.db("LargeProjectTesting");
    const result = await db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  ret = {error: error};
  res.status(200).json(ret);
});
app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
	
 var error = '';

  const { login, password } = req.body;

  const db = client.db("LargeProjectTesting");
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserID;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:'', login: login, password: password};
  res.status(200).json(ret);
});

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db("COP4331Cards");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
})

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});
