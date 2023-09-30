export default function Download ({ filter, setFilter }) {
  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([
      JSON.stringify(filter, null, 2)
    ], {
      type: 'text/plain'
    })

    element.href = URL.createObjectURL(file)
    element.download = 'filter.json'
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  return (
    filter != null && (
      <label
        htmlFor='file-download'
        className='absolute top-0 right-48 rounded bg-emerald-800 py-3 px-5 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 hover:cursor-pointer duration-100'
        onClick={handleDownload}
      >
        <h1>Download Filter</h1>
      </label>
    )
  )
}
