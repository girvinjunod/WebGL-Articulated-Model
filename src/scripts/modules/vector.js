// Pengurangan vektor
let subtractVectors = (a, b) => {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
};

// Normalisasi vektor
let normalize = (v) => {
  let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length];
  } else {
    return [0, 0, 0];
  }
};

// Perkalian cross product
let cross = (a, b) => {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
};

// Get all vektor normal
let getVectorNormals = (vpos) => {
  let vnarr = [];
  let vtarr = [];
  let vbarr = [];
  for (let i = 0; i < vpos.length; i += 12) {
    let p1 = [vpos[i], vpos[i + 1], vpos[i + 2]];
    let p2 = [vpos[i + 3], vpos[i + 4], vpos[i + 5]];
    let p3 = [vpos[i + 6], vpos[i + 7], vpos[i + 8]];
    let v1 = subtractVectors(p2, p1);
    let v2 = subtractVectors(p3, p1);
    let normalDirection = cross(v1, v2);
    let vn = normalize(normalDirection);
    let vt = normalize(v1);
    let vb = normalize(v2);
    for (let j = 0; j < 4; j++) {
      vnarr = vnarr.concat(vn);
      vtarr = vtarr.concat(vt);
      vbarr = vbarr.concat(vb);
    }
  }
  return [vnarr, vtarr, vbarr];
};

export { subtractVectors, normalize, cross, getVectorNormals };
