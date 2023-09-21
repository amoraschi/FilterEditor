"use client";
import React from 'react';
import Image from 'next/image'
import Script from 'next/script'
import referenceIDs from '../constants/search_ids.json'
import {compareTwoStrings} from "string-similarity";

export default function Home() {
    const [filter, setFilter] = React.useState(null);
    const [suggestions, setSuggestions] = React.useState([]);

    const handleUpload = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
            const text = event.target.result
            console.log(text)
            setFilter(text);
        }
        reader.readAsText(file)
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([filter], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "filter.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        element.remove();
    }

    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase()
        if (!search) return setSuggestions([])
        // find 5 suggestions and list them in terms of relevance
        const suggestions = Object.keys(referenceIDs).map((name) => {
            return {name, id: referenceIDs[name], rating: compareTwoStrings(search, name)}
        }).sort((a, b) => b.rating - a.rating).slice(0, 5)
        setSuggestions(suggestions)
    }

    return (
        <main className="select-none tracking-tight">
            <div>
                <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500">BinMaster
                    Config Editor</h1>
            </div>
            <div className="p-5">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-1/4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all ease-in-out hover:w-1/2 duration-200"
                           placeholder="Search for an item to use in your filter" required onChange={handleSearch}>
                    </input>
                    {/* handle suggestions /*/}
                    {
                        suggestions.length > 0 ?
                            <div className="absolute z-10 w-1/4 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                                <ul className="overflow-hidden text-sm text-gray-700 divide-y divide-gray-200 rounded-md shadow-lg dark:text-gray-400 dark:divide-gray-700">
                                    {suggestions.map((suggestion, index) => {
                                        return <li key={index} className="relative">
                                            <button type="button"
                                                    className="flex items-center w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700">
                                                <span className="ml-2">{suggestion.name}</span>
                                            </button>
                                        </li>
                                    })}
                                </ul>
                            </div> : null
                    }
                    <label htmlFor="file-upload"
                           className="absolute top-0 right-8 rounded bg-emerald-800 py-3 px-5 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 duration-100">
                        <h1>Upload Filter</h1>
                        <input type='file' id="file-upload" className="sr-only" onChange={handleUpload}/>
                    </label>
                    <label htmlFor="file-download"
                           className="absolute top-0 right-48 rounded bg-emerald-800 py-3 px-5 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 duration-100"
                           onClick={handleDownload}>
                        <h1>Download Filter</h1>
                    </label>
                    {<div>{
                        filter ?
                            filter.split("\n").map((line, index) => {
                                return <div key={index}>{line}</div>
                            }) : null
                    }</div>}
                </div>
            </div>
        </main>
    )
}
