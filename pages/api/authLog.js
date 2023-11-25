import crypto from 'crypto';
import querystring from 'querystring';
var redirect_uri = 'https://spoty-13.vercel.app/api/callback';

//var app = express();
const generateRandomString = (length)=>{
    return crypto
            .randomBytes(60)
            .toString('hex')
            .slice(0,length)
}

export default function login(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email user-read-currently-playing user-library-read user-read-recently-played';
  //console.log('working');
  res.writeHead(302,{Location:'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
    });
    res.end();
};
