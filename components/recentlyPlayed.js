import { useState } from "react";
import axios from "axios";
export default function RecenetlyPlayed({accessToken}){
    const [data , setData] = useState("");
    const getData = async()=>{
        const getresponse = await func(accessToken);
        setData(getresponse);
    }
    
    return(
        <>  
            <div className="flex flex-col m-2 items-center">
                <button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full mb-2" onClick={getData}>Get RecentlyPlayed</button>
            {data && 
            
            (data.map((element)=>{
                return(<iframe className="m-2" key={element.track.id} src={`https://open.spotify.com/embed/track/${element.track.id}`} width="300" height="380"  allowtransparency="true" allow="encrypted-media"></iframe>)
            })
            )}
            </div>
            
        </>
    )
}

const func = async(accessToken)=>{
    const getRecentlyPlayed = {
        url:'https://api.spotify.com/v1/me/player/recently-played?limit=3',
        methods :'get',
        headers :{'Authorization':'Bearer ' + accessToken},
      }
      const recentlyPlayedSongsResponse = await axios(getRecentlyPlayed);
      const recentlyPlayedSongs = recentlyPlayedSongsResponse.data;
      console.log('Recent - ',recentlyPlayedSongs);
        return recentlyPlayedSongs.items;
    }
