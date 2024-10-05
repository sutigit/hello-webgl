import { initShaderProgram } from './webgl-demo'
import { initBuffers } from "./init-buffers";
import { drawScene } from "./draw-scene";


import './style.css'

// Set up the canvas
const canvas = document.createElement('canvas')
canvas.id = 'glcanvas'
canvas.width = 640
canvas.height = 480

// Get the WebGL context
const gl = canvas.getContext('webgl')

// If the browser does not support WebGL, getContext() will return null
if (!gl) {
  throw new Error('WebGL not supported')
}

// If the context is successfully initialized, the variable gl is our reference to it. 

// Set the clear color
gl.clearColor(0.0, 0.0, 0.0, 1.0)

// Actually clear the color by setting every pixel to the clearColor set above
gl.clear(gl.COLOR_BUFFER_BIT)



// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

// Fragment shader program
const fsSource = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
`;



// Initialize a shader program; this is where all the lighting
// for the vertices and so forth is established.
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

// Collect all the info needed to use the shader program.
// Look up which attribute our shader program is using
// for aVertexPosition and look up uniform locations.
const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
  },
};


// Append the canvas to the DOM
document.querySelector<HTMLDivElement>('#app')!.appendChild(canvas)

// Here's where we call the routine that builds all the
// objects we'll be drawing.
const buffers = initBuffers(gl);

// Draw the scene
drawScene(gl, programInfo, buffers);
