uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= 0.5;
    uv.x *= resolution.x / resolution.y;

    float circle = smoothstep(0.3, 0.31, length(uv));
    vec3 color = vec3(circle);

    gl_FragColor = vec4(color, 1.0);
}