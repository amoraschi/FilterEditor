interface HeadingProps {
  content: string
}

export default function Heading ({ content }: HeadingProps) {
  return (
    <div
      className='font-sans font-light m-6 text-3xl text-center transition-colors hover:text-cyan-500'
    >
      <h1>
        {content}
      </h1>
    </div>
  )
}
