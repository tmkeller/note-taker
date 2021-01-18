const express = require( 'express' );
const fs = require( 'fs' );
var app = express();
var PORT = process.env.PORT || 8080;

app.use( express.urlencoded( { extended: true } ));
app.use( express.json() );

app.use( express.static( 'public' ));

app.get( '/notes', (req, res) => {
    fs.readFile( __dirname + "/public/notes.html", function( err, data ) {
        if ( err ) throw err;
        res.writeHead( 200, { "Content-Type": "text/html" });
        res.end( data );
    })
})

app.get( '*', (req, res) => {
    fs.readFile( __dirname + "/public/index.html", function( err, data ) {
        if ( err ) throw err;
        res.writeHead( 200, { "Content-Type": "text/html" });
        res.end( data );
    })
})

app.listen( PORT, function() {
    console.log( 'App listening on PORT ' + PORT );
})