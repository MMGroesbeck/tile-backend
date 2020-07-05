const router = require("express").Router();

const authenticator = require("../authenticator.js");

const Solutions = require("./solutions-model");

router.get("/all", (req, res) => {
    Solutions.findAll()
        .then((allSolutions) => {
            res.status(200).json({ solutions: allSolutions });
        });
});

router.post("/:solution", authenticator, (req, res) => {
    const thisSolution = req.params.solution;
    const validity = Solutions.checkSolution(thisSolution);
    if (!validity) {
        res.status(200).json({ message: "Invalid solution." });
    } else {
        Solutions.findThis(thisSolution)
            .then((prev) => {
                if(prev){
                    res.status(200).json({
                        message: "Solution already found.",
                        solution: prev
                    });
                } else {
                    if (req.decodedToken){
                        Solutions.add(thisSolution)
                        .then((sol) => {
                            res.status(200).json({
                                message: "New solution saved.",
                                solution: sol
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({ errorMessage: error.message });
                        });
                    } else {
                        res.status(200).json({
                            message: "Valid solution; log in to save."
                        });
                    }
                }
            })
            .catch((error) => {
                res.status(500).json({ errorMessage: error.message });
            });
    }
})