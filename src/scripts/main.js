// Referensi: WebGL Fundamentals www.webglfundamentals.org
import { GLUtils } from "./modules/GLUtils.js";
import { load, TempObj } from "./utils/load.js";
import { getFragShader } from "./shaders/fragmentShader.js";
import { getVertShader } from "./shaders/vertexShader.js";
window.onload = function () {
  function main() {
    const canvas = document.querySelector("#glcanvas");
    const fileSelector = document.getElementById("load");

    var temp = TempObj();
    // console.log("Jalan");
    const glUtil = new GLUtils(canvas, getVertShader(), getFragShader());

    fileSelector.addEventListener("change", (ev) => {
      var setObject = (data) => {
        temp = data;

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
    document.getElementById("ButtonShading").onclick = () => {
      glUtil.turnOnShading();
      if (glUtil.shadingState) {
        document.getElementById("Shading-info").innerHTML = "ON";
      } else {
        document.getElementById("Shading-info").innerHTML = "OFF";
      }
    };

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

    document.getElementById("ButtonProjection-1").onclick = () => {
      glUtil.setProjectionType(0);
      document.getElementById("Projection-info").innerHTML = "Orthographic";
    };
    document.getElementById("ButtonProjection-2").onclick = () => {
      glUtil.setProjectionType(1);
      document.getElementById("Projection-info").innerHTML = "Oblique";
    };
    document.getElementById("ButtonProjection-3").onclick = () => {
      glUtil.setProjectionType(2);
      document.getElementById("Projection-info").innerHTML = "Perspective";
    };

    document.getElementById("ButtonTexture-1").onclick = () => {
      glUtil.setTextureType(0);
      document.getElementById("Texture-info").innerHTML = "Image";
    };
    document.getElementById("ButtonTexture-2").onclick = () => {
      glUtil.setTextureType(1);
      document.getElementById("Texture-info").innerHTML = "Environment";
    };
    document.getElementById("ButtonTexture-3").onclick = () => {
      glUtil.setTextureType(2);
      document.getElementById("Texture-info").innerHTML = "Bump";
    };

    document.getElementById("part-1").oninput = () => {
      const newAngle = document.getElementById("part-1").value;
      glUtil.setArticulatedAngle(newAngle, 0);
    };
    document.getElementById("part-2").oninput = () => {
      const newAngle = document.getElementById("part-2").value;
      glUtil.setArticulatedAngle(newAngle, 1);
    };
    document.getElementById("part-3").oninput = () => {
      const newAngle = document.getElementById("part-3").value;
      glUtil.setArticulatedAngle(newAngle, 2);
    };
    document.getElementById("part-4").oninput = () => {
      const newAngle = document.getElementById("part-4").value;
      glUtil.setArticulatedAngle(newAngle, 3);
    };
    document.getElementById("part-5").oninput = () => {
      const newAngle = document.getElementById("part-5").value;
      glUtil.setArticulatedAngle(newAngle, 4);
    };
    document.getElementById("part-6").oninput = () => {
      const newAngle = document.getElementById("part-6").value;
      glUtil.setArticulatedAngle(newAngle, 5);
    };
    document.getElementById("part-7").oninput = () => {
      const newAngle = document.getElementById("part-7").value;
      glUtil.setArticulatedAngle(newAngle, 6);
    };
    document.getElementById("part-8").oninput = () => {
      const newAngle = document.getElementById("part-8").value;
      glUtil.setArticulatedAngle(newAngle, 7);
    };
    document.getElementById("part-9").oninput = () => {
      const newAngle = document.getElementById("part-9").value;
      glUtil.setArticulatedAngle(newAngle, 8);
    };
    document.getElementById("part-10").oninput = () => {
      const newAngle = document.getElementById("part-10").value;
      glUtil.setArticulatedAngle(newAngle, 9);
    };
    document.getElementById("part-11").oninput = () => {
      const newAngle = document.getElementById("part-11").value;
      glUtil.setArticulatedAngle(newAngle, 10);
    };
    document.getElementById("part-12").oninput = () => {
      const newAngle = document.getElementById("part-12").value;
      glUtil.setArticulatedAngle(newAngle, 11);
    };
    document.getElementById("part-13").oninput = () => {
      const newAngle = document.getElementById("part-13").value;
      glUtil.setArticulatedAngle(newAngle, 12);
    };
    document.getElementById("part-14").oninput = () => {
      const newAngle = document.getElementById("part-14").value;
      glUtil.setArticulatedAngle(newAngle, 13);
    };
    document.getElementById("part-15").oninput = () => {
      const newAngle = document.getElementById("part-15").value;
      glUtil.setArticulatedAngle(newAngle, 14);
    };
    document.getElementById("part-16").oninput = () => {
      const newAngle = document.getElementById("part-16").value;
      glUtil.setArticulatedAngle(newAngle, 15);
    };
    document.getElementById("part-17").oninput = () => {
      const newAngle = document.getElementById("part-17").value;
      glUtil.setArticulatedAngle(newAngle, 16);
    };
    document.getElementById("part-18").oninput = () => {
      const newAngle = document.getElementById("part-18").value;
      glUtil.setArticulatedAngle(newAngle, 17);
    };
    // console.log(glUtil);
    glUtil.drawModel(temp);

    let then = 0;
    function render(now) {
      now *= 0.001;
      const deltaTime = now - then;
      then = now;
      glUtil.clearScreen();
      for (let i = 0; i < glUtil.num_objects; i++) {
        glUtil.initNodes(i, false);
      }
      glUtil.initTraversal(deltaTime);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
  main();
};

let defaultViewUI = (glUtil) => {
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

  document.getElementById("Projection-info").innerHTML = "Perspective";
  glUtil.setProjectionType(2);
  document.getElementById("Texture-info").innerHTML = "Image";
  glUtil.setTextureType(1);
  document.getElementById("Shading-info").innerHTML = "OFF";
  glUtil.turnOnShading();

  document.getElementById("part-1").value = 0;
  document.getElementById("part-2").value = 0;
  document.getElementById("part-3").value = 0;
  document.getElementById("part-4").value = 0;
  document.getElementById("part-5").value = 0;
  document.getElementById("part-6").value = 0;
  document.getElementById("part-7").value = 0;
  document.getElementById("part-8").value = 0;
  document.getElementById("part-9").value = 0;
  document.getElementById("part-10").value = 0;
  document.getElementById("part-11").value = 0;
  document.getElementById("part-12").value = 0;
  document.getElementById("part-13").value = 0;
  document.getElementById("part-14").value = 0;
  document.getElementById("part-15").value = 0;
  document.getElementById("part-16").value = 0;
  document.getElementById("part-17").value = 0;
  document.getElementById("part-18").value = 0;
};
