import Link from 'next/link'

interface LinkedProps {
  disabled: boolean
  url: string
  name: string
}

export default function Linked ({ disabled, url, name }: LinkedProps) {
  return (
    <Link
      href={disabled ? '/' : url}
      rel='noreferrer'
      className={`font-sans text-xl rounded ${disabled ? 'bg-gray-700 hover:cursor-default' : 'bg-blue-800 transition-all ease-in-out hover:bg-blue-700 hover:scale-105 hover:cursor-pointer duration-50'} py-28 px-28`}
    >
      {disabled ? (
        <del>
          {name}
        </del>
      ) : (
        <>
          {name}
        </>
      )}
    </Link>
  )
}
