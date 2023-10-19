interface DownloadProps {
  filter: string | null
}

export default function Download ({ filter }: DownloadProps) {
  const handleDownload = () => {
    const element = document.createElement('a')
    const filter = localStorage.getItem('filter')
    if (filter == null) {
      return
    }

    const file = new Blob([
      JSON.stringify(JSON.parse(filter), null, 2)
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
    <label
      // htmlFor='file-download'
      className={`font-sans text-xl rounded ${filter != null ? 'bg-emerald-800 transition-all ease-in-out hover:bg-emerald-700 hover:scale-105 hover:cursor-pointer duration-50' : 'bg-gray-700'} py-28 px-28`}
      onClick={() => filter != null && handleDownload()}
    >
      <h1>
        {filter == null ? (
          <del>
            Download Filter
          </del>
        ) : (
          <>
            Download Filter
          </>
        )}
      </h1>
    </label>
  )
}
