import pkg from 'pg'
import { resolve } from 'path';

const {Pool, Client} = pkg;

async function createTable(){
    const client = new Client({
    host: 'localhost',
    database: 'dola_db',
    })

    await client.connect();
    await client.query(`CREATE TABLE Construction_Vocabulary_German_English(
        VocabID int NOT NULL PRIMARY KEY,
        German varchar,
        English varchar
        )`);

}

async function addCSV(){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })

    await pool.connect();
    const absFilePath = resolve('../Tools/Vocab/construction_vocabulary_german_english.csv');
    await pool.query(`COPY construction_vocabulary_german_english(id, german, english) 
    FROM '${absFilePath}'
    DELIMITER ','
    CSV HEADER;`);
}

async function getTable(tablename){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res =  await pool.query(`SELECT * FROM ${tablename};`);
    return res.rows;
}

async function getRow(username, [password]){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res =  await pool.query(`SELECT * FROM ${userdata} WHERE username = ? AND password + ?`, [username, password ]);
    return res.rows;
}

export{getTable};