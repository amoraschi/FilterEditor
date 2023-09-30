import Image from 'next/image';

export default function Suggestion ({ name, image, index }) {
  return (
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
          {name}
        </span>
        {image && (
          <Image
            src={image}
            className='w-8 h-8 absolute right-2'
            alt={name}
            width={64}
            height={64}
          />
        )}
      </button>
    </li>
  )
}
