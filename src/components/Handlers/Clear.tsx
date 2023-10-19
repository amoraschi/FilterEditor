interface ClearProps {
  filter: string | null
  setFilter: (filter: string | null) => void
}

export default function Clear ({ filter, setFilter }: ClearProps) {
  const handleClear = () => {
    localStorage.removeItem('filter')
    setFilter(null)
  }

  return (
    <label
      // htmlFor='file-clear'
      className={`font-sans text-xl rounded ${filter != null ? 'bg-pink-600 transition-all ease-in-out hover:bg-pink-600 hover:scale-105 hover:cursor-pointer duration-50' : 'bg-gray-700'} py-28 px-28`}
      onClick={() => filter != null && handleClear()}
    >
      <h1>
        {filter == null ? (
          <del>
            Clear Filter
          </del>
        ) : (
          <>
            Clear Filter
          </>
        )}
      </h1>
    </label>
  )
}
