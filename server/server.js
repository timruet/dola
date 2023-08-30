import {chatGPTCall} from './chatGPTAPI.js';
import ConstructionData from '../client/src/Vocabulary/Construction.json' assert {"type": "json"};
import {findById} from './util.js';
import  express from'express'; 
import * as path from 'path';     
import bodyParser from "body-parser"; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

app.get('/api/getRequest', async (req, res) => {
  let vocabID = req.query.data;
  let vocab = findById(ConstructionData.Vocabulary, vocabID);
  let completion_text = await chatGPTCall(`Gib mir einen Satz der das Wort ${vocab} enthält`);
  res.send(completion_text);
  });

 app.post('/api/postRequest', (req, res) => {
  //API logic
  });
 

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log('Listening on port', port);
});