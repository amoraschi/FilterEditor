import { useEffect, useState } from 'react'
import Heading from '../Heading/Heading'
import Upload from '../Handlers/Upload'
import Clear from '../Handlers/Clear'
import Download from '../Handlers/Download'
import Linked from '../Link/Linked'

const pages = [
  {
    name: 'Blacklist',
    url: '/blacklist'
  },
  {
    name: 'Whitelist',
    url: '/whitelist'
  },
  {
    name: 'UserFlipFinder',
    url: '/userflipfinder'
  },
  {
    name: 'True Blacklist',
    url: '/trueblacklist'
  }
]


export default function Home () {
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('filter')

    if (stored != null) {
      setFilter(stored)
    }
  }, [])

  return (
    <div
      className='absolute inset-0 flex flex-col items-center justify-center select-none tracking-tight'
    >
      <Heading
        content='Config Editor'
      />
      <div
        className='flex flex-row space-x-3'
      >
        <Upload
          // filter={filter}
          setFilter={setFilter}
        />
        <Download
          filter={filter}
          // setFilter={setFilter}
        />
        <Clear
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div
        className='flex flex-row space-x-3 mt-5'
      >
        {pages.map((page, index) => {
          return (
            <Linked
              key={index}
              disabled={filter == null}
              url={page.url}
              name={page.name}
            />
          )
        })}
      </div>
    </div>
  )
}
