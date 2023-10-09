import { useState } from 'react'
import Heading from '../Heading/Heading'
import Upload from '../Handlers/Upload'
import Clear from '../Handlers/Clear'
import Download from '../Handlers/Download'
import Link from '../Link/Linked'
import Linked from '../Link/Linked'

export default function Home () {
  const [filter, setFilter] = useState(null)

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

  return (
    <div
      className='absolute inset-0 flex flex-col items-center justify-center select-none tracking-tight'
    >
      <Heading
        content='Config Editor'
      />
      <div
        className='flex flex-row space-x-2'
      >
        <Upload
          setFilter={setFilter}
        />
        <Download
          filter={filter}
        />
        <Clear
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div
        className='flex flex-row space-x-2 mt-5'
      >
        {pages.map((page, index) => {
          return (
            <Linked
              key={index}
              filter={filter}
              url={page.url}
              name={page.name}
            />
          )
        })}
      </div>
    </div>
  )
}
