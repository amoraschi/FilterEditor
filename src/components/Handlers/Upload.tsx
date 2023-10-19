interface UploadProps {
  setFilter: (filter: string | null) => void
}

export default function Upload ({ setFilter }: UploadProps) {
  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file == null) {
      return
    }

    event.target.value = null
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (event) => {
      if (event.target == null) {
        return
      }

      const text = event.target.result
      if (text == null) {
        return
      }

      localStorage.removeItem('filter')
      localStorage.setItem('filter', text.toString())
      setFilter(text.toString())
    }
  }

  return (
    <label
      htmlFor='file-upload'
      className='font-sans text-xl rounded bg-emerald-800 py-28 px-28 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 hover:cursor-pointer duration-50'
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
