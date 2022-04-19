let infile = "wolf.obj";
let outfile = "wolf.json";

let FileSystem = require("fs");
const COLOR = [1.0, 1.0, 0.0, 1.0];

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

function main() {
  let nPoint = 0;
  let points = [];
  let nEdge = 0;
  let edge = [];

  let nFace = 0;
  let topologi = [];
  let color = [];
  let prevChar = "";

  let allFileContents = FileSystem.readFileSync(infile, "utf-8");
  allFileContents.split(/\r?\n/).forEach((line) => {
    let currentChars = line.slice(0, 2);
    if (currentChars == "v ") {
      points.push(line.split(" ").slice(1).map(Number));
      nPoint++;
    } else if (currentChars == "f ") {
      topologi.push(
        replaceAll(line, /\/[0-9]+/, "")
          .split(" ")
          .slice(1)
          .map(Number)
          .map((num) => num - 1)
      );
      nFace++;
    }

    if (prevChar == "f " && currentChars != "f ") {
      for (let i = 0; i < nFace; i++) {
        color.push(COLOR);
      }
      edge.push({
        num_face: nFace,
        topology: topologi,
      });
      nEdge++;
      nFace = 0;
      topologi = [];
      color = [];
    }
    prevChar = currentChars;
  });

  let jsonObj = {
    num_pts: nPoint,
    pts: points,
    num_edge: nEdge,
    edge: edge,
  };

  FileSystem.writeFile(outfile, JSON.stringify(jsonObj), (error) => {
    if (error) throw error;
  });
}

main();
