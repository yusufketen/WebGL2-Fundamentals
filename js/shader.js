const v_shader = `#version 300 es
    in vec4 a_position;
    
    in vec4 a_color;
    out vec4 color;

    uniform mat4 u_scale;
    
    void main() {
        gl_Position = u_scale * a_position;
        color = a_color;
    }
`;

const f_shader = `#version 300 es
    precision mediump float;
    
    in vec4 color;
    out vec4 o_color;
    
    void main() {
        o_color = color;
    }
`;