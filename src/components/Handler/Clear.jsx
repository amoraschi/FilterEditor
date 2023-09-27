export default function Clear ({ filter, setFilter }) {
  const handleClear = () => {
    localStorage.removeItem('filter')
    setFilter(null)
  }

  return (
    filter != null && (
      <label
        htmlFor='file-clear'
        className='absolute top-0 right-96 rounded bg-pink-600 py-3 px-5 transition-all ease-in-out hover:bg-pink-600 hover:scale-105 hover:cursor-pointer duration-100'
        onClick={handleClear}
      >
        <h1>Clear Filter</h1>
      </label>
    )
  )
}
