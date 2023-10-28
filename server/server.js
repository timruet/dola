import {chatGPTCall} from './chatGPTAPI.js';
import {findByIdGerman, findByIdEnglish, getTableByDomain} from './util.js';
import  express from'express'; 
import * as path from 'path';     
import bodyParser from "body-parser"; 
import { fileURLToPath } from 'url';
import {getTable} from './database.js'
import cors from 'cors';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); 

// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(cors());
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true}));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// app.get('/home', function(request, response) {
// 	// If the user is loggedin
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

// app.post('/auth', function(request, response) {
// 	// Capture the input fields
// 	let username = request.body.username;
// 	let password = request.body.password;
// 	// Ensure the input fields exists and are not empty
// 	if (username && password) {
// 		// Execute SQL query that'll select the account from the database based on the specified username and password
// 		result = getRow(username, password)
// 		if (results.length > 0) {
// 			// Authenticate the user
// 			request.session.loggedin = true;
// 			request.session.username = username;
// 			// Redirect to home page
// 			response.redirect('/home');
// 		} else {
// 			response.send('Incorrect Username and/or Password!');
// 		}			
// 		response.end();
//   } else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });

app.get('/api/table', async (req, res) => {
  const domain = req.query.domain;
  const data = await getTableByDomain(domain);
  res.json(data);
});



app.get('/api/example', async (req, res) => {
  const vocabID = req.query.id;
  const domain = req.query.domain;
  const vocab = await findByIdGerman(domain, vocabID);
  console.log(vocab);
  const completion_text = await chatGPTCall(`Gib mir einen Satz der das Wort ${vocab} enthält`);
  res.json({example: completion_text});
  });


  app.get('/api/quizz', async (req, res) => {
    const domain = req.query.domain;
    const vocabID = req.query.id;
    const vocabGerman =  await findByIdGerman(domain, vocabID);
    const vocabEnglish = await findByIdEnglish(domain, vocabID);
    res.json({german: vocabGerman, english: vocabEnglish});
    });

 

/*app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });*/

const port = process.env.PORT || 8000;
app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});