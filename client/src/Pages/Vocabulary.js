import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';


export default function Vocabulary({domain}) {

  return (
    <>
      <div id="study-background"/>
      <VocabTable domain={domain}/>
    </>
  )
}


  function VocabTable({domain}){
    const [vocabulary, setVocabulary] = useState([]);

    useEffect(()=>{ 
      async function fetchData() {
        const res = await fetch(`http://localhost:8000/api/table?domain=${domain}`);
        const data = await res.json();
        setVocabulary(data);
      }
      fetchData();
    },[domain]);


    return(
      <>
      <div id="learn">
        <NavLink to={`/${domain}/quizz`} className="learn-link">
          <button type="button" className="btn btn-outline-dark">Learn</button>
        </NavLink>
      </div>
      <table className="vocabTable">
      <big>{domain}</big>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">German</th>
            <th scope="col">English</th>
          </tr>
        </thead>
        <tbody>
          {vocabulary.map(item => (<tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.german}</td>
          <td>{item.english}</td></tr>))}
      </tbody>
</table>
</>
  )
}


