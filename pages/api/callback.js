//import axios from "axios";
import querystring from 'querystring';
import axios from "axios";

var redirect_uri = 'https://spoty-13.vercel.app/api/callback';

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
            'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
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
            try{
              const userResponse = await axios(options)
            const data = userResponse.data;
            }catch(error){
              res.status(500).json({eorr:'Account data is not ben fetched'});
            }
            
           
            //console.log(data);
            
            

            /*const tracks = {
              url :List.href,
              methods:'get',
              headers:{'Authorization':'Bearer '+ access_token},
            }
            const tracksResponse = await axios(tracks);
            const tracksData = tracksResponse.data;
            console.log('tracks - ',tracksData);*/

            

            /*const getRecentlyPlayed = {
              url:'https://api.spotify.com/v1/me/player/recently-played?limit=3',
              methods :'get',
              headers :{'Authorization':'Bearer ' + access_token},
            }
            const recentlyPlayedSongsResponse = await axios(getRecentlyPlayed);
            const recentlyPlayedSongs = recentlyPlayedSongsResponse.data;
            console.log('Recent - ',recentlyPlayedSongs);*/

            const Data ={access_token ,
                            data,
                            };
            res.writeHead(302,{Location : `/?data=${encodeURIComponent(JSON.stringify(Data))}`});
            res.end();

        }catch(error){
            res.status(500).json({eorr:'failed to get access token'});
        }
    }
};

export default callback;