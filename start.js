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
// Delivers the JSON file on GET request
app.get( '/api/notes', ( req, res ) => {
    res.sendFile( __dirname + "/db/db.json", "utf8", function( err, data ) {
        if ( err ) throw err;
        res.end( data );
    })
})
// // TODO: Append a new note with a unique ID to the end of the JSON file.
// app.post( '/api/notes', function( req, res ) {
//     console.log( "Post request" );
//     console.log( req.body );
//     fs.readFile( __dirname + "/db/db.json", "utf8", function( err, data ) {
//         let notes = JSON.parse( data );
//         notes = JSON.stringify( notes );
//         fs.writeFile( __dirname + "/db/db.json", notes, function() {
//             if ( err ) throw err;
//         })
//     })
//     res.end();
// });
// Reads the JSON file, deletes the chosen ID, then writes the modified file back.
app.delete( '/api/notes/:id', function( req, res ) {
    let toDelete = req.params.id;
    fs.readFile( __dirname + "/db/db.json", "utf8", function( err, data ) {
        let notes = JSON.parse( data );
        let stringified = JSON.stringify( notes.filter( note => note.id != toDelete ));
        fs.writeFile( __dirname + "/db/db.json", stringified, function() {
            if ( err ) throw err;
        })
    })
    res.end();
});
// Defaults to serving the homepage.
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