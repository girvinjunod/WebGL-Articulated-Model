import { m4 } from "../utils/matrix.js";
import { getVectorNormals } from "../utils/vector.js";
import { getRadian } from "../utils/math.js";

const xAxis = 0;
const yAxis = 1;
const zAxis = 2;

export class GLUtils {
  constructor(canvas, vert, frag) {
    this.gl = canvas.getContext("webgl");

    if (!this.gl) {
      alert(
        "Unable to initialize Webthis.gl. Your browser or machine may not support it."
      );
      return;
    }
    this.shaderProgram = this.initShaderProgram(vert, frag);
    this.shaderVar = this.bindShaderVar();

    this.rotateAxis = 1;
    this.projectionType = 2;
    this.flag = true;
    this.animationFlag = true;
    this.shadingState = false;

    this.theta = [0, 0, 0];
    this.thetaObject = [];
    this.clockwiseObject = [];
    this.translation = [0, 0, 0];
    this.scaling = [1, 1, 1];

    this.thetaValue = 45;
    this.phi = 45;
    this.eye = [0, 0, 40];
    this.center = [0, 0, 0];
    this.up = [0, 1, 0];

    this.vertexPositions = null;
    this.buffers = null;
    this.textureMode = 0;
    this.setTextureType(1);
  }

