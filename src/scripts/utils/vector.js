// Pengurangan vektor
let subtractVectors = (a, b) => {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
};

// Normalisasi vektor
let normalize = (v) => {
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
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
  var vnarr = [];
  var vtarr = [];
  var vbarr = [];
  for (let i = 0; i < vpos.length; i += 12) {
    const p1 = [vpos[i], vpos[i + 1], vpos[i + 2]];
    const p2 = [vpos[i + 3], vpos[i + 4], vpos[i + 5]];
    const p3 = [vpos[i + 6], vpos[i + 7], vpos[i + 8]];
    const v1 = subtractVectors(p2, p1);
    const v2 = subtractVectors(p3, p1);
    const normalDirection = cross(v1, v2);
    const vn = normalize(normalDirection);
    const vt = normalize(v1);
    const vb = normalize(v2);
    for (let j = 0; j < 4; j++) {
      vnarr = vnarr.concat(vn);
      vtarr = vtarr.concat(vt);
      vbarr = vbarr.concat(vb);
    }
  }
  return [vnarr, vtarr, vbarr];
};

export { subtractVectors, normalize, cross, getVectorNormals };
