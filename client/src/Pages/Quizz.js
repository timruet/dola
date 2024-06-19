import React, { useState, useEffect } from 'react';
import '../dist/output.css';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { vocabService } from '../vocabService';


export default function Quizz() {
    const param = useParams();
    const domain = param.domain;
    return (
        <>
            <Flashcard domain={domain}/>
        </>
    );
}


function Flashcard({domain}) {
    const [vocabID, setVocabID] = useState(1);
    const [vocabGerman, setVocabGerman] = useState('');
    const [vocabEnglish, setVocabEnglish] = useState('');
    const [mode, setMode] = useState(0);

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    let userid = null;
    if (isAuthenticated) {
        userid = user.id
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch(`http://localhost:8000/api/quizz?id=${vocabID}&domain=${domain}`);
    //         const data = await res.json();
    //         setVocabID(vocabID + 1);
    //         setVocabGerman(data.german);
    //         setVocabEnglish(data.english);
    //     }
    //     fetchData();
    // }, []);

    async function handleClick() {
        const data = await vocabService.getVocabByID(userid, domain, vocabID);
        console.log(data.english);
        setVocabID(vocabID + 1);
        setVocabGerman(data.german);
        setVocabEnglish(data.english);
    }



    return (
        <>
            <div className="relative w-[560px] h-[350px] top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {mode === 0 ?
                    <button onClick={() => setMode(1)} className=" text-7xl w-full h-full relative rounded bg-gray-800 text-white">
                        {vocabEnglish}
                    </button> :
                    <button onClick={() => setMode(0)} className="text-7xl w-full h-full relative rounded  bg-green-500 text-white">
                        {vocabGerman}
                    </button>}
            </div>
            <button onClick={handleClick} >Next</button>
            {/* <Example domain={domain} vocabID={vocabID}/> */}
        </>
    );
}
// function Example({ domain, vocabID }) {
//     const [example, setExample] = React.useState('');

//     async function handleClick() {
//         const res = await fetch(`http://localhost:8000/api/example?id=${vocabID}&domain=${domain}`);
//         const data = await res.json();
//         setExample(data.example);
//     }

//     return (
//         <div className="relative w-[600px] h-[120px] border-gray-800 border-4 top-[12%] -translate-x-1/2 left-1/2">
//             <button className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2" onClick={handleClick}>Generate</button>
//             <div>
//                 {example}
//             </div>
//         </div>
//     )
// }