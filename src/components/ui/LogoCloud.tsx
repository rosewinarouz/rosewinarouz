import { useTheme } from '@/context/ThemeProvider';
import { InfiniteSlider } from './InfiniteSlider';
import Image from 'next/image';

export function LogoCloud({ logos }: { logos: { src: string; alt: string; height?: number }[] }) {
    const { theme } = useTheme();

    return (
        <InfiniteSlider duration={35}>
            {logos.map((logo, idx) => (
                <div
                    key={idx}
                    style={{
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        cursor: 'pointer',
                        padding: '10px 20px',
                        background: 'var(--theme-btn-subtle)',
                        borderRadius: '20px',
                        border: '1px solid var(--theme-border)',
                        boxShadow: 'var(--theme-shadow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '160px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                        e.currentTarget.style.background = 'var(--theme-btn-subtle-hover)';
                        e.currentTarget.style.borderColor = 'rgba(var(--rw-gold-rgb), 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.transform = 'scale(1) translateY(0)';
                        e.currentTarget.style.background = 'var(--theme-btn-subtle)';
                        e.currentTarget.style.borderColor = 'var(--theme-border)';
                    }}
                >
                    <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={180}
                        height={logo.height || 64}
                        style={{
                            objectFit: 'contain',
                            filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'grayscale(1) brightness(0.2)'
                        }}
                    />
                </div>
            ))}
        </InfiniteSlider>
    );
}
