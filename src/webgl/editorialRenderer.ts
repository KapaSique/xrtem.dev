import {
  ClampToEdgeWrapping,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

export type EditorialController = {
  setMix(value: number): void;
  setIntensity(value: number): void;
  resize(): void;
  destroy(): void;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D uTextureA;
  uniform sampler2D uTextureB;
  uniform vec2 uResolution;
  uniform vec2 uImageA;
  uniform vec2 uImageB;
  uniform float uMix;
  uniform float uIntensity;

  vec2 coverUv(vec2 uv, vec2 canvas, vec2 image) {
    float canvasRatio = canvas.x / canvas.y;
    float imageRatio = image.x / image.y;
    vec2 scale = vec2(1.0);

    if (canvasRatio > imageRatio) {
      scale.y = imageRatio / canvasRatio;
    } else {
      scale.x = canvasRatio / imageRatio;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  float orderedNoise(vec2 point) {
    vec2 cell = mod(floor(point), 4.0);
    float index = cell.x + cell.y * 4.0;
    float threshold = 0.0;
    if (index < 1.0) threshold = 0.0;
    else if (index < 2.0) threshold = 8.0;
    else if (index < 3.0) threshold = 2.0;
    else if (index < 4.0) threshold = 10.0;
    else if (index < 5.0) threshold = 12.0;
    else if (index < 6.0) threshold = 4.0;
    else if (index < 7.0) threshold = 14.0;
    else if (index < 8.0) threshold = 6.0;
    else if (index < 9.0) threshold = 3.0;
    else if (index < 10.0) threshold = 11.0;
    else if (index < 11.0) threshold = 1.0;
    else if (index < 12.0) threshold = 9.0;
    else if (index < 13.0) threshold = 15.0;
    else if (index < 14.0) threshold = 7.0;
    else if (index < 15.0) threshold = 13.0;
    else threshold = 5.0;
    return (threshold + 0.5) / 16.0;
  }

  void main() {
    float threshold = orderedNoise(gl_FragCoord.xy);
    float transition = smoothstep(threshold - 0.12, threshold + 0.12, uMix);
    float bend = (transition - 0.5) * 0.055 * uIntensity;
    vec2 warpedUv = vUv + vec2(bend, sin(vUv.y * 24.0) * 0.004 * uIntensity);
    vec4 imageA = texture2D(uTextureA, coverUv(warpedUv, uResolution, uImageA));
    vec4 imageB = texture2D(uTextureB, coverUv(warpedUv, uResolution, uImageB));
    vec4 color = mix(imageA, imageB, transition);
    float mono = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(color.rgb, vec3(mono), 0.22);
    gl_FragColor = color;
  }
`;

export async function createEditorialRenderer(
  canvas: HTMLCanvasElement,
  sources: readonly [string, string],
): Promise<EditorialController> {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const loader = new TextureLoader();
  const [textureA, textureB] = await Promise.all(
    sources.map((source) => loader.loadAsync(source)),
  );

  for (const texture of [textureA, textureB]) {
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
  }

  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTextureA: { value: textureA },
      uTextureB: { value: textureB },
      uResolution: { value: new Vector2(1, 1) },
      uImageA: {
        value: new Vector2(textureA.image.width, textureA.image.height),
      },
      uImageB: {
        value: new Vector2(textureB.image.width, textureB.image.height),
      },
      uMix: { value: 0 },
      uIntensity: { value: 0.75 },
    },
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  let frame = 0;
  let destroyed = false;

  const render = () => {
    frame = 0;
    if (!destroyed) renderer.render(scene, camera);
  };

  const invalidate = () => {
    if (!frame && !destroyed) frame = window.requestAnimationFrame(render);
  };

  const resize = () => {
    if (destroyed) return;
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    renderer.setSize(width, height, false);
    material.uniforms.uResolution.value.set(width, height);
    invalidate();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  return {
    setMix(value) {
      material.uniforms.uMix.value = Math.min(1, Math.max(0, value));
      invalidate();
    },
    setIntensity(value) {
      material.uniforms.uIntensity.value = Math.max(0, value);
      invalidate();
    },
    resize,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      scene.remove(mesh);
      textureA.dispose();
      textureB.dispose();
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
