import React, { useRef, useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { DynamicIcon } from '../../utils/iconMap';
import { playSound } from '../../utils/soundEffects';

export default function DesktopIcon({ id, name, icon, color, onClick, onDoubleClick, externalUrl }) {
    const { settings } = useOS();
    const iconRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const isMobileOrTouch = window.innerWidth < 768 || 'ontouchstart' in window;
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobileOrTouch || isReducedMotion) return;

        const handleMouseMove = (e) => {
            if (!iconRef.current) return;
            const rect = iconRef.current.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const iconCenterY = rect.top + rect.height / 2;

            const dist = Math.hypot(e.clientX - iconCenterX, e.clientY - iconCenterY);
            const maxDist = 90;

            if (dist < maxDist) {
                const factor = (1 - dist / maxDist) * 4; // Max 4px movement
                const angle = Math.atan2(e.clientY - iconCenterY, e.clientX - iconCenterX);
                setOffset({
                    x: Math.cos(angle) * factor,
                    y: Math.sin(angle) * factor
                });
            } else {
                setOffset({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setOffset({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleAction = (e) => {
        e.stopPropagation();
        playSound('open', settings.soundEffects);
        if (iconRef.current) {
            window.dispatchEvent(
                new CustomEvent('aaryan-os:app-opened', {
                    detail: { appId: id, fromRect: iconRef.current.getBoundingClientRect() }
                })
            );
        }
        if (externalUrl) {
            window.open(externalUrl, '_blank', 'noopener,noreferrer');
        } else if (onDoubleClick) {
            onDoubleClick();
        } else if (onClick) {
            onClick();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAction(e);
        }
    };

    return (
        <div
            ref={iconRef}
            tabIndex={0}
            onClick={handleAction}
            onKeyDown={handleKeyDown}
            style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
            }}
            className="group w-24 p-2 rounded-xl flex flex-col items-center justify-center space-y-1.5 cursor-pointer select-none transition-transform duration-200 ease-out focus:outline-none hover:bg-slate-800/40 hover:scale-105 active:scale-95 border border-transparent"
            title={name}
        >
            {/* Icon Container */}
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-200 group-hover:scale-110 ${color || 'bg-slate-700'}`}
            >
                <DynamicIcon name={icon} className="w-6 h-6" />
            </div>

            {/* Label */}
            <span className="text-[11px] font-medium text-slate-200 text-center leading-tight tracking-wide drop-shadow truncate max-w-full px-1">
                {name}
            </span>
        </div>
    );
}
