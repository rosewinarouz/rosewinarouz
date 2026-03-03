'use client';

import { motion, useMotionValueEvent, useTransform, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './HomeFeatured.module.css';

export default function HomeFeatured() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const FRAME_COUNT = 38;

    const scrollYProgress = useMotionValue(0);

    // Initial logo fades out immediately [0.0 - 0.1]
    const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    // Staggered scroll animations based on scrollYProgress mapped [0, 1]
    // Title appears [0.0 - 0.2]
    const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

    // Paragraph appears after title [0.2 - 0.4]
    const descOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const descY = useTransform(scrollYProgress, [0.2, 0.4], [20, 0]);

    // Buttons appear last [0.4 - 0.6]
    const buttonsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const buttonsY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        let parent = wrapper.parentElement;
        let scrollContainer: HTMLElement | Window = window;
        while (parent) {
            const style = window.getComputedStyle(parent);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                scrollContainer = parent;
                break;
            }
            parent = parent.parentElement;
        }

        const handleScroll = () => {
            if (!wrapper) return;
            const rect = wrapper.getBoundingClientRect();

            let containerHeight = window.innerHeight;
            let containerTop = 0;

            if (scrollContainer !== window) {
                const containerRect = (scrollContainer as HTMLElement).getBoundingClientRect();
                containerHeight = containerRect.height;
                containerTop = containerRect.top;
            }

            const scrollDistance = wrapper.offsetHeight - containerHeight;
            let progress = 0;

            if (scrollDistance > 0) {
                progress = (containerTop - rect.top) / scrollDistance;
            }

            progress = Math.max(0, Math.min(1, progress));
            scrollYProgress.set(progress);
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        // Initial setup
        setTimeout(handleScroll, 100);

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [scrollYProgress]);

    const drawFrame = (index: number, imgs: HTMLImageElement[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        if (!imgs[index]) return;
        const img = imgs[index];
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new window.Image();
            img.src = `/animation/ezgif-frame-${i.toString().padStart(3, '0')}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    // Initial draw and resize handler
    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor((1 - scrollYProgress.get()) * FRAME_COUNT))
            );
            drawFrame(frameIndex, images, canvas, ctx);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [isLoaded, images, scrollYProgress]);

    // Scroll update handler
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.floor((1 - latest) * FRAME_COUNT))
        );
        requestAnimationFrame(() => drawFrame(frameIndex, images, canvasRef.current!, ctx));
    });

    return (
        <div ref={wrapperRef} className={styles.heroWrapper}>
            <section className={styles.heroSection}>
                <canvas
                    ref={canvasRef}
                    className={styles.backgroundLayer}
                />

                <div className={styles.overlay} />

                {/* Initial Logo */}
                <motion.div
                    style={{ opacity: logoOpacity, scale: logoScale }}
                    className={styles.initialLogo}
                >
                    <Image
                        src="/logo - RGB.png"
                        alt="Rose Winarouz Logo"
                        width={300}
                        height={300}
                        priority
                    />
                </motion.div>

                <motion.div className={styles.content}>
                    <motion.h1
                        style={{ opacity: titleOpacity, y: titleY }}
                        className={styles.title}
                    >
                        Agir localement pour <br />
                        <span>transformer durablement</span> <br />
                        les territoires
                    </motion.h1>

                    <motion.p
                        style={{ opacity: descOpacity, y: descY }}
                        className={styles.subtitle}
                    >
                        Rose Winarouz est une association engagée dans le développement territorial durable et l’intelligence des territoires.
                    </motion.p>

                    <motion.div
                        style={{ opacity: buttonsOpacity, y: buttonsY }}
                        className={styles.actions}
                    >
                        <button className={styles.primaryBtn}>
                            <span>Découvrir notre vision</span>
                        </button>
                        <button className={styles.secondaryBtn}>
                            <span>Soutenir l'action</span>
                        </button>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
