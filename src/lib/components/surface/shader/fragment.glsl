uniform float uMode;
uniform sampler2D uTexture;
uniform vec3 uColor;
uniform vec3 uTint;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float mode = uMode;
  vec4 texture = texture2D(uTexture, uv);

  vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

  if (mode == 0.0) {
    color = vec4(uColor, 1.0);
  }
  if (mode == 1.0) {
    color = texture;
  }
  if (mode == 2.0) {
    color = mix(texture, vec4(uColor, 1.0), 0.5);
  }

  gl_FragColor = color;
}
