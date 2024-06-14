import pkg from 'pg'
import { resolve } from 'path';

const {Pool, Client} = pkg;


async function createTable(){
    const client = new Client({
    host: 'localhost',
    database: 'dola_db',
    })

    await client.connect();
    await client.query(`CREATE TABLE user_profiles(
        email varchar NOT NULL PRIMARY KEY,
        password varchar
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

// async function getRow(username, [password]){
//     const pool = new Pool({
//     host: 'localhost',
//     database: 'dola_db',
//     })
//     await pool.connect();

//     const res =  await pool.query(`SELECT * FROM ${userdata} WHERE username = ? AND password + ?`, [username, password ]);
//     return res.rows;
// }

async function getUser(userdata){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res =  await pool.query(`SELECT * FROM user_profiles WHERE email = '${userdata.email}' AND password = '${userdata.password}';`);
    return res;
}

async function addUser(userdata){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res =  await pool.query(`INSERT INTO user_profiles(email, password) VALUES('${userdata.email}','${userdata.password}');`);
    return res;
}

export{getTable, addUser, getUser};