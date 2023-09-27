import Suggestion from './Suggestion'

export default function Suggestions ({ suggestions }) {
  return (
    <div
      className='absolute z-10 w-1/4 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800'
    >
      <ul
        className='overflow-hidden text-sm text-gray-700 divide-y divide-gray-200 rounded-md shadow-lg dark:text-gray-400 dark:divide-gray-700'
      >
        {suggestions.map((suggestion, index) => (
          <Suggestion
            key={index}
            name={suggestion.name}
            image={suggestion.image} 
          />
        ))}
      </ul>
    </div>
  )
}
