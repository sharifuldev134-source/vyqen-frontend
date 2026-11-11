/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import {
  SparklesIcon,
  ShoppingBagIcon,
  XIcon,
  CheckIcon,
  ArrowRightIcon,
} from "./Icons";

declare global {
  interface Window {
    THREE: any;
  }
}

interface LampConfig {
  id: string;
  name: string;
  category: "Table Lamp" | "Pendant Light" | "Floor Lamp" | "Wall Sconce" | "Ambient Art";
  color: string;
  price: number;
  originalPrice: number;
  blurb: string;
  dome?: boolean;
  globe?: boolean;
  shade?: [number, number, number, number];
  sy?: number;
  rot45?: boolean;
}

const LAMPS_DATA: LampConfig[] = [
  {
    id: "luma-ember",
    name: "Ember",
    category: "Table Lamp",
    color: "#FF6A1A",
    shade: [0.35, 0.75, 0.8, 40],
    sy: 0.65,
    price: 89,
    originalPrice: 110,
    blurb: "A warm cone of light for reading corners.",
  },
  {
    id: "luma-halo",
    name: "Halo",
    category: "Pendant Light",
    color: "#F5F2EE",
    dome: true,
    price: 79,
    originalPrice: 95,
    blurb: "A soft dome that wraps the bulb in calm light.",
  },
  {
    id: "luma-arc",
    name: "Arc",
    category: "Table Lamp",
    color: "#7FB069",
    shade: [0.55, 0.55, 0.8, 40],
    sy: 0.65,
    price: 95,
    originalPrice: 120,
    blurb: "A clean drum shade for desks and shelves.",
  },
  {
    id: "luma-pebble",
    name: "Pebble",
    category: "Ambient Art",
    color: "#FFD9A0",
    globe: true,
    price: 69,
    originalPrice: 85,
    blurb: "A frosted globe that glows like a small moon.",
  },
  {
    id: "luma-tulip",
    name: "Tulip",
    category: "Floor Lamp",
    color: "#E23D6B",
    shade: [0.72, 0.25, 0.75, 40],
    sy: 0.62,
    price: 109,
    originalPrice: 135,
    blurb: "A flared tulip shade that throws light upward.",
  },
  {
    id: "luma-prism",
    name: "Prism",
    category: "Wall Sconce",
    color: "#8E5CF7",
    shade: [0.6, 0.6, 0.75, 4],
    sy: 0.62,
    rot45: true,
    price: 99,
    originalPrice: 125,
    blurb: "Four crisp faces and a sharp, modern glow.",
  },
  {
    id: "luma-tower",
    name: "Tower",
    category: "Floor Lamp",
    color: "#17C3B2",
    shade: [0.38, 0.38, 1.1, 40],
    sy: 0.75,
    price: 119,
    originalPrice: 145,
    blurb: "A tall slim column for tight spaces.",
  },
];

