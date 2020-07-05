const router = require("express").Router();

const authenticator = require("../authenticator.js");

const Solutions = require("./solutions-model");

router.get("/all", (req, res) => {
    Solutions.findAll()
        .then((allSolutions) => {
            res.status(200).json({ solutions: allSolutions });
        });
});

router.post("/:id", authenticator, (req, res) => {
    
})