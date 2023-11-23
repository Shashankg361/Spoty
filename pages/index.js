import ShowPlayList from "@/components/playList";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [data , setData] = useState(null);
   const router = useRouter();
   useEffect(()=>{
    console.log('working');
    if(router.query && router.query.data){
    const query = decodeURIComponent(router.query.data);
    console.log('working',JSON.parse(query));
    try{ 
      setData(JSON.parse(query));
    }catch(error){
      console.log(error);
    }
   }
   },[router.query.data])
  //console.log(data)
  //data && console.log('datadatadtad - ', data.currentData.item.href);
  return (
    <main
      className={`flex min-h-screen flex-col items-center mb-2 p-24`}
    >
      <h1 className="text-3xl font-semibold">Wellcome to Spoty !!</h1>
      <Link className="m-5" href={'/api/authLog'}><button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full bg-green-500 text-2xl">Get Started</button></Link>
      <h1>Hello - {data ? data.data.display_name : 'Not loggedIn'}</h1>
      <div>
        {data && 
        ( data.currentData ? 
        <iframe src={`https://open.spotify.com/embed/track/${data.currentData.item.id}`} width="300" height="380"  allowtransparency="true" allow="encrypted-media"></iframe>
        : <h1 className="text-xl m-3 font-semibold">Currently No song is been played !</h1>)}
      </div>
      {
        data && 
        <div>
          <button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full">Get LikedSongs</button>
          <button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full">Get PlayList</button>
          <button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full">Get RecentlyPlayed</button>
        </div>
      }
      
    </main>
  )
}
