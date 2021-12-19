/* eslint-disable no-octal-escape */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dali from './routes/dali';
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

const FunkyHeader = () => (
  <h1 className="text-3xl font-bold">
    <span style={{whiteSpace: 'nowrap'}}>
      <span className="hidden xl:inline-block">🎨</span>{' '}
      <span style={{textShadow: "-2px 2px yellow, -3px 3px black"}}>S</span>

      <span className="text-1xl before:content-['\016f'] before:block before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-red-600 relative inline-block">
        <span className="relative text-2xl">
          &#367;
        </span>
      </span>
      <span className="italic underline decoration-cyan-400">rr</span>
      <span className="text-2xl before:content-['\00eb'] before:block before:absolute before:text-red-600 relative inline-block">
        <span className="relative">
          e
        </span>
      </span>
      <span className="text-2xl before:content-['\00e4'] before:block before:absolute before:text-red-600 relative inline-block">
        <span className="relative">
          a
        </span>
      </span>
      <span className="px-1 before:block before:absolute before:-inset-0 before:-skew-y-6 before:bg-black relative inline-block">
        <span className="relative text-white">
          L
        </span>
      </span>
      <span className='font-mono'>I</span>
      <span style={{textShadow: "-2px 2px yellow, -3px 3px black"}}>s</span>
      <span style={{textShadow: "2px -2px yellow, 3px -3px black"}}>T</span>
    </span>
    {' '}
    <span  style={{whiteSpace: 'nowrap'}}>
      <span className="font-serif text-2xl before:content-['\00c4'] before:block before:absolute before:text-red-600 relative inline-block">
        <span className="relative">
          A
        </span>
      </span>&#x2060;<span className="underline decoration-cyan-400 italic font-sans">r</span>&#x2060;
      <span className="font-serif uppercase" style={{textShadow: "2px -2px yellow, 3px -3px black"}}>t</span>
    </span>
    {' '}
    <span  style={{whiteSpace: 'nowrap'}}>
      <span className="font-serif italic">G</span>
      <span className="text-2xl before:content-['\00e4'] before:block before:absolute before:text-red-600 relative inline-block">
        <span className="relative">
          a
        </span>
      </span>
      <span className="before:block before:absolute before:-inset-0 before:-skew-y-6 before:bg-black relative inline-block">
        <span className="relative text-white">
          L
        </span>
      </span>&#x2060;
      <span className="before:block before:absolute before:-inset-0 before:-skew-y-6 before:bg-black relative inline-block">
        <span className="relative text-white">
          L
        </span>
      </span>
      <span className="text-2xl before:content-['\00eb'] before:block before:absolute before:text-red-600 relative inline-block">
        <span className="relative">
          e
        </span>
      </span>
      <span className="italic underline decoration-cyan-400">r</span>&#x2060;
      <span className="px-1 font-mono font-light text-1xl before:content-['y'] before:block before:absolute before:top-1/2 before:left-1/4 before:-translate-x-1/4 before:-translate-y-1/2 before:text-red-600 relative inline-block">
        <span className="relative text-2xl">
          y
        </span>
      </span>
    </span>
    {' '}<span className="hidden xl:inline-block">🎨</span>

  </h1>
)


function App() {
  const artists = [
    {name: "Salvador Dali", slug: "dali"},
    {name: "Rene Magritte", slug: "magritte"},
    {name: "Kurt Seligmann", slug: "seligmann"},
    {name: "Matta", slug: "matta"}
  ]

  return (
    <div className="h-screenflex flex-col content-center">
      <header className="mt-8 container mx-auto flex content-center">
        {<FunkyHeader/>}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:w-11/12 xl:w-1/2'>
          {/* <span className='col-span-2'></span> */}
          {
            artists.map(artist => (
              <Link key={artist.name} className='mx-3 my-3' to={"/" + artist.slug}>
                <button className="w-full active:bg-violet-600 hover:bg-green-500 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 transition duration-300 shadow shadow-black/50 px-4 py-2 font-semibold text-lg bg-green-600 text-white rounded-full">
                  {artist.name}
                </button>
              </Link>
            ))
          }
        </div>
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
