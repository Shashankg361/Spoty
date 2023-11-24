import { useEffect, useState } from "react";
import axios from "axios";
export default function ShowPlayList({accessToken}){
    const [ data , setData] = useState(""); 
    let storeData ;
    const getData = async()=>{
        storeData = await getPlayList(accessToken);
        console.log(storeData);
        setData(storeData)
    }
    //useEffect(()=>{},[storeData]);
    
    //console.log(List);
    return(
        <>  
            <div className="flex flex-col m-2 items-center">
                <button className=" border-2 border-white pr-6 pl-6 pt-2 pb-2 rounded-full mb-2" onClick={getData}>Get PlayList</button>
            {data && 
            
            (data.map((element)=>{
                return(<iframe className="m-2" src={`https://open.spotify.com/embed/playlist/${element.id}`} width="300" height="380"  allowtransparency="true" allow="encrypted-media"></iframe>)
            })
            )}
            </div>
            
        </>
    )
}

const getPlayList = async(accessToken)=>{
    const getList = {
        url:'https://api.spotify.com/v1/me/playlists',
        methods :'get',
        headers :{'Authorization':'Bearer ' + accessToken},
    }
      const listResponse = await axios(getList);
      const List = listResponse.data;
      console.log( 'LIST - ',List);
      return List.items;
}