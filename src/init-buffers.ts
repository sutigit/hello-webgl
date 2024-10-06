function initBuffers(gl: any) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer
  };
}

function initPositionBuffer(gl: any) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Make the positionBuffer take in the ARRAY_BUFFER type
  // and set the buffer to be the current buffer
  // positionBuffer gets binded to the target: gl.ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
  const positions = [
    1.0, 1.0, // Top right
    -1.0, 1.0, // Top left
    1.0, -1.0, // Bottom right
    -1.0, -1.0 // Bottom left
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // return positionBuffer as a handle for use in other parts of the program
  return positionBuffer;
}

function initColorBuffer(gl: any) {
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, // white
    1.0,
    0.0,
    0.0,
    1.0, // red
    0.0,
    1.0,
    0.0,
    1.0, // green
    0.0,
    0.0,
    1.0,
    1.0, // blue
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}


export { initBuffers };
