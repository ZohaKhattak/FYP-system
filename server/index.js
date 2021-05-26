
const mysql = require('mysql');
const express = require("express");
const upload = require("express-fileupload");
const cors = require('cors');

const bodyParser = require('body-parser');
const session = require("express-session");
const { response } = require("express");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(upload());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}));

app.use(upload());


//database Connection
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    database: "fypdb",
});


     
db.connect((err) => {
    if(err){
        throw err;
    } else{console.log("Connected");

    }
});



//Reading data from test table
app.get("/api/get", (req,res)=> {
    const sqlSelect = 
    "SELECT * FROM test";
    db.query(sqlSelect, (err,result) => {
        res.send(result);

});
});

//Reading data from project table (Assignment Page)
app.get("/api/view_list", (req,res)=> {
    const sqlSelect = 
    "SELECT * FROM project";
    db.query(sqlSelect, (err,result) => {
        res.send(result);

});
});

//Reading data from Announcement table (Info Page)
app.get("/api/info", (req,res)=> {
    const sqlSelect = 
    "SELECT * FROM announcements ORDER BY Announcements_id DESC";
    db.query(sqlSelect, (err,result) => {
        res.send(result);

});
});

//Inserting data into test table
app.post("/api/insert", (req, res)=> {

    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = 
    "INSERT INTO test (value2, value3) VALUES (?,?);";
    db.query(sqlInsert, [email,password], (err,result) => {
        console.log(result);
});
});

//Inserting data into user table (Register User)
app.post("/api/register", (req, res)=> {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if(err) {
            console.log(err);
        }

        const sqlInsert = 
        "INSERT INTO admin_user (name, email, password) VALUES (?,?,?);";
        db.query(sqlInsert, [name,email,hash], (err,result) => {
            console.log(err);
    });
 })   
});
//

//Login API with hash function for password
app.post('/api/login', (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM admin_user WHERE email = ?;",
         email, (err,result) => {
             
            if(err) {
                 res.send({ err: errr}); } 
            
            if (result.length > 0) {
               bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {

                    const admin_id = result[0].admin_id;
                    const token = jwt.sign({admin_id}, "jwtSecret", {
                        expiresIn: 300,

                    });

                    req.session.user = result;
                    console.log(req.session.user);
                    //res.send(result);
                    res.json({auth: true, token: token, result: result, name: name});

                  } else {
                    res.json({auth: false, message: "Wrong email or password!"});

                   // res.send({ message: "Wrong username/password combination!" });
                  }
                });
              } else {
                //res.send({ message: "User doesn't exist" });
                res.json({auth: false, message: "No user exists!"});

              }
            }
          );
        });

//Middleware verifyJWT
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        res.send("We need a token, please give it next time!");
    } else {
        jwt.verify(token, "jwtSecret", (err,decoded) => {
            if (err) {
                res.json({auth: false, message: "You failed to authenticate!" });
            } else {
                req.userId = decoded.admin_id;
                next();
            }
        });
    }
};


//User Authentication API
app.get('/isUserAuth', verifyJWT, (req,res)=> {
    res.send("You are authenticated!");
});



//Cookie Session
app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });



//Inserting data into project table 
app.post("/api/insert_project", (req, res)=> {

    const title = req.body.title;
    const internal = req.body.internal;
    const external = req.body.external;


    const sqlInsert = 
    "INSERT INTO project (Title, Internal, External) VALUES (?,?,?);";
    db.query(sqlInsert, [title,internal,external], (err,result) => {
        console.log(err);
});
});

//Inserting data into Announcement table (Add an announcement)
app.post("/api/announcement", (req, res)=> {

    const activity = req.body.activity;
    const tentativeDate = req.body.tentativeDate;
    const responsibility = req.body.responsibility;
    const deliverables = req.body.deliverables;



    const sqlInsert = 
    "INSERT INTO announcements (Activity, Tentative_date, Responsibility, Deliverables) VALUES (?,?,?,?);";
    db.query(sqlInsert, [activity,tentativeDate,responsibility,deliverables], (err,result) => {
        console.log(err);
});
});

//Deleting data from project table
app.delete("/api/delete:project_id", (req, res)=> {

    const project_id = req.params.project_id;
    const SqlDelete = 
        "DELETE FROM project WHERE Project_id = ?";
        db.query(SqlDelete, project_id, (err,result)=> {
           if (err) {
               console.log(err);
            } else {
                res.send(result);
            }
        });
});

//Updating data in project table
app.put("/api/update", (req, res)=> {

    const title = req.body.Title;
    const project_id = req.body.Project_id;

    const SqlUpdate = 
        "UPDATE SET project Title = ? WHERE Project_id = ?";
        db.query(SqlUpdate, [title, project_id], (err,result)=> {
           if (err) console.log(err);
        });
});



app.listen(3001, () => {
    console.log("running on port 3001");
});
