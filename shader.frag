uniform vec2 resolution;
uniform vec2 mouse;

uniform float time;
uniform float amplitude;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= 0.5;
    uv.x *= resolution.x / resolution.y;

    float radius = 0.29 * amplitude + 0.1;
    float blur = 0.1 * abs(sin(time)) + 0.01;
    float circle = smoothstep(radius, radius + blur, length(uv));
    vec3 color = vec3(circle, mouse.x, mouse.y);

    gl_FragColor = vec4(color, 1.0);
}