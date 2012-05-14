/*
 * simplenode Web Server
 * Jonathan M. Stout
 * 5/10/2012
 */
var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')

http.createServer( function(request, response) {
    var pathname = url.parse(request.url).pathname;
    pathname = path.join(process.cwd(),pathname);

    path.exists(pathname, function(exists) {
	// If top level route to index.html
	if (pathname == process.cwd() + "/") {
	    pathname += 'index.html';
	}
	// If path exists serve else return 404
	if (exists) {
	    fs.readFile(pathname, "binary", function(err, file) {
		if (err) {
		    response.writeHead(500, {"Content-Type": "text/plain"});
		    response.write(err, "\n");
		    response.end();
		} else {
		    response.writeHeader(200);
		    response.write(file, "binary");
		    response.end();
		}
	    });
	} else {
	    console.log("No route found for", pathname);
	    response.writeHead(404, {"Content-Type": "text/plain"});
	    response.write("404 Not found");
	    response.end();
	}
    });
}).listen(8888);
