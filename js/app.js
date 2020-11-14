"use strict";

window.onload = function() {
    init();
};

function createShader(gl, shader_type, shader_source){
    const shader = gl.createShader(shader_type);
    gl.shaderSource(shader, shader_source);
    gl.compileShader(shader);
    if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
        alert("Could not compile vertex shader. \n\n" + gl.getShaderInfoLog(shader));
        return null;
    }
    else {
        return shader;
    }
}

function createProgram(gl, vertex_shader, fragment_shader){
    const program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);
    gl.linkProgram(program);
    const program_parameter = gl.getProgramParameter( program, gl.LINK_STATUS)
    if (!program_parameter) {
        alert("Could not link WebGL2 program. \n\n" + gl.getProgramInfoLog(program));
        return null;
    }
    else{
        return program;
    }
}

function createBuffer(gl, shape, color){
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.concat(color)), gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(shape));
    gl.bufferSubData(gl.ARRAY_BUFFER, shape.length * 4, new Float32Array(color));
    return buffer;
}

function drawSquare(gl, instance){
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, instance.buffer);
    gl.vertexAttribPointer(instance.vertexLocation, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(instance.vertexLocation);
    gl.enableVertexAttribArray(instance.colorLocation);
    gl.vertexAttribPointer(instance.colorLocation, 3, type, normalize, stride, square.length * 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, 4);
}


function init() {
    const canvas = document.querySelector("#glCanvas");
    const gl = canvas.getContext("webgl2");

    if(!gl) {
        alert("WebGL2 is not working on this browser!");
        return;
    }

    const vertex_shader = createShader(gl, gl.VERTEX_SHADER, v_shader);
    const fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, f_shader);

    if(!vertex_shader){
        return;
    }
    if(!fragment_shader){
        return;
    }

    const program = createProgram(gl, vertex_shader, fragment_shader);

    const vertex_location = gl.getAttribLocation(program, "a_position");
    const color_location = gl.getAttribLocation(program, "a_color");


    const buffer_square = createBuffer(gl, square, square_color);


    gl.useProgram(program);

    gl.clearColor(0.2, 0.7, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let squareInstance = {
        buffer: buffer_square,
        vertexLocation: vertex_location,
        colorLocation: color_location,
    };

    // Scaling
    let scaleMatrix = [0.75, 0, 0, 0,
                       0, 0.75, 0, 0,
                       0, 0, 1, 0,
                       0, 0, 0, 1];

    const scaleLocation = gl.getUniformLocation(program, "u_scale")
    gl.uniformMatrix4fv(scaleLocation, false, scaleMatrix)

    // Rotating
    let angleDegree = 45;

    const radian = Math.PI/180;
    const angleRadian = angleDegree * radian;



    const rotationLocation = gl.getUniformLocation(program, "angle")
    gl.uniform1f(rotationLocation, angleRadian);


    drawSquare(gl, squareInstance);
}