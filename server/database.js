import pkg from 'pg'
import { resolve } from 'path';

const {Pool, Client} = pkg;


// async function createTable(userid){
//     const pool = new Client({
//     host: 'localhost',
//     database: 'dola_db',
//     })

//     await pool.connect();
//     await pool.query(`CREATE TABLE user_${userid}(domains varchar(255));`);

// }

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

async function createUserDomains(userid){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    await pool.query(`CREATE TABLE user_${userid}(domains varchar(255));`);
    await pool.query(`INSERT INTO user_${userid}(domains) VALUES('Eldercare'), ('Construction');`);
    const res =  await pool.query(`SELECT * FROM user_${userid};`);
    return res.rows;
}

async function addUserDomains(userid, domain){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();
    
    await pool.query(`INSERT INTO user_${userid}(domains) VALUES('${domain}');`);
    const res = await pool.query(`SELECT * FROM user_${userid}`);
    return res;
}

async function deleteUserDomains(userid, domain){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();
    
    await pool.query(`DELETE FROM user_${userid} WHERE domains='${domain}';`);
    const res = await pool.query(`SELECT * FROM user_${userid}`);
    return res;
}

async function getUserDomains(userid){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res = await pool.query(`SELECT domains FROM user_${userid}`);
    return res;
}

async function setVocabulary(userid, domain, vocabulary){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    await pool.query(`CREATE TABLE user_${userid}_${domain} (id serial not null, german varchar(255), english varchar(255));`);
    for(let i=0; i<vocabulary.length; i++){
        const germanWord = vocabulary[i].german;
        const englishWord = vocabulary[i].english;
        await pool.query(`INSERT INTO user_${userid}_${domain}(german, english) VALUES('${germanWord}', '${englishWord}');`);
    }

    const res =  await pool.query(`SELECT * FROM user_${userid}_${domain};`);
    return res;
}

async function getVocabulary(userid, domain){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res =  await pool.query(`SELECT * FROM user_${userid}_${domain};`);
    return res;
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

    const res =  await pool.query(`SELECT * FROM users WHERE email = '${userdata.email}' AND password = '${userdata.password}';`);
    return res;
}

async function addUser(userdata){
    const pool = new Pool({
    host: 'localhost',
    database: 'dola_db',
    })
    await pool.connect();

    const res =  await pool.query(`INSERT INTO users(email, password) VALUES('${userdata.email}','${userdata.password}');`);
    const user =  await pool.query(`SELECT * FROM users WHERE email = '${userdata.email}' AND password = '${userdata.password}';`);
    return user;
}

async function getVocabByID(userid, domain, vocabID){
    const pool = new Pool({
        host: 'localhost',
        database: 'dola_db',
        })
        await pool.connect();

        const user =  await pool.query(`SELECT * FROM user_${userid}_${domain} WHERE id = '${vocabID}';`);
        return user;
}

export{getTable, addUser, getUser, createUserDomains, addUserDomains, getUserDomains, deleteUserDomains, setVocabulary, getVocabulary, getVocabByID};