import { subtractVectors, normalize, cross } from "./vector.js";

const m4 = {
  lookAt: (camPos, target, up) => {
    let z = normalize(subtractVectors(camPos, target));
    let x = normalize(cross(up, z));
    let y = normalize(cross(z, x));

    return [
      x[0],
      x[1],
      x[2],
      0,
      y[0],
      y[1],
      y[2],
      0,
      z[0],
      z[1],
      z[2],
      0,
      camPos[0],
      camPos[1],
      camPos[2],
      1,
    ];
  },

  perspective: (fovrad, aspect, near, far) => {
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fovrad);
    let rangeInv = 1.0 / (near - far);

    return [
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rangeInv,
      -1,
      0,
      0,
      near * far * rangeInv * 2,
      0,
    ];
  },

  ortho: (pMtrx, left, right, bottom, top, near, far) => {
    let a = right - left;
    let b = top - bottom;
    let c = far - near;

    pMtrx[0] = 2 / a;
    pMtrx[1] = 0;
    pMtrx[2] = 0;
    pMtrx[3] = 0;
    pMtrx[4] = 0;
    pMtrx[5] = 2 / b;
    pMtrx[6] = 0;
    pMtrx[7] = 0;
    pMtrx[8] = 0;
    pMtrx[9] = 0;
    pMtrx[10] = -2 / c;
    pMtrx[11] = 0;
    pMtrx[12] = (-1 * (left + right)) / a;
    pMtrx[13] = (-1 * (top + bottom)) / b;
    pMtrx[14] = (-1 * (far + near)) / c;
    pMtrx[15] = 1;

    return pMtrx;
  },

  oblique: (pMtrx, theta, phi) => {
    let t = (theta * Math.PI) / 180;
    let p = (phi * Math.PI) / 180;

    let cotT = -1 / Math.tan(t);
    let cotP = -1 / Math.tan(p);

    pMtrx[0] = 1;
    pMtrx[1] = 0;
    pMtrx[2] = cotT;
    pMtrx[3] = 0;
    pMtrx[4] = 0;
    pMtrx[5] = 1;
    pMtrx[6] = cotP;
    pMtrx[7] = 0;
    pMtrx[8] = 0;
    pMtrx[9] = 0;
    pMtrx[10] = 1;
    pMtrx[11] = 0;
    pMtrx[12] = 0;
    pMtrx[13] = 0;
    pMtrx[14] = 0;
    pMtrx[15] = 1;

    return m4.transpose(pMtrx);
  },

  projection: (width, height, depth) => {
    return [
      2 / width,
      0,
      0,
      0,
      0,
      -2 / height,
      0,
      0,
      0,
      0,
      2 / depth,
      0,
      -1,
      1,
      0,
      1,
    ];
  },

  identity: () => {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },

  multiply: (a, b) => {
    let a00 = a[0 * 4 + 0];
    let a01 = a[0 * 4 + 1];
    let a02 = a[0 * 4 + 2];
    let a03 = a[0 * 4 + 3];
    let a10 = a[1 * 4 + 0];
    let a11 = a[1 * 4 + 1];
    let a12 = a[1 * 4 + 2];
    let a13 = a[1 * 4 + 3];
    let a20 = a[2 * 4 + 0];
    let a21 = a[2 * 4 + 1];
    let a22 = a[2 * 4 + 2];
    let a23 = a[2 * 4 + 3];
    let a30 = a[3 * 4 + 0];
    let a31 = a[3 * 4 + 1];
    let a32 = a[3 * 4 + 2];
    let a33 = a[3 * 4 + 3];
    let b00 = b[0 * 4 + 0];
    let b01 = b[0 * 4 + 1];
    let b02 = b[0 * 4 + 2];
    let b03 = b[0 * 4 + 3];
    let b10 = b[1 * 4 + 0];
    let b11 = b[1 * 4 + 1];
    let b12 = b[1 * 4 + 2];
    let b13 = b[1 * 4 + 3];
    let b20 = b[2 * 4 + 0];
    let b21 = b[2 * 4 + 1];
    let b22 = b[2 * 4 + 2];
    let b23 = b[2 * 4 + 3];
    let b30 = b[3 * 4 + 0];
    let b31 = b[3 * 4 + 1];
    let b32 = b[3 * 4 + 2];
    let b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },

  translation: (tx, ty, tz) => {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
  },

  transpose: (pMatrix) => {
    return [
      pMatrix[0],
      pMatrix[4],
      pMatrix[8],
      pMatrix[12],
      pMatrix[1],
      pMatrix[5],
      pMatrix[9],
      pMatrix[13],
      pMatrix[2],
      pMatrix[6],
      pMatrix[10],
      pMatrix[14],
      pMatrix[3],
      pMatrix[7],
      pMatrix[11],
      pMatrix[15],
    ];
  },

  xRotation: (rad) => {
    let c = Math.cos(rad);
    let s = Math.sin(rad);

    return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
  },

  yRotation: (rad) => {
    let c = Math.cos(rad);
    let s = Math.sin(rad);

    return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
  },

  zRotation: (rad) => {
    let c = Math.cos(rad);
    let s = Math.sin(rad);

    return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },

  scaling: (sx, sy, sz) => {
    return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
  },

  translate: (m, tx, ty, tz) => {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate: (m, rad) => {
    return m4.multiply(m, m4.xRotation(rad));
  },

  yRotate: (m, rad) => {
    return m4.multiply(m, m4.yRotation(rad));
  },

  zRotate: (m, rad) => {
    return m4.multiply(m, m4.zRotation(rad));
  },

  rotate: (m, rad, rotateAxis) => {
    if (rotateAxis == 0) {
      return m4.xRotate(m, rad);
    } else if (rotateAxis == 1) {
      return m4.yRotate(m, rad);
    } else if (rotateAxis == 2) {
      return m4.zRotate(m, rad);
    } else {
      return m;
    }
  },

  scale: (m, sx, sy, sz) => {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },

  inverse: (m) => {
    let m00 = m[0 * 4 + 0];
    let m01 = m[0 * 4 + 1];
    let m02 = m[0 * 4 + 2];
    let m03 = m[0 * 4 + 3];
    let m10 = m[1 * 4 + 0];
    let m11 = m[1 * 4 + 1];
    let m12 = m[1 * 4 + 2];
    let m13 = m[1 * 4 + 3];
    let m20 = m[2 * 4 + 0];
    let m21 = m[2 * 4 + 1];
    let m22 = m[2 * 4 + 2];
    let m23 = m[2 * 4 + 3];
    let m30 = m[3 * 4 + 0];
    let m31 = m[3 * 4 + 1];
    let m32 = m[3 * 4 + 2];
    let m33 = m[3 * 4 + 3];
    let tmp_0 = m22 * m33;
    let tmp_1 = m32 * m23;
    let tmp_2 = m12 * m33;
    let tmp_3 = m32 * m13;
    let tmp_4 = m12 * m23;
    let tmp_5 = m22 * m13;
    let tmp_6 = m02 * m33;
    let tmp_7 = m32 * m03;
    let tmp_8 = m02 * m23;
    let tmp_9 = m22 * m03;
    let tmp_10 = m02 * m13;
    let tmp_11 = m12 * m03;
    let tmp_12 = m20 * m31;
    let tmp_13 = m30 * m21;
    let tmp_14 = m10 * m31;
    let tmp_15 = m30 * m11;
    let tmp_16 = m10 * m21;
    let tmp_17 = m20 * m11;
    let tmp_18 = m00 * m31;
    let tmp_19 = m30 * m01;
    let tmp_20 = m00 * m21;
    let tmp_21 = m20 * m01;
    let tmp_22 = m00 * m11;
    let tmp_23 = m10 * m01;

    let t0 =
      tmp_0 * m11 +
      tmp_3 * m21 +
      tmp_4 * m31 -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    let t1 =
      tmp_1 * m01 +
      tmp_6 * m21 +
      tmp_9 * m31 -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    let t2 =
      tmp_2 * m01 +
      tmp_7 * m11 +
      tmp_10 * m31 -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    let t3 =
      tmp_5 * m01 +
      tmp_8 * m11 +
      tmp_11 * m21 -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    return [
      d * t0,
      d * t1,
      d * t2,
      d * t3,
      d *
        (tmp_1 * m10 +
          tmp_2 * m20 +
          tmp_5 * m30 -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
      d *
        (tmp_0 * m00 +
          tmp_7 * m20 +
          tmp_8 * m30 -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
      d *
        (tmp_3 * m00 +
          tmp_6 * m10 +
          tmp_11 * m30 -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
      d *
        (tmp_4 * m00 +
          tmp_9 * m10 +
          tmp_10 * m20 -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
      d *
        (tmp_12 * m13 +
          tmp_15 * m23 +
          tmp_16 * m33 -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
      d *
        (tmp_13 * m03 +
          tmp_18 * m23 +
          tmp_21 * m33 -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
      d *
        (tmp_14 * m03 +
          tmp_19 * m13 +
          tmp_22 * m33 -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
      d *
        (tmp_17 * m03 +
          tmp_20 * m13 +
          tmp_23 * m23 -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
      d *
        (tmp_14 * m22 +
          tmp_17 * m32 +
          tmp_13 * m12 -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
      d *
        (tmp_20 * m32 +
          tmp_12 * m02 +
          tmp_19 * m22 -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
      d *
        (tmp_18 * m12 +
          tmp_23 * m32 +
          tmp_15 * m02 -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
      d *
        (tmp_22 * m22 +
          tmp_16 * m02 +
          tmp_21 * m12 -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
    ];
  },
};

export { m4 };
