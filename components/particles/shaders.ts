export const vertexShader = `
uniform sampler2D uPositions;
uniform float uTime;

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 3.0;
  // Size attenuation;
  gl_PointSize *= step(1.0 - (1.0/64.0), position.x) + 0.5;
}
`
export const fragmentShader = `
void main() {
  vec3 color = vec3(0.34, 0.53, 0.96);
  gl_FragColor = vec4(color, 1.0);
}
`