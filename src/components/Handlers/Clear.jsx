export default function Clear ({ filter, setFilter }) {
  const handleClear = () => {
    localStorage.removeItem('filter')
    setFilter(null)
  }

  return (
    <label
      // htmlFor='file-clear'
      className={`rounded ${filter != null ? 'bg-pink-600 transition-all ease-in-out hover:bg-pink-600 hover:scale-105 hover:cursor-pointer duration-50' : 'bg-gray-700'} py-3 px-5`}
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
