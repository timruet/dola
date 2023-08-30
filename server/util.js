

function findById (vocabulary, id) {
  id = id.toString();
  for (let i = 0; i < vocabulary.length; i++){
    if (vocabulary[i]["id"] == id) {
      return vocabulary[i]["German"];
    }
  }
  /*const key = Object.keys(vocabulary).find(id => vocabulary.id == id)
  return vocabulary.id[key]*/
}

export{findById};