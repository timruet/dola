import ElderCareData from '../Vocabulary/ElderCare.json';

export default function ElderCare() {
  return (
    <>
      <Vocabulary Vocab={ElderCareData.Vocabulary} />
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
          </tr>
        </thead>
        <tbody>
          {Vocab.map(item => (<tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.German}</td>
          <td>{item.English}</td></tr>))}
        </tbody>
  </table>
  </div>
    )
  }

