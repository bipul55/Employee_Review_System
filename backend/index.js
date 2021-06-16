const { query } = require("express");
const express = require("express");
const mysql = require("mysql");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

// multer config
var multer = require("multer");
// set the sotrage path and file name
const storage = multer.diskStorage({
  destination: "./assets",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});
// function to upload the file
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000000 },
}).single("profilePic");

// Create connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project_one",
});

app.use(express.json());
// app.use(bodyParser.json({ type: "*", limit: "500mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect
db.connect((err) => {
  if (err) {
    console.log("Error" + err);
  } else {
    console.log("Mysql connected");
  }
});

// API's
// app.get("/createTable", (req, res) => {
//   const qeury =
//     "CREATE TABLE assigned_reviews(id int AUTO_INCREMENT,for_user varchar(255),by_user varchar(255), PRIMARY KEY(id))";
//   db.query(qeury, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       console.log("Table created");
//       res.send("table createdd");
//     }
//   });
// });

// app.get("/insert", (req, res) => {
//   const qeury =
//     "INSERT INTO assigned_reviews(for_user,by_user) VALUES ('umid', 'admin');";
//   db.query(qeury, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       console.log("Admin created");
//       res.send("Admin created");
//     }
//   });
// });

// to login
app.post("/login", (req, res) => {
  const qeury = `SELECT * FROM employees WHERE email ='${req.body.email}' AND password='${req.body.password}'`;
  db.query(qeury, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.length == 0) {
        res.json({ fail: true });
      } else {
        const accessToken = jwt.sign(
          {
            name: result[0].name,
            email: result[0].email,
            password: result[0].password,
            isEmployee: result[0].isEmployee,
          },
          process.env.TOKEN_SECRET
        );
        res.json({ accessToken: accessToken });
      }
    }
  });
});
// get the assigned reviews of the user
app.post("/get_assigned_reviews_task", (req, res) => {
  const query = `SELECT * FROM assigned_reviews WHERE by_user ='${req.body.email}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});
// to give review of any employee
app.post("/post_review", (req, res) => {
  const query1 = `DELETE FROM assigned_reviews WHERE id = ${req.body.id};`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const query2 = `INSERT INTO reviews(for_user,by_user,description) VALUES ('${req.body.for_user}','${req.body.by_user}','${req.body.description}');`;
      db.query(query2, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result, "success");
          res.json({ success: true });
        }
      });
    }
  });
});
// get all the employees
app.get("/get-all-employees", (req, res) => {
  const query1 = `SELECT * FROM employees WHERE isEmployee=1`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});
// delete the employees
app.post("/delete-employee", (req, res) => {
  const query1 = `DELETE FROM employees WHERE id = ${req.body.id};`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json({ success: true, message: "Employee Deleted Successfully" });
    }
  });
});
// add the employees
app.post("/add-employee", (req, res) => {
  upload(req, res, async (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    if (req.file) {
      const query1 = ` INSERT INTO employees(name,email,password,isEmployee,profilePic) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}',1,'${req.file.filename}');`;
      db.query(query1, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.json({ success: true, message: "Employee Added Successfully" });
        }
      });
    } else {
      const query1 = ` INSERT INTO employees(name,email,password,isEmployee) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}',1);`;
      db.query(query1, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.json({ success: true, message: "Employee Added Successfully" });
        }
      });
    }
  });
});
// add the employees
app.post("/update-employee", (req, res) => {
  upload(req, res, async (err) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    if (req.file) {
      const query1 = `UPDATE employees SET name='${req.body.name}',profilePic='${req.file.filename}',email='${req.body.email}',password= '${req.body.password}'WHERE id=${req.body.id};`;
      db.query(query1, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.json({ success: true, message: "Employee Updated Successfully" });
        }
      });
    } else {
      console.log("here");
      const query1 = `UPDATE employees SET name='${req.body.name}',email='${req.body.email}',password= '${req.body.password}'WHERE id=${req.body.id};`;
      db.query(query1, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.json({ success: true, message: "Employee Updated Successfully" });
        }
      });
    }
  });
});

// add Review Assignment
app.post("/add-review", (req, res) => {
  console.log(req.body, "here");
  const query1 = `INSERT INTO assigned_reviews(for_user,by_user) VALUES('${req.body.for_user}', '${req.body.by_user}');`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result, "result");
      res.json({ success: true, message: "Review Added !!!" });
    }
  });
});
// get all the reviews
app.get("/get-all-reviews", (req, res) => {
  const query1 = `SELECT * FROM  reviews`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});
// delete the review
app.post("/delete-review", (req, res) => {
  const query1 = `DELETE FROM reviews WHERE id = ${req.body.id};`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json({ success: true, message: "Review Deleted Successfully" });
    }
  });
});
// delete the review
app.post("/update-review", (req, res) => {
  const query1 = `UPDATE reviews SET description='${req.body.description}' WHERE id=${req.body.id};`;
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json({ success: true, message: "Review Updated !!!" });
    }
  });
});
// get image
app.get("/get-image/:name", (req, res) => {
  const Name = req.params.name;

  if (Name == "null") {
    res.sendFile(path.join(__dirname, "/assets", "user.png"));
  } else {
    res.sendFile(path.join(__dirname, "/assets", Name));
  }
});
app.listen("9000", () => {
  console.log("backend server started ");
});
