var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var router = express.Router();
//Fetch doesn't exist on server-side JavaScript, so we impoort a package which implements the functionality.
var fetch = require('node-fetch');
var fs = require('fs');

var loadedFiles = false;

const redirect_uri = 'http://localhost:8888/callback';
const client_uri = 'http://localhost:4200';
const spotify_base_uri = 'https://api.spotify.com/v1';

//These values will be loaded from client_secret.json
var my_client_id = null;
var my_client_secret = null;

var access_token = null;
var refresh_token = null;


//var client_id = '6f3fa3b2dd0f43a6821e9d09fe0702df'; // Your client id
//var client_secret = 'eacfc2d4a3144d01abdff9eeb06e586f'; // Your secret

function mytimeout( )
{
}

/*This function does not need to be edited.*/
function writeTokenFile(callback) {
	fs.writeFile('tokens.json', JSON.stringify({access_token: access_token, refresh_token: refresh_token}), callback);
}

/*This function does not need to be edited.*/
function readTokenAndClientSecretFiles(callback) {
	//This chains two promises together. First, client_secret.json will be read and parsed. Once it completes, tokens.json will be read and parsed.
	//These files are read synchronously (one after another) intentionally to demonstrate how promises can be chained.
	//Promise.all() could be used to conduct these two file reads asynchronously, which is more efficient.
	fs.readFile('client_secret.json', (err, data) => {
		data = JSON.parse(data);
		my_client_id = data.client_id;
		my_client_secret = data.client_secret;
		fs.readFile('tokens.json', (err, data) => {
			data = JSON.parse(data);
			access_token = data.access_token;
			refresh_token = data.refresh_token;
			callback();
		});
	});
}

function refresh(callback) {
	var code = req.query.code || null;
    console.log("refresh test1");

	a = fetch('https://accounts.spotify.com/api/token', 
        {
            method: 'POST',
//            body: 'grant_type=authorization_code&code='+ code + '&redirect_uri='
            body: 'grant_type=refresh_token',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(my_client_id + ':' + my_client_secret).toString('base64')}
//                'Authorization': 'Basic ' + Buffer.from('b2125b0273c24704bb50e3fac7463d0b:acb8ea55ecf945ac9cc480b54a48f6fd').toString('base64')}
    })
//    .then(response => response.json()).then(data => {console.log(data); console.log("uuu");
//    console.log("pppp");});
    .then(response => response.json()).then(data => {console.log(data); 
        access_token = data.access_token;
        refresh_token = data.refresh_token;
        writeTokenFile(function() {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
			//next();
		})});

    console.log("rtest3");



	//TODO: use fetch() to use the refresh token to get a new access token.
	//body and headers arguments will be similar the /callback endpoint.
	//When the fetch() promise completes, parse the response.
	//Then, use writeTokenFile() to write the token file. Pass it a callback function for what should occur once the file is written.
}


function makeAPIRequest(spotify_endpoint, res) {
//console.log ("here");
//console.log (spotify_endpoint);
//console.log (access_token);
	var headers = {
		'Content-Type':'application/x-www-form-urlencoded',
		'Authorization': 'Bearer ' + access_token
	};

//	fetch('https://api.spotify.com/v1/' + spotify_endpoint, 
//	fetch('https://api.spotify.com/v1/me',
	fetch(spotify_endpoint,
        {
            method: 'GET',
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + access_token
            }
            }).then(response => response.json()).then(data => 
            {
//                console.log(data)
                console.log(data)
                
                res.json(data);
            });

//console.log ("here1");
//                'Content-Type':'application/x-www-form-urlencoded',
//                'Authorization': 'Basic ' + Buffer.from('b2125b0273c24704bb50e3fac7463d0b:acb8ea55ecf945ac9cc480b54a48f6fd').toString('base64')}

	//TODO: use fetch() to make the API call.
	//parse the response send it back to the Angular client with res.json()

	//Once refresh() is working, check whether the status code is 401 (unauthorized)
	//If so, refresh the access token and make the API call again.
}

/*This function does not need to be edited.*/
router.get('*', function(req, res, next) {
	//Applies to all endpoints: load the token and client secret files if they haven't been loaded.
	if(!loadedFiles) {
		readTokenAndClientSecretFiles(function() {
			loadedFiles = true;
			next();
		});
	}
	else {
		next();
	}
});

