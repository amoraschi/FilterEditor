export default function Upload ({ setFilter }) {
  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file == null) {
      return
    }

    event.target.value = null
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (event) => {
      const text = event.target.result
      localStorage.setItem('filter', text.toString())
      setFilter(text.toString())
    }
  }

  return (
    <label
      htmlFor='file-upload'
      className='rounded bg-emerald-800 py-3 px-5 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 hover:cursor-pointer duration-50'
    >
      <h1>Upload Filter</h1>
      <input
        type='file'
        id='file-upload'
        className='sr-only'
        onChange={handleUpload}
      />
    </label>
  )
}
