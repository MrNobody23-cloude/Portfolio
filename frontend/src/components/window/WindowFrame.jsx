import React, { useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { DynamicIcon } from '../../utils/iconMap';
import { playSound } from '../../utils/soundEffects';
import { Minus, Square, Copy, X } from 'lucide-react';

export default function WindowFrame({ window: win, children }) {
    const {
        activeWindowId,
        focusWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        updateWindowPosition,
        updateWindowSize,
        accentColor,
        settings
    } = useOS();

    const isActive = activeWindowId === win.id;
    const isMaximized = win.isMaximized;

    const windowRef = useRef(null);
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const posStart = useRef({ x: win.position.x, y: win.position.y });

    const isResizing = useRef(false);
    const resizeStart = useRef({ x: 0, y: 0, width: win.size.width, height: win.size.height });

    // Handle Dragging via Titlebar
    const handleMouseDownHeader = (e) => {
        if (isMaximized || e.target.closest('button')) return;
        focusWindow(win.id);
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        posStart.current = { x: win.position.x, y: win.position.y };

        window.addEventListener('mousemove', handleMouseMoveHeader);
        window.addEventListener('mouseup', handleMouseUpHeader);
    };

    const handleMouseMoveHeader = (e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const newX = Math.max(0, Math.min(window.innerWidth - 200, posStart.current.x + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - 100, posStart.current.y + dy));
        updateWindowPosition(win.id, { x: newX, y: newY });
    };

    const handleMouseUpHeader = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', handleMouseMoveHeader);
        window.removeEventListener('mouseup', handleMouseUpHeader);
    };

    // Handle Touch Drag for Mobile/Touch
    const handleTouchStartHeader = (e) => {
        if (isMaximized || e.target.closest('button')) return;
        focusWindow(win.id);
        const touch = e.touches[0];
        isDragging.current = true;
        dragStart.current = { x: touch.clientX, y: touch.clientY };
        posStart.current = { x: win.position.x, y: win.position.y };

        window.addEventListener('touchmove', handleTouchMoveHeader);
        window.addEventListener('touchend', handleTouchEndHeader);
    };

    const handleTouchMoveHeader = (e) => {
        if (!isDragging.current) return;
        const touch = e.touches[0];
        const dx = touch.clientX - dragStart.current.x;
        const dy = touch.clientY - dragStart.current.y;
        const newX = Math.max(0, Math.min(window.innerWidth - 100, posStart.current.x + dx));
        const newY = Math.max(0, Math.min(window.innerHeight - 100, posStart.current.y + dy));
        updateWindowPosition(win.id, { x: newX, y: newY });
    };

    const handleTouchEndHeader = () => {
        isDragging.current = false;
        window.removeEventListener('touchmove', handleTouchMoveHeader);
        window.removeEventListener('touchend', handleTouchEndHeader);
    };

    // Handle Resizing
    const handleMouseDownResize = (e) => {
        e.stopPropagation();
        focusWindow(win.id);
        isResizing.current = true;
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            width: win.size.width,
            height: win.size.height
        };

        window.addEventListener('mousemove', handleMouseMoveResize);
        window.addEventListener('mouseup', handleMouseUpResize);
    };

    const handleMouseMoveResize = (e) => {
        if (!isResizing.current) return;
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;
        const newW = Math.max(340, Math.min(window.innerWidth - win.position.x, resizeStart.current.width + dx));
        const newH = Math.max(260, Math.min(window.innerHeight - win.position.y - 48, resizeStart.current.height + dy));
        updateWindowSize(win.id, { width: newW, height: newH });
    };

    const handleMouseUpResize = () => {
        isResizing.current = false;
        window.removeEventListener('mousemove', handleMouseMoveResize);
        window.removeEventListener('mouseup', handleMouseUpResize);
    };

    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

    const handleWindowMouseMove = (e) => {
        if (!isActive || isMaximized || isDragging.current || isResizing.current) return;
        const isMobileOrTouch = window.innerWidth < 768 || 'ontouchstart' in window;
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobileOrTouch || isReducedMotion) return;

        if (!windowRef.current) return;
        const rect = windowRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        setTilt({
            x: relY * -2, // Max 1-2 deg X tilt
            y: relX * 2   // Max 1-2 deg Y tilt
        });
    };

    const handleWindowMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    if (win.isMinimized) return null;

    const stylePosition = isMaximized
        ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)', borderRadius: 0 }
        : {
            top: `${win.position.y}px`,
            left: `${win.position.x}px`,
            width: `${win.size.width}px`,
            height: `${win.size.height}px`
        };

    const transformStyle = (!isMaximized && (tilt.x !== 0 || tilt.y !== 0))
        ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
        : 'none';

    return (
        <div
            ref={windowRef}
            onClick={() => focusWindow(win.id)}
            onMouseMove={handleWindowMouseMove}
            onMouseLeave={handleWindowMouseLeave}
            style={{
                ...stylePosition,
                zIndex: win.zIndex,
                transform: transformStyle,
                boxShadow: isActive
                    ? `0 25px 65px -15px rgba(0,0,0,0.85), 0 0 25px -5px ${accentColor}40`
                    : '0 15px 35px -10px rgba(0,0,0,0.6)'
            }}
            className={`fixed flex flex-col rounded-2xl border transition-all duration-200 ease-out overflow-hidden backdrop-blur-2xl bg-slate-950/90 ${isActive
                ? 'border-[var(--accent-border)] ring-1 ring-[var(--accent-border)]'
                : 'border-slate-800/80 opacity-95'
                }`}
        >
            {/* Title Bar Chrome */}
            <div
                onMouseDown={handleMouseDownHeader}
                onTouchStart={handleTouchStartHeader}
                onDoubleClick={() => toggleMaximizeWindow(win.id)}
                className="h-10 px-3.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between select-none cursor-move shrink-0 backdrop-blur-xl"
            >
                {/* App Title & Icon */}
                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                    {/* Mac/Windows Style Traffic Light Accent Dot */}
                    <div className="flex items-center space-x-1.5 mr-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                    </div>

                    <DynamicIcon
                        name={win.icon}
                        className="w-4 h-4 shrink-0"
                        style={{ color: isActive ? accentColor : 'var(--color-text-muted)' }}
                    />
                    <span className="text-xs font-mono font-bold text-slate-200 truncate tracking-wide">
                        AARYAN OS // {win.title}
                    </span>
                </div>

                {/* Window Controls */}
                <div className="flex items-center space-x-1 shrink-0">
                    {/* Minimize */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            playSound('click', settings.soundEffects);
                            minimizeWindow(win.id);
                        }}
                        className="w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                        title="Minimize"
                    >
                        <Minus className="w-3.5 h-3.5" />
                    </button>

                    {/* Maximize / Restore */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            playSound('click', settings.soundEffects);
                            toggleMaximizeWindow(win.id);
                        }}
                        className="w-7 h-7 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                        title={isMaximized ? "Restore" : "Maximize"}
                    >
                        {isMaximized ? <Copy className="w-3 h-3 rotate-180" /> : <Square className="w-3 h-3" />}
                    </button>

                    {/* Close */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            playSound('close', settings.soundEffects);
                            closeWindow(win.id);
                        }}
                        className="w-7 h-7 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors"
                        title="Close"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Window Body Container */}
            <div className="flex-1 overflow-auto p-5 text-slate-200 relative scrollbar-thin bg-slate-950/70">
                {children}
            </div>

            {/* Resize Handle (Bottom Right) */}
            {!isMaximized && (
                <div
                    onMouseDown={handleMouseDownResize}
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
                >
                    <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-[var(--accent-primary)]"></div>
                </div>
            )}
        </div>
    );
}
