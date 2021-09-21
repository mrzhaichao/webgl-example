function initCanvas() {
    const VSHADER_SOURCE = `
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 10.0;
        }
    `;

    const FSHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_FragColor;
        void main() {
            gl_FragColor = u_FragColor;
        }
    `;

    const ele = document.querySelector("#webgl");

    const gl = getWebGLContext(ele);

    console.log(gl);

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    let a_Position = gl.getAttribLocation(gl.program, "a_Position");
    let u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    ele.addEventListener("click", (e) => {
        canvasClick(e, gl, a_Position, u_FragColor, ele);
    });
}

initCanvas();

const canvasClick = (() => {
    const g_points = [],
        g_colors = [];
    return (ev, gl, a_Position, u_FragColor, canvas) => {
        var x = ev.clientX; // x coordinate of a mouse pointer
        var y = ev.clientY; // y coordinate of a mouse pointer
        var rect = ev.target.getBoundingClientRect();

        x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
        y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

        g_points.push([x, y]);

        if (x >= 0.0 && y >= 0.0) {
            // First quadrant
            g_colors.push([1.0, 0.0, 0.0, 1.0]); // Red
        } else if (x < 0.0 && y < 0.0) {
            // Third quadrant
            g_colors.push([0.0, 1.0, 0.0, 1.0]); // Green
        } else {
            // Others
            g_colors.push([1.0, 1.0, 1.0, 1.0]); // White
        }

        // gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        for (let i = 0; i < g_points.length; i++) {
            var xy = g_points[i];
            var rgba = g_colors[i];
            gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0);
            gl.uniform4f(u_FragColor, ...rgba);
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    };
})();
