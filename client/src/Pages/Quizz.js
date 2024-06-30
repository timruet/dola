import React, { useState } from 'react';
import '../dist/output.css';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
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

    async function handleClick(description) {
        setMode(0);
        if(description === "next" && vocabID < 50){
            setVocabID(vocabID + 1);
        }
        else if(description === "previous" && vocabID > 0){
            setVocabID(vocabID - 1);
        }
        const data = await vocabService.getVocabByID(userid, domain, vocabID);
        setVocabGerman(data.german);
        setVocabEnglish(data.english);
    }



    return (
        <div className="absolute flex left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 items-center "> 
        <button onClick={() => handleClick("next")} className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 m-2">Previous</button>
            <div className="w-[560px] h-[350px] ">
                {mode === 0 ?
                    <button onClick={() => setMode(1)} className=" text-7xl w-full h-full relative rounded bg-gray-800 text-white">
                        {vocabEnglish}
                    </button> :
                    <button onClick={() => setMode(0)} className="text-7xl w-full h-full relative rounded  bg-green-500 text-white">
                        {vocabGerman}
                    </button>}
            </div>
            <button onClick={() => handleClick("previous")} className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 m-2" >Next</button>
            {/* <Example domain={domain} vocabID={vocabID}/> */}
        </div>
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