router.get('/login', function(req, res, next) {
	var scopes = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize/' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('http://localhost:8888/callback/'));
    
    //console.log("test2");

	//TODO: use res.redirect() to send the user to Spotify's authentication page.
	//Use encodeURIComponent() to make escape necessary characters.
});



router.get('/callback', function(req, res, next) {
	var code = req.query.code || null;
    console.log(code);
    console.log("test1");
    //res.send(code);

//	const params = new URLSearchParams();
//	params.append('code', code);
//	params.append('redirect_uri', encodeURIComponent(redirect_uri));
//	params.append('grant_type', 'authorization_code');

	var headers = {
		'Content-Type':'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + Buffer.from(my_client_id + ':' + my_client_secret).toString('base64')
	};

    console.log("test2");
	
	a = fetch('https://accounts.spotify.com/api/token', 
        {
            method: 'POST',
//            body: params,
            body: 'grant_type=authorization_code&code='+ code + '&redirect_uri='
            + encodeURIComponent('http://localhost:8888/callback/'),
            headers: headers
//            headers: {
//                'Content-Type':'application/x-www-form-urlencoded',
//                'Authorization': 'Basic ' + Buffer.from('b2125b0273c24704bb50e3fac7463d0b:acb8ea55ecf945ac9cc480b54a48f6fd').toString('base64')}
            

//            'Authorization': 'Basic ' + Buffer.from(my_client_id + ':' + my_client_secret).toString('base64')}
    })
//    .then(response => response.json()).then(data => {console.log(data); console.log("uuu");
//    console.log("pppp");});
    .then(response => response.json()).then(data => {
        console.log("my console");
//        console.log("===> " + data + " <==="); 
        console.log("access_token ===> " + data.access_token + " <==="); 
        console.log("refresh_token ===> " + data.refresh_token + " <==="); 
        access_token = data.access_token;
        refresh_token = data.refresh_token;
        writeTokenFile(function() {
            access_token = data.access_token;
            refresh_token = data.refresh_token;
			//next();
		})});

//        writeTokenFile(mytimeout);});
    //console.log(req);
//    console.log(res);
    //console.log(b);

//    var a = fetch('https://accounts.spotify.com/api/token', params, headers);
    console.log("test3");
    //console.log(a);

	//TODO: use fetch() to exchange the code for an access token and refresh token.
	//When the fetch() promise completes, parse the response.
	//Then, use writeTokenFile() to write the token file. Pass it a callback function for what should occur once the file is written.
});

/*This function does not need to be edited.*/
router.get('/me', function(req, res, next) {
//console.log (req.query);
//console.log("pppp");
	makeAPIRequest(spotify_base_uri + '/me', res);
});


/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/

/*This function does not need to be edited.*/
router.get('/search/:category/:resource', function(req, res, next) {
//console.log("ooo");
	var resource = req.params.resource;
	var category = req.params.category;
//console.log(resource);
//console.log(category);
	//var params = new URLSearchParams();
	//params.append('q', resource);
	//arams.append('type', category);
	//makeAPIRequest(spotify_base_uri + '/search?' + params, res);
	var myt ='q=' + encodeURIComponent(resource) + '&type=' + category;
//	var myt ='q=' + resource + '&type=' + category;
    console.log(myt);
	makeAPIRequest(spotify_base_uri + '/search?' + myt, res);
});

/*This function does not need to be edited.*/
router.get('/artist/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/artists/' + id, res);
});

/*This function does not need to be edited.*/
router.get('/artist-related-artists/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/artists/' + id + '/related-artists', res);
});

/*This function does not need to be edited.*/
router.get('/artist-albums/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/artists/' + id + '/albums', res);
});

/*This function does not need to be edited.*/
router.get('/artist-top-tracks/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/artists/' + id + '/top-tracks?country=US', res);
});

/*This function does not need to be edited.*/
router.get('/album/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/albums/' + id, res);
});

/*This function does not need to be edited.*/
router.get('/album-tracks/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/albums/' + id + '/tracks', res);
});

/*This function does not need to be edited.*/
router.get('/track/:id', function(req, res, next) {
console.log("track");
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/tracks/' + id, res);
});

/*This function does not need to be edited.*/
router.get('/track-audio-features/:id', function(req, res, next) {
	var id = req.params.id;
	makeAPIRequest(spotify_base_uri + '/audio-features/' + id, res);
});

module.exports = router;
