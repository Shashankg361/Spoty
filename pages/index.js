import LikedSong from "@/components/LikedSongs";
import ShowPlayList from "@/components/playList";
import RecenetlyPlayed from "@/components/recentlyPlayed";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default  function Home() {
  const [data , setData] = useState(null);
  const [currentSong , setCurrentSong] = useState("");
  const router = useRouter();

  useEffect(()=>{
    //console.log('working');
    if(router.query && router.query.data){
    const query = decodeURIComponent(router.query.data);
    console.log('working',JSON.parse(query));
    try{ 
      setData(JSON.parse(query));
    }catch(error){
      console.log(error);
    }
   }
  },[router.query.data]);

  if(data){
    console.log('called data');
    async function handlePromise(){
      const response = await currentlyPlayingSong(data.access_token);
      console.log('res ',response)
      setCurrentSong(response);
      //currentlyPlayingSongId = response;
    }
    handlePromise();  
  }
  
  /*useEffect(()=>{
    setCurrentSong(currentlyPlayingSongId);
  },[currentlyPlayingSongId])*/

  return (
    <main
      className={`flex min-h-screen flex-col items-center mb-2 p-24`}
    >
      <h1 className="text-3xl font-semibold">Wellcome to Spoty !!</h1>
      <Link className="m-5" href={'/api/authLog'}><button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full bg-green-500 text-2xl">Get Started</button></Link>
      <h1>Hello - {data ? data.data.display_name : 'Not loggedIn'}</h1>
      <div>
        {data && 
        ( currentSong ? 
        <iframe src={`https://open.spotify.com/embed/track/${currentSong}`} width="300" height="380"  allowtransparency="true" allow="encrypted-media"></iframe>
        : <h1 className="text-xl m-3 font-semibold">Currently No song is been played !</h1>)}
      </div>
      {
        data && 
        <div className="Show flex items-start " >
          <LikedSong accessToken={data.access_token} />
          <ShowPlayList accessToken={data.access_token}/>          
          <RecenetlyPlayed accessToken={data.access_token}/>
        </div>
      }
      
    </main>
  )
}

const currentlyPlayingSong = async (access_token )=>{
  console.log('function called');
  const getCurrentlyPlaying = {
    url:'https://api.spotify.com/v1/me/player/currently-playing',
    methods :'get',
    headers :{'Authorization':'Bearer ' + access_token},
  }
  const currentlyPlayingSongsResponse = await axios(getCurrentlyPlaying);
  const currentlyPlayedSongs = currentlyPlayingSongsResponse.data;
  /*setCurrentSong();*/
  
  console.log('Recent - ',currentlyPlayedSongs);
  if(currentlyPlayedSongs){
    return currentlyPlayedSongs.item.id;
  }
  
}
