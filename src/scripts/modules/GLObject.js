import { m4 } from "./matriks.js";

function matdot(matrixPoint, matrix) {
  let x = matrixPoint.length,
    z = matrixPoint[0].length,
    y = matrix[0].length;
  if (matrix.length !== z) {
    throw new Error("Num row must be the same as num col");
  }
  let productRow = Array.apply(null, new Array(y)).map(
    Number.prototype.valueOf,
    0
  );
  let product = new Array(x);
  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += matrixPoint[i][k] * matrix[k][j];
      }
    }
  }
  return product;
}

function rotate(obj, radianX, radianY, radianZ) {
  var rotationMatrix = m4.identity();
  rotationMatrix = m4.xRotate(rotationMatrix, radianX);
  rotationMatrix = m4.yRotate(rotationMatrix, radianY);
  rotationMatrix = m4.zRotate(rotationMatrix, radianZ);
  let finalMatrix = [];
  let tmp = [];
  for (let i = 0; i < rotationMatrix.length; i++) {
    tmp.push(rotationMatrix[i]);
    if (tmp.length === 4) {
      finalMatrix.push(tmp);
      tmp = [];
    }
  }
  for (let i = 0; i < obj.num_point; i++) {
    let point = obj.points[i];
    let matrix = [[point[0], point[1], point[2], 1]];
    const result = matdot(matrix, finalMatrix);
    obj.points[i][0] = result[0][0];
    obj.points[i][1] = result[0][1];
    obj.points[i][2] = result[0][2];
  }
}

function scale(obj, scaleX, scaleY, scaleZ) {
  var scaleMatrix = m4.identity();
  scaleMatrix = m4.scale(scaleMatrix, scaleX, scaleY, scaleZ);
  let finalMatrix = [];
  let tmp = [];
  for (let i = 0; i < scaleMatrix.length; i++) {
    tmp.push(scaleMatrix[i]);
    if (tmp.length === 4) {
      finalMatrix.push(tmp);
      tmp = [];
    }
  }
  for (let i = 0; i < obj.num_point; i++) {
    let point = obj.points[i];
    let matrix = [[point[0], point[1], point[2], 1]];
    const result = matdot(matrix, finalMatrix);
    obj.points[i][0] = result[0][0];
    obj.points[i][1] = result[0][1];
    obj.points[i][2] = result[0][2];
  }
}

function translate(obj, deltaX, deltaY, deltaZ) {
  for (let i = 0; i < obj.num_point; i++) {
    obj.points[i][0] += deltaX;
    obj.points[i][1] += deltaY;
    obj.points[i][2] += deltaZ;
  }
}

export { matdot, rotate, scale, translate };
