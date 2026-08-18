import React, { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

// Portfolio developer file items for retro floating screensaver objects
const RETRO_FILES = [
    { label: 'JanNiti.py', type: 'PYTHON FILE' },
    { label: 'AgriChain.sol', type: 'SOLIDITY SMART CONTRACT' },
    { label: 'AaryanOS.jsx', type: 'REACT ENGINE' },
    { label: 'portfolio.db', type: 'SQL DATABASE' },
    { label: 'README.md', type: 'SYSTEM SPEC' },
    { label: 'docker-compose.yml', type: 'CONTAINER SPEC' },
    { label: 'skills.json', type: 'DIAGNOSTIC DATA' },
    { label: 'resume.pdf', type: 'SYSTEM DOCUMENT' }
];

export default function AmbientEnvironment() {
    const { serverStatus, accentColor, activeWindowId, isClassicMode } = useOS();
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
    const rasterPulseRef = useRef([]);

    useEffect(() => {
        const handleAppOpened = (e) => {
            const { fromRect } = e.detail || {};
            const cx = fromRect ? (fromRect.left + fromRect.width / 2) : (window.innerWidth / 2);
            const cy = fromRect ? (fromRect.top + fromRect.height / 2) : (window.innerHeight / 2);

            rasterPulseRef.current.push({
                x: cx,
                y: cy,
                radius: 10,
                maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.6,
                alpha: 0.8
            });
        };

        window.addEventListener('aaryan-os:app-opened', handleAppOpened);
        return () => window.removeEventListener('aaryan-os:app-opened', handleAppOpened);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.tx = (e.clientX / window.innerWidth) - 0.5;
            mouseRef.current.ty = (e.clientY / window.innerHeight) - 0.5;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize Retro Pixel Starfield
        const starCount = 90;
        const stars = Array.from({ length: starCount }, () => ({
            x: (Math.random() - 0.5) * 1600,
            y: (Math.random() - 0.5) * 1200,
            z: Math.random() * 1000 + 1,
            size: Math.random() > 0.8 ? 2 : 1
        }));

        // Initialize Floating Retro File Objects
        const floatingObjects = RETRO_FILES.map((file, i) => {
            const angle = (i / RETRO_FILES.length) * Math.PI * 2;
            return {
                ...file,
                x: Math.cos(angle) * (260 + (i % 3) * 60),
                y: Math.sin(angle) * (180 + (i % 3) * 40),
                z: 200 + i * 90,
                speed: 0.4 + (i % 3) * 0.2
            };
        });

        const render = () => {
            if (document.hidden) {
                animId = requestAnimationFrame(render);
                return;
            }

            const width = (canvas.width = window.innerWidth);
            const height = (canvas.height = window.innerHeight);
            const time = Date.now() / 1000;

            // Lerp Mouse Parallax
            mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.04;
            mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.04;

            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;
            const accent = accentColor || '#3b82f6';
            const isOnline = serverStatus === 'online';
            const speedMult = isOnline ? 1.0 : 0.4;

            // --- 1. PROCEDURAL RETRO VECTOR GRID HORIZON ---
            if (!isReducedMotion) {
                const gridY = cy + 120;
                ctx.strokeStyle = accent;
                ctx.lineWidth = 0.75;
                ctx.globalAlpha = isClassicMode ? 0.12 : 0.05;

                // Perspective Perspective Grid Lines
                const gridPerspectiveLines = 18;
                for (let i = -gridPerspectiveLines; i <= gridPerspectiveLines; i++) {
                    const startX = cx + i * 25;
                    const endX = cx + i * 120 + mouseRef.current.x * 200;
                    ctx.beginPath();
                    ctx.moveTo(startX, gridY);
                    ctx.lineTo(endX, height);
                    ctx.stroke();
                }

                // Horizontal Moving Grid Lines
                const offset = (time * 30 * speedMult) % 30;
                for (let y = gridY; y < height; y += 22) {
                    const lineY = y + offset;
                    if (lineY < height) {
                        ctx.beginPath();
                        ctx.moveTo(0, lineY);
                        ctx.lineTo(width, lineY);
                        ctx.stroke();
                    }
                }
                ctx.globalAlpha = 1.0;
            }

            // --- 2. CLASSIC RETRO STARFIELD (PIXEL ASTEROID FIELD) ---
            stars.forEach((star) => {
                star.z -= 1.2 * speedMult;
                if (star.z <= 0) star.z = 1000;

                const k = 400 / star.z;
                const px = cx + (star.x + mouseRef.current.x * 120) * k;
                const py = cy + (star.y + mouseRef.current.y * 120) * k;

                if (px >= 0 && px < width && py >= 0 && py < height) {
                    const alpha = Math.min(1.0, (1000 - star.z) / 1000) * (isClassicMode ? 0.45 : 0.2);
                    ctx.fillStyle = isClassicMode ? '#34d399' : accent;
                    ctx.globalAlpha = alpha;
                    ctx.fillRect(Math.floor(px), Math.floor(py), star.size, star.size);
                }
            });
            ctx.globalAlpha = 1.0;

            // --- 3. FLOATING RETRO DEVELOPER ASSETS SCREENSAVER ---
            if (!isReducedMotion) {
                floatingObjects.forEach((obj) => {
                    obj.z -= obj.speed * speedMult;
                    if (obj.z <= 50) obj.z = 900;

                    const scale = 300 / obj.z;
                    const px = cx + (obj.x + mouseRef.current.x * 180) * scale;
                    const py = cy + (obj.y + mouseRef.current.y * 180) * scale;

                    const fileWidth = 110 * scale;
                    const fileHeight = 32 * scale;

                    if (px > -100 && px < width + 100 && py > -100 && py < height + 100) {
                        const alpha = Math.min(0.7, (1000 - obj.z) / 900) * (isClassicMode ? 0.6 : 0.22);
                        ctx.globalAlpha = alpha;

                        // Retro Box Frame
                        ctx.strokeStyle = isClassicMode ? '#34d399' : accent;
                        ctx.lineWidth = 1;
                        ctx.strokeRect(px, py, fileWidth, fileHeight);

                        // Muted Fill
                        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
                        ctx.fillRect(px, py, fileWidth, fileHeight);

                        // Retro Pixel Label
                        if (scale > 0.45) {
                            ctx.font = `${Math.max(9, Math.floor(10 * scale))}px monospace`;
                            ctx.fillStyle = isClassicMode ? '#6ee7b7' : '#94a3b8';
                            ctx.fillText(obj.label, px + 6 * scale, py + 18 * scale);
                        }
                    }
                });
                ctx.globalAlpha = 1.0;
            }

            // --- 4. APP OPENING RETRO RASTER WAVE IMPULSE ---
            rasterPulseRef.current.forEach((pulse, idx) => {
                pulse.radius += 8;
                pulse.alpha -= 0.02;

                ctx.beginPath();
                ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
                ctx.strokeStyle = isClassicMode ? '#34d399' : accent;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = Math.max(0, pulse.alpha);
                ctx.stroke();

                if (pulse.alpha <= 0 || pulse.radius >= pulse.maxRadius) {
                    rasterPulseRef.current.splice(idx, 1);
                }
            });
            ctx.globalAlpha = 1.0;

            if (!isReducedMotion) {
                animId = requestAnimationFrame(render);
            }
        };

        render();

        return () => {
            if (animId) cancelAnimationFrame(animId);
        };
    }, [serverStatus, accentColor, isClassicMode]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Subtle Retro CRT Scanline Overlay */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isClassicMode ? 'opacity-25' : 'opacity-10'
                    }`}
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 0.4) 0px,
                        rgba(0, 0, 0, 0.4) 1px,
                        transparent 1px,
                        transparent 3px
                    )`
                }}
            />
        </div>
    );
}
