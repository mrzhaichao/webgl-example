
const TRIANGLES = "TRIANGLES",
TRIANGLES_STRIP = "TRIANGLES_STRIP", 
LINES = "LINES", 
LINE_STRIP = "LINE_STRIP", 
LINE_LOOP = "LINE_LOOP",
POINTS = 'POINTS';

let gl, num;

function init () {
    const ele = document.querySelector("#webgl");
    gl = getWebGLContext(ele);

    const VSHADER_SOURCE = `
        attribute vec4 a_Position;
        void main () {
            gl_Position = a_Position;
            gl_PointSize = 10.0;
        }
    `

    const FSHADER_SOURCE = `
        void main () {
            gl_FragColor = vec4(1.0, 0, 0, 1.0);
        }
    `;

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    num = getPoints(gl);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function getPoints (gl) {
    const point = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ])

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, point, gl.STATIC_DRAW);


    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return 3
}

init();

function draw (type) {
    switch (type) {
        case POINTS: {
            type = gl.POINTS;
            break;
        };
        case TRIANGLES: {
            type = gl.TRIANGLES;
            break;
        };
        case TRIANGLES_STRIP: {
            type = gl.TRIANGLE_STRIP;
            break;
        };
        case LINE_LOOP: {
            type = gl.LINE_LOOP;
            break;
        };
        case LINE_STRIP: {
            type = gl.LINE_STRIP;
            break;
        };
        default: {
            type = gl.LINES;
            break;
        };
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(type, 0, num)
}

document.querySelector(".wrapper").addEventListener("click", (e) => {
    e.stopPropagation();
    const tagName = e.target.tagName;

    if (tagName === 'BUTTON') {
        draw(e.target.textContent.trim())
    }
})