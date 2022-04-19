// Referensi: www.webglfundamentals.org
import { GLUtils } from "./modules/GLUtils.js";
import { load, TempObj } from "./utils/load.js";
import { getFragShader } from "./shaders/fragmentShader.js";
import { getVertShader } from "./shaders/vertexShader.js";
import {saveBlob} from "./utils/screenshot.js";

window.onload = () => {
  let main = () => {
    let canvas = document.querySelector("#glcanvas");
    let fileSelector = document.getElementById("load");

    let temp = TempObj();

    // get number of nodes
    let num_nodes = Object.keys(temp.vertices).length;

    let glUtil = new GLUtils(canvas, getVertShader(), getFragShader());

    // console.log("num nodes", num_nodes);
    setupSliderPart(num_nodes, glUtil);

    fileSelector.addEventListener("change", (ev) => {
      let setObject = (data) => {
        temp = data;
        let num_nodes = Object.keys(temp.vertices).length;
        setupSliderPart(num_nodes, glUtil);
        glUtil.drawModel(temp);
      };

      try {
        const fileName = ev.target.files[0].name;
        if (fileName == "wolf.json"){
          glUtil.setObjectName("Wolf"); 
          document.getElementById("objName").innerHTML = "Wolf Object";
        }else if (fileName == "person.json"){
            glUtil.setObjectName("Human");
            document.getElementById("objName").innerHTML = "Human Object";
        }else if (fileName == "superhero.json"){
            glUtil.setObjectName("Superhero");
            document.getElementById("objName").innerHTML = "Superhero Object";
        }else if (fileName == "platypus.json"){
            glUtil.setObjectName("Platypus");
            document.getElementById("objName").innerHTML = "Platypus Object";
        }
        else{
            glUtilInstance.setObjectName("Unknown");
            document.getElementById("objName").innerHTML = "Unknown Object";
        }
        load(ev.target.files[0], setObject);
      }catch (error) {
        console.log(error);
      }
      
    });

    document.getElementById("animate-btn").onclick = () => {
      glUtil.setAnimationFlag();
    };

    document.getElementById("saveImg-btn").onclick = () => { 
      glUtil.needCapture = true;
    };


    document.getElementById("default-btn").onclick = () => {
      glUtil.setDefaultView();
      defaultViewUI(glUtil);
    };
    let shadingRadio = document.getElementsByName("shade");
    for (let i = 0; i < shadingRadio.length; i++) {
      shadingRadio[i].addEventListener("change", (e) => {
        if (e.target.id == "on") {
          // shadeToggle = true
          glUtil.shadingToggle(true);
        } else {
          glUtil.shadingToggle(false);
        }
      });
    }

    document.getElementById("Eye-X").oninput = () => {
      let newEyeValue = document.getElementById("Eye-X").value;
      glUtil.setEyePosition(newEyeValue, 0);
    };
    document.getElementById("Eye-Y").oninput = () => {
      let newEyeValue = document.getElementById("Eye-Y").value;
      glUtil.setEyePosition(newEyeValue, 1);
    };
    document.getElementById("Eye-Z").oninput = () => {
      let newEyeValue = document.getElementById("Eye-Z").value;
      glUtil.setEyePosition(newEyeValue, 2);
    };

    document.getElementById("Center-X").oninput = () => {
      let newCenterValue = document.getElementById("Center-X").value;
      glUtil.setCenterPosition(newCenterValue, 0);
    };
    document.getElementById("Center-Y").oninput = () => {
      let newCenterValue = document.getElementById("Center-Y").value;
      glUtil.setCenterPosition(newCenterValue, 1);
    };
    document.getElementById("Center-Z").oninput = () => {
      let newCenterValue = document.getElementById("Center-Z").value;
      glUtil.setCenterPosition(newCenterValue, 2);
    };

    document.getElementById("Up-X").oninput = () => {
      let newUpValue = document.getElementById("Up-X").value;
      glUtil.setUpPosition(newUpValue, 0);
    };
    document.getElementById("Up-Y").oninput = () => {
      let newUpValue = document.getElementById("Up-Y").value;
      glUtil.setUpPosition(newUpValue, 1);
    };
    document.getElementById("Up-Z").oninput = () => {
      let newUpValue = document.getElementById("Up-Z").value;
      glUtil.setUpPosition(newUpValue, 2);
    };

    document.getElementById("AngleX").oninput = () => {
      let newAngle = document.getElementById("AngleX").value;
      glUtil.setCameraRadian(newAngle, 0);
    };
    document.getElementById("AngleY").oninput = () => {
      let newAngle = document.getElementById("AngleY").value;
      glUtil.setCameraRadian(newAngle, 1);
    };
    document.getElementById("AngleZ").oninput = () => {
      let newAngle = document.getElementById("AngleZ").value;
      glUtil.setCameraRadian(newAngle, 2);
    };

    document.getElementById("PositionX").oninput = () => {
      let newPosition = document.getElementById("PositionX").value;
      glUtil.setTranslation(newPosition, 0);
    };
    document.getElementById("PositionY").oninput = () => {
      let newPosition = document.getElementById("PositionY").value;
      glUtil.setTranslation(newPosition, 1);
    };
    document.getElementById("PositionZ").oninput = () => {
      let newPosition = document.getElementById("PositionZ").value;
      glUtil.setTranslation(newPosition, 2);
    };

    document.getElementById("ScaleX").oninput = () => {
      let newScale = document.getElementById("ScaleX").value;
      glUtil.setScaling(newScale, 0);
    };
    document.getElementById("ScaleY").oninput = () => {
      let newScale = document.getElementById("ScaleY").value;
      glUtil.setScaling(newScale, 1);
    };
    document.getElementById("ScaleZ").oninput = () => {
      let newScale = document.getElementById("ScaleZ").value;
      glUtil.setScaling(newScale, 2);
    };

    let projectionSelector = document.getElementById("projection-selector");
    projectionSelector.addEventListener("change", (e) => {
      glUtil.setProjectionType(e.target.value);
    });

    let textureSelector = document.getElementById("texture-selector");
    textureSelector.addEventListener("change", (e) => {
      // console.log(e.target.value);
      glUtil.setTextureType(1 * e.target.value);
    });

    //Help button
    let modal = document.getElementById("modal");
    let btn = document.getElementById("help-btn");
    let span = document.getElementsByClassName("close")[0];
    btn.onclick = function () {
      modal.style.display = "block";
    };
    span.onclick = function () {
      modal.style.display = "none";
    };

    // console.log(glUtil);
    glUtil.drawModel(temp);

    let then = 0;
    let render = (now) => {
      now *= 0.001;
      let deltaTime = now - then;
      then = now;
      glUtil.clearScreen();
      for (let i = 0; i < glUtil.num_objects; i++) {
        glUtil.initVertices(i, false);
      }
      glUtil.initTraversal(deltaTime);
      requestAnimationFrame(render);

      if (glUtil.needCapture) {
        glUtil.changeNeedCapture();
        canvas.toBlob((blob) => {
          saveBlob(blob,glUtil.objectName);
        });
      }

    };
    requestAnimationFrame(render);
  };
  main();
};

