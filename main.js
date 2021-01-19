const express = require("express");
const  path = require("path");
const fs = require("fs"); 


var app = express();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname, "./public/notes.html"));
  });
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "./public/index.html"));
  });

//////////////////////////////////////////////////////////////////////////

app.get("/api/notes", function(request, response){
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", function(err, data){
    if(err){
        console.log("error")
    }
         response.json(JSON.parse(data))
  })
  
})


app.post("/api/notes", function(request, response){
    
     fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", function(error, data){
      if(error){return response.sendStatus(404)} 
      let mainData = JSON.parse(data)
      mainData.push(request.body)
      //////////////////////////added id here////////////////////////
      for(let i = 0; i < mainData.length; i++){
        mainData[i].id = i  
      }
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(mainData), function(err){
          if(err) throw err
          response.json(request.body)
})
})
})

app.delete("/api/notes/:id", function(request, response){
    const selectParams = request.params.id 
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", function(error, data){
      if(error){return response.sendStatus(404)} 
      let mainData = JSON.parse(data)
      for(var i = 0; i < mainData.length; i++){
        if((mainData[i].id).toString() === selectParams){
             mainData.splice(mainData.indexOf(mainData[i]), 1)
            }
          }
         fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(mainData), function(err){
          if(err) throw err
          response.json(request.body)
})
        
})
})
app.listen(PORT, function() {
    console.log("App listening on PORT " + "http://localhost:" + PORT);
  });