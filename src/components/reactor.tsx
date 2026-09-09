"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { ArrowDown, Layers3 } from "lucide-react";
import { Orbit } from "./orbit";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(update: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

export function Reactor() {
  const section = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const requestDraw = useRef<(() => void) | null>(null);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced || paused) return;
    const element = host.current;
    const track = section.current;
    if (!element || !track) return;
    let disposed = false;
    let cleanup = () => {};
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const THREE = await import("three");
          if (disposed) return;
          const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          renderer.setClearColor(0x0c0e0d, 0);
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.15;
          element.appendChild(renderer.domElement);
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
          camera.position.set(0, 0, 12);
          const group = new THREE.Group();
          group.rotation.set(0.32, -0.48, -0.12);
          scene.add(group);
          scene.add(new THREE.HemisphereLight(0xe9ffd8, 0x151c16, 3));
          const key = new THREE.DirectionalLight(0xd3f5b3, 7);
          key.position.set(3, 4, 6);
          scene.add(key);
          const rim = new THREE.PointLight(0xb2d3ff, 65);
          rim.position.set(-4, -2, 3);
          scene.add(rim);
          const metal = new THREE.MeshStandardMaterial({
            color: 0x58625b,
            metalness: 0.88,
            roughness: 0.3,
          });
          const dark = new THREE.MeshStandardMaterial({
            color: 0x151b18,
            metalness: 0.75,
            roughness: 0.4,
          });
          const gold = new THREE.MeshStandardMaterial({
            color: 0xa59764,
            metalness: 0.8,
            roughness: 0.32,
          });
          const glow = new THREE.MeshStandardMaterial({
            color: 0xd3f5b3,
            emissive: 0xa3ee78,
            emissiveIntensity: 1.2,
            roughness: 0.35,
          });
          const layers: {
            mesh: InstanceType<typeof THREE.Object3D>;
            z: number;
            spread: number;
            radial?: number;
            angle?: number;
          }[] = [];
          const ring = (
            radius: number,
            tube: number,
            z: number,
            spread: number,
            material: typeof metal,
          ) => {
            const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 12, 80), material);
            mesh.position.z = z;
            group.add(mesh);
            layers.push({ mesh, z, spread });
          };
          ring(2.05, 0.18, -0.25, -1.5, dark);
          ring(1.98, 0.07, -0.04, -0.9, metal);
          ring(1.77, 0.055, 0.03, -0.45, glow);
          ring(1.28, 0.12, 0.2, 0.8, gold);
          ring(1.1, 0.05, 0.32, 1.1, glow);
          ring(0.82, 0.16, 0.42, 1.6, metal);
          ring(0.65, 0.04, 0.57, 1.9, glow);
          const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.48, 1), glow);
          group.add(core);
          layers.push({ mesh: core, z: 0.57, spread: 2.1 });
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const coil = new THREE.Group();
            for (let j = 0; j < 5; j++) {
              const fin = new THREE.Mesh(
                new THREE.BoxGeometry(0.27, 0.1, 0.35),
                j % 2 ? gold : metal,
              );
              fin.position.y = (j - 2) * 0.14;
              coil.add(fin);
            }
            coil.rotation.z = angle - Math.PI / 2;
            group.add(coil);
            layers.push({ mesh: coil, z: 0.08, spread: 0.25, radial: 1.58, angle });
            const bolt = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), glow);
            bolt.position.set(Math.cos(angle) * 2.04, Math.sin(angle) * 2.04, -0.04);
            group.add(bolt);
          }
          let frame = 0;
          let visible = true;
          const draw = () => {
            frame = 0;
            if (disposed || !visible) return;
            const p = progress.current;
            const expansion = Math.sin(p * Math.PI) ** 2;
            group.rotation.y = -0.48 + expansion * 0.9;
            group.rotation.x = 0.32 + expansion * 0.24;
            group.rotation.z = -0.12 + p * 0.25;
            layers.forEach(({ mesh, z, spread, radial, angle }) => {
              mesh.position.z = z + spread * expansion;
              if (radial !== undefined && angle !== undefined) {
                const distance = radial + expansion * 0.8;
                mesh.position.x = Math.cos(angle) * distance;
                mesh.position.y = Math.sin(angle) * distance;
              }
            });
            renderer.render(scene, camera);
          };
          const schedule = () => {
            if (!frame && !disposed && visible) frame = requestAnimationFrame(draw);
          };
          requestDraw.current = schedule;
          const resize = new ResizeObserver(() => {
            const { width, height } = element.getBoundingClientRect();
            renderer.setSize(width, height);
            camera.aspect = width / Math.max(height, 1);
            camera.position.z = camera.aspect < 0.8 ? 15 : width < 450 ? 9.5 : 12;
            camera.updateProjectionMatrix();
            schedule();
          });
          resize.observe(element);
          const visibility = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            schedule();
          });
          visibility.observe(element);
          const lost = (event: Event) => {
            event.preventDefault();
            setReady(false);
            visible = false;
          };
          renderer.domElement.addEventListener("webglcontextlost", lost);
          cleanup = () => {
            cancelAnimationFrame(frame);
            resize.disconnect();
            visibility.disconnect();
            requestDraw.current = null;
            renderer.domElement.removeEventListener("webglcontextlost", lost);
            scene.traverse((object) => {
              if (object instanceof THREE.Mesh) object.geometry.dispose();
            });
            [metal, dark, gold, glow].forEach((material) => material.dispose());
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
          };
          setReady(true);
          schedule();
        } catch {
          setReady(false);
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(track);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup();
    };
  }, [reduced, paused]);

  useEffect(() => {
    const update = () => {
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      progress.current = reduced || paused ? 0 : p;
      setPhase(reduced || paused ? 0 : p < 0.25 ? 0 : p < 0.75 ? 1 : 2);
      requestDraw.current?.();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced, paused]);

  const active = ready && !reduced && !paused;
  return (
    <section
      ref={section}
      id="reaktor"
      className={`reactor-track ${reduced || paused ? "reactor-static" : ""}`}
      aria-labelledby="reactor-title"
      data-phase={phase}
    >
      <div className="reactor-sticky container">
        <div className="reactor-copy">
          <span className="eyebrow">JARVIS / ÇEKİRDEĞİN İÇİNE BAK</span>
          <h2 id="reactor-title">
            Birlikte çalışan
            <br />
            <em>birçok parça.</em>
          </h2>
          <p>Bir cümle. Bir anlam. Bir eylem. Jarvis deneyimini oluşturan katmanları keşfet.</p>
          <div className="reactor-steps">
            {["Seni dinler.", "İsteğini anlamlandırır.", "Araçları bir araya getirir."].map(
              (text, i) => (
                <div key={text} className={phase === i ? "selected" : ""}>
                  <span>0{i + 1}</span>
                  {text}
                  <motion.i animate={{ scaleX: phase === i ? 1 : 0 }} />
                </div>
              ),
            )}
          </div>
          <p className="reactor-caption">Ürünün çalışma fikrini anlatan etkileşimli 3D model.</p>
          <button
            className="text-link"
            aria-pressed={paused}
            onClick={() => {
              setReady(false);
              setPaused(!paused);
            }}
          >
            <Layers3 size={16} />
            {paused ? "3D görünümü aç" : "Sade görünüme geç"}
          </button>
          <a className="reactor-skip text-link" href="#ozellikler">
            Yeteneklere geç <ArrowDown size={14} />
          </a>
        </div>
        <div
          className="reactor-visual"
          role="img"
          aria-label="Mint ışıklı, metal halkalar ve on iki bobinden oluşan Jarvis reaktörü. Kaydırırken katmanları ayrılır ve yeniden birleşir."
        >
          <div className="reactor-grid" />
          <div
            ref={host}
            className="reactor-canvas"
            style={{ opacity: active ? 1 : 0 }}
            aria-hidden="true"
          />
          {!active && (
            <div className="reactor-fallback">
              <Orbit />
            </div>
          )}
          <span className="reactor-coordinate">J / CORE — 012</span>
          <span className="reactor-state">
            {active
              ? ["01 — BÜTÜN", "02 — KATMANLAR", "03 — YENİDEN BİR ARADA"][phase]
              : "JARVIS / ÇEKİRDEK"}
          </span>
        </div>
      </div>
    </section>
  );
}