let defaultViewUI = (glUtil, num_nodes) => {
  document.getElementById("Eye-X").value = 0;
  document.getElementById("Eye-Y").value = 0;
  document.getElementById("Eye-Z").value = 40;

  document.getElementById("Center-X").value = 0;
  document.getElementById("Center-Y").value = 0;
  document.getElementById("Center-Z").value = 0;

  document.getElementById("Up-X").value = 0;
  document.getElementById("Up-Y").value = 1;
  document.getElementById("Up-Z").value = 0;

  document.getElementById("AngleX").value = 0;
  document.getElementById("AngleY").value = 0;
  document.getElementById("AngleZ").value = 0;

  document.getElementById("PositionX").value = 0;
  document.getElementById("PositionY").value = 0;
  document.getElementById("PositionZ").value = 0;

  document.getElementById("ScaleX").value = 1;
  document.getElementById("ScaleY").value = 1;
  document.getElementById("ScaleZ").value = 1;

  setDefaultValue(num_nodes);

  document.getElementById("projection-selector").value = 2;
  glUtil.setProjectionType(2);
  document.getElementById("texture-selector").value = 0;
  glUtil.setTextureType(0);
  let shadingRadio = document.getElementsByName("shade");
  // console.log(shadingRadio);
  for (let i = 0; i < shadingRadio.length; i++) {
    if (shadingRadio[i].id == "off") {
      shadingRadio[i].checked = true;
      break;
    }
  }
  glUtil.shadingToggle(false);
};

// create dynamic table
let createTableOptControl = (num_vertices, glUtil) => {
  let optControl = document.getElementById("option-control");

  while (optControl.firstChild) {
    optControl.removeChild(optControl.firstChild);
  }

  let text = document.createElement("h2");
  text.innerHTML = "Model Movement Control";

  optControl.appendChild(text);

  let row = Math.floor(num_vertices / 3);
  let residu = num_vertices % 3;

  if (residu != 0) {
    row += 1;
  }

  let optControlTable = document.createElement("table");
  optControlTable.setAttribute("id", "opt-control-table");
  for (let i = 0; i < row; i++) {
    let optControlRow = document.createElement("tr");

    let column = 6;
    if (i == row - 1 && residu != 0) {
      column = residu * 2;
    }

    // console.log(column);

    for (let j = 0; j < column; j++) {
      if (j % 2 == 0) {
        let optControlCell = document.createElement("td");
        let col = Math.floor(j / 2) + 1;
        let text = "Part " + (3 * i + col);
        optControlCell.innerHTML = text;
        optControlRow.appendChild(optControlCell);
        optControlTable.appendChild(optControlRow);
      } else {
        let optControlCell = document.createElement("td");

        let col = Math.floor(j / 2) + 1;
        let num_id = 3 * i + col;
        let id = "part-" + num_id;
        // console.log(id);

        let slider = document.createElement("input");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "0");
        slider.setAttribute("max", "1");
        slider.setAttribute("value", "0");
        slider.setAttribute("id", id);
        slider.setAttribute("class", "slider");
        slider.setAttribute("step", "0.01");

        optControlCell.appendChild(slider);
        optControlRow.appendChild(optControlCell);
        optControlTable.appendChild(optControlRow);
      }
    }
  }

  // console.log(optControlTable);
  optControl.appendChild(optControlTable);
};

// add oninput event listener to all slider
let addOninputEventListener = (glUtil, num_nodes) => {
  for (let i = 0; i < num_nodes; i++) {
    let id = "part-" + (i + 1);
    let slider = document.getElementById(id);
    slider.addEventListener("input", () => {
      glUtil.setArticulatedAngle(slider.value, i);
    });
  }
};

// set default value of slider
let setDefaultValue = (num_nodes) => {
  for (let i = 0; i < num_nodes; i++) {
    let id = "part-" + (i + 1);
    let slider = document.getElementById(id);
    slider.value = 0;
  }
};

// setup slider
let setupSliderPart = (num_nodes, glUtil) => {
  createTableOptControl(num_nodes, glUtil);
  addOninputEventListener(glUtil, num_nodes);
};
