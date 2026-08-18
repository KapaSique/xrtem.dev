'use client';

import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  baseColor = [0.1, 0.1, 0.1],
  speed = 0.2,
  amplitude = 0.5,
  frequencyX = 3,
  frequencyY = 2,
  interactive = true,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Local change: no antialias (a full-screen triangle has no edges to
    // smooth) and the draw buffer is capped below, so a 4K display does
    // not pay 4x the fragment cost for a soft gradient.
    const renderer = new Renderer({ antialias: false, dpr: 1 });
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      // Local change: the stock component supersampled this 3x3, i.e.
      // nine renderImage() calls per pixel. There are no hard edges in a
      // gradient this smooth, so the nine samples averaged to the same
      // value one sample gives — at nine times the fragment cost.
      void main() {
          gl_FragColor = renderImage(vUv);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0, 0]) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    // Longest side the shader is ever rendered at. The canvas is then
    // stretched by CSS — invisible on a gradient this smooth, and it
    // keeps the cost flat from a laptop to a 4K panel.
    const MAX_EDGE = 1440;

    function resize() {
      const w = container.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
      renderer.setSize(w * scale, h * scale);
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Local change: these listen on `window`, not on the container.
    // The shader sits behind a full-height content layer, so pointer
    // events never reach the canvas itself — but the surface still has
    // to follow the cursor wherever it travels over the page.
    const target = { x: 0.5, y: 0.5 };

    function aim(clientX: number, clientY: number) {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      target.x = (clientX - rect.left) / rect.width;
      target.y = 1 - (clientY - rect.top) / rect.height;
    }

    function handleMouseMove(event: MouseEvent) {
      aim(event.clientX, event.clientY);
    }

    function handleTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      if (touch) aim(touch.clientX, touch.clientY);
    }

    // A press throws a swell into the metal that decays over ~1s.
    let swell = 0;
    function handlePress(event: PointerEvent) {
      aim(event.clientX, event.clientY);
      swell = 1;
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('pointerdown', handlePress, { passive: true });
    }

    // Local addition: the shader is a full-screen hero background, so it
    // would otherwise keep drawing at 60fps for the whole page. Frames
    // are skipped whenever the container has scrolled out of view, and
    // uTime keeps advancing so the surface is never frozen on return.
    let onScreen = true;
    let sinceCheck = 0;
    const syncVisibility = () => {
      const rect = container.getBoundingClientRect();
      // A zero-sized rect means layout has not settled yet — that is not
      // the same as "off screen", and treating it as such would stall
      // the shader permanently.
      if (rect.width === 0 && rect.height === 0) {
        onScreen = true;
        return;
      }
      onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
    };

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      // Polled inside the loop rather than from scroll events, so the
      // check cannot be missed when those events never arrive.
      if (sinceCheck++ % 20 === 0) syncVisibility();
      if (!onScreen) return;

      // Chase the pointer instead of snapping to it — metal this heavy
      // should lag behind the hand that moves it.
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] += (target.x - mouseUniform[0]) * 0.06;
      mouseUniform[1] += (target.y - mouseUniform[1]) * 0.06;

      swell *= 0.94;
      program.uniforms.uAmplitude.value = amplitude * (1 + swell * 1.6);

      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('pointerdown', handlePress);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return <div ref={containerRef} className="w-full h-full" {...props} />;
};

export default LiquidChrome;
