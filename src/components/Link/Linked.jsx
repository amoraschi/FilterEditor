import Link from 'next/link'

export default function Linked ({ filter, url, name }) {
  return (
    <Link
      href={filter != null ? url : '/'}
      rel='noreferrer'
      className={`rounded ${filter != null ? 'bg-blue-800 transition-all ease-in-out hover:bg-blue-700 hover:scale-105 hover:cursor-pointer duration-50' : 'bg-gray-700'} py-3 px-5`}
    >
      {filter == null ? (
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
