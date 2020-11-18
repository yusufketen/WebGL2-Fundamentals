const v_shader = `#version 300 es
    in vec4 a_position;
    
    in vec4 a_color;
    out vec4 color;

    uniform mat4 u_scale;
    uniform float angle;
    
    void main() {
        float c = cos(angle);
        float s = sin(angle);
    

                               
        mat4 rotationMatrixX = mat4(1, 0, 0, 0,
                              0, c, -s, 0,
                              0, s,  c, 0,
                              0, 0, 0, 1);
        mat4 rotationMatrixY = mat4(c, 0, s, 0,
                               0, 1, 0, 0,
                               -s, 0, c, 0,
                               0, 0, 0, 1);
     
        mat4 rotationMatrixZ = mat4(c, -s, 0, 0,
                               s, c, 0, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
                               
        gl_Position = rotationMatrixZ * u_scale * a_position;
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