export function LampCarousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addToCart, formatPrice, showToast } = useCart();

  const [activeDetail, setActiveDetail] = useState<number | null>(null);
  const [activeLampLightOn, setActiveLampLightOn] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // References to communicate with Three.js render loop without re-triggering effect
  const threeRef = useRef<{
    openDetail: (index: number) => void;
    closeDetail: () => void;
    toggleLampLight: (index: number) => void;
    rotateCarousel: (delta: number) => void;
  } | null>(null);

  // Play switch sound
  const playSound = useCallback((willBeOn: boolean) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(willBeOn ? 880 : 440, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.045);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }, [isMuted]);

  // Handle Add to Cart with Flight Particle Effect
  const handleAddToCart = useCallback((lampIndex: number) => {
    const lamp = LAMPS_DATA[lampIndex];
    if (!lamp) return;

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);

    // Launch flying light particle towards cart button
    try {
      const particle = document.createElement("div");
      particle.className = "fixed z-50 pointer-events-none rounded-full shadow-2xl transition-all";
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;
      const targetX = window.innerWidth - 60;
      const targetY = 32;

      particle.style.width = "40px";
      particle.style.height = "40px";
      particle.style.left = `${startX - 20}px`;
      particle.style.top = `${startY - 20}px`;
      particle.style.background = `radial-gradient(circle at 35% 30%, #ffffff, ${lamp.color} 60%, #1a0a00)`;
      particle.style.boxShadow = `0 0 28px ${lamp.color}`;
      particle.style.borderRadius = "50%";
      document.body.appendChild(particle);

      const startTime = performance.now();
      const duration = 650;
      const controlY = Math.min(startY, targetY) - 120;
      const controlX = (startX + targetX) / 2;

      const animateFlight = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const inv = 1 - progress;
        const curX = inv * inv * startX + 2 * inv * progress * controlX + progress * progress * targetX;
        const curY = inv * inv * startY + 2 * inv * progress * controlY + progress * progress * targetY;
        const scale = 1 - 0.6 * progress;

        particle.style.transform = `translate(${curX - startX}px, ${curY - startY}px) scale(${scale})`;

        if (progress < 1) {
          requestAnimationFrame(animateFlight);
        } else {
          particle.remove();
        }
      };

      requestAnimationFrame(animateFlight);
    } catch {
      // ignore
    }

    // Convert to full Product object for Cart
    const product: Product = {
      id: lamp.id,
      name: `${lamp.name} Luminaire`,
      tagline: lamp.blurb,
      price: lamp.price,
      originalPrice: lamp.originalPrice,
      rating: 4.9,
      reviewsCount: 38,
      category: lamp.category,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      secondaryImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      gallery: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"],
      badge: lamp.name === "Ember" ? "Best Seller" : lamp.name === "Tulip" ? "Limited Edition" : undefined,
      inStock: true,
      designer: "Vyqen Atelier",
      dimensions: "H 38cm × W 24cm",
      materials: ["Solid Spun Brass", "Architectural Glass", "Woven Cotton Cord"],
      lumens: "680 lm",
      colorTemperature: "2200K - 2700K Circadian Warmth",
      wattage: "9W Integrated LED",
      description: `${lamp.blurb} Hand-crafted in limited atelier batches with precision-balanced base and tactile pull-cord switch.`,
      features: [
        "Natural breeze pendulum pull-cord",
        "Weighted spun brass base with anti-mar felt",
        "Universal 100V–240V architectural driver",
        "95+ High CRI for natural color rendering",
      ],
    };

    addToCart(product, 1, "2700K Warm Sunset");
    showToast(`${lamp.name} Luminaire added to your Atelier Bag`);
  }, [addToCart, showToast]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    let isMounted = true;
    let animId: number;
    let cleanupEvents: () => void = () => {};

    function initScene(THREE: any) {
      if (!isMounted || !canvasRef.current || !containerRef.current) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;

      const isMobile = () => (container ? container.clientWidth < 640 : window.innerWidth < 640);

      // 1. RENDERER
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // 2. SCENE & CAMERA
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 14);

      // 3. LIGHTS
      const hemi = new THREE.HemisphereLight(0xffffff, 0x221a14, 0.85);
      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(3, 4, 6);
      const rimL = new THREE.DirectionalLight(0xff8a3d, 0.95);
      rimL.position.set(-4, 2, -3);
      const spot = new THREE.PointLight(0xffd9a0, 0, 14, 1.6);
      scene.add(hemi, key, rimL, spot);

      // 4. PROCEDURAL ASSETS
      const gc = document.createElement("canvas");
      gc.width = gc.height = 128;
      const gx = gc.getContext("2d");
      if (gx) {
        const gg = gx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gg.addColorStop(0, "rgba(255,200,120,1)");
        gg.addColorStop(0.25, "rgba(255,160,70,0.5)");
        gg.addColorStop(0.5, "rgba(255,140,60,0.16)");
        gg.addColorStop(0.75, "rgba(255,120,40,0.04)");
        gg.addColorStop(1, "rgba(255,106,26,0)");
        gx.fillStyle = gg;
        gx.fillRect(0, 0, 128, 128);
      }
      const glowTex = new THREE.CanvasTexture(gc);

      function makeLabel(c: LampConfig) {
        const cv = document.createElement("canvas");
        cv.width = 512;
        cv.height = 128;
        const x = cv.getContext("2d");
        if (x) {
          const g = x.createLinearGradient(0, 0, 0, 128);
          g.addColorStop(0, "#1A1A1D");
          g.addColorStop(1, "#050506");
          x.fillStyle = g;
          x.fillRect(0, 0, 512, 128);
          x.textAlign = "center";
          for (let k = 0; k < 2; k++) {
            const o = k * 256;
            x.fillStyle = c.color;
            x.fillRect(o, 8, 256, 10);
            x.fillStyle = "#ffffff";
            x.font = "900 42px Arial Black, Arial, sans-serif";
            x.fillText(c.name.toUpperCase(), o + 128, 64);
            x.fillStyle = "#ffaa66";
            x.font = "700 16px Arial, sans-serif";
            x.fillText("VYQEN · 9W · E27", o + 128, 90);
            for (let b = 0; b < 28; b++) {
              x.fillStyle = "#dddddd";
              x.fillRect(o + 64 + b * 4.6, 102, b % 3 ? 1.5 : 2.5, 16);
            }
          }
        }
        const t = new THREE.CanvasTexture(cv);
        t.anisotropy = 4;
        return t;
      }

      function buildLamp(c: LampConfig, i: number) {
        const g = new THREE.Group();
        const u = g.userData;
        Object.assign(u, { i, on: true, lit: 1, pull: 0, vel: 0, rot: 0, tx: 0, tz: 0 });

        const metal = new THREE.MeshStandardMaterial({
          color: 0xc9c9cf,
          metalness: 0.85,
          roughness: 0.22,
        });

        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.3, 48), [
          new THREE.MeshStandardMaterial({ map: makeLabel(c), metalness: 0.85, roughness: 0.22 }),
          metal,
          metal,
        ]);
        base.position.y = -1.35;

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 20), metal);
        stem.position.y = -0.45;

        const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.16, 20), metal);
        sock.position.y = 0.38;

        u.bulbMat = new THREE.MeshStandardMaterial({
          color: 0xfff2d6,
          emissive: 0xffb347,
          emissiveIntensity: 2,
          roughness: 0.3,
        });
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), u.bulbMat);
        bulb.position.y = 0.55;

        u.shadeMat = new THREE.MeshStandardMaterial({
          color: c.color,
          roughness: 0.55,
          metalness: 0.1,
          side: THREE.DoubleSide,
          emissive: c.color,
          emissiveIntensity: 0.4,
        });

        let shade: any;
        let bY = 0;
        let rb = 0.5;

        if (c.dome) {
          shade = new THREE.Mesh(
            new THREE.SphereGeometry(0.75, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
            u.shadeMat
          );
          shade.position.y = 0.45;
          bY = 0.45;
          rb = 0.75;
        } else if (c.globe) {
          u.shadeMat.transparent = true;
          u.shadeMat.opacity = 0.65;
          shade = new THREE.Mesh(new THREE.SphereGeometry(0.62, 40, 24), u.shadeMat);
          shade.position.y = 0.55;
          bY = -0.07;
          rb = 0.62;
        } else {
          const s = c.shade || [0.4, 0.6, 0.8, 32];
          shade = new THREE.Mesh(new THREE.CylinderGeometry(s[0], s[1], s[2], s[3], 1, true), u.shadeMat);
          shade.position.y = c.sy || 0.65;
          if (c.rot45) shade.rotation.y = Math.PI / 4;
          bY = (c.sy || 0.65) - s[2] / 2;
          rb = s[1];
        }

        // Side arm + pull cord
        const cx = rb + 0.1;
        const ay = Math.min(bY - 0.05, 0.3);
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, cx, 8), metal);
        arm.rotation.z = Math.PI / 2;
        arm.position.set(cx / 2, ay, 0);

        const cord = new THREE.Group();
        cord.position.set(cx, ay, 0);
        u.cord = cord;
        u.beads = [];

        const bg = new THREE.SphereGeometry(0.022, 8, 6);
        for (let k = 0; k < 8; k++) {
          const b = new THREE.Mesh(bg, metal);
          u.beads.push(b);
          cord.add(b);
        }

        const h = new THREE.Mesh(
          new THREE.SphereGeometry(0.065, 16, 12),
          new THREE.MeshStandardMaterial({ color: 0xff6a1a, metalness: 0.4, roughness: 0.3 })
        );
        h.scale.y = 1.7;
        u.handle = h;
        cord.add(h);

        const hit = new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 8, 8),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hit.userData.lamp = g;
        h.add(hit);
        u.handleHit = hit;

        const prox = new THREE.Mesh(
          new THREE.CylinderGeometry(0.95, 0.95, 3.1, 8),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        prox.userData.lamp = g;
        u.prox = prox;

        const glow = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTex,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
          })
        );
        glow.position.set(0, 0.55, 0.2);
        glow.scale.set(3.2, 3.2, 1);
        u.glow = glow;

        g.add(base, stem, sock, bulb, shade, arm, cord, prox, glow);
        g.position.set(0, -12, -3);
        scene.add(g);
        return g;
      }

      const lamps = LAMPS_DATA.map(buildLamp);
      const proxies = lamps.map((l) => l.userData.prox);
      const handles = lamps.map((l) => l.userData.handleHit);

      // 5. ANIMATION & STATE
      let auto = 0;
      let lastT = 0;
      let targetP = 0;
      let pC = 0;
      let detailIndex: number | null = null;
      let burst = 0;
      let dragRot = 0;
      let dragVel = 0;
      let dragging = false;
      let prevX = 0;
      let hoverIndex = -1;

      const ss = (a: number, b: number, x: number) => {
        x = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return x * x * (3 - 2 * x);
      };
      const mix = (a: number, b: number, k: number) => a + (b - a) * k;
      const eo = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

      function carouselPose(i: number, p: number) {
        const mob = isMobile();
        const a = (i * 2 * Math.PI) / 7 + Math.PI / 2 - p * Math.PI * 1.4 - auto;
        const rx = mob ? 2.5 : 5.0;
        const rz = 3.2;
        return {
          x: Math.cos(a) * rx,
          y: -0.1,
          z: Math.sin(a) * rz - rz,
          s: 0.8 + (0.2 * (Math.sin(a) + 1)) / 2,
        };
      }

      const ray = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const _v = new THREE.Vector3();

      function pick(e: PointerEvent | MouseEvent, list: any[]) {
        const r = canvas.getBoundingClientRect();
        mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(mouse, camera);
        return ray.intersectObjects(list, false);
      }

      function toggleLight(index: number) {
        const u = lamps[index].userData;
        u.on = !u.on;
        u.pull = 0.38;
        u.vel = 0;
        setActiveLampLightOn(u.on);
        playSound(u.on);
      }

      function openDetailView(index: number) {
        detailIndex = index;
        burst = Math.PI * 2;
        dragRot = 0;
        dragVel = 0;
        hoverIndex = -1;
        setActiveDetail(index);
        setActiveLampLightOn(lamps[index].userData.on);
      }

      function closeDetailView() {
        detailIndex = null;
        setActiveDetail(null);
      }

      // Expose to ref for UI buttons
      threeRef.current = {
        openDetail: (index: number) => openDetailView(index),
        closeDetail: () => closeDetailView(),
        toggleLampLight: (index: number) => toggleLight(index),
        rotateCarousel: (delta: number) => {
          auto += delta;
        },
      };

      // Pointer events for Canvas Dragging & Raycasting
      let downX = 0;
      let downY = 0;
      let downHandle = false;

      const onPointerDown = (e: PointerEvent) => {
        downX = e.clientX;
        downY = e.clientY;
        downHandle = false;

        if (detailIndex !== null) {
          if (pick(e, [handles[detailIndex]]).length) {
            downHandle = true;
            return;
          }
          dragging = true;
          prevX = e.clientX;
          dragVel = 0;
          try {
            canvas.setPointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        } else {
          dragging = true;
          prevX = e.clientX;
          dragVel = 0;
          try {
            canvas.setPointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (dragging) {
          const delta = e.clientX - prevX;
          prevX = e.clientX;

          if (detailIndex !== null) {
            dragVel = delta * 0.012;
            dragRot += dragVel;
          } else {
            // Drag to spin the carousel
            auto += delta * 0.005;
          }
          return;
        }

        if (detailIndex !== null) {
          canvas.style.cursor = pick(e, [handles[detailIndex]]).length ? "pointer" : "grab";
          return;
        }

        const visibleProxies = proxies.filter((p) => p.parent.scale.x > 0.3);
        const hits = pick(e, visibleProxies);
        hoverIndex = hits.length ? hits[0].object.userData.lamp.userData.i : -1;
        canvas.style.cursor = hoverIndex >= 0 ? "pointer" : "default";
      };

      const onPointerUp = (e: PointerEvent) => {
        const movedDist = Math.hypot(e.clientX - downX, e.clientY - downY);
        dragging = false;

        if (movedDist >= 8) return; // Ignore drag clicks

        if (detailIndex !== null) {
          if (downHandle) {
            toggleLight(detailIndex);
          } else {
            const hits = pick(e, [proxies[detailIndex]]);
            if (hits.length) {
              toggleLight(detailIndex);
            } else {
              closeDetailView();
            }
          }
          return;
        }

        const visibleProxies = proxies.filter((p) => p.parent.scale.x > 0.3);
        const hits = pick(e, visibleProxies);
        if (hits.length) {
          const targetIndex = hits[0].object.userData.lamp.userData.i;
          openDetailView(targetIndex);
        }
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);

      // Scroll listener for subtle parallax advance
      const onScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetP = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // 6. RENDER LOOP
      const clock = new THREE.Clock();

      function frame() {
        if (!isMounted) return;
        animId = requestAnimationFrame(frame);

        const t = clock.getElapsedTime();
        const dt = Math.min(t - lastT, 0.1);
        lastT = t;

        // Auto orbit when in carousel mode
        if (detailIndex === null && isAutoOrbit) {
          auto += dt * 0.14;
        }

        pC += (targetP - pC) * 0.08;
        const s2 = ss(0.62, 0.8, pC);

        if (!dragging) {
          dragRot += dragVel;
          dragVel *= 0.94;
        }
        burst += (0 - burst) * 0.05;

        const mob = isMobile();

        lamps.forEach((L, i) => {
          const u = L.userData;
          const cp = carouselPose(i, pC);
          let tx = cp.x;
          let ty = cp.y;
          let tz = cp.z;
          let ts = cp.s;
          let tr = u.rot;
          let tzr = 0;
          let txr = 0;

          if (detailIndex !== null) {
            if (i === detailIndex) {
              tx = mob ? 0 : 1.8;
              ty = mob ? 0.6 : 0;
              tz = 0;
              ts = mob ? 1.15 : 1.45;
              tr = dragRot + burst;
            } else {
              ts = 0; // Fade out other lamps
            }
          } else {
            tr = Math.sin(t * 0.6 + i) * 0.25;
            if (i === 4) {
              tx = mix(tx, mob ? 0 : 2.4, s2);
              ty = mix(ty, mob ? 0.6 : 0, s2);
              tz = mix(tz, 1.5, s2);
              ts = mix(ts, 1.35, s2);
              tr = mix(tr, Math.sin(t * 0.8) * 0.9 + 0.4, s2);
              tzr = 0.18 * s2;
              txr = 0.12 * s2;
            } else {
              ts = mix(ts, 0.5, s2);
            }

            if (hoverIndex === i) ts *= 1.08;

            const e = eo((t - 0.3 - i * 0.12) / 1.4);
            ty -= (1 - e) * 10;
            tr += (1 - e) * 6;
          }

          const k = detailIndex !== null ? 0.09 : 0.12;
          L.position.x += (tx - L.position.x) * k;
          L.position.y += (ty - L.position.y) * k;
          L.position.z += (tz - L.position.z) * k;
          L.scale.setScalar(Math.max(L.scale.x + (ts - L.scale.x) * k, 0.0001));

          u.rot += (tr - u.rot) * (detailIndex === i ? 0.15 : k);
          u.tx += (txr - u.tx) * 0.1;
          u.tz += (tzr - u.tz) * 0.1;
          L.rotation.set(u.tx, u.rot, u.tz);

          // Light state interpolation
          u.lit += ((u.on ? 1 : 0) - u.lit) * 0.1;
          u.bulbMat.emissiveIntensity = u.lit * 2.2;
          u.shadeMat.emissiveIntensity = 0.05 + u.lit * 0.45;
          u.glow.material.opacity = u.lit * 0.6;

          // Pull-cord spring physics + breeze sway
          u.vel += -u.pull * 0.15;
          u.vel *= 0.8;
          u.pull += u.vel;

          const len = 0.7 + u.pull;
          const sg = len / 8;
          const sw = Math.sin(t * 1.1 + i) * 0.05 + Math.sin(t * 1.9 + i * 2) * 0.025;
          u.cord.rotation.z = sw;
          u.cord.rotation.x = Math.sin(t * 0.7 + i) * 0.04;

          u.beads.forEach((b: any, j: number) => {
            const f = j / 7;
            b.position.set(Math.sin(t * 1.3 + i - f * 2.2) * 0.03 * f * f, -j * sg, 0);
          });
          u.handle.position.set(Math.sin(t * 1.3 + i - 2.2) * 0.03, -len - 0.08, 0);
        });

        if (detailIndex !== null) {
          const L = lamps[detailIndex];
          L.localToWorld(_v.set(0, 0.55, 0.6));
          spot.position.copy(_v);
          spot.intensity = L.userData.lit * 4.5;
        } else {
          spot.intensity = 0;
        }

        renderer.render(scene, camera);
      }

      // 7. RESIZE HANDLER
      function resize() {
        if (!container || !canvas || !isMounted) return;
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 600;
        const a = w / h;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);

        camera.aspect = a;
        camera.position.z = a < 1 ? 14 + (1 - a) * 9 : 14;
        camera.updateProjectionMatrix();
      }

      resize();
      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(container);
      }

      frame();
      setIsLoaded(true);

      cleanupEvents = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("scroll", onScroll);
        if (resizeObserver) resizeObserver.disconnect();
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        renderer.dispose();
      };
    }

    // Load Three.js if needed
    if (window.THREE) {
      initScene(window.THREE);
    } else {
      const existingScript = document.querySelector('script[src*="three.min.js"]');
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (window.THREE) initScene(window.THREE);
        });
      } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.async = true;
        script.onload = () => {
          if (window.THREE) initScene(window.THREE);
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
      cleanupEvents();
    };
  }, [playSound, isAutoOrbit]);

  const activeLamp = activeDetail !== null ? LAMPS_DATA[activeDetail] : null;

  return (
    <div className="space-y-6">
      {/* 1. Header with Luxury Serif Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs uppercase tracking-[0.25em] font-medium shadow-md">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Atelier Typologies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-100 tracking-tight mt-3">
            Seven Ways{" "}
            <span className="italic font-normal bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              to Glow.
            </span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-2xl mt-2 leading-relaxed">
            Drag horizontally to spin the 3D carousel. Tap any luminaire to inspect in 360°, tug the pull cord to test its ambient light, and commission directly to your bag.
          </p>
        </div>

        <Link
          href="/products"
          className="text-xs uppercase tracking-widest text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-2 self-start md:self-end group py-2"
        >
          <span>View Full Catalog</span>
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 2. Interactive 3D Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] sm:h-[660px] md:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#140a04] via-[#0B0B0D] to-[#120803] border border-orange-500/30 shadow-2xl select-none"
      >
        {/* Dynamic Warm Ambient Vignette */}
        <div className="absolute inset-0 bg-radial from-orange-600/15 via-transparent to-black/80 pointer-events-none" />

        {/* 3D WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block touch-none z-10"
          aria-label="Interactive 3D 7-lamp carousel. Drag to rotate, tap to inspect."
        />

        {/* Loading Spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0B0D]/95 space-y-3 pointer-events-none">
            <div className="w-10 h-10 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
            <span className="text-xs text-orange-400 font-mono tracking-wider">
              Sculpting 7-Lamp Atelier Carousel...
            </span>
          </div>
        )}

        {/* Top Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="px-3 py-1.5 rounded-full bg-stone-950/80 border border-orange-500/30 text-[11px] text-stone-300 hover:text-orange-300 transition-colors cursor-pointer backdrop-blur-md shadow-lg"
            title={isMuted ? "Unmute Switch Sound" : "Mute Switch Sound"}
          >
            {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
          </button>

          {/* Orbit Toggle */}
          {activeDetail === null && (
            <button
              type="button"
              onClick={() => setIsAutoOrbit(!isAutoOrbit)}
              className="px-3 py-1.5 rounded-full bg-stone-950/80 border border-orange-500/30 text-[11px] text-stone-300 hover:text-orange-300 transition-colors cursor-pointer backdrop-blur-md shadow-lg"
            >
              {isAutoOrbit ? "⏸ Pause Orbit" : "▶ Resume Orbit"}
            </button>
          )}
        </div>

        {/* DETAIL PANEL OVERLAY (Slides in when a lamp is tapped) */}
        {activeDetail !== null && activeLamp && (
          <div className="absolute inset-y-0 left-0 z-30 w-full sm:w-[380px] p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-r from-[#0B0B0D]/95 via-[#0B0B0D]/90 to-transparent backdrop-blur-sm pointer-events-auto animate-fade-in">
            {/* Top Close */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-orange-400 bg-orange-950/80 px-3 py-1 rounded-full border border-orange-500/40">
                Atelier 0{activeDetail + 1} • {activeLamp.category}
              </span>

              <button
                type="button"
                onClick={() => threeRef.current?.closeDetail()}
                className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/60 transition-colors cursor-pointer"
                title="Return to Lineup (Escape)"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Middle Info */}
            <div className="space-y-4 my-auto py-6">
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light leading-tight">
                  {activeLamp.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-serif text-2xl font-semibold text-amber-300">
                    {formatPrice(activeLamp.price)}
                  </span>
                  <span className="text-xs text-stone-500 line-through">
                    {formatPrice(activeLamp.originalPrice)}
                  </span>
                  <span
                    className={`ml-auto text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full ${
                      activeLampLightOn
                        ? "bg-orange-500 text-stone-950"
                        : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    {activeLampLightOn ? "Light On" : "Light Off"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {activeLamp.blurb}
              </p>

              {/* Interaction Guide */}
              <div className="bg-stone-950/60 p-3 rounded-2xl border border-orange-500/20 text-[11px] text-stone-400 space-y-1.5">
                <div className="flex items-center gap-2 text-orange-300 font-medium">
                  <span>💡 Interactive 360° Inspection</span>
                </div>
                <p className="text-[10px] leading-relaxed text-stone-400">
                  Drag the lamp left or right to spin. Click the pull-cord or tap the lamp to toggle the warm amber light.
                </p>
              </div>

              {/* Cord Switch Button */}
              <button
                type="button"
                onClick={() => threeRef.current?.toggleLampLight(activeDetail)}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-stone-200 border border-orange-500/30 text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{activeLampLightOn ? "Turn Light Off" : "Turn Light On"}</span>
                <span className="text-[10px] text-orange-400">(Tug Cord)</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-4 border-t border-stone-800/80">
              <button
                type="button"
                onClick={() => handleAddToCart(activeDetail)}
                className={`w-full py-3.5 px-6 rounded-2xl font-medium text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  addedAnimation
                    ? "bg-emerald-600 text-white shadow-emerald-600/40"
                    : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-600/35"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    <span>Added To Bag ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-4 h-4" />
                    <span>Add To Atelier Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => threeRef.current?.closeDetail()}
                className="w-full py-2 text-center text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              >
                ‹ Return to 7-Lamp Lineup
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM HUD CAROUSEL SELECTOR (Visible when no detail is open) */}
        {activeDetail === null && (
          <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col items-center gap-3 pointer-events-none">
            {/* Quick Lamp Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl px-3 py-2 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-orange-500/30 shadow-2xl pointer-events-auto">
              <button
                type="button"
                onClick={() => threeRef.current?.rotateCarousel(-0.35)}
                className="p-1.5 rounded-lg hover:bg-stone-800 text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                title="Rotate Left"
              >
                ◀
              </button>

              {LAMPS_DATA.map((lamp, i) => (
                <button
                  key={lamp.id}
                  type="button"
                  onClick={() => threeRef.current?.openDetail(i)}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-900/90 hover:bg-orange-950/70 border border-stone-800 hover:border-orange-500/50 text-xs text-stone-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: lamp.color }}
                  />
                  <span className="font-medium text-[11px]">{lamp.name}</span>
                  <span className="text-[10px] text-amber-300/80 font-mono hidden sm:inline">
                    {formatPrice(lamp.price)}
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => threeRef.current?.rotateCarousel(0.35)}
                className="p-1.5 rounded-lg hover:bg-stone-800 text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                title="Rotate Right"
              >
                ▶
              </button>
            </div>

            {/* Gentle Drag Indicator */}
            <div className="text-[10px] uppercase tracking-widest text-stone-400/80 flex items-center gap-1.5">
              <span>‹ Drag to spin 3D carousel • Tap any lamp for 360° inspection ›</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
