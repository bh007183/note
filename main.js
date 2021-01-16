const express = require("express");
const  path = require("path");
const fs = require("fs"); 


var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.get("/api/test", function(request, response){
  return response.send("you suck")
  
  
})

app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname, "../note/public/notes.html"));
  });
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "../note/public/index.html"));
  });

//////////////////////////////////////////////////////////////////////////

app.get("/api/notes", function(request, response){
  fs.readFile(path.join(__dirname, "../note/db/db.json"), "utf8", function(err, data){
    if(err){
        console.log("error")
    }
         response.json(JSON.parse(data))
  })
  
})


app.post("/api/notes", function(request, response){
    
     fs.readFile(path.join(__dirname, "../note/db/db.json"), "utf8", function(error, data){
      if(error){return response.sendStatus(404)} 
      let mainData = JSON.parse(data)
      mainData.push(request.body)
      //////////////////////////added id here////////////////////////
      for(let i = 0; i < mainData.length; i++){
        mainData[i].id = i  
      }
        fs.writeFile(path.join(__dirname, "../note/db/db.json"), JSON.stringify(mainData), function(err){
          if(err) throw err
          response.json(request.body)
})
})
})

app.delete("/api/notes/:id", function(request, response){
    const selectParams = request.params.id //////this refurs to the path of id in the url so if the trashcan associated with this it grabs the number
    fs.readFile(path.join(__dirname, "../note/db/db.json"), "utf8", function(error, data){
      if(error){return response.sendStatus(404)} 
      let mainData = JSON.parse(data)
      console.log(mainData)
      console.log(mainData[0].id)
      for(var i = 0; i < mainData.length; i++){
        if((mainData[i].id).toString() === selectParams){
             mainData.splice(mainData.indexOf(mainData[i]), 1)
            }
          }
         
        
        
         
         fs.writeFile(path.join(__dirname, "../note/db/db.json"), JSON.stringify(mainData), function(err){
          if(err) throw err
          response.json(request.body)
})
        
})
})
app.listen(PORT, function() {
    console.log("App listening on PORT " + "http://localhost:" + PORT);
  });