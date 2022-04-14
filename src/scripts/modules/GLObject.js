import { m4 } from "./matriks.js";

function matdot(pt, mat) {
  let x = pt.length;
  let z = pt[0].length;
  let y = mat[0].length;
  if (mat.length !== z) {
    throw new Error("Num row must be the same as num col");
  }
  let productRow = Array.apply(null, new Array(y)).map(
    Number.prototype.valueOf,
    0
  );
  let product = [];
  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += pt[i][k] * mat[k][j];
      }
    }
  }
  return product;
}

function rotate(obj, radX, radY, radZ) {
  let rotationMat = m4.identity();
  rotationMat = m4.xRotate(rotationMat, radX);
  rotationMat = m4.yRotate(rotationMat, radY);
  rotationMat = m4.zRotate(rotationMat, radZ);
  let finalMat = [];
  let temp = [];
  for (let i = 0; i < rotationMat.length; i++) {
    temp.push(rotationMat[i]);
    if (temp.length === 4) {
      finalMat.push(temp);
      temp = [];
    }
  }
  for (let i = 0; i < obj.num_point; i++) {
    let point = obj.points[i];
    let Mat = [[point[0], point[1], point[2], 1]];
    const result = matdot(Mat, finalMat);
    obj.points[i][0] = result[0][0];
    obj.points[i][1] = result[0][1];
    obj.points[i][2] = result[0][2];
  }
}

function scale(obj, scaleX, scaleY, scaleZ) {
  let scaleMat = m4.identity();
  scaleMat = m4.scale(scaleMat, scaleX, scaleY, scaleZ);
  let finalMat = [];
  let temp = [];
  for (let i = 0; i < scaleMat.length; i++) {
    temp.push(scaleMat[i]);
    if (temp.length === 4) {
      finalMat.push(temp);
      temp = [];
    }
  }
  for (let i = 0; i < obj.num_point; i++) {
    let point = obj.points[i];
    let Mat = [[point[0], point[1], point[2], 1]];
    const result = matdot(Mat, finalMat);
    obj.points[i][0] = result[0][0];
    obj.points[i][1] = result[0][1];
    obj.points[i][2] = result[0][2];
  }
}

function translate(obj, dX, dY, dZ) {
  for (let i = 0; i < obj.num_point; i++) {
    obj.points[i][0] += dX;
    obj.points[i][1] += dY;
    obj.points[i][2] += dZ;
  }
}

export { matdot, rotate, scale, translate };
