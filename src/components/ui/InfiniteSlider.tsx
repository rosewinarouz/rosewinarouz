'use client';
import { ReactNode, useState } from 'react';

export function InfiniteSlider({
    children,
    duration = 40,
}: {
    children: ReactNode;
    duration?: number;
}) {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                width: '100%',
                overflow: 'hidden',
                padding: '1rem 0'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <style>
                {`
                    @keyframes scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(-100%); }
                    }
                    .slider-content {
                        display: flex;
                        min-width: 100%;
                        flex-shrink: 0;
                        gap: 4rem;
                        align-items: center;
                        justify-content: space-around;
                        padding-right: 4rem;
                        animation: scroll ${duration}s linear infinite;
                    }
                `}
            </style>

            <div
                style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, width: '100px',
                    background: 'linear-gradient(to right, var(--theme-bg) 0%, rgba(var(--theme-bg-rgb), 0) 100%)', zIndex: 10, pointerEvents: 'none'
                }}
            />
            <div
                style={{
                    position: 'absolute', top: 0, bottom: 0, right: 0, width: '100px',
                    background: 'linear-gradient(to left, var(--theme-bg) 0%, rgba(var(--theme-bg-rgb), 0) 100%)', zIndex: 10, pointerEvents: 'none'
                }}
            />

            <div
                className="slider-content"
                style={{
                    animationPlayState: isPaused ? 'paused' : 'running'
                }}
            >
                {children}
            </div>

            <div
                className="slider-content"
                style={{
                    animationPlayState: isPaused ? 'paused' : 'running'
                }}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}
