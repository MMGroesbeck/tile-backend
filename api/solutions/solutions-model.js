const db = require("../data/dbConfig");

module.exports = {
  findAll,
  findThis,
  add,
  checkSolution
};

function findAll() {
  return db("solutions");
}

function findThis(solution) {
  return db("solutions").where({ solution: solution });
}

async function add(solution) {
  const [id] = await db("solutions").insert(solution, "id");
  return findBy({ id });
}

function checkSolution(solution) {
  const solArr = solution.split("");
  if (solArr.length !== 16) {
    return false;
  }

  const hasTop = [1, 3, 5, 7, 9, "b", "d", "f"];
  const hasRight = [2, 3, 6, 7, "a", "b", "e", "f"];
  const hasBottom = [4, 5, 6, 7, "c", "d", "e", "f"];
  const hasLeft = [8, 9, "a", "b", "c", "d", "e", "f"];

  for (let i = 0; i < 16; i++) {
    //check top connection
    if (i < 4) {
      //if tile is in top row
      if (hasTop.includes(solArr[i])) {
        return false;
      }
    } else {
      //otherwise compare to bottom of tile above
      if (!hasTop.includes(solArr[i] === hasBottom.includes(solArr[i - 4]))) {
        return false;
      }
    }
    //check right connection
    if ((i + 1) % 4 === 0) {
      //if tile is in right column
      if (hasRight.includes(solArr[i])) {
        return false;
      }
    } else {
      //otherwise compare to left of next tile
      if (!(hasRight.includes(solArr[i]) === hasLeft.includes(solArr[i + 1]))) {
        return false;
      }
    }
    //check bottom connection
    if (i > 11) {
      //if tile is in bottom row
      if (hasBottom.includes(solArr[i])) {
        return false;
      }
    } else {
      //otherwise compare to top of tile below
      if (!hasBottom.includes(solArr[i] === hasTop.includes(solArr[i + 4]))) {
        return false;
      }
    }
    //check left connection
    if (i % 4 === 0) {
      //if tile is in left column
      if (hasLeft.includes(solArr[i])) {
        return false;
      }
    } else {
      //otherwise compare to right of previous tile
      if (!(hasLeft.includes(solArr[i]) === hasRight.includes(solArr[i - 1]))) {
        return false;
      }
    }
  }
}
