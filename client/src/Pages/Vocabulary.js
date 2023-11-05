import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
      {/* <div id="learn">
        <NavLink to={`/${domain}/quizz`} className="learn-link">
          <button type="button" className="btn btn-outline-dark">Learn</button>
        </NavLink>
      </div> */}
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

      {/* <div className="static inline">
        <div className="relative pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="rounded-lg border-collapse border-solid border-8 border-stone-950">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                English
              </th>
              <th scope="col" className="px-6 py-3">
                German
              </th>
            </tr>
          </thead>
          <tbody>
            {vocabulary.map(item => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.id}
                </th>
                <td className="px-6 py-4">
                  {item.english}
                </td>
                <td className="px-6 py-4">
                  {item.german}
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div> */}

      {/* <table classNameName="vocabTable">
      <big id="domain-name">{domain}</big>
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
</table>  */}
    </>
  )
}


