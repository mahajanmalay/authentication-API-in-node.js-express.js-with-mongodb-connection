const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const fs = require('fs');
const path = require('path');
const app = express();
const videoroute = express.Router();


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Video = require("./app/models/video.model");
const Note = require("./app/models/notes.model");
const Assignment = require("./app/models/assignment.model");
const Test = require("./app/models/test.model");
const User = require("./app/models/user.model");
const Enquire = require("./app/models/enquiry.model");
const Role = db.role;

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Malay's application." });
});



// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.get("/api/video", (req,res)=>{
  Video.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

app.post("/api/video", (req, res)=> {
  let video = new Video(req.body);
  video.save()
  .then(game => {
  res.status(200).json({ 'video': ' Added Successfully' });
  })
  .catch(err => {
  res.status(400).send("Something Went Wrong");
  });
  });
  
  app.get("/api/video/deleteVideo/:id",function (req, res) {
    Video.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
    if (err) res.json(err);
    else res.json('video Deleted Successfully');
    });
    });

    app.delete("/api/video/:id",(req, res, next) => {
      Video.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
        }
      })
    })

    // notes api

    app.get("/api/notes", (req,res)=>{
      Note.find((error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
    });

    app.post("/api/notes", (req, res)=> {
      let note = new Note(req.body);
      note.save()
      .then(game => {
      res.status(200).json({ 'Note': ' Added Successfully' });
      })
      .catch(err => {
      res.status(400).send("Something Went Wrong");
      });
      });   
      
      app.delete("/api/notes/:id",(req, res, next) => {
        Note.findByIdAndRemove(req.params.id, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.status(200).json({
              msg: data
            })
          }
        })
      })

//assignment

app.get("/api/assignment", (req,res)=>{
  Assignment.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

app.post("/api/assignment", (req, res)=> {
  let assignment = new Assignment(req.body);
  assignment.save()
  .then(game => {
  res.status(200).json({ 'Assignment': ' Added Successfully' });
  })
  .catch(err => {
  res.status(400).send("Something Went Wrong");
  });
  }); 

  app.delete("/api/assignment/:id",(req, res, next) => {
    Assignment.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  //test Api
  app.get("/api/gettest", (req,res)=>{
    Test.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  });

  app.post("/api/gettest", (req, res)=> {
    let test = new Test(req.body);
    test.save()
    .then(game => {
    res.status(200).json({ 'Question': ' Added Successfully' });
    })
    .catch(err => {
    res.status(400).send("Something Went Wrong");
    });
    });

    app.delete("/api/gettest/:id",(req, res, next) => {
      Test.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
        }
      })
    })
    
  //user manage Api
  app.get("/api/user", (req,res)=>{
    User.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  });

  app.delete("/api/user/:id",(req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  //enquire api
  app.get("/api/enquiry", (req,res)=>{
    Enquire.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  });
  
  app.post("/api/enquiry", (req, res)=> {
    let enquiry = new Enquire(req.body);
    enquiry.save()
    .then(game => {
    res.status(200).json({ 'enquiry': ' Added Successfully' });
    })
    .catch(err => {
    res.status(400).send("Something Went Wrong");
    });
    });

    app.delete("/api/enquiry/:id",(req, res, next) => {
      Enquire.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
        }
      })
    })

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
