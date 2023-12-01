import React, { useState, useEffect } from 'react';
import '../dist/output.css';



export default function Vocabulary({ domain }) {

  return (
    <>
      <VocabTable domain={domain} />
    </>
  )
}


function VocabTable({ domain }) {
  const [vocabulary, setVocabulary] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/api/table?domain=${domain}`);
      const data = await res.json();
      setVocabulary(data);
    }
    fetchData();
  }, [domain]);

  return (
    <>
      <div className="relative justify-center flex p-4">
        <table class="table-fixed bg-white second:rounded-tl-lg second:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg border-collapse">
          <thead>
            <tr className= "p-3 border-b-8 bg-gray-200">
              <th className="bg-gray-50 rounded-lg">
                <button className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2">
                  <a href="#" className="">Edit</a>
                </button>
              </th>
              <th className="bg-gray-50 rounded-lg">
                <button className="text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2">
                  <a href={`/domain/${domain}/quizz`} className="">Study</a>
                </button>
              </th>
              <th className="bg-gray-50 rounded-lg"></th>
              <th className="bg-gray-50 rounded-lg"></th>
            </tr>
            <tr className="bg-gray-200">
              <th className="py-3 rounded-tl-lg"></th>
              {/* <th className="px-8 py-3">ID</th> */}
              <th className="pr-20 pl-5 py-3 p-">GERMAN</th>
              <th className="py-3 rounded-tr-lg">ENGLISH</th>
            </tr>
          </thead>
          <tbody>
            {vocabulary.map(item => (
              <tr className="border-b">
                <td className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-gray-800 bg-white border-gray-300 rounded accent-gray-800 focus:ring-gray-800" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                {/* <th scope="row" className="px-8 py-3">
                  {item.id}
                </th> */}
                <td className="pr-20 pl-5 py-3">
                  {item.english}
                </td>
                <td className="py-3">
                  {item.german}
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </>
  )
}


