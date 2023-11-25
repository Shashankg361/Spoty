/*//import callback from "@/pages/api/callback";
import Script from "next/script";
import { useEffect } from "react";
export default function SpotifyPlayer({accssToken}){
    useEffect(()=>{
        console.log('entered in player');
        if(window.Spotify){
            const player = new window.Spotify.Player({
                name:'Web Playback SDK Quick Start Player',
                getOAuthoToken: callback =>{ callback(accssToken)}
            });

            
                player.connect().then(success=>{
                    if(success){
                        console.log('spotify player conncted successfully')
                    }
                })
                
            

            player.on('ready',data =>{
                console.log('Ready with device ID' , data.device_id);

                player.play({
                    context_uri : 'spotify:track:7BqHUALzNBTanL6OvsqmC1',
                })
            })
            
        }
    },[])

    return(
            <>
            <Script src="https://sdk.scdn.co/spotify-player.js" strategy="beforeinteractive" />
            <div id="spotify-player">Player</div>
            </>
        )
}*/