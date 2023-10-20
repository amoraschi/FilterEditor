import { Attribute } from './BlacklistItem'

interface BlacklistItemAttributeProps {
  attribute: Attribute
  removeAttribute: (attribute: Attribute) => void
}

export default function BlacklistItemAttribute ({ attribute, removeAttribute }: BlacklistItemAttributeProps) {
  return (
    <div
      className='flex flex-row items-center w-full border-b-2 py-1 border-gray-300'
    >
      <h1
        className='text-xl font-sans font-light ml-1 mr-1'
      >
        {attribute.name}{attribute.value !== '' ? `:${attribute.value}` : ''}
      </h1>
      <button
        className='ml-auto mr-1 text-xl font-sans font-light rounded px-4 py-1 bg-red-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
        onClick={() => removeAttribute(attribute)}
      >
        Remove
      </button>
    </div>
  )
}
