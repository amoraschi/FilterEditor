import Image from 'next/image'

export default function Home() {
    return (
        <main className="select-none tracking-tight">
            <h1 className="font-sans font-light m-6 text-3xl text-center">BinMaster Config Editor</h1>
            <div className="p-5">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-1/4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none transition-all ease-in-out hover:w-1/2 duration-200"
                           placeholder="Search for an item to use in your filter" required>
                    </input>
                    <label htmlFor="file-upload" className="absolute top-0 right-8 rounded bg-emerald-800 p-3">
                        <h1>Upload Filter</h1>
                        <input type='file' id="file-upload" className="sr-only"/>
                    </label>
                </div>
            </div>
        </main>
    )
}
