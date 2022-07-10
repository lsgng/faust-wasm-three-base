uniform vec2 resolution;
uniform vec2 mouse;

uniform float time;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= 0.5;
    uv.x *= resolution.x / resolution.y;

    float blur = 0.1 * abs(sin(time)) + 0.01;
    float circle = smoothstep(0.3, 0.3 + blur, length(uv));
    vec3 color = vec3(circle, mouse.x, mouse.y);

    gl_FragColor = vec4(color, 1.0);
}