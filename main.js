const express = require("express");
const  path = require("path");
const fs = require("fs"); 


var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname, "../note/public/notes.html"));
  });
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "../note/public/index.html"));
  });
  /////////////////////////////////////
  const test = {
      yes: "no",
      no: "yes"

  }
//////////////////////////////////////////////////////////////////////////
app.get("/api/note"), function(request, response){
    response.send("you suck")
    
    
}


app.post("/api/notes"), function(request, response){
     let note = request.body
     console.log(request.body)
     fs.writeFile(path.join(__dirname, "../note/db/db.json")), note, (err) =>{
     if(err){
         console.log("error")
     }
     response.json(note)
    
}
}

app.listen(PORT, function() {
    console.log("App listening on PORT " + "http://localhost:" + PORT);
  });