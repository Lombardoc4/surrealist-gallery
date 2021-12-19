import React, {useState, useEffect} from 'react';

import styles from './index.module.css';
import DaliFeatures from '../components/DaliFeatures';
import { useParams } from "react-router-dom";

const artists = [
  {name: "Salvador Dali", slug: "dali"},
  {name: "Rene Magritte", slug: "magritte"},
  {name: "Kurt Seligmann", slug: "seligmann"},
  {name: "Matta", slug: "matta"}
]

export default function Dali(): JSX.Element {
  const [artist, setArtist] = useState(artists[0])
  const params = useParams();

  useEffect(() => {
    setArtist(artists.filter(art => art.slug === params.artist)[0])
  }, [params.artist])

  return (
    <section className='container mx-auto py-5'>
        <h1 className="text-8xl pb-2 font-serif">{artist.name}</h1>
      <main>
        <DaliFeatures artist={artist.slug!}/>
      </main>

    </section>
  );
}
