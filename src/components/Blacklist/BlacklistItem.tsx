import { useState } from 'react'
import Image from 'next/image'
import { Blacklist } from './Blacklist'
import { Attributes } from '../Data'
import BlacklistItemAttribute from './BlacklistItemAttribute'

interface BlacklistItemProps {
  suggestion: string
  filter: Blacklist | null
  setFilter: (filter: Blacklist | null) => void
  type: string
}

export interface Attribute {
  name: string
  value: any
}

const attributesNoValue = [
  'nil'
]

export default function BlacklistItem ({ suggestion, filter, setFilter, type }: BlacklistItemProps) {
  const [popUp, setPopUp] = useState(false)
  const [addedAttributes, setAddedAttributes] = useState<Attribute[]>([])

  const saveItem = () => {
    if (filter == null) {
      return
    }

    const newFilter = filter.blacklist
    const attributes = addedAttributes.sort((a, b) => {
      return a.name.localeCompare(b.name)
    }).map((attribute) => {
      if (attribute.value === '') {
        return attribute.name
      }

      return `${attribute.name}:${attribute.value}`
    }).join('&')

    const newItem = `${suggestion}=${attributes}`

    newFilter.push(newItem)

    setFilter({
      ...filter,
      blacklist: newFilter
    })

    setAddedAttributes([])
  }

  const editItem = () => {
    if (filter == null) {
      return
    }

    const newFilter = filter.blacklist
    const attributes = addedAttributes.sort((a, b) => {
      return a.name.localeCompare(b.name)
    }).map((attribute) => {
      if (attribute.value === '') {
        return attribute.name
      }

      return `${attribute.name}:${attribute.value}`
    }).join('&')

    const newName = suggestion.split('=')[0]
    const newItem = `${newName}=${attributes}`
    const index = newFilter.indexOf(suggestion)

    newFilter[index] = newItem

    setFilter({
      ...filter,
      blacklist: newFilter
    })
  }

  const removeItem = () => {
    if (filter == null) {
      return
    }

    const newFilter = filter.blacklist.filter((item) => {
      return item !== suggestion
    })

    setFilter({
      ...filter,
      blacklist: newFilter
    })
  }

  const addAttribute = (event: any) => {
    event.preventDefault()
    const attribute = document.querySelector('select') as HTMLSelectElement
    const value = document.querySelector('#add') as HTMLInputElement
    if (attribute.value === '' || (value.value === '' && !attributesNoValue.includes(attribute.value))) {
      return
    }

    const exists = addedAttributes.find((addedAttr) => {
      return addedAttr.name === attribute.value
    })

    if (exists != null) {
      return
    }

    setAddedAttributes([...addedAttributes, {
      name: attribute.value,
      value: value.value
    }])

    value.value = ''
  }

  const removeAttribute = (attribute: Attribute) => {
    setAddedAttributes(addedAttributes.filter((item) => {
      return item !== attribute
    }))
  }

  const addOriginalAttributes = () => {
    const attributes = suggestion.split('=')[1]
    if (attributes == null) {
      return
    }

    const newAttributes = attributes.split('&').map((attribute) => {
      const name = attribute.split(':')[0]
      const value = attribute.split(':')[1]

      return {
        name,
        value: value == null ? '' : value
      }
    })

    setAddedAttributes(newAttributes)
  }

  const getImage = () => {
    return type === 'suggestion' ? `https://sky.shiiyu.moe/item/${suggestion}` : `https://sky.shiiyu.moe/item/${suggestion.split('=')[0]}`
  }

  return (
    <div
      className='flex flex-row items-center px-5 mb-4 rounded bg-gray-700 last:mb-0'
    >
      <Image
        src={getImage()}
        alt={suggestion}
        width={32}
        height={32}
      />
      <h1
        className='font-sans font-light m-6 py-2 text-2xl text-center transition-colors overflow-x-auto hover:text-cyan-500'
      >
        {suggestion}
      </h1>
      {type === 'suggestion' && (
        <button
          className='ml-auto text-xl font-sans font-light rounded px-4 py-1 bg-green-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
          onClick={() => setPopUp(true)}
        >
          Add
        </button>
      )}
      {type === 'result' && (
        <div
          className='flex flex-row items-center ml-auto'
        >
          <button
            className='text-xl font-sans font-light rounded px-4 py-1 mr-2 bg-blue-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
            onClick={() => {
              addOriginalAttributes()
              setPopUp(true)
            }}
          >
            Edit
          </button>
          <button
            className='ml-auto text-xl font-sans font-light rounded px-4 py-1 bg-red-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
            onClick={removeItem}
          >
            Remove
          </button>
        </div>
      )}
      {popUp && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50'
        >
          <div
            className='relative flex flex-col items-center w-3/4 h-3/4 bg-gray-700 rounded'
          >
            <h1
              className='text-xl font-sans font-light mt-2 mb-2'
            >
              {type === 'suggestion' ? 'Adding' : 'Editing'} {type === 'suggestion' ? suggestion : `${suggestion.split('=')[0]}=...`} {type === 'suggestion' ? 'to' : 'in'} your blacklist
            </h1>
            <div
              className='flex flex-col items-center h-full w-full px-1'
            >
              <form
                className='flex flex-row items-center mb-1'
              >
                <select
                  className='rounded border-2 border-gray-300 p-2 mr-2 w-3/4 h-full text-black focus:outline-none focus:border-blue-500 transition-all duration-50'
                >
                  {Attributes.map((name) => {
                    return (
                      <option
                        value={name}
                      >
                        {name}
                      </option>
                    )
                  })}
                </select>
                <input
                  className='rounded border-2 border-gray-300 p-2 mr-2 w-3/4 h-full text-black focus:outline-none focus:border-blue-500 transition-all duration-50'
                  placeholder='Value'
                  id='add'
                />
                <button
                  className='text-xl font-sans font-light rounded px-4 py-1 h-full bg-blue-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
                  onClick={addAttribute}
                >
                  Add
                </button>
              </form>
              {addedAttributes.length > 0 && (
                <div
                  className='flex flex-col items-center mb-1 overflow-y-auto overflow-x-hidden w-full h-3/4'
                >
                  {addedAttributes.map((attribute) => (
                    <BlacklistItemAttribute
                      attribute={attribute}
                      removeAttribute={removeAttribute}
                    />
                  ))}
                </div>
              )}
              {addedAttributes.length > 0 && (
                <button
                  className='absolute bottom-0 left-0 ml-2 mb-2 text-xl font-sans font-light rounded px-4 py-1 bg-green-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
                  onClick={() => {
                    setPopUp(false)
                    if (type === 'suggestion') {
                      saveItem()
                    } else {
                      editItem()
                    }
                  }}
                >
                  Save
                </button>
              )}
              <button
                className='absolute bottom-0 right-0 mr-2 mb-2 text-xl font-sans font-light rounded px-4 py-1 bg-red-500 transition-all ease-in-out hover:scale-105 hover:cursor-pointer duration-50'
                onClick={() => {
                  if (type === 'suggestion') {
                    setAddedAttributes([])
                  }

                  setPopUp(false)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
