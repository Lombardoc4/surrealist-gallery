/* eslint-disable no-octal-escape */
import React from 'react';
import './App.css';
import Artists from './routes/artists';

export const FunkyHeader = () => (
  <header className="flex flex-col ">
    <h1 className="text-3xl font-bold">
      <span style={{whiteSpace: 'nowrap'}}>
        {/* <span className="hidden xl:inline-block">🎨</span>{' '} */}
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
      {''}
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
      {/* {' '}<span className="hidden xl:inline-block">🎨</span> */}

    </h1>
    <p className='uppercase text-sm py-2 ml-auto'>Click image for new</p>
  </header>
)


function App() {
  return (
    <>
      {/* <FunkyHeader/> */}
      <Artists/>
    </>
  );
}

export default App;
