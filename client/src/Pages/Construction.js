import React from 'react'

import ConstructionData from '../Vocabulary/Construction.json';
import '../App.css';

export default function Construction() {
  return (
    <>
      <Vocabulary Vocab={ConstructionData.Vocabulary} />
    </>
  )
}


function Vocabulary({Vocab}){
  return(
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
        {Vocab.map(item => (<tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.German}</td>
        <td>{item.English}</td>
        <td><Example vocabID={item.id}/></td></tr>))}
      </tbody>
</table>
</div>
  )
}

function Example({vocabID}) {
  const [data, setData] = React.useState(0);
  let id = vocabID;

  const handleClick = async () => {
      const res = await fetch(`/api/getRequest?data=${id}`);
      setData(res);
  }

  return(
    <form>
      <button onClick={handleClick}>Generate</button>
      <div>{data ? data : 'Error'}</div>
    </form>
  )
}

export {Construction, Vocabulary, Example};
