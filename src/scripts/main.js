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

    document.getElementById("ButtonAnimate").onclick = function () {
      glUtil.setAnimationFlag();
    };

    document.getElementById("ButtonX").onclick = function () {
      glUtil.setAxis(0);
    };
    document.getElementById("ButtonY").onclick = function () {
      glUtil.setAxis(1);
    };
    document.getElementById("ButtonZ").onclick = function () {
      glUtil.setAxis(2);
    };
    document.getElementById("ButtonT").onclick = function () {
      glUtil.setFlag();
    };

    document.getElementById("ButtonDefault").onclick = function () {
      glUtil.setDefaultView();
      defaultViewUI();
    };
    document.getElementById("ButtonShading").onclick = function () {
      glUtil.turnOnShading();
      if (glUtil.shadingState) {
        document.getElementById("Shading-info").innerHTML = "ON";
      } else {
        document.getElementById("Shading-info").innerHTML = "OFF";
      }
    };

    document.getElementById("Eye-X").oninput = function () {
      const newEyeValue = document.getElementById("Eye-X").value;
      document.getElementById("Eye-X-info").innerHTML = newEyeValue;
      glUtil.setEyePosition(newEyeValue, 0);
    };
    document.getElementById("Eye-Y").oninput = function () {
      const newEyeValue = document.getElementById("Eye-Y").value;
      document.getElementById("Eye-Y-info").innerHTML = newEyeValue;
      glUtil.setEyePosition(newEyeValue, 1);
    };
    document.getElementById("Eye-Z").oninput = function () {
      const newEyeValue = document.getElementById("Eye-Z").value;
      document.getElementById("Eye-Z-info").innerHTML = newEyeValue;
      glUtil.setEyePosition(newEyeValue, 2);
    };

    document.getElementById("Center-X").oninput = function () {
      const newCenterValue = document.getElementById("Center-X").value;
      document.getElementById("Center-X-info").innerHTML = newCenterValue;
      glUtil.setCenterPosition(newCenterValue, 0);
    };
    document.getElementById("Center-Y").oninput = function () {
      const newCenterValue = document.getElementById("Center-Y").value;
      document.getElementById("Center-Y-info").innerHTML = newCenterValue;
      glUtil.setCenterPosition(newCenterValue, 1);
    };
    document.getElementById("Center-Z").oninput = function () {
      const newCenterValue = document.getElementById("Center-Z").value;
      document.getElementById("Center-Z-info").innerHTML = newCenterValue;
      glUtil.setCenterPosition(newCenterValue, 2);
    };

    document.getElementById("Up-X").oninput = function () {
      const newUpValue = document.getElementById("Up-X").value;
      document.getElementById("Up-X-info").innerHTML = newUpValue;
      glUtil.setUpPosition(newUpValue, 0);
    };
    document.getElementById("Up-Y").oninput = function () {
      const newUpValue = document.getElementById("Up-Y").value;
      document.getElementById("Up-Y-info").innerHTML = newUpValue;
      glUtil.setUpPosition(newUpValue, 1);
    };
    document.getElementById("Up-Z").oninput = function () {
      const newUpValue = document.getElementById("Up-Z").value;
      document.getElementById("Up-Z-info").innerHTML = newUpValue;
      glUtil.setUpPosition(newUpValue, 2);
    };

    document.getElementById("AngleX").oninput = function () {
      const newAngle = document.getElementById("AngleX").value;
      document.getElementById("AngleX-info").innerHTML = newAngle;
      glUtil.setCameraRadian(newAngle, 0);
    };
    document.getElementById("AngleY").oninput = function () {
      const newAngle = document.getElementById("AngleY").value;
      document.getElementById("AngleY-info").innerHTML = newAngle;
      glUtil.setCameraRadian(newAngle, 1);
    };
    document.getElementById("AngleZ").oninput = function () {
      const newAngle = document.getElementById("AngleZ").value;
      document.getElementById("AngleZ-info").innerHTML = newAngle;
      glUtil.setCameraRadian(newAngle, 2);
    };

    document.getElementById("PositionX").oninput = function () {
      const newPosition = document.getElementById("PositionX").value;
      document.getElementById("PositionX-info").innerHTML = newPosition;
      glUtil.setTranslation(newPosition, 0);
    };
    document.getElementById("PositionY").oninput = function () {
      const newPosition = document.getElementById("PositionY").value;
      document.getElementById("PositionY-info").innerHTML = newPosition;
      glUtil.setTranslation(newPosition, 1);
    };
    document.getElementById("PositionZ").oninput = function () {
      const newPosition = document.getElementById("PositionZ").value;
      document.getElementById("PositionZ-info").innerHTML = newPosition;
      glUtil.setTranslation(newPosition, 2);
    };

    document.getElementById("ScaleX").oninput = function () {
      const newScale = document.getElementById("ScaleX").value;
      document.getElementById("ScaleX-info").innerHTML = newScale;
      glUtil.setScaling(newScale, 0);
    };
    document.getElementById("ScaleY").oninput = function () {
      const newScale = document.getElementById("ScaleY").value;
      document.getElementById("ScaleY-info").innerHTML = newScale;
      glUtil.setScaling(newScale, 1);
    };
    document.getElementById("ScaleZ").oninput = function () {
      const newScale = document.getElementById("ScaleZ").value;
      document.getElementById("ScaleZ-info").innerHTML = newScale;
      glUtil.setScaling(newScale, 2);
    };

    document.getElementById("ButtonProjection-1").onclick = function () {
      glUtil.setProjectionType(0);
      document.getElementById("Projection-info").innerHTML = "Orthographic";
    };
    document.getElementById("ButtonProjection-2").onclick = function () {
      glUtil.setProjectionType(1);
      document.getElementById("Projection-info").innerHTML = "Oblique";
    };
    document.getElementById("ButtonProjection-3").onclick = function () {
      glUtil.setProjectionType(2);
      document.getElementById("Projection-info").innerHTML = "Perspective";
    };

    document.getElementById("ButtonTexture-1").onclick = function () {
      glUtil.setTextureType(0);
      document.getElementById("Texture-info").innerHTML = "Image";
    };
    document.getElementById("ButtonTexture-2").onclick = function () {
      glUtil.setTextureType(1);
      document.getElementById("Texture-info").innerHTML = "Environment";
    };
    document.getElementById("ButtonTexture-3").onclick = function () {
      glUtil.setTextureType(2);
      document.getElementById("Texture-info").innerHTML = "Bump";
    };

    document.getElementById("part-1").oninput = function () {
      const newAngle = document.getElementById("part-1").value;
      glUtil.setArticulatedAngle(newAngle, 0);
    };
    document.getElementById("part-2").oninput = function () {
      const newAngle = document.getElementById("part-2").value;
      glUtil.setArticulatedAngle(newAngle, 1);
    };
    document.getElementById("part-3").oninput = function () {
      const newAngle = document.getElementById("part-3").value;
      glUtil.setArticulatedAngle(newAngle, 2);
    };
    document.getElementById("part-4").oninput = function () {
      const newAngle = document.getElementById("part-4").value;
      glUtil.setArticulatedAngle(newAngle, 3);
    };
    document.getElementById("part-5").oninput = function () {
      const newAngle = document.getElementById("part-5").value;
      glUtil.setArticulatedAngle(newAngle, 4);
    };
    document.getElementById("part-6").oninput = function () {
      const newAngle = document.getElementById("part-6").value;
      glUtil.setArticulatedAngle(newAngle, 5);
    };
    document.getElementById("part-7").oninput = function () {
      const newAngle = document.getElementById("part-7").value;
      glUtil.setArticulatedAngle(newAngle, 6);
    };
    document.getElementById("part-8").oninput = function () {
      const newAngle = document.getElementById("part-8").value;
      glUtil.setArticulatedAngle(newAngle, 7);
    };
    document.getElementById("part-9").oninput = function () {
      const newAngle = document.getElementById("part-9").value;
      glUtil.setArticulatedAngle(newAngle, 8);
    };
    document.getElementById("part-10").oninput = function () {
      const newAngle = document.getElementById("part-10").value;
      glUtil.setArticulatedAngle(newAngle, 9);
    };
    document.getElementById("part-11").oninput = function () {
      const newAngle = document.getElementById("part-11").value;
      glUtil.setArticulatedAngle(newAngle, 10);
    };
    document.getElementById("part-12").oninput = function () {
      const newAngle = document.getElementById("part-12").value;
      glUtil.setArticulatedAngle(newAngle, 11);
    };
    document.getElementById("part-13").oninput = function () {
      const newAngle = document.getElementById("part-13").value;
      glUtil.setArticulatedAngle(newAngle, 12);
    };
    document.getElementById("part-14").oninput = function () {
      const newAngle = document.getElementById("part-14").value;
      glUtil.setArticulatedAngle(newAngle, 13);
    };
    document.getElementById("part-15").oninput = function () {
      const newAngle = document.getElementById("part-15").value;
      glUtil.setArticulatedAngle(newAngle, 14);
    };
    document.getElementById("part-16").oninput = function () {
      const newAngle = document.getElementById("part-16").value;
      glUtil.setArticulatedAngle(newAngle, 15);
    };
    document.getElementById("part-17").oninput = function () {
      const newAngle = document.getElementById("part-17").value;
      glUtil.setArticulatedAngle(newAngle, 16);
    };
    document.getElementById("part-18").oninput = function () {
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
