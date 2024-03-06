const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Admin = require("../Model/Admin");
const User = require("../Model/User");
const router = express.Router();
const MY_SECRET_KEY = process.env.MYSECRETKEY;

let Success = false;

//bellow are the routes for admins

//   1 route of api/auth/createuser
router.post("/createuser", async (request, response) => {
  // make this post request to get request to display the above 2 lines code
  // console.log("hello from auth backend path")
  // response.send("from auth backend path")

  try {
    if (!request.body.email || !request.body.password || !request.body.name) {
      return response.status(401).json({
        Error: "body not received in createadmin backend",
      });
    }
    let user = await Admin.findOne({ email: request.body.email });
    if (!user) {
      //return response.status(400).json({error: "sorry a user already exist with this email"})
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(request.body.password, salt);

      // user.create also save user in database
      user = await Admin.create({
        name: request.body.name,
        email: request.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = await jwt.sign(data, MY_SECRET_KEY);
      Success = true;
      response.json({ Success, authtoken });
    } else {
      const passwordCompare = await bcrypt.compare(
        request.body.password,
        user.password
      );
      if (!passwordCompare) {
        return response.status({
          message: "try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = await jwt.sign(data, MY_SECRET_KEY);
      Success = true;
      response.json({ message: "login successfully", authtoken });
    }
  } catch (error) {
    console.log("error in api/auth/createuser" + error);
  }
});
// //   2 route of api/auth/login
// router.post("/login", async (request, response) => {
//   const { email, password } = request.body;
//   try {
//     const user = await Admin.findOne({ email: email });
//     if (!user) {
//       return response
//         .status(400)
//         .json({ error: "try to login with correct credential" });
//     }
//     const passwordCompare = await bcrypt.compare(password, user.password);
//     if (!passwordCompare) {
//       return response
//         .status(400)
//         .json({ error: "try to login with correct credential" });
//     }
//     const data = {
//       user: {
//         id: user.id,
//       },
//     };

//     const authtoken = await jwt.sign(data, MY_SECRET_KEY);
//     Success = true;
//     response.send({ Success, authtoken });
//   } catch (error) {
//     console.log("error in api/auth/login" + error);
//   }
// });
//   3 route of api/auth/getallusers
router.get("/getallusers", async (request, response) => {
  try {
    const fnluser = await Admin.find().select("-password").maxTimeMS(30000);
    response.send(fnluser);
  } catch (error) {
    console.log("error in api/auth/getuser" + error);
  }
});

// path 4   http://localhost:7000/api/auth/edituser/_id
router.put("/edituser/:id", async (request, response) => {
  try {
    let { name, email, password } = request.body;
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }
    let newAdmin = {};
    if (name || email || password) {
      newAdmin.name = name;
      newAdmin.email = email;
      newAdmin.password = password;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      request.params.id,
      { $set: newAdmin },
      { new: false }
    );
    if (!updatedAdmin) {
      return response.status(400).json({ error: "error in vehicle updation" });
    } else {
      return response.status(200).json(updatedAdmin);
    }
  } catch (error) {
    console.log("error from backend /api/auth/edituser/_id" + error);
  }
});

// path 5   http://localhost:7000/api/auth/deleteuser/_id
router.post("/deleteuser/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let id = request.params.id;
    let admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return response.status(404).json({ error: "admin not found" });
    } else {
      return response
        .status(200)
        .json({ message: `admin with id ${id} deleted successsfully ` });
    }
  } catch (error) {
    console.log("error from backend /api/auth/deleteadmin/_id" + error);
  }
});

//bellow are the routes for users

//   1 route of api/auth/getusers
router.get("/getusers", async (request, response) => {
  try {
    const fnluser = await User.find().select("-password");
    response.send(fnluser);
  } catch (error) {
    console.log("error in api/auth/getuser" + error);
  }
});

module.exports = router;
