import '../dist/output.css';

export default function Profile(){
    // const [username, setUsername] = useState();

    // // useEffect(()=>{ 
    // //     async function fetchData() {
    // //       const res = await fetch(`http://localhost:8000/api/home`);
    // //       const data = await res.json();
    // //       setUsername(data);
    // //     }
    // //     fetchData();
    // //   },[]);

    return(
        <>
        <div id="home-background" />
        <div id="title-box">
            <big id="title">dola</big><br/>
            <big id="title-description">Domain specific language learning</big>
        </div>
        <h1>Choose a domain you want to improve in</h1>
        <h1>Learn with a pre made list of the most important vocabulary for that domain</h1>
        <h1>Create an account to mofidy your personal vocabulary lists, add new words or delete familiar ones</h1>
        </>
    )
}