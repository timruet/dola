import React, { useState, useEffect } from 'react';
import '../dist/output.css';


export default function Quizz({ domain }) {
    return (
        <>
            <Flashcard domain={domain} />
        </>
    );
}


function Flashcard({ domain }) {
    const [vocabID, setVocabID] = useState(1);
    const [vocabGerman, setVocabGerman] = useState('');
    const [vocabEnglish, setVocabEnglish] = useState('');
    const [mode, setMode] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/api/quizz?id=${vocabID}&domain=${domain}`);
            const data = await res.json();
            setVocabID(vocabID + 1);
            setVocabGerman(data.german);
            setVocabEnglish(data.english);
        }
        fetchData();
    }, []);

    async function handleClick() {
        const res = await fetch(`http://localhost:8000/api/quizz?id=${vocabID}&domain=${domain}`);
        const data = await res.json();
        setVocabID(vocabID + 1);
        setVocabGerman(data.german);
        setVocabEnglish(data.english);
    }
    console.log(vocabID);


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
            <Example domain={domain} vocabID={vocabID}/>
            {/* <div className="flip-card-container">
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">{vocabEnglish}</div>
                <div className="flip-card-back">{vocabGerman}</div>
            </div>
        </div>
        <button id= "next-button" className="btn btn-outline-dark" type="button" onClick={handleClick}>Next </button>
        <button id= "prev-button" className="btn btn-outline-dark" type="button" onClick={handleClick}>Prev</button>
        <div id="generate-example"><Example domain={domain} vocabID={vocabID}/></div>
        </div> */}

            {/* <div className="absolute text-gray-800 bg-white w-full h-full [backface-visibility:hidden]">
                    {vocabGerman}
                </div>
                <div className="absolute overflow:hidden text-white w-full h-full bg-gray-800 hover:[transform:rotateY(180deg)] [transform-origin:center] [transform-style:preserve-3d] [backface-visibility:hidden]">
                    {vocabEnglish}
                </div> */}
        </>
    );
}
// background-color: transparent;
//   width: 80%;
//   height: 80%;
//   perspective: 1000px; 
//   position: absolute;
//   left: 50%; 
//   transform: translateX(-50%);
function Example({ domain, vocabID }) {
    const [example, setExample] = React.useState('');

    async function handleClick() {
        const res = await fetch(`http://localhost:8000/api/example?id=${vocabID}&domain=${domain}`);
        const data = await res.json();
        setExample(data.example);
    }

    return (
        <div className="relative w-[600px] h-[120px] border-gray-800 border-4 top-[12%] -translate-x-1/2 left-1/2">
            <button className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2" onClick={handleClick}>Generate</button>
            <div>
                {example}
            </div>
        </div>
    )
}