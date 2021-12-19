/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 import React, {FC, useEffect, useState} from 'react';
 import clsx from 'clsx';
 import styles from './DaliFeatures.module.css';

 type FeatureItem = {
   title: string;
   year: number;
   image: string;
   medium: string;
   copyright: string;
   origin: string;
 };

 const artistID = {
   'dali': '34123',
   'matta': '40694',
   'seligmann': '40809',
   'magritte': '15965'
 }

 function DaliCard({title, year, image, medium, copyright, origin}: FeatureItem) {
   return (
       <div className={styles.artworkCard}>
          <div className={clsx(styles.artworkImgContainer)}>
            <img className={styles.artworkImg} alt={title} src={image} />
          </div>
        <div className={clsx("px-3 col col--4 padding-horiz--md", styles.artworkDetails)}>
            <h2>{title}</h2>
            <p>{medium}<br/>
            <i>{year}</i></p>
            <a style={{fontSize: '12px'}}  href={origin} target="_blank">Read More @ The Art Institute of Chicago</a><br/>
            <p className={styles.copyright}>
              {copyright}
              </p>
        </div>

     </div>
   );
 }

type UserType = {
  name: string
};

interface UserProps {
  artist: string,
};

const ArtistFeature: FC<UserProps> = ({artist}): JSX.Element => {
    const defaultState = {
      title: '',
      year: 0,
      image: '',
      medium: '',
      copyright: '',
      origin: ''
    }
    const currArtist = artist as keyof typeof artistID;
    const [uiArtist, setArtist] = useState(artistID[currArtist])
    const [allArtwork, setAllArtwork] = useState([]);
    const [currArtwork, setCurrArtwork] = useState(defaultState);
    const [loading, setLoading] = useState(true);

    console.log(artistID[currArtist] );

    const getRandomArtwork = () => {
      setLoading(true);

      // Random artwork id
      const randomID = allArtwork[Math.floor(Math.random() * allArtwork.length)];


      // Todo: Save Artwork if it exists already and dont send api call
      // if (typeof randomID === 'object') {
      //   const artwork: Object = Object.values(randomID)[0];
      //   const newLocal = { ...artwork };
      //   setCurrArtwork(newLocal);
      //   setLoading(false);
      //   return;
      // }
      // Api Call
      const fetchCurrDali = async () => {
          const res = await fetch(`https://api.artic.edu/api/v1/artworks/${randomID}`);
          return await res.json();
      };

      fetchCurrDali().then(({data, ...res}) => {

        // remove datapoint if no image
        if (!data.image_id){
          setAllArtwork(allArtwork.filter(a => a !== randomID));
          return;
        }

        // Type Checking
        const parsedArtwork: FeatureItem  = {
            image: data.image_id ? res.config.iiif_url + '/' + data.image_id + '/full/843,/0/default.jpg' : '/img/docusaurus.png',
            title: data.title,
            year: data.date_display,
            medium: data.medium_display,
            copyright: data.copyright_notice,
            origin: `https://www.artic.edu/artworks/${randomID}`
        };

        // setAllArtwork(allArtwork.map(aID => {
        //   if (aID === randomID){
        //     return {[randomID]: parsedArtwork};
        //   }
        //   return aID
        // }));

        setCurrArtwork(parsedArtwork);
        setLoading(false);
      })
    }

    useEffect(() => {
        setArtist(artistID[currArtist]);
        const fetchAllDali = async () => {
            const res = await fetch(`https://api.artic.edu/api/v1/artists/${uiArtist}`);
            return await res.json();
        };

        if (allArtwork.length >= 0) {
            fetchAllDali().then(({data}) => {setAllArtwork(data.artwork_ids);})
        }
    }, [allArtwork.length, currArtist, uiArtist])

    // Sets current image
    useEffect(() => {
        // if no artwork return
        if (allArtwork.length <= 0)
          return

        getRandomArtwork();

    }, [allArtwork.length])

    // console.log(allArtwork);

  return (
    < >
      {/* <div className="container"> */}
        {/* <div className={clsx("row", styles.rowButton)}>
          <button
          onClick={() => {getRandomArtwork()}}
          className="button button--secondary button--lg">
          🎨 View Random Work 🎨
          </button>
        </div> */}
        <div className="row">
        {loading ?
          <div className="lds-container">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div> :
            <DaliCard {...currArtwork}/>
          }
        </div>
      {/* </div> */}
    </>
  );
 }


 export default ArtistFeature;