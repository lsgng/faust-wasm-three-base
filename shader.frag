uniform vec2 resolution;
uniform vec2 mouse;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= 0.5;
    uv.x *= resolution.x / resolution.y;

    float circle = smoothstep(0.3, 0.31, length(uv));
    vec3 color = vec3(circle, mouse.x, mouse.y);

    gl_FragColor = vec4(color, 1.0);
}