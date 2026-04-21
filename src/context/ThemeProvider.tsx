'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode, type MouseEvent } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e?: MouseEvent<HTMLElement>) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('rw-theme') as Theme | null;
        if (stored === 'light' || stored === 'dark') {
            setTheme(stored);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('rw-theme', theme);
    }, [theme, mounted]);

    const toggleTheme = useCallback((e?: MouseEvent<HTMLElement>) => {
        if (typeof window === 'undefined') return;
        
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        const doc = window.document;
        const docEl = doc.documentElement;

        // Get click coordinates for the circle animation origin
        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;

        // Calculate the maximum radius to cover the entire screen
        const maxRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // Set CSS custom properties for the animation origin BEFORE the transition
        docEl.style.setProperty('--theme-switch-x', `${x}px`);
        docEl.style.setProperty('--theme-switch-y', `${y}px`);
        docEl.style.setProperty('--theme-switch-r', `${maxRadius}px`);

        // Use View Transition API if available
        if ('startViewTransition' in doc) {
            // @ts-ignore - View Transition API is still experimental in some TS versions
            const transition = doc.startViewTransition(() => {
                setTheme(newTheme);
            });

            // Add class during transition for CSS targeting
            transition.ready.then(() => {
                docEl.classList.add('theme-transitioning');
            });

            transition.finished.then(() => {
                docEl.classList.remove('theme-transitioning');
                // Don't remove properties immediately to avoid jump if animation is still fading
                setTimeout(() => {
                    docEl.style.removeProperty('--theme-switch-x');
                    docEl.style.removeProperty('--theme-switch-y');
                    docEl.style.removeProperty('--theme-switch-r');
                }, 100);
            });
        } else {
            // Fallback: simple fade for older browsers
            docEl.classList.add('theme-fade');
            setTheme(newTheme);
            setTimeout(() => {
                docEl.classList.remove('theme-fade');
            }, 400);
        }
    }, [theme]);

    // Prevent flash of wrong theme
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
