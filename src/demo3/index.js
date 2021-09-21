function init () {
    const ele = document.querySelector("#webgl");
    let gl = getWebGLContext(ele);

    const VSHADER_SOURCE = `
        attribute vec4 a_Position;
        attribute vec4 a_Color;
        varying vec4 v_Color;
        void main () {
            gl_Position = a_Position;
            v_Color = a_Color;
        }
    `

    const FSHADER_SOURCE = `
        precision mediump float;
        varying vec4 v_Color;
        void main () {
            gl_FragColor = v_Color;
        }
    `;

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    let num = setPoints(gl);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, num);
}

function setPoints (gl) {
    let vertexColorBuffer = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0, 
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertexColorBuffer, gl.STATIC_DRAW);
    let fSize = vertexColorBuffer.BYTES_PER_ELEMENT;

    let a_Position =  gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, fSize*5, 0);
    gl.enableVertexAttribArray(a_Position);

    let a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, fSize*5, fSize*2);
    gl.enableVertexAttribArray(a_Color);

    return 3;
}

init();