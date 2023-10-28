import React, { useState, useEffect }from 'react';
import '../App.css';

export default function Quizz({domain}){
    return(
        <>
            <div id="study-background"/>
            <Flashcard domain={domain}/>
        </>
    );
}


function Flashcard({domain}) {
    const [vocabID, setVocabID] = useState(1);
    const [vocabGerman, setVocabGerman] = useState('');
    const [vocabEnglish, setVocabEnglish] = useState('');

    useEffect(()=>{ 
        async function fetchData() {
          const res = await fetch(`http://localhost:8000/api/quizz?id=${vocabID}&domain=${domain}`);
          const data = await res.json();
          setVocabID(vocabID+1);
          setVocabGerman(data.german);
          setVocabEnglish(data.english);
        }
        fetchData();
      },[]);

    async function handleClick() {
        const res = await fetch(`http://localhost:8000/api/quizz?id=${vocabID}&domain=${domain}`);
        const data = await res.json();
        setVocabID(vocabID+1);
        setVocabGerman(data.german);
        setVocabEnglish(data.english);
    }
    console.log(vocabID);

    return(
        <>
        <div className="flip-card-container">
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">{vocabEnglish}</div>
                <div className="flip-card-back">{vocabGerman}</div>
            </div>
        </div>
        <button id= "next-button" className="btn btn-outline-dark" type="button" onClick={handleClick}>Next </button>
        <button id= "prev-button" className="btn btn-outline-dark" type="button" onClick={handleClick}>Prev</button>
        <div id="generate-example"><Example domain={domain} vocabID={vocabID}/></div>
        </div>
        
    </>
    );
}

function Example({domain, vocabID}) {
    const [example, setExample] = React.useState('');
  
    async function handleClick() {
        const res = await fetch(`http://localhost:8000/api/example?id=${vocabID}&domain=${domain}`);
        const data = await res.json();
        setExample(data.example);
    }
    
    return(
      <form id="example-sentence-form">
        <button type="button" className="btn btn-outline-dark" onClick={handleClick}>Generate</button> 
        <div id="example-sentence">{example}</div>
      </form>
    )
  }