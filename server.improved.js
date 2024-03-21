const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

let items = []; // Initialize an empty array to store items

const server = http.createServer(function(request, response) {
  if (request.method === "GET") {
      handleGet(request, response);
  } else if (request.method === "POST") {
      if (request.url === '/clear-items') {
          handleClear(request, response); 
      } else {
          handlePost(request, response); 
      }
  }
});

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }
  else if (request.url === "/items") {
    response.writeHead( 200, {"Content-Type": "application/json" })
    response.end(JSON.stringify(items))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
      const newItemData = JSON.parse(dataString);
      items.push(newItemData.addItem); // Add new item

      console.log("Items:", items);  // Log updated list of items

      response.writeHead(200, "OK", {"Content-Type": "text/plain"});
      response.end("Item added"); // A more informative response
  })
}

const handleClear = function(request, response) {
  if (request.method === 'POST') {
      items = []; // Clear the items array
      response.writeHead(200, "OK", {"Content-Type": "text/plain"});
      response.end("Items cleared");
  } else {
      response.writeHead(405, "Method Not Allowed"); 
      response.end();
  }
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
