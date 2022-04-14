function getRadian(value) {
  return (value * Math.PI) / 180;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

export { getRadian, isPowerOf2 };
