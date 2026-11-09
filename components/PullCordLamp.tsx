/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    THREE: any;
  }
}

interface PullCordLampProps {
  onLightChange?: (isOn: boolean) => void;
  className?: string;
}

export function PullCordLamp({ onLightChange, className = "" }: PullCordLampProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let animId: number;
    let cleanupEvents: () => void = () => {};

    function initThreeScene(THREE: any) {
      if (!isMounted || !canvasRef.current || !containerRef.current) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;

      /* 1. SETUP */
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const OFF_BG = new THREE.Color("#0B0B0D");
      const ON_BG = new THREE.Color("#1A120C");
      scene.background = ON_BG.clone();

      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      const ambient = new THREE.AmbientLight(0xffffff, 0.12);
      const rim = new THREE.DirectionalLight(0xff8a3d, 0.35);
      rim.position.set(-4, 3, -3);

      const bulbLight = new THREE.PointLight(0xffd9a0, 0, 14, 1.6);
      bulbLight.position.set(0, 2.7, 0);
      scene.add(ambient, rim, bulbLight);

      /* 2. MODEL */
      const metal = new THREE.MeshStandardMaterial({
        color: 0xc9c9cf,
        metalness: 1,
        roughness: 0.25,
      });
      const darkMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1d,
        metalness: 0.6,
        roughness: 0.4,
      });
      const shadeMat = new THREE.MeshStandardMaterial({
        color: 0xff6a1a,
        roughness: 0.6,
        side: THREE.DoubleSide,
        emissive: 0xff6a1a,
        emissiveIntensity: 0,
      });
      const bulbMat = new THREE.MeshStandardMaterial({
        color: 0xfff2d6,
        emissive: 0xffb347,
        emissiveIntensity: 0,
        roughness: 0.3,
      });

      const lamp = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 0.16, 48), darkMat);
      base.position.y = 0.08;

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.3, 24), metal);
      stem.position.y = 1.3;

      const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.25, 24), darkMat);
      socket.position.y = 2.42;

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), bulbMat);
      bulb.position.y = 2.72;

      const shade = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 1.1, 1.0, 48, 1, true),
        shadeMat
      );
      shade.position.y = 2.95;

      lamp.add(base, stem, socket, bulb, shade);
      scene.add(lamp);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 30),
        new THREE.MeshStandardMaterial({
          color: 0x0b0b0d,
          metalness: 0.5,
          roughness: 0.5,
        })
      );
      floor.rotation.x = -Math.PI / 2;
      scene.add(floor);

      /* Soft glow sprite around the bulb */
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = glowCanvas.height = 256;
      const gctx = glowCanvas.getContext("2d");
      if (gctx) {
        const grad = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, "rgba(255,200,120,1)");
        grad.addColorStop(0.35, "rgba(255,140,60,0.35)");
        grad.addColorStop(1, "rgba(255,106,26,0)");
        gctx.fillStyle = grad;
        gctx.fillRect(0, 0, 256, 256);
      }
      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(glowCanvas),
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          transparent: true,
          opacity: 0,
        })
      );
      glow.position.set(0, 2.72, 0.3);
      glow.scale.set(4.2, 4.2, 1);
      scene.add(glow);

      /* 3. PULL CORD */
      const BEADS = 16,
        BASE_LEN = 0.9;
      const cord = new THREE.Group();
      cord.position.set(0.95, 2.45, 0.1);

      const beadGeo = new THREE.SphereGeometry(0.028, 10, 8);
      const beads: any[] = [];
      for (let i = 0; i < BEADS; i++) {
        const b = new THREE.Mesh(beadGeo, metal);
        beads.push(b);
        cord.add(b);
      }

      const handle = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 20, 16),
        new THREE.MeshStandardMaterial({
          color: 0xff6a1a,
          metalness: 0.4,
          roughness: 0.3,
        })
      );
      handle.scale.y = 1.7;

      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      handle.add(hit);
      cord.add(handle);
      scene.add(cord);

      /* 4. STATE + INTERACTIVE SINGLE CLICK & DRAG */
      let isOn = true;
      let lightLevel = 1;
      let pull = 0,
        pullVel = 0,
        sway = 0,
        swayVel = 0;
      let dragging = false,
        startY = 0,
        maxPull = 0,
        toggledThisDrag = false;
      const MAX_PULL = 0.7,
        TOGGLE_AT = 0.3;
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const cordPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -cord.position.z);
      const mouseWorld = new THREE.Vector3();
      let mouseActive = false,
        hoverAngle = 0,
        hoverTilt = 0;

      function updateMouse(e: PointerEvent) {
        const r = canvas.getBoundingClientRect();
        pointer.set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1
        );
        raycaster.setFromCamera(pointer, camera);
        mouseActive = !!raycaster.ray.intersectPlane(cordPlane, mouseWorld);
      }

      const onPointerLeave = () => {
        mouseActive = false;
      };

      function playSwitchSound(willBeOn: boolean) {
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioCtx) return;
          const ctx = new AudioCtx();
          if (ctx.state === "suspended") {
            ctx.resume();
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const now = ctx.currentTime;
          osc.type = "sine";
          osc.frequency.setValueAtTime(willBeOn ? 850 : 420, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.045);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.05);
        } catch {
          // ignore
        }
      }

      function toggleLight() {
        isOn = !isOn;
        playSwitchSound(isOn);
        if (onLightChange) onLightChange(isOn);
        swayVel += 0.035;
      }

      function pointerOnHandle(e: PointerEvent) {
        const r = canvas.getBoundingClientRect();
        pointer.set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1
        );
        raycaster.setFromCamera(pointer, camera);
        return raycaster.intersectObject(hit).length > 0;
      }

      let pointerDownX = 0;
      let pointerDownY = 0;
      let isInteracting = false;
      let didToggleOnPointerUp = false;
      let wasDraggedFar = false;

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;

        isInteracting = true;
        didToggleOnPointerUp = false;
        wasDraggedFar = false;
        pointerDownX = e.clientX;
        pointerDownY = e.clientY;

        if (pointerOnHandle(e)) {
          dragging = true;
          startY = e.clientY;
          maxPull = 0;
          toggledThisDrag = false;
        } else {
          dragging = false;
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        updateMouse(e);
        if (isInteracting) {
          const moveDist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
          if (moveDist > 16) {
            wasDraggedFar = true;
          }
        }

        if (dragging) {
          const worldPerPx =
            (2 *
              Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
              camera.position.z) /
            canvas.clientHeight;
          pull = THREE.MathUtils.clamp(
            (e.clientY - startY) * worldPerPx,
            0,
            MAX_PULL
          );
          pullVel = 0;
          maxPull = Math.max(maxPull, pull);
          if (pull > TOGGLE_AT && !toggledThisDrag) {
            toggledThisDrag = true;
            toggleLight();
          }
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (!isInteracting) return;
        isInteracting = false;

        const totalDist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);

        // If dragging the pull cord crossed the toggle threshold
        if (toggledThisDrag) {
          dragging = false;
          toggledThisDrag = false;
          return;
        }

        // Single click or tap anywhere on the lamp canvas
        if (totalDist < 20) {
          pull = 0.45; // tactile bounce
          toggleLight();
          didToggleOnPointerUp = true;
          dragging = false;
          return;
        }

        dragging = false;
      };

      const onClick = () => {
        if (didToggleOnPointerUp || wasDraggedFar) {
          didToggleOnPointerUp = false;
          wasDraggedFar = false;
          return;
        }
        pull = 0.45;
        toggleLight();
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("click", onClick);

      /* 5. RENDER LOOP WITH BREEZE & CURSOR ATTRACTION */
      const clock = new THREE.Clock();
      function animate() {
        if (!isMounted) return;
        animId = requestAnimationFrame(animate);

        const t = clock.getElapsedTime();
        if (!dragging) {
          pullVel += -pull * 0.15;
          pullVel *= 0.8;
          pull += pullVel;
        }
        swayVel += -sway * 0.04;
        swayVel *= 0.97;
        sway += swayVel;

        /* Natural breeze */
        const breeze =
          Math.sin(t * 0.9) * 0.5 +
          Math.sin(t * 1.7 + 1.3) * 0.3 +
          Math.sin(t * 0.41 + 2.1) * 0.45;
        const len = BASE_LEN + pull,
          seg = len / BEADS;

        /* Cursor attraction */
        let targetLean = 0,
          targetTilt = 0;
        if (mouseActive && !dragging) {
          const restX = cord.position.x,
            restY = cord.position.y - len - 0.1;
          const dist = Math.hypot(mouseWorld.x - restX, mouseWorld.y - restY);
          const w = Math.pow(Math.max(0, 1 - dist / 1.6), 2);
          const dx = THREE.MathUtils.clamp(mouseWorld.x - restX, -0.6, 0.6) * w;
          targetLean = Math.asin(THREE.MathUtils.clamp(dx / len, -0.5, 0.5));
          targetTilt = -w * 0.12;
        }
        hoverAngle += (targetLean - hoverAngle) * 0.07;
        hoverTilt += (targetTilt - hoverTilt) * 0.07;
        cord.rotation.z = sway + breeze * 0.07 + hoverAngle;
        cord.rotation.x =
          Math.sin(t * 0.7 + 0.5) * 0.05 + Math.sin(t * 1.9) * 0.02 + hoverTilt;

        const curveX = (f: number) =>
          Math.sin(t * 1.3 - f * 2.2) * 0.035 * f * f + breeze * 0.02 * f;
        const curveZ = (f: number) =>
          Math.sin(t * 1.1 + 0.8 - f * 2.0) * 0.025 * f * f;
        beads.forEach((b: any, i: number) => {
          const f = i / (BEADS - 1);
          b.position.set(curveX(f), -i * seg, curveZ(f));
        });
        handle.position.set(curveX(1), -len - 0.1, curveZ(1));

        lightLevel += ((isOn ? 1 : 0) - lightLevel) * 0.09;
        const flicker = isOn ? 1 + Math.sin(t * 40) * 0.01 : 1;
        bulbLight.intensity = lightLevel * 2.6 * flicker;
        bulbMat.emissiveIntensity = lightLevel * 2.2;
        shadeMat.emissiveIntensity = lightLevel * 0.45;
        glow.material.opacity = lightLevel * 0.85;

        scene.background.copy(OFF_BG).lerp(ON_BG, lightLevel);
        renderer.render(scene, camera);
      }

      /* 6. RESIZE */
      function resize() {
        if (!container || !canvas || !isMounted) return;
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 500;
        const aspect = w / h;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);

        camera.aspect = aspect;
        camera.position.set(0, 2.1, aspect < 1 ? 8 + (1 - aspect) * 8 : 8.5);
        camera.lookAt(0, 1.7, 0);
        camera.updateProjectionMatrix();
      }

      resize();
      window.addEventListener("resize", resize);

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(container);
      }

      animate();
      setIsLoaded(true);

      cleanupEvents = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        if (resizeObserver) resizeObserver.disconnect();
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("click", onClick);
        renderer.dispose();
      };
    }

    // Load Three.js
    if (window.THREE) {
      initThreeScene(window.THREE);
    } else {
      const existingScript = document.querySelector('script[src*="three.min.js"]');
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (window.THREE) initThreeScene(window.THREE);
        });
      } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.async = true;
        script.onload = () => {
          if (window.THREE) initThreeScene(window.THREE);
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
      cleanupEvents();
    };
  }, [onLightChange]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-[#0B0B0D] border border-orange-500/30 shadow-2xl select-none cursor-pointer ${className}`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block touch-none z-10 cursor-pointer"
        aria-label="Interactive 3D lamp. Click anywhere to toggle light on or off."
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0B0D]/90 space-y-3 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
          <span className="text-xs text-orange-400 font-mono tracking-wider">
            Sculpting 3D Luminaire...
          </span>
        </div>
      )}
    </div>
  );
}
