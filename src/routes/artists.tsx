import React, {useState, useRef, useEffect} from 'react';

// import DaliFeatures from '../components/DaliFeatures';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { FunkyHeader } from '../App';

const artists = {
  dali: {
    name: "Salvador Dali",
    id: '34123',
    slug: 'dali',
    art: []
  },
  magritte: {
    name: "Rene Magritte",
    id: '15965',
    slug: 'magritte',
    art: []
  },
  seligmann: {
    name: "Kurt Seligmann",
    id: '40809',
    slug: 'seligmann',
    art: []
  },
  matta: {
    name: "Matta",
    id: '40694',
    slug: 'matta',
    art: []
  }
}
const allArtworks:any  = {};

interface FeatureItem {
  id: number
  title: string;
  year: number;
  image: string;
  medium: string;
  copyright: string;
  origin: string;
};


export default function Artists(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const artistParams = params.artist as keyof typeof artists;
  const [artist, setArtist] = useState(artists[artistParams]);
  const [artworkID, setArtworkID] = useState(artist?.art[Math.floor(Math.random() * artist?.art.length)])
  const [artwork, setArtwork] = useState<FeatureItem>(artist?.art[Math.floor(Math.random() * artist?.art.length)])
  const [artTransition, setTransition] = useState(false)
  // let artist = useArtist(params?.artist);
  // let artwork = useArtwork({id: artist.art[Math.floor(Math.random() * artist.art.length)]})
  // console.log('params', params);

  // const [artCollection, addToCollection] = useState({[artist.slug]: {}});

  // On Load/Mount
  useEffect(() => {
    if (!params.artist) {
      navigate('/dali', { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On Artist Change
  useEffect(() => {
      const artistParams = params.artist as keyof typeof artists;
      const currArtist = artists[artistParams];
      if (!params.artist){
        return;
      }

      const fetchArtist = async () => {
        const res = await fetch(`https://api.artic.edu/api/v1/artists/${currArtist.id}`);
        return await res.json();
      };

      // Get Artists Artwork
      fetchArtist().then(({data}) => {
        setArtist({...currArtist, art: data.artwork_ids});
        setArtworkID(data.artwork_ids[Math.floor(Math.random() * data.artwork_ids.length)]);
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.artist])

    // on Artwork id Change
    useEffect(() => {
      if (!artworkID) {
        console.log('no id')
        return
      }
      console.log('effecting', artworkID)
    setTransition(false)


    if (Object.keys(allArtworks).length && allArtworks[artworkID]) {
      setArtwork(allArtworks[artworkID]);
      return
    }

    const fetchArtwork = async () => {
      const res = await fetch(`https://api.artic.edu/api/v1/artworks/${artworkID}`);
      return await res.json();
    };

    fetchArtwork().then(({data, ...res}) => {
      // remove datapoint if no image
      if (!data.image_id){
        console.log('no image');
        artist.art.filter(a => a !== artwork)
        setArtworkID(artist.art[Math.floor(Math.random() * artist.art.length)]);
        return;
      }

    // Type Checking
    const parsedArtwork: FeatureItem  = {
        id: artworkID,
        image: data.image_id ? res.config.iiif_url + '/' + data.image_id + '/full/843,/0/default.jpg' : '/img/docusaurus.png',
        title: data.title,
        year: data.date_display,
        medium: data.medium_display,
        copyright: data.copyright_notice,
        origin: `https://www.artic.edu/artworks/${artworkID}`
    };

    allArtworks[artworkID] = (parsedArtwork);
    setArtwork(parsedArtwork);
    const artworkTimeout = setTimeout(() => {
      setArtworkID(artist.art[Math.floor(Math.random() * artist.art.length)])
    }, 25000)
    return () => clearTimeout(artworkTimeout);
  })


// eslint-disable-next-line react-hooks/exhaustive-deps
}, [artworkID])


  const changeArtwork = () => {
    console.log('click');
    setTransition(true);

    // TODO This timeout is getting called multiple times
    setTimeout(() => {
      setArtworkID(artist.art[Math.floor(Math.random() * artist.art.length)])
    }, 600)
  }


  return (
    <div className='flex h-full my-auto'>
      <div className='flex flex-col h-100 bg-white mr-6 w-1/3 border rounded-lg shadow-neu p-4 overflow-hidden'>


        <FunkyHeader/>

          {artwork &&
            <div className="h-2/5 flex flex-col">
              <hr className='mb-2'/>
              <div className=''>
              <h2 className='text-3xl font-bold font-serif'>{artwork.title}</h2>

              <p className='text-sm text-right'>
                <span className='italic'>{artwork.year}</span>
                <br/>
                <span className='font-bold'>{artwork.medium}</span>
              </p>
              </div>
              <div className='mt-auto'>
                <p className='text-[0.6rem]'>
                  {artwork.copyright}
                </p>
                  <hr className='my-1'/>
                <p className='text-[0.6rem]'>
                  <a className='underline leading-none' href={artwork.origin} target="_blank" rel="noreferrer">Read More</a> (The Art Institute of Chicago)<br/>
                </p>
              </div>
            </div>
          }
          <div className='h-1/3 my-auto grid '>
           {
          Object.values(artists).map(artist => (
            <NavLink
              key={artist.name}
              to={"/" + artist.slug}
              className={({ isActive }) => "font-bold uppercase  hover:text-zinc-700 shadow-neu block rounded-full active:bg-red-400 text-center p-3 font-serif text-xl w-100 my-3  hover:bg-gradient-to-bl  from-zinc-200 to-white " + (isActive ? "to-cyan-300 bg-cyan-200 text-zinc-500" : "bg-white text-zinc-400")}
              >
              {artist.name}
            </NavLink>
          ))
        }</div>
      </div>

      <div className={' h-full container flex p-5 transition-opacity duration-600 ' + (artTransition ? 'opacity-0' : '') }>
      {artwork &&
        <img onClick={()=> {changeArtwork()}} className="hover:cursor-pointer shadow-2xl artworkImg max-h-full h-auto m-auto" alt={artwork.title} src={artwork.image} />
      }
      </div>
    </div>

  );
}
