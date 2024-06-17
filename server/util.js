import {getTable} from './database.js'


function getTableByDomain(domain) {
  return getTable(`${domain}_vocabulary_german_english`);
}

async function findByIdGerman (domain, id) {
  const vocabulary = await getTableByDomain(domain);
  id = id.toString();
  for (let i = 0; i < vocabulary.length; i++){
    if (vocabulary[i]["id"] == id) {
      return vocabulary[i]["german"];
    }
  }
}

async function findByIdEnglish (domain, id) {
  const vocabulary = await getTableByDomain(domain);
  id = id.toString();
  for (let i = 0; i < vocabulary.length; i++){
    if (vocabulary[i]["id"] == id) {
      return vocabulary[i]["english"];
    }
  }
}

const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);



export{findByIdGerman, findByIdEnglish, getTableByDomain, compareArrays};