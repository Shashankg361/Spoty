//import axios from "axios";
var client_id = '94b1c412a255491881b03fd67670d852';
import querystring from 'querystring';
import Cors from 'cors';
import axios from "axios";

var redirect_uri = 'http://localhost:3000/api/callback';

async function callback(req,res){

    console.log('Entered');

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
            console.log(access_token , refresh_token);
            const options = {
                url:'https://api.spotify.com/v1/me',
                methods :'get',
                headers :{'Authorization':'Bearer ' + access_token},
            };
            const userResponse = await axios(options)
            const data = userResponse.data;
            console.log(data);
            res.status(200).json({data});

        }catch(error){
            res.status(500).json({eorr:'failed to get access token'});
        }
    }
};

export default callback;