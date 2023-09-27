import { List } from 'react-virtualized'
import AutoSizer from "react-virtualized-auto-sizer"
import BlacklistItem from './BlacklistItem'

export default function Blacklist ({ simpleFilter, filter, setFilter }) {
  return (
    <div
      className='p-4'
    >
      {simpleFilter != null && (
        <h1
          className='font-sans font-light text-3xl text-center transition-colors hover:text-cyan-500 p-3'
        >
          Blacklist
        </h1>
      )}
      <div
        className='flex p-2 h-48 justify-center'
      >
        {simpleFilter != null && (
          <AutoSizer
            disableWidth
          >
            {({ height }) => (
              <List
                rowRenderer={({ index, key, style }) => (
                  <BlacklistItem
                    index={index}
                    key={key}
                    style={style}
                    simpleFilter={simpleFilter}
                    filter={filter}
                    setFilter={setFilter}
                  />
                )}
                width={1200}
                height={height}
                rowHeight={100}
                rowWidth={50}
                rowCount={Object.keys(simpleFilter.blacklist).length}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  )
}
