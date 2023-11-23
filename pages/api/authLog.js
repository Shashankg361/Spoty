import crypto from 'crypto';
import querystring from 'querystring';
var client_id = "94b1c412a255491881b03fd67670d852";
var redirect_uri = 'http://localhost:3000/api/callback';

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
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
    });
    res.end();
};
