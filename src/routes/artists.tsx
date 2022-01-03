import React, {useState, useEffect} from 'react';

// import DaliFeatures from '../components/DaliFeatures';
import { useParams, useNavigate, NavLink } from "react-router-dom";

const nonBreakHyphen = document.createTextNode("\u00A0");
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

function useArtwork(art: any) {
  const [artwork, setArtwork] = useState(art);


  console.log('id', art?.id);
  // const propSlug = slug as keyof typeof artists;
  const fetchArtwork = async () => {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks/${artwork.id}`);
    return await res.json();
  };

  fetchArtwork().then(({data, ...res}) => {

    // remove datapoint if no image
    if (!data.image_id){
      // setAllArtwork(allArtwork.filter(a => a !== randomID));
      return;
    }

  // Type Checking
  const parsedArtwork: FeatureItem  = {
      id: 123,
      image: data.image_id ? res.config.iiif_url + '/' + data.image_id + '/full/843,/0/default.jpg' : '/img/docusaurus.png',
      title: data.title,
      year: data.date_display,
      medium: data.medium_display,
      copyright: data.copyright_notice,
      origin: `https://www.artic.edu/artworks/${artwork}`
  };

  // setAllArtwork(allArtwork.map(aID => {
  //   if (aID === randomID){
  //     return {[randomID]: parsedArtwork};
  //   }
  //   return aID
  // }));

  setArtwork(parsedArtwork);
  });

  if (!art) {
    return false;
  }
  // console.log('useArtist', artist)

  return artwork;
}

function useArtist(slug = 'dali') {
  const propSlug = slug as keyof typeof artists;
  const [artist, setArtist] = useState(artists[propSlug]);



  // console.log('useArtist', artist)

  return artist;
}

// function getArt(artistID) {

// }

function DaliCard({title, image}: FeatureItem) {
  return (
      <div className="artworkCard">
         <div className="artworkImgContainer">
         </div>

    </div>
  );
}

export default function Artists(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const artistParams = params.artist as keyof typeof artists;
  const [artist, setArtist] = useState(artists[artistParams]);
  const [artworkID, setArtworkID] = useState(artist?.art[Math.floor(Math.random() * artist?.art.length)])
  const [artwork, setArtwork] = useState<FeatureItem>(artist?.art[Math.floor(Math.random() * artist?.art.length)])

  // let artist = useArtist(params?.artist);
  // let artwork = useArtwork({id: artist.art[Math.floor(Math.random() * artist.art.length)]})
  // console.log('params', params);

  // const [artCollection, addToCollection] = useState({[artist.slug]: {}});


  useEffect(() => {
    if (!params.artist) {
      navigate('/dali', { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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

  useEffect(() => {
    if (!artworkID) {
      return
    }

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
  })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [artworkID])

console.log('artist', artist);
console.log('artworkID', artworkID);
console.log('artwork', artwork);

  return (
    <div className='flex h-5/6 my-auto'>
      <div className='mr-6 w-1/4'>
        <div className=''>
          {
          Object.values(artists).map(artist => (
            <NavLink
              key={artist.name}
              to={"/" + artist.slug}
              className={({ isActive }) => "rounded active:bg-red-400 text-center py-1 font-serif text-2xl w-100 my-4 " + (isActive ? "hover:bg-red-500 bg-red-400" : "hover:bg-cyan-400 bg-cyan-300")}
              style={({ isActive }) => {
                return {
                  display: "block",
                };}}
            >
              {artist.name}
            </NavLink>
          ))
        }
        </div>

        <hr/>

          {artwork &&
            <div className="pt-2 h-1/2 flex flex-col">
              <h2 className='text-3xl font-bold'>{artwork.title}</h2>

              <p className='text-sm text-right'>
                <i>{artwork.year}</i><br/>
                {artwork.medium}
              </p>
              <div className='mt-auto'>
                <p className='text-[0.6rem]'>
                  {artwork.copyright}
                  <hr className='my-1'/>
                  <a className='underline leading-none' href={artwork.origin} target="_blank" rel="noreferrer">Read More</a> (The Art Institute of Chicago)<br/>
                </p>
              </div>
            </div>
          }
      </div>

      {artwork &&
      <div className=' h-full container p-5'>
        <img onClick={()=> {setArtworkID(artist.art[Math.floor(Math.random() * artist.art.length)])}} className="hover:cursor-pointer shadow-xl artworkImg h-full mx-auto" alt={artwork.title} src={artwork.image} />
      </div>
      }
    </div>

  );
}