  // Creates a shader of the given type, uploads the source and compiles it.
  loadShader(type, source) {
    const shader = this.gl.createShader(type);
    // Send the source to the shader object
    this.gl.shaderSource(shader, source);

    // Compile the shader program
    this.gl.compileShader(shader);

    // See if it compiled successfully
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the shaders: " +
          this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  // Initialize a shader program, so WebGL knows how to draw our data
  initShaderProgram(vsSource, fsSource) {
    const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program
    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          this.gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return shaderProgram;
  }

  setTextureType(value) {
    this.textureMode = value;
    switch (value) {
      case 0:
        console.log("Texture Mapping Mode: Image");
        this.loadTexture("../assets/Wooden.jpg");
        break;
      case 1:
        console.log("Texture Mapping Mode: Environment");
        this.loadEnvironmentTexture();
        break;
      case 2:
        console.log("Texture Mapping Mode: Bump Map");
        this.loadTexture("../assets/Bumped.png");
        break;
    }
  }

  setAxis(value) {
    this.rotateAxis = value;
  }

  setProjectionType(value) {
    this.projectionType = value;
  }

  setFlag() {
    this.flag = !this.flag;
  }

  setAnimationFlag() {
    this.animationFlag = !this.animationFlag;
  }

  setCameraRadian(value, idx) {
    this.theta[idx] = (value * Math.PI) / 180;
  }

  setArticulatedAngle(newAngle, Id) {
    if (this.tree[Id]) {
      let max_degree = this.tree[Id].max_degree;
      let min_degree = this.tree[Id].min_degree;
      let interval = max_degree - min_degree;
      let delta_degree = min_degree + newAngle * interval;
      this.thetaObject[Id] = getRadian(delta_degree);
    }
  }

  setEyePosition(value, idx) {
    this.eye[idx] = value;
  }

  setCenterPosition(value, idx) {
    this.center[idx] = value;
  }

  setUpPosition(value, idx) {
    this.up[idx] = value;
  }

  setTranslation(value, idx) {
    this.translation[idx] = value;
  }

  setScaling(value, idx) {
    this.scaling[idx] = value;
  }

  setRadius(value) {
    this.radius = value;
  }

  setDefaultView() {
    this.theta = [0, 0, 0];
    this.thetaObject = Array(this.num_objects).fill(0);
    this.clockwiseObject = Array(this.num_objects).fill(0);
    this.translation = [0, 0, 0];
    this.scaling = [1, 1, 1];
    this.eye = [0, 0, 40];
    this.center = [0, 0, 0];
    this.up = [0, 1, 0];
    this.flag = true;
    this.shadingState = false;
    this.animationFlag = true;
    this.setTextureType(1);
    for (let i = 1; i <= 18; i++) {
      this.setArticulatedAngle(0, i - 1);
    }
    for (let i = 0; i < this.num_objects; i++) {
      this.initNodes(i, true);
    }
  }

  turnOnShading() {
    this.shadingState = !this.shadingState;
  }

  clearScreen() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  initBuffers(vertexPosition) {
    const positionBuffer = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    const positions = vertexPosition;

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW
    );

    const NTB = getVectorNormals(vertexPosition);
    const vertexNormals = NTB[0];
    const vertexTangents = NTB[1];
    const vertexBitangents = NTB[2];

    const normalBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertexNormals),
      this.gl.STATIC_DRAW
    );

    const tangentBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tangentBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertexTangents),
      this.gl.STATIC_DRAW
    );

    const bitangentBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bitangentBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertexBitangents),
      this.gl.STATIC_DRAW
    );

    const textureCoordinates = [
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,

      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ];

    const textureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(textureCoordinates),
      this.gl.STATIC_DRAW
    );

    const indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    const indices = [
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12,
      14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
    ];

    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.gl.STATIC_DRAW
    );

    return {
      position: positionBuffer,
      normal: normalBuffer,
      tangent: tangentBuffer,
      bitangent: bitangentBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }

  drawModel(obj) {
    let listOfVertices = obj.pts;
    let vertexPositions = [];
    let facesColor = [];
    let tree = obj.nodes;
    for (let i = 0; i < obj.num_edge; i++) {
      let edge = obj.edge[i];
      let position = [];
      let topology = edge.topology;
      let tmpColor = [];
      for (let j = 0; j < edge.num_face; j++) {
        position = position.concat(listOfVertices[topology[j][0]]);
        position = position.concat(listOfVertices[topology[j][1]]);
        position = position.concat(listOfVertices[topology[j][2]]);
        position = position.concat(listOfVertices[topology[j][3]]);
        tmpColor.push(edge.color[j]);
      }
      facesColor.push(tmpColor);
      vertexPositions.push(position);
    }

    this.vertexPositions = vertexPositions;
    this.facesColor = facesColor;
    this.buffers = [];
    this.figure = [];
    this.tree = tree;
    this.num_objects = obj.num_edge;

    for (let i = 0; i < this.num_objects; i++) {
      this.initNodes(i, true);
    }
    for (let i = 0; i < vertexPositions.length; i++) {
      const buffer = this.initBuffers(vertexPositions[i], facesColor[i]);
      this.buffers.push(buffer);
    }
  }

  initNodes(Id, mode) {
    var m = m4.identity();

    let tx = this.tree[Id].joint_point[0];
    let ty = this.tree[Id].joint_point[1];
    let tz = this.tree[Id].joint_point[2];
    let sibling = this.tree[Id].sibling;
    let child = this.tree[Id].child;
    let max_degree = this.tree[Id].max_degree;
    let min_degree = this.tree[Id].min_degree;
    let rotateAxis = this.tree[Id].rotation_axis;

    if (mode) {
      this.thetaObject[Id] = getRadian(this.tree[Id].start_degree);
      this.clockwiseObject[Id] = this.tree[Id].clockwise;
    }

    if (!this.animationFlag) {
      let clockwise = this.clockwiseObject[Id];
      let delta = 0;
      switch (clockwise) {
        case 0:
          delta = 0.03;
          break;
        case 1:
          delta = -0.03;
          break;
      }

      let new_degree = this.thetaObject[Id] + delta;

      if (new_degree >= getRadian(max_degree)) {
        this.clockwiseObject[Id] = 1;
        new_degree = this.thetaObject[Id] - 0.03;
      } else if (new_degree <= getRadian(min_degree)) {
        this.clockwiseObject[Id] = 0;
        new_degree = this.thetaObject[Id] + 0.03;
      }
      this.thetaObject[Id] = new_degree;
    }

    m = m4.translate(m, tx, ty, tz);
    m = m4.rotate(m, this.thetaObject[Id], rotateAxis);
    m = m4.translate(m, -tx, -ty, -tz);
    this.figure[Id] = this.createNode(m, sibling, child);
  }

  createNode(transform, sibling, child) {
    var node = {
      transform: transform,
      sibling: sibling,
      child: child,
    };
    return node;
  }

  initTraversal(deltaTime) {
    var cameraMatrix = m4.identity();

    cameraMatrix = m4.lookAt(this.eye, this.center, this.up);

    if (!this.flag) {
      this.theta[this.rotateAxis] += deltaTime;
    }

    let viewMatrix = m4.inverse(cameraMatrix);
    viewMatrix = m4.xRotate(viewMatrix, this.theta[xAxis]);
    viewMatrix = m4.yRotate(viewMatrix, this.theta[yAxis]);
    viewMatrix = m4.zRotate(viewMatrix, this.theta[zAxis]);

    var modelMatrix = m4.identity();
    modelMatrix = m4.translate(
      modelMatrix,
      this.translation[0],
      this.translation[1],
      this.translation[2]
    );
    modelMatrix = m4.scale(
      modelMatrix,
      this.scaling[0],
      this.scaling[1],
      this.scaling[2]
    );

    this.modelViewMatrix = m4.multiply(viewMatrix, modelMatrix);
    this.deltaTime = deltaTime;
    this.stack = [];
    this.traversal(0);
  }

  traversal(id) {
    if (id == null) return;

    this.stack.push(this.modelViewMatrix);

    this.modelViewMatrix = m4.multiply(
      this.modelViewMatrix,
      this.figure[id].transform
    );

    this.drawScene(this.buffers[id], this.deltaTime);

    if (this.figure[id].child != null) {
      this.traversal(this.figure[id].child);
    }

    this.modelViewMatrix = this.stack.pop();
    if (this.figure[id].sibling != null) {
      this.traversal(this.figure[id].sibling);
    }
  }

  bindShaderVar() {
    let shaderVar = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexPosition"
        ),
        vertexNormal: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexNormal"
        ),
        textureCoord: this.gl.getAttribLocation(
          this.shaderProgram,
          "aTextureCoord"
        ),
        vertexTangent: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexTangent"
        ),
        vertexBitangent: this.gl.getAttribLocation(
          this.shaderProgram,
          "aVertexBitangent"
        ),
      },
      uniformLocations: {
        normalMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uNormalMatrix"
        ),
        projectionMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          "uModelViewMatrix"
        ),
        shadingBool: this.gl.getUniformLocation(this.shaderProgram, "uShading"),
        uSampler: this.gl.getUniformLocation(this.shaderProgram, "uSampler"),
        uTexture: this.gl.getUniformLocation(this.shaderProgram, "uTexture"),
        worldCameraposition: this.gl.getUniformLocation(
          this.shaderProgram,
          "uWorldCameraPosition"
        ),
        textureType1: this.gl.getUniformLocation(
          this.shaderProgram,
          "textureType1"
        ),
        textureType2: this.gl.getUniformLocation(
          this.shaderProgram,
          "textureType2"
        ),
      },
    };
    return shaderVar;
  }

  loadEnvironmentTexture() {
    let texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);

    let faces = [
      {
        target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        src: "../assets/envMap/pos-x.png",
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        src: "../assets/envMap/neg-x.png",
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        src: "../assets/envMap/pos-y.png",
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        src: "../assets/envMap/neg-y.png",
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        src: "../assets/envMap/pos-z.png",
      },
      {
        target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        src: "../assets/envMap/neg-z.png",
      },
    ];
    faces.forEach((face) => {
      let { target, src } = face;

      let level = 0;
      let internalFormat = this.gl.RGBA;
      let width = 512;
      let height = 512;
      let format = this.gl.RGBA;
      let type = this.gl.UNSIGNED_BYTE;

      this.gl.texImage2D(
        target,
        level,
        internalFormat,
        width,
        height,
        0,
        format,
        type,
        null
      );

      let image = new Image();
      image.onload = () => {
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);
        this.gl.texImage2D(target, level, internalFormat, format, type, image);
        this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
      };
      image.src = src;
    });
    this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
    this.gl.texParameteri(
      this.gl.TEXTURE_CUBE_MAP,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR_MIPMAP_LINEAR
    );
  }

  drawScene(buffer) {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    const fov = (45 * Math.PI) / 180;
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    var projectionMatrix = m4.identity();
    if (this.projectionType == 0) {
      projectionMatrix = m4.ortho(projectionMatrix, -5, 5, -5, 5, zNear, zFar);
    } else if (this.projectionType == 1) {
      var m = m4.identity();
      var n = m4.identity();
      m = m4.oblique(projectionMatrix, -this.thetaValue, -this.phi);
      n = m4.ortho(projectionMatrix, -5, 5, -5, 5, zNear, zFar);
      projectionMatrix = m4.multiply(m, n);

      projectionMatrix = m4.translate(projectionMatrix, 3, 3, 3);
    } else if (this.projectionType == 2) {
      projectionMatrix = m4.perspective(fov, aspect, zNear, zFar);
    }

    var normalMatrix = m4.inverse(this.modelViewMatrix);
    normalMatrix = m4.transpose(normalMatrix);

    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.position);
      this.gl.vertexAttribPointer(
        this.shaderVar.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(
        this.shaderVar.attribLocations.vertexPosition
      );
    }

    {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.textureCoord);
      this.gl.vertexAttribPointer(
        this.shaderVar.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(
        this.shaderVar.attribLocations.textureCoord
      );
    }

    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.normal);
      this.gl.vertexAttribPointer(
        this.shaderVar.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(
        this.shaderVar.attribLocations.vertexNormal
      );
    }
    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.tangent);
      this.gl.vertexAttribPointer(
        this.shaderVar.attribLocations.vertexTangent,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(
        this.shaderVar.attribLocations.vertexTangent
      );
    }

    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.bitangent);
      this.gl.vertexAttribPointer(
        this.shaderVar.attribLocations.vertexBitangent,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.gl.enableVertexAttribArray(
        this.shaderVar.attribLocations.vertexBitangent
      );
    }

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer.indices);

    this.gl.useProgram(this.shaderVar.program);

    this.gl.uniformMatrix4fv(
      this.shaderVar.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    this.gl.uniformMatrix4fv(
      this.shaderVar.uniformLocations.modelViewMatrix,
      false,
      this.modelViewMatrix
    );
    this.gl.uniformMatrix4fv(
      this.shaderVar.uniformLocations.normalMatrix,
      false,
      normalMatrix
    );
    this.gl.uniform1i(
      this.shaderVar.uniformLocations.shadingBool,
      this.shadingState
    );
    this.gl.uniform3fv(
      this.shaderVar.uniformLocations.worldCameraPosition,
      this.eye
    );

    if (this.textureMode == 0) {
      console.log("Map image");
    } else if (this.textureMode == 1) {
      console.log("Map env");
      this.gl.uniform1i(this.shaderVar.uniformLocations.uTexture, 0);
      this.gl.uniform1i(this.shaderVar.uniformLocations.textureType1, 1);
      this.gl.uniform1i(this.shaderVar.uniformLocations.textureType2, 1);
      this.gl.uniform1i(this.shaderVar.uniformLocations.uSampler, 1);
    } else {
      console.log("Map bump");
    }

    for (let i = 0; i < 6; i++) {
      this.gl.drawArrays(this.gl.TRIANGLE_FAN, 4 * i, 4);
    }
  }
}