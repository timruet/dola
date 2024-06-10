import React from 'react';
import { NavLink } from 'react-router-dom';

import ConstructionData from '../Vocabulary/Construction.json';
import '../App.css';

export default function Construction() {
  return (
    <>
      <Vocabulary Vocab={ConstructionData.Vocabulary} />
    </>
  )
}


function Vocabulary(props){
  return(
    <>
    <div><NavLink to="/construction/quizz" className="Link">Learn</NavLink></div>
    <div id="vocabTable">
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">German</th>
          <th scope="col">English</th>
          <th scope="col">Example</th>
        </tr>
      </thead>
      <tbody>
        {props.Vocab.map(item => (<tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.German}</td>
        <td>{item.English}</td>
        <td><Example key = {item.id} vocabID={item.id}/></td></tr>))}
      </tbody>
    </table>
  </div>
</>
  )
}

function Example(props) {
  const [example, setExample] = React.useState('');
  let id = props.vocabID;

  async function handleClick() {
      let res = await fetch(`/api/example?data=${id}`);
      res = await res.json();
      setExample(res.example);
  }
  

  return(
    <form id="example-form">
      <button class="btn btn-primary" type="button" onClick={handleClick}>Generate</button> 
      <div id="example">{example}</div>
    </form>
  )
}

