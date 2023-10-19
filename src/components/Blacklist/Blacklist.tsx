import { useEffect, useState } from 'react'
import Heading from '../Heading/Heading'
import { Items } from '../Data'
import BlacklistItem from './BlacklistItem'

export interface Blacklist {
  blacklist: string[]
  whitelist: {
    [key: string]: {
      profit: number
      profit_percentage: number
    }
  }
  userflipfinder: any
  true_blacklist: string[]
  global: {
    profit: number
    profit_percentage: number
    flipper_modes: {
      [key: string]: {
        enabled: boolean
        min_volume: number
      }
    }
  }
}

export default function Blacklist () {
  const [filter, setFilter] = useState<Blacklist | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('filter')

    if (stored != null) {
      setFilter(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (filter != null) {
      localStorage.setItem('filter', JSON.stringify(filter))
    }

    updateResults()
  }, [filter])

  const updateResults = () => {
    const target = document.querySelector('input')
    if (target == null) {
      return
    }

    const search = target.value.toLowerCase()
    if (search == null || search === '') {
      setResults([])
      setSuggestions([])
      return
    }

    const suggests = Object.keys(Items).filter((name) => {
      return name.toLowerCase().includes(search.toLowerCase())
    }).map((name) => {
      return `${Items[name]}`
    })

    const res = filter?.blacklist.filter((item) => {
      return item.toLowerCase().includes(search.toLowerCase())
    })

    if (res != null) {
      setResults(res)
    }

    setSuggestions(suggests)
  }

  return (
    <div
      className='absolute inset-0 flex flex-col items-center select-none tracking-tight'
    >
      <Heading
        content='Blacklist Editor'
      />
      {filter != null ? (
        <>
          <div
            className='flex flex-row items-center justify-center w-1/2 mb-4'
          >
            <input
              className='rounded border-2 border-gray-300 p-2 mr-2 w-3/4 h-full text-black focus:outline-none focus:border-blue-500 transition-all duration-50'
              placeholder='Search'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateResults()
                }
              }}
            />
            <button
              className='text-xl font-sans font-light rounded px-4 py-1 h-full bg-blue-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
              onClick={updateResults}
            >
              Search
            </button>
          </div>
          {suggestions.length > 0 && (
            <h1
              className='text-xl font-sans font-light mb-2'
            >
              Suggestions ({suggestions.length > 100 ? '100+ results, showing first 100' : `${suggestions.length} results`})
            </h1>
          )}
          {suggestions.length > 0 ? (
            <div
              className='w-11/12 h-1/2 overflow-y-auto mb-2'
            >
              {suggestions.map((suggestion, index) => {
                return (
                  <BlacklistItem
                    key={index}
                    suggestion={suggestion}
                    filter={filter}
                    setFilter={setFilter}
                    type='suggestion'
                  />
                )
              })}
            </div>
          ) : (
            <h1
              className='text-xl font-sans font-light mb-4'
            >
              No suggestions found.
            </h1>
          )}
          {results.length > 0 && (
            <h1
              className='text-xl font-sans font-light mb-2'
            >
              Results ({results.length > 100 ? '100+ results, showing first 100' : `${results.length} results`})
            </h1>
          )}
          {results.length > 0 ? (
            <div
              className='w-11/12 h-1/2 overflow-y-auto mb-2'
            >
              {results.map((result, index) => {
                return (
                  <BlacklistItem
                    key={index}
                    suggestion={result}
                    filter={filter}
                    setFilter={setFilter}
                    type='result'
                  />
                )
              })}
            </div>
          ) : (
            <h1
              className='text-xl font-sans font-light mb-4'
            >
              No results found.
            </h1>
          )}
        </>
      ) : (
        <h1>
          Either the filter is still loading or there isn't one uploaded.
        </h1>
      )}
    </div>
  )
}
