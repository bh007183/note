
//////////////
/////sends file to front ent///////
  app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "../note/public/index.html"));
  });


/////api on the other side is requesting data.
//   app.get("/api/", function(request, response){
//     fs.readFile("db.json", "utf8", (error, data) => {
//         if(err){
//             throw err
//         }
//        response.json(JSON.parse(data))
//     })
//   });//////sendback data.


  //when click button request to send front end////
  app.post("/api/create", function(request, response) {
      const saveTo = {
          name:request.body.usernam
          isStudent:request.body.trueOFalse
      }
    fs.readFile("db.json", "utf8", (error, data) => {
        if(err) throw err

        let readFrom = JSON.parse(data)
        readFrom.push(request.body)

        fs.writeFile("db.json", JSON.stringify(readFrom), (err)=>{
            if(err) throw err
            response.json(req.body)
        })
        
  });
///match keys and title 

///everytime there is an ajax its accessing the back end from the front end////

//read file modify file update file
return response.sendStatus(404)




// app.post("/api/notes", function(request, response){
//      fs.readFile(path.join(__dirname, "../note/db/db.json"), "utf8", function(error, data){
//       if(error){return response.sendStatus(404)} 
//       let mainData = JSON.parse(data)
//         mainData.push(request.body)
//         fs.writeFile(path.join(__dirname, "../note/db/db.json"), JSON.stringify(mainData), function(err){
//           if(err) throw err
//           response.json(request.body)
// })
// })
// })