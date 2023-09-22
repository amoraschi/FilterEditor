"use client";
import React, {useEffect, useState} from 'react';
import referenceIDs from '../constants/search_ids.json'
import {compareTwoStrings} from "string-similarity";
import {List} from 'react-virtualized';

export default function Home() {
    const [filter, setFilter] = useState(null)
    const [suggestions, setSuggestions] = React.useState([]);
    const [simpleFilter, setSimpleFilter] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem('filter')) setFilter(JSON.parse(localStorage.getItem('filter')))
        }
    }, [])

    useEffect(() => {
        if (filter) localStorage.setItem('filter', JSON.stringify(filter))
        else localStorage.removeItem('filter')
    }, [filter])

    useEffect(() => {
        if (filter) setSimpleFilter(simplifyFilter(filter))
        else setSimpleFilter(null)
    }, [filter])

    const handleUpload = (event) => {
        console.log('UPLOAD EVENT')
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (event) => {
            const text = event.target.result
            localStorage.setItem('filter', text.toString())
            setFilter(JSON.parse(text.toString()))
        }
        // clear the input value so that the same file can be uploaded again
        event.target.value = null
        reader.readAsText(file)
    }

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(filter)], {type: 'text/plain'});
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
            const split = referenceIDs[name].split('_')
            split.pop()
            return {
                name,
                id: referenceIDs[name],
                rating: compareTwoStrings(search, name),
                image: referenceIDs[name].includes('RUNE') || (referenceIDs[name].startsWith('PET') && !referenceIDs[name].includes("ITEM")) ? null : `https://sky.shiiyu.moe/item/${referenceIDs[name]}`
            }
        }).filter(({rating}) => rating > 0.3).sort((a, b) => b.rating - a.rating).slice(0, 5)
        setSuggestions(suggestions)
    }

    const handleClear = () => {
        setFilter(null)
    }

    const simplifyFilter = (filter) => {
        const simplified = {
            blacklist: {}, whitelist: {}, true_blacklist: {}, user_flip_finder: {},
        }

        const {blacklist, whitelist, true_blacklist, user_flip_finder} = simplified

        // if there are same keys and same attributes but different values, then group them together
        // for example:     "ASPECT_OF_THE_DRAGON=rarity_upgraded:true&ultimate_combo:1",
        //     "ASPECT_OF_THE_DRAGON=rarity_upgraded:true&ultimate_combo:2", would become
        //     "ASPECT_OF_THE_DRAGON=rarity_upgraded:true&ultimate_combo:1,2"

        filter.blacklist.forEach((key) => {
            const [itemId, attributes] = key.split('=')
            const attributeList = attributes.split('&')
            const uniqueAttributes = {}
            const keyArr = []
            attributeList.forEach((attribute) => {
                const [attributeName, attributeValue] = attribute.split(':')
                uniqueAttributes[attributeName] = attributeValue
                keyArr.push(attributeName)
            })
            const keyOnly = keyArr.join('&')
            if (!blacklist[itemId]) blacklist[itemId] = {}
            const itemRef = blacklist[itemId]
            if (!itemRef[keyOnly]) itemRef[keyOnly] = {}
            Object.keys(uniqueAttributes).forEach((attributeName) => {
                if (!itemRef[keyOnly][attributeName]) itemRef[keyOnly][attributeName] = new Set()
                itemRef[keyOnly][attributeName].add(uniqueAttributes[attributeName])
            })
        })
        return simplified
    }

    const renderBlacklist = ({index, key, style}) => {
        const entry = Object.keys(simpleFilter.blacklist)[index]
        return (
            <div className="relative bg-gray-900 w-64 h-64 p-6 m-4 rounded" key={key} style={style}>
                <h1 className="text-center font-mono">
                    {entry}
                </h1>
                <img src={`https://sky.shiiyu.moe/item/${entry}`} alt={entry}
                     className="absolute h-8 w-8 top-5 right-5"></img>
                <button className="bg-red-700 transition-colors hover:bg-red-600 absolute bottom-4 right-5 p-2 rounded">
                    Remove
                </button>
            </div>
        )
    }

    return (
        <main className="select-none tracking-tight">

            <div>
                <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500">BinMaster
                    Config Editor</h1>
            </div>
            <div className="p-5 mx-2 my-5">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <input type="search" id="default-search"
                           className="block w-1/4 py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all ease-in-out hover:w-1/2 duration-200"
                           placeholder="Search for an item to use in your filter" required onChange={handleSearch}>
                    </input>
                    {suggestions.length > 0 ?
                        <div className="absolute z-10 w-1/4 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                            <ul className="overflow-hidden text-sm text-gray-700 divide-y divide-gray-200 rounded-md shadow-lg dark:text-gray-400 dark:divide-gray-700">
                                {suggestions.map((suggestion, index) => {
                                    return <li key={index} className="relative">
                                        <button type="button"
                                                className="flex items-center w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                                            <span className="ml-2">{suggestion.name}</span>
                                            {suggestion.image ? <img src={suggestion.image}
                                                                     className="w-8 h-8 absolute top-0 right-4"></img> : null}
                                        </button>
                                    </li>
                                })}
                            </ul>
                        </div> : null}
                    <label htmlFor="file-upload"
                           className="absolute top-0 right-8 rounded bg-emerald-800 py-3 px-5 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 duration-100">
                        <h1>Upload Filter</h1>
                        <input type='file' id="file-upload" className="sr-only" onChange={handleUpload}/>
                    </label>
                    {filter ? <label htmlFor="file-download"
                                     className="absolute top-0 right-48 rounded bg-emerald-800 py-3 px-5 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 duration-100"
                                     onClick={handleDownload}>
                        <h1>Download Filter</h1>
                    </label> : null}
                    {filter ? <label htmlFor="file-clear"
                                     className="absolute top-0 right-96 rounded bg-pink-600 py-3 px-5 transition-all ease-in-out hover:bg-pink-600 hover:scale-105 duration-100"
                                     onClick={handleClear}>
                        <h1>Clear Filter</h1>
                    </label> : null}
                    {<div>{filter ? null :
                        <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500 p-6">
                            No filter loaded! Upload a filter to get started.
                        </h1>}</div>}
                    {/*filter opts*/}
                    {<div className="p-6">{simpleFilter ?
                        <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500 p-6">
                            Blacklist
                        </h1> : null}
                        {simpleFilter ?
                            <List RowRenderer={renderBlacklist} width={700} itemHeight={50}
                                  itemKey="id">
                            </List> : null}
                    </div>}
                    {<div className="p-6">{simpleFilter ?
                        <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500 p-6">
                            Whitelist
                        </h1> : null}</div>}
                    {<div className="p-6">{simpleFilter ?
                        <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500 p-6">
                            User FlipFinder
                        </h1> : null}</div>}
                    {<div className="p-6">{simpleFilter ?
                        <h1 className="font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500 p-6">
                            TBL
                        </h1> : null}</div>}
                </div>
            </div>

        </main>)
}
