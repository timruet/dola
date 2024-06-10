import '../dist/output.css';
import volcano from "../images/volcano-cropped.png"

export default function Home() {
    // const [username, setUsername] = useState();

    // // useEffect(()=>{ 
    // //     async function fetchData() {
    // //       const res = await fetch(`http://localhost:8000/api/home`);
    // //       const data = await res.json();
    // //       setUsername(data);
    // //     }
    // //     fetchData();
    // //   },[]);

    return (
        <>
            <div className="h-[26em] w-full bg-cover bg-home">
                <div className="h-full w-full backdrop-blur flex justify-evenly items-center">
                    <Logo/>
                    <DomainsSelect />
                </div>
                <div className="h-fit flex text-center justify-center flex-grow">
                    <span className="w-fit flex text-black font-semibold py-12 px-24">Select a pre-made domain containing over a 100 of the most important words</span>
                    <span className="w-fit flex text-black font-semibold py-12 px-24">Use AI to create a vocabulary list for a domain of your choosing</span>
                    <span className="w-fit flex text-black font-semibold py-12 px-24">Add or delete words that are important to you or your business</span>
                </div>
            </div>
        </>
    )
};


function DomainsSelect() {
    return (
        <div className="relative w-fit h-fit max-w-md">
            <div className="relative bg-white shadow-md rounded-lg px-3 py-2 w-96">
                <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                    Domains
                </div>
                <div className="flex items-center bg-gray-200 rounded-md">
                    <div className="pl-2">
                        <svg className="fill-current text-gray-500 w-6 h-6" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path className="heroicon-ui"
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </div>
                    <input
                        className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                        id="search" type="text" placeholder="Pick or edit a domain" />
                </div>
                <div className="h-[10rem] py-3 text-sm overflow-y-scroll">
                    <a href="domain/construction" className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">Construction</div>
                    </a>
                    <a href="domain/eldercare" className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">Eldercare</div>
                    </a>
                    <a href="domain/eldercare" className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">Eldercare</div>
                    </a>
                    <a href="domain/eldercare" className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">Eldercare</div>
                    </a>
                    <a href="domain/eldercare" className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">Eldercare</div>
                    </a>
                    <a href="domain/eldercare" className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                        <div className="flex-grow font-medium px-2">Eldercare</div>
                    </a>
                </div>
                <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                    <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
};

function Logo() {
    return (
        <div className="relative w-fit h-fit">
            <div className="text-center">
                <img src={volcano} className="h-28 mr-3 inline-block" />
                <span className="text-8xl font-semibold text-white align-middle inline-block">dola</span>
            </div>
            <span className="align-middle text-xl font-semibold text-white block p-3">domain specific language learning</span>
        </div>
    )
}