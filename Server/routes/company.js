const express = require("express");

const router = express.Router();

const {createCompany} = require("../controllers/companies/createCompany");
const {getCompany, getCompanyById} = require("../controllers/companies/getCompany");
const {updateCompany} = require("../controllers/companies/updateCompany");
const {deleteCompany} = require("../controllers/companies/deleteCompany");

router.post("/createCompany", createCompany);
router.get("/getCompany", getCompany);
router.get("/getCompany/:id", getCompanyById);
router.put("/updateCompany/:id", updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);

module.exports = router;