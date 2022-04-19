// Referensi: www.webglfundamentals.org
import { GLUtils } from "./modules/GLUtils.js";
import { load, TempObj } from "./utils/load.js";
import { getFragShader } from "./shaders/fragmentShader.js";
import { getVertShader } from "./shaders/vertexShader.js";
window.onload = () => {
  let main = () => {
    const canvas = document.querySelector("#glcanvas");
    const fileSelector = document.getElementById("load");

    var temp = TempObj();

    var num_nodes = Object.keys(temp.vertices).length;

    const glUtil = new GLUtils(canvas, getVertShader(), getFragShader());
   

    console.log("num nodes", num_nodes);
    setupSliderPart(num_nodes,glUtil);
  

    fileSelector.addEventListener("change", (ev) => {
      var setObject = (data) => {
        temp = data;
        var num_nodes = Object.keys(temp.vertices).length;
        setupSliderPart(num_nodes,glUtil);
        glUtil.drawModel(temp);
      };
      load(ev.target.files[0], setObject);
    });

    document.getElementById("animate-btn").onclick = () => {
      glUtil.setAnimationFlag();
    };

    document.getElementById("default-btn").onclick = () => {
      glUtil.setDefaultView();
      defaultViewUI(glUtil);
    };
    const shadingRadio = document.getElementsByName("shade");
    for (var i = 0; i < shadingRadio.length; i++) {
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
      const newEyeValue = document.getElementById("Eye-X").value;
      glUtil.setEyePosition(newEyeValue, 0);
    };
    document.getElementById("Eye-Y").oninput = () => {
      const newEyeValue = document.getElementById("Eye-Y").value;
      glUtil.setEyePosition(newEyeValue, 1);
    };
    document.getElementById("Eye-Z").oninput = () => {
      const newEyeValue = document.getElementById("Eye-Z").value;
      glUtil.setEyePosition(newEyeValue, 2);
    };

    document.getElementById("Center-X").oninput = () => {
      const newCenterValue = document.getElementById("Center-X").value;
      glUtil.setCenterPosition(newCenterValue, 0);
    };
    document.getElementById("Center-Y").oninput = () => {
      const newCenterValue = document.getElementById("Center-Y").value;
      glUtil.setCenterPosition(newCenterValue, 1);
    };
    document.getElementById("Center-Z").oninput = () => {
      const newCenterValue = document.getElementById("Center-Z").value;
      glUtil.setCenterPosition(newCenterValue, 2);
    };

    document.getElementById("Up-X").oninput = () => {
      const newUpValue = document.getElementById("Up-X").value;
      glUtil.setUpPosition(newUpValue, 0);
    };
    document.getElementById("Up-Y").oninput = () => {
      const newUpValue = document.getElementById("Up-Y").value;
      glUtil.setUpPosition(newUpValue, 1);
    };
    document.getElementById("Up-Z").oninput = () => {
      const newUpValue = document.getElementById("Up-Z").value;
      glUtil.setUpPosition(newUpValue, 2);
    };

    document.getElementById("AngleX").oninput = () => {
      const newAngle = document.getElementById("AngleX").value;
      glUtil.setCameraRadian(newAngle, 0);
    };
    document.getElementById("AngleY").oninput = () => {
      const newAngle = document.getElementById("AngleY").value;
      glUtil.setCameraRadian(newAngle, 1);
    };
    document.getElementById("AngleZ").oninput = () => {
      const newAngle = document.getElementById("AngleZ").value;
      glUtil.setCameraRadian(newAngle, 2);
    };

    document.getElementById("PositionX").oninput = () => {
      const newPosition = document.getElementById("PositionX").value;
      glUtil.setTranslation(newPosition, 0);
    };
    document.getElementById("PositionY").oninput = () => {
      const newPosition = document.getElementById("PositionY").value;
      glUtil.setTranslation(newPosition, 1);
    };
    document.getElementById("PositionZ").oninput = () => {
      const newPosition = document.getElementById("PositionZ").value;
      glUtil.setTranslation(newPosition, 2);
    };

    document.getElementById("ScaleX").oninput = () => {
      const newScale = document.getElementById("ScaleX").value;
      glUtil.setScaling(newScale, 0);
    };
    document.getElementById("ScaleY").oninput = () => {
      const newScale = document.getElementById("ScaleY").value;
      glUtil.setScaling(newScale, 1);
    };
    document.getElementById("ScaleZ").oninput = () => {
      const newScale = document.getElementById("ScaleZ").value;
      glUtil.setScaling(newScale, 2);
    };

    const projectionSelector = document.getElementById("projection-selector");
    projectionSelector.addEventListener("change", (e) => {
      glUtil.setProjectionType(e.target.value);
    });

    const textureSelector = document.getElementById("texture-selector");
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
      const deltaTime = now - then;
      then = now;
      glUtil.clearScreen();
      for (let i = 0; i < glUtil.num_objects; i++) {
        glUtil.initVertices(i, false);
      }
      glUtil.initTraversal(deltaTime);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };
  main();
};

