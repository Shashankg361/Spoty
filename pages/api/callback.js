//import axios from "axios";
var client_id = '94b1c412a255491881b03fd67670d852';
import querystring from 'querystring';
import Cors from 'cors';
import axios from "axios";

var redirect_uri = 'http://localhost:3000/api/callback';

async function callback(req,res){

    //console.log('Entered');

    var code = req.query.code || null;
    var state = req.query.code || null;

    if (state === null) {
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        const authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          method:'post',
           headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + process.env.CLIENT_SECRET).toString('base64'))
          },
          data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
          }),
         
        };
        try{
            console.log('entered');
            const response = await axios(authOptions);
            const {access_token ,refresh_token} = await response.data;
            //console.log(access_token , refresh_token);

            const options = {
                url:'https://api.spotify.com/v1/me',
                methods :'get',
                headers :{'Authorization':'Bearer ' + access_token},
            };
            const userResponse = await axios(options)
            const data = userResponse.data;
           
            //console.log(data);
            
            const getList = {
              url:'https://api.spotify.com/v1/me/playlists',
              methods :'get',
              headers :{'Authorization':'Bearer ' + access_token},
            }
            const listResponse = await axios(getList);
            const List = listResponse.data;
            console.log( 'LIST - ',List);

            /*const tracks = {
              url :List.href,
              methods:'get',
              headers:{'Authorization':'Bearer '+ access_token},
            }
            const tracksResponse = await axios(tracks);
            const tracksData = tracksResponse.data;
            console.log('tracks - ',tracksData);*/

            const getCurrent = {
              url:'https://api.spotify.com/v1/me/player/currently-playing',
              methods :'get',
              headers :{'Authorization':'Bearer ' + access_token},
            }
            const currentResponse = await axios(getCurrent);
            const currentData = currentResponse.data;
            console.log('current - ',currentData);

            const getLikedSongs = {
              url:'https://api.spotify.com/v1/me/tracks',
              methods :'get',
              headers :{'Authorization':'Bearer ' + access_token},
            }
            const likedSongsResponse = await axios(getLikedSongs);
            const likedSongs = likedSongsResponse.data;
            console.log('Liked - ',likedSongs);

            const getRecentlyPlayed = {
              url:'https://api.spotify.com/v1/me/player/recently-played?limit=5',
              methods :'get',
              headers :{'Authorization':'Bearer ' + access_token},
            }
            const recentlyPlayedSongsResponse = await axios(getRecentlyPlayed);
            const recentlyPlayedSongs = recentlyPlayedSongsResponse.data;
            console.log('Recent - ',recentlyPlayedSongs);

            const Data ={access_token ,
                            data,
                            currentData,
                            };
            res.writeHead(302,{Location : `/?data=${encodeURIComponent(JSON.stringify(Data))}`});
            res.end();

        }catch(error){
            res.status(500).json({eorr:'failed to get access token'});
        }
    }
};

export default callback;