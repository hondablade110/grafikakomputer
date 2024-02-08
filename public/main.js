const canvas = document.querySelector('canvas');

// Atur ukuran canvas yang digunakan
canvas.width = 600; // Lebar canvas dalam pixel
canvas.height = 600; // Tinggi canvas dalam pixel

const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('Tidak Support WebGL');
}

// Membersihkan layar dengan warna hitam
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// Membuat data titik
const points = [
    0.0, 0.25,
    0.0,-0.5,
    -0.4,0.0,
    0.4,0.0


];

// Membuat buffer untuk data posisi titik
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

// Membuat vertex shader
const vertexShaderSource = `
    attribute vec2 a_position;

    void main() {
        gl_PointSize = 10.0; // Ukuran titik
        gl_Position = vec4(a_position, 0.0, 1.0); // Posisi titik
    }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

// Membuat fragment shader
const fragmentShaderSource = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Warna merah
    }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Membuat program shader
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Mendapatkan lokasi atribut posisi dari shader
const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Menggambar titik
gl.drawArrays(gl.POINTS, 0, 4);
