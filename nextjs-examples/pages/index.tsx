import { Inter } from 'next/font/google'
import {FormEvent, FormEventHandler, useState} from "react";
import {BarsArrowUpIcon, MapPinIcon} from "@heroicons/react/20/solid";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [placeName, setPlaceName] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("https://travel.tsapp.dev/places", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pk_4db6657fc9a6eba24ca417cde5ec7b2d982b9c417da8c9b4264950498a6e48d8'
      },
      body: JSON.stringify({"params":{"place": placeName}})
    });

    setResponseText((await res.json()).result);
    setLoading(false);
  }

  return (
    <main className={`flex w-full min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <form onSubmit={handleSubmit} className="w-1/2">
        <label htmlFor="place" className="block text-sm font-medium leading-6 text-gray-900">
          Search candidates
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="place"
              id="place"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Example: San Francisco"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Get Recommendations
          </button>
        </div>
        {loading && <p className="mt-2 text-sm text-gray-500">Loading...</p>}
      </form>
      <div className="mt-4 w-1/2">
        <div className="mt-2">
        <textarea
          rows={4}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={responseText}
          readOnly
        />
        </div>
      </div>
    </main>
  )
}