let defaultViewUI = (glUtil,num_nodes) => {
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
  const shadingRadio = document.getElementsByName("shade");
  console.log(shadingRadio);
  for (let i = 0; i < shadingRadio.length; i++) {
    if (shadingRadio[i].id == "off") {
      shadingRadio[i].checked = true;
      break;
    }
  }
  glUtil.shadingToggle(false);

  
};

// create dynamic table
const createTableOptControl = (num_vertices,glUtil) => {
  const optControl = document.getElementById("option-control");

  while (optControl.firstChild){
    optControl.removeChild(optControl.firstChild)
  }

  let row = Math.floor(num_vertices/3);
  let residu = num_vertices % 3;

  if (residu != 0){
    row += 1;
  }
  
  let optControlTable = document.createElement('table');
  optControlTable.setAttribute('id', 'opt-control-table');
  for (let i = 0; i < row; i++) {
    let optControlRow = document.createElement('tr');
    
    var column = 6;
    if (i == row-1 && residu != 0) {
        column = residu*2;
    }

    console.log(column);

    for (let j = 0; j < column; j++) {

      if (j % 2 == 0){
        let optControlCell = document.createElement('td');
        let col = Math.floor(j/2) + 1;
        let text = 'part ' + (3*i + col);
        optControlCell.innerHTML = text;
        optControlRow.appendChild(optControlCell);
        optControlTable.appendChild(optControlRow);
      }else{
        let optControlCell = document.createElement('td');

        let col = Math.floor(j/2) + 1;
        let num_id = 3*i + col;
        let id = 'part-' + num_id;
        console.log(id);

        let slider = document.createElement('input');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '0');
        slider.setAttribute('max', '1');
        slider.setAttribute('value', '0');
        slider.setAttribute('id', id);
        slider.setAttribute('class', 'slider');
        slider.setAttribute('step', '0.01');
      
        optControlCell.appendChild(slider);
        optControlRow.appendChild(optControlCell);
        optControlTable.appendChild(optControlRow);
      }
    }
  }

  console.log(optControlTable);
  optControl.appendChild(optControlTable);
};

// add oninput event listener to all slider
const addOninputEventListener = (glUtil,num_nodes) => {

  for (let i = 0; i < num_nodes; i++) {
    let id = 'part-' + (i+1);
    let slider = document.getElementById(id);
    slider.addEventListener('input', () => {
      glUtil.setArticulatedAngle(slider.value,i);
    });
  }
}

// set default value of slider
const setDefaultValue = (num_nodes) => {
  for (let i = 0; i < num_nodes; i++) {
    let id = 'part-' + (i+1);
    let slider = document.getElementById(id);
    slider.value = 0;
  }
}

// setup slider
const setupSliderPart = (num_nodes,glUtil) => {
  createTableOptControl(num_nodes,glUtil);
  addOninputEventListener(glUtil,num_nodes);
}




