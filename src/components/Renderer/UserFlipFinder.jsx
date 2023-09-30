export default function UserFlipFinder ({ simpleFilter }) {
  return (
    <div
      className='p-4'
    >
      {simpleFilter != null && (
        <h1
          className='font-sans font-light text-3xl text-center transition-colors hover:text-cyan-500 p-3'
        >
          UserFlipFinder
        </h1>
      )}
    </div>
  )
}
