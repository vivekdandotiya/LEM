'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function TeddyBearScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.appendChild(renderer.domElement);

    // --- Dynamic Screen Bounds Calculation ---
    // Computes visible half-width at z=0 so teddy bear always peeks from the exact left screen edge
    const getBounds = () => {
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const halfW = visibleWidth / 2;
      return {
        offscreenX: -halfW - 3.8,
        peekX: -halfW + 0.05, // True half-body peek: center rests slightly behind the left screen edge
      };
    };

    let bounds = getBounds();

    // --- Studio Lighting Setup ---
    // Warm key light
    const keyLight = new THREE.DirectionalLight('#fff2e3', 3.4);
    keyLight.position.set(4, 5, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Warm golden rim light (crucial for fuzzy fur silhouette against black)
    const rimLight = new THREE.DirectionalLight('#f7ac4f', 4.8);
    rimLight.position.set(-8, 3, -3);
    scene.add(rimLight);

    // Soft cool fill light
    const fillLight = new THREE.DirectionalLight('#93c5fd', 1.4);
    fillLight.position.set(5, -2, 5);
    scene.add(fillLight);

    // Subtle bottom amber bounce
    const bounceLight = new THREE.PointLight('#fef3c7', 2.0, 18);
    bounceLight.position.set(-3, -4, 4);
    scene.add(bounceLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight('#26201a', 1.5);
    scene.add(ambientLight);

    // --- Procedural Fur Texture Generation ---
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    // Dense micro-noise for plush velvet / felt fibers
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 52;
      const val = Math.min(255, Math.max(0, 128 + noise));
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
    }
    ctx.putImageData(imgData, 0, 0);

    // Subtle organic brush strokes for plush hair grain
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 700; i++) {
      ctx.beginPath();
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() - 0.5) * 14, y + (Math.random() - 0.5) * 14);
      ctx.stroke();
    }

    const furBumpMap = new THREE.CanvasTexture(canvas);
    furBumpMap.wrapS = THREE.RepeatWrapping;
    furBumpMap.wrapT = THREE.RepeatWrapping;
    furBumpMap.repeat.set(5, 5);

    // --- High-End PBR Materials ---
    // Rich warm caramel / chestnut teddy fur
    const furMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#9c5f2e'),
      roughness: 0.86,
      metalness: 0.02,
      sheen: 1.0,
      sheenColor: new THREE.Color('#f0af75'),
      sheenRoughness: 0.65,
      bumpMap: furBumpMap,
      bumpScale: 0.05,
    });

    // Soft cream / biscuit velvet for snout, belly & inner ears
    const patchMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e5cca8'),
      roughness: 0.92,
      metalness: 0.01,
      sheen: 0.9,
      sheenColor: new THREE.Color('#fef0dc'),
      sheenRoughness: 0.6,
      bumpMap: furBumpMap,
      bumpScale: 0.035,
    });

    // Dark stitched chocolate for nose & embroidery
    const noseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1f130b'),
      roughness: 0.78,
      metalness: 0.05,
    });

    // Glossy glass eyes with deep reflection & clearcoat
    const eyeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0a0604'),
      roughness: 0.02,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    // Tiny specular catchlight for eyes
    const catchlightMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ffffff'),
    });

    // --- Procedural Teddy Bear Hierarchy ---
    const teddyRoot = new THREE.Group();
    scene.add(teddyRoot);

    // 1. Torso Group
    const torsoGroup = new THREE.Group();
    teddyRoot.add(torsoGroup);

    // Plump pear-shaped body
    const bodyGeo = new THREE.SphereGeometry(1.5, 36, 36);
    const bodyMesh = new THREE.Mesh(bodyGeo, furMaterial);
    bodyMesh.scale.set(1.0, 1.28, 0.95);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    torsoGroup.add(bodyMesh);

    // Soft cream belly patch
    const bellyGeo = new THREE.SphereGeometry(1.05, 30, 30);
    const bellyMesh = new THREE.Mesh(bellyGeo, patchMaterial);
    bellyMesh.scale.set(0.85, 1.08, 0.38);
    bellyMesh.position.set(0, -0.15, 0.82);
    bellyMesh.castShadow = true;
    torsoGroup.add(bellyMesh);

    // 2. Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.9, 0.15);
    teddyRoot.add(headGroup);

    // Rounded head
    const headGeo = new THREE.SphereGeometry(1.3, 36, 36);
    const headMesh = new THREE.Mesh(headGeo, furMaterial);
    headMesh.scale.set(1.15, 1.06, 1.05);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Protruding snout / muzzle
    const snoutGeo = new THREE.SphereGeometry(0.62, 28, 28);
    const snoutMesh = new THREE.Mesh(snoutGeo, patchMaterial);
    snoutMesh.scale.set(1.08, 0.88, 1.15);
    snoutMesh.position.set(0, -0.18, 0.95);
    snoutMesh.castShadow = true;
    headGroup.add(snoutMesh);

    // Stitched nose
    const noseGeo = new THREE.SphereGeometry(0.2, 20, 20);
    const noseMesh = new THREE.Mesh(noseGeo, noseMaterial);
    noseMesh.scale.set(1.25, 0.8, 0.55);
    noseMesh.position.set(0, -0.05, 1.55);
    noseMesh.rotation.x = 0.25;
    headGroup.add(noseMesh);

    // Stitched smile / mouth line
    const mouthCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.18, -0.32, 1.48),
      new THREE.Vector3(-0.08, -0.42, 1.5),
      new THREE.Vector3(0.08, -0.42, 1.5),
      new THREE.Vector3(0.18, -0.32, 1.48)
    );
    const mouthGeo = new THREE.TubeGeometry(mouthCurve, 16, 0.022, 8, false);
    const mouthMesh = new THREE.Mesh(mouthGeo, noseMaterial);
    headGroup.add(mouthMesh);

    // Vertical seam connecting nose to mouth
    const seamCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, -0.16, 1.53),
      new THREE.Vector3(0, -0.35, 1.49)
    );
    const seamGeo = new THREE.TubeGeometry(seamCurve, 8, 0.02, 6, false);
    const seamMesh = new THREE.Mesh(seamGeo, noseMaterial);
    headGroup.add(seamMesh);

    // Glass Eyes (Left & Right)
    const eyeGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const catchlightGeo = new THREE.SphereGeometry(0.045, 12, 12);

    // Left Eye (Inner towards viewer)
    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(0.48, 0.22, 1.18);
    leftEye.scale.set(1, 1, 0.7);
    headGroup.add(leftEye);

    const leftCatchlight = new THREE.Mesh(catchlightGeo, catchlightMaterial);
    leftCatchlight.position.set(0.53, 0.27, 1.28);
    headGroup.add(leftCatchlight);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(-0.48, 0.22, 1.18);
    rightEye.scale.set(1, 1, 0.7);
    headGroup.add(rightEye);

    const rightCatchlight = new THREE.Mesh(catchlightGeo, catchlightMaterial);
    rightCatchlight.position.set(-0.43, 0.27, 1.28);
    headGroup.add(rightCatchlight);

    // Ears (Left & Right)
    const earOuterGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const earInnerGeo = new THREE.SphereGeometry(0.35, 20, 20);

    // Left Ear
    const leftEarGroup = new THREE.Group();
    leftEarGroup.position.set(1.15, 1.05, 0.1);
    leftEarGroup.rotation.z = -0.35;
    leftEarGroup.rotation.y = -0.2;

    const leftEarOuter = new THREE.Mesh(earOuterGeo, furMaterial);
    leftEarOuter.scale.set(0.9, 1.05, 0.42);
    leftEarGroup.add(leftEarOuter);

    const leftEarInner = new THREE.Mesh(earInnerGeo, patchMaterial);
    leftEarInner.scale.set(0.8, 0.95, 0.25);
    leftEarInner.position.set(0, -0.05, 0.12);
    leftEarGroup.add(leftEarInner);
    headGroup.add(leftEarGroup);

    // Right Ear
    const rightEarGroup = new THREE.Group();
    rightEarGroup.position.set(-1.15, 1.05, 0.1);
    rightEarGroup.rotation.z = 0.35;
    rightEarGroup.rotation.y = 0.2;

    const rightEarOuter = new THREE.Mesh(earOuterGeo, furMaterial);
    rightEarOuter.scale.set(0.9, 1.05, 0.42);
    rightEarGroup.add(rightEarOuter);

    const rightEarInner = new THREE.Mesh(earInnerGeo, patchMaterial);
    rightEarInner.scale.set(0.8, 0.95, 0.25);
    rightEarInner.position.set(0, -0.05, 0.12);
    rightEarGroup.add(rightEarInner);
    headGroup.add(rightEarGroup);

    // 3. Waving Arm Group (Left arm - the one facing inside towards the screen)
    const wavingArmPivot = new THREE.Group();
    wavingArmPivot.position.set(1.45, 0.7, 0.2);
    teddyRoot.add(wavingArmPivot);

    const upperArmGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const upperArm = new THREE.Mesh(upperArmGeo, furMaterial);
    upperArm.scale.set(0.85, 1.35, 0.85);
    upperArm.position.set(0.4, 0.45, 0.1);
    upperArm.rotation.z = -0.25;
    wavingArmPivot.add(upperArm);

    // Paw / Hand with soft cream pad facing camera
    const pawGeo = new THREE.SphereGeometry(0.5, 24, 24);
    const paw = new THREE.Mesh(pawGeo, furMaterial);
    paw.scale.set(0.95, 1.05, 0.7);
    paw.position.set(0.75, 1.2, 0.2);
    wavingArmPivot.add(paw);

    const pawPadGeo = new THREE.SphereGeometry(0.3, 20, 20);
    const pawPad = new THREE.Mesh(pawPadGeo, patchMaterial);
    pawPad.scale.set(0.9, 1.0, 0.25);
    pawPad.position.set(0.75, 1.2, 0.52);
    wavingArmPivot.add(pawPad);

    // 4. Resting Right Arm (Facing the left screen border)
    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(-1.4, 0.55, 0.1);
    teddyRoot.add(rightArmPivot);

    const rightArmMesh = new THREE.Mesh(upperArmGeo, furMaterial);
    rightArmMesh.scale.set(0.85, 1.35, 0.85);
    rightArmMesh.position.set(-0.25, -0.5, 0.1);
    rightArmMesh.rotation.z = 0.2;
    rightArmPivot.add(rightArmMesh);

    // 5. Plump Lower Body & Feet (Peeking)
    const legGeo = new THREE.SphereGeometry(0.72, 24, 24);
    const footPadGeo = new THREE.SphereGeometry(0.42, 20, 20);

    const leftFoot = new THREE.Mesh(legGeo, furMaterial);
    leftFoot.scale.set(0.9, 0.85, 1.25);
    leftFoot.position.set(0.95, -1.5, 0.4);
    torsoGroup.add(leftFoot);

    const leftFootPad = new THREE.Mesh(footPadGeo, patchMaterial);
    leftFootPad.scale.set(0.85, 0.95, 0.25);
    leftFootPad.position.set(0.95, -1.5, 1.05);
    torsoGroup.add(leftFootPad);

    const rightFoot = new THREE.Mesh(legGeo, furMaterial);
    rightFoot.scale.set(0.9, 0.85, 1.25);
    rightFoot.position.set(-0.95, -1.5, 0.4);
    torsoGroup.add(rightFoot);

    const rightFootPad = new THREE.Mesh(footPadGeo, patchMaterial);
    rightFootPad.scale.set(0.85, 0.95, 0.25);
    rightFootPad.position.set(-0.95, -1.5, 1.05);
    torsoGroup.add(rightFootPad);

    // Initial setup: Positioned at the dynamic left boundary, leaning ~30° into the frame
    teddyRoot.position.set(bounds.offscreenX, -0.6, 0);
    teddyRoot.rotation.set(0.04, 0.52, -0.06); // Leaning in from left border towards center
    teddyRoot.scale.set(1.05, 1.05, 1.05);

    // --- Interactive Mouse Tracking ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Animation Timeline ---
    // User request:
    // "come from the left side of screen half of the body and do hello by moving his hand
    //  then goes out of screen his half body then after 3 second come same things"
    //
    // Timeline breakdown:
    // 0.0s - 1.4s : Enter smoothly from left edge (offscreen -> peek half-body)
    // 1.4s - 4.6s : Waving "Hello" with paw, head bobbing cutely (~3.2s)
    // 4.6s - 5.8s : Slide back out to the left offscreen (~1.2s)
    // 5.8s - 8.8s : Exactly 3.0 SECONDS offscreen pause
    // Total cycle = 8.8 seconds
    const TOTAL_PERIOD = 8.8;
    const ENTER_END = 1.4;
    const WAVE_END = 4.6;
    const EXIT_END = 5.8;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easeOutBack = (t: number) => {
      const c1 = 1.35;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const cycleTime = elapsed % TOTAL_PERIOD;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const { offscreenX, peekX } = bounds;

      if (cycleTime < ENTER_END) {
        // --- PHASE 1: Slide in half-body from left edge ---
        const progress = cycleTime / ENTER_END;
        const eased = easeOutBack(progress);
        teddyRoot.position.x = offscreenX + (peekX - offscreenX) * eased;

        // Arm prepares for wave - raises vertically up
        wavingArmPivot.rotation.z = Math.sin(progress * Math.PI * 0.5) * 1.8;
        wavingArmPivot.rotation.x = -progress * 0.2;

        // Head tilts inquisitively
        headGroup.rotation.z = -0.1 + 0.15 * Math.sin(progress * Math.PI);
        headGroup.rotation.y = 0.35 - progress * 0.15;
      } else if (cycleTime < WAVE_END) {
        // --- PHASE 2: Waving "Hello" with paw raised high ---
        teddyRoot.position.x = peekX + Math.sin((cycleTime - ENTER_END) * 1.8) * 0.05;

        const waveTime = (cycleTime - ENTER_END) * 7.5; // Friendly wave frequency
        // Arm raised high, waving paw side-to-side without extending into center
        wavingArmPivot.rotation.z = 1.85 + Math.sin(waveTime) * 0.35;
        wavingArmPivot.rotation.x = -0.25 + Math.cos(waveTime * 0.5) * 0.12;
        wavingArmPivot.rotation.y = 0.15 + Math.sin(waveTime * 0.5) * 0.12;

        // Head tilts cutely and responds subtly to mouse
        headGroup.rotation.z = -0.08 + Math.sin((cycleTime - ENTER_END) * 2.8) * 0.08 + mouse.x * 0.08;
        headGroup.rotation.x = -mouse.y * 0.1;
        headGroup.rotation.y = 0.22 + Math.cos((cycleTime - ENTER_END) * 2.2) * 0.06 + mouse.x * 0.12;

        // Ears twitch slightly
        leftEarGroup.rotation.z = -0.35 + Math.sin(waveTime * 0.7) * 0.05;
        rightEarGroup.rotation.z = 0.35 - Math.sin(waveTime * 0.7) * 0.05;
      } else if (cycleTime < EXIT_END) {
        // --- PHASE 3: Slide back out offscreen ---
        const progress = (cycleTime - WAVE_END) / (EXIT_END - WAVE_END);
        const eased = easeInOutCubic(progress);
        teddyRoot.position.x = peekX - (peekX - offscreenX) * eased;

        // Arm lowers
        wavingArmPivot.rotation.z = 1.85 * (1 - progress);
        wavingArmPivot.rotation.x = -0.25 * (1 - progress);

        // Head rotates away slightly
        headGroup.rotation.z = -0.08 - 0.1 * progress;
        headGroup.rotation.y = 0.22 + progress * 0.25;
      } else {
        // --- PHASE 4: Exactly 3 seconds resting offscreen ---
        teddyRoot.position.x = offscreenX;
        wavingArmPivot.rotation.set(0, 0, 0);
        headGroup.rotation.set(0, 0.4, 0);
      }

      // Subtle breathing motion
      torsoGroup.scale.y = 1.0 + Math.sin(elapsed * 2.2) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // --- Responsive Resize Handler ---
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth || window.innerWidth;
      const newHeight = mount.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      bounds = getBounds();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeo.dispose();
      bellyGeo.dispose();
      headGeo.dispose();
      snoutGeo.dispose();
      noseGeo.dispose();
      mouthGeo.dispose();
      seamGeo.dispose();
      eyeGeo.dispose();
      catchlightGeo.dispose();
      earOuterGeo.dispose();
      earInnerGeo.dispose();
      upperArmGeo.dispose();
      pawGeo.dispose();
      pawPadGeo.dispose();
      legGeo.dispose();
      footPadGeo.dispose();
      furMaterial.dispose();
      patchMaterial.dispose();
      noseMaterial.dispose();
      eyeMaterial.dispose();
      catchlightMaterial.dispose();
      furBumpMap.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return null;
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
