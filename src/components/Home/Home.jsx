import { useState } from 'react'
import { compareTwoStrings } from 'string-similarity'
import Heading from '../Heading/Heading'
import referenceIDs from '../../constants/search_ids.json'
import Image from 'next/image'

export default function Home () {
  const [suggestions, setSuggestions] = useState([])

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

  return (
    <main
      className='select-none tracking-tight'
    >
      <Heading
        content='Config Editor'
      />
      <div
        className='p-5 mx-2 my-5'
      >
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div
          className='relative'
        >
          <input
            type='search'
            id='default-search'
            className='block w-1/4 py-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none transition-all ease-in-out hover:w-1/2 duration-200'
            placeholder='Search for an item to use in your filter'
            required
            onChange={handleSearch}
          >
          </input>
          {suggestions.length > 0 && (
            <div
              className='absolute z-10 w-1/4 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800'
            >
              <ul
                className='overflow-hidden text-sm text-gray-700 divide-y divide-gray-200 rounded-md shadow-lg dark:text-gray-400 dark:divide-gray-700'
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className='relative'
                  >
                    <button
                      type='button'
                      className='flex items-center w-full px-2 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none'
                    >
                      <span
                        className='ml-2'
                      >
                        {suggestion.name}
                      </span>
                      {suggestion.image && (
                        <Image
                          src={suggestion.image}
                          className='w-8 h-8 absolute right-2'
                          alt={suggestion.name}
                          width={64}
                          height={64}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>  
          )}
        </div>
      </div>
    </main>
  )
}
