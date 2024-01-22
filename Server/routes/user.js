const express = require("express");

const router = express.Router();

const {createUser} = require("../controllers/users/createUser");
const {getUsers , getUserById} = require("../controllers/users/getUser");
const {updateUser} = require("../controllers/users/updateUser");
const {deleteUser} = require("../controllers/users/deleteUser");


router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;