import Image from 'next/image'

export default function BlacklistItem ({ index, key, style, simpleFilter, filter, setFilter }) {
  const entry = Object.keys(simpleFilter.blacklist)[index]

  const removeItem = () => {
    const newFilter = {...filter}
    console.log(filter)
    newFilter.blacklist.splice(index, 1)
    setFilter(newFilter)
  }

  return (
    <div
      className='flex items-center justify-center bg-gray-900 rounded'
      key={key}
      style={style}
    >
      <h1
        className='font-mono'
      >
        {entry}
      </h1>
      <Image
        src={`https://sky.shiiyu.moe/item/${entry}`}
        alt={entry}
        className='absolute left-10'
        width={64}
        height={64}
      />
      <button
        className='bg-red-700 transition-colors hover:bg-red-600 absolute right-5 p-2 rounded'
        onClick={removeItem}
      >
        Remove
      </button>
    </div>
  )
}
