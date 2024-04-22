export const simulationVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`
export const simulationFragmentShader = `
uniform sampler2D positionsA;
uniform sampler2D positionsB;
uniform float uTime;
uniform float uFrequency;

varying vec2 vUv;

void main() {
  float time = abs(sin(uTime * 0.35));

  vec3 spherePositions = texture2D(positionsA, vUv).rgb;
  vec3 boxPositions = texture2D(positionsB, vUv).rgb;

  vec3 pos = mix(boxPositions, spherePositions, time);

  gl_FragColor = vec4(pos, 1.0);
}
`
