import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContentLayer = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const wordsRef = useRef(null);
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ---------------------------------------------
            // 1. HERO ANIMATION (The Rolling Text)
            // ---------------------------------------------
            // We pin the Hero section so it stays stuck on screen while words change
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",      // Start when top of section hits top of screen
                    end: "+=2000",         // Duration of the "scroll" (2000px)
                    pin: true,             // Stick it!
                    scrub: 1,              // Smooth linking to scrollbar
                    // markers: true       // <--- Uncomment this if you need to debug
                }
            });

            // The Animation: Move the list of words UP
            // We have 3 words. We want to stop on each one.
            // 'yPercent: -66' moves to the last word (approx)
            tl.to(wordsRef.current, {
                yPercent: -66.6,
                ease: "steps(2)", // "steps" makes it snap like a mechanical board (optional, use 'none' for smooth)
            });


            // ---------------------------------------------
            // 2. DASHBOARD ANIMATION (The Pop-Up Grid)
            // ---------------------------------------------
            // Select all direct children (divs) of the grid
            const blocks = gsap.utils.toArray(gridRef.current.children);

            gsap.fromTo(blocks,
                { y: 100, opacity: 0 }, // Start state: down and invisible
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2, // 0.2s delay between each block popping up
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%", // Start when top of grid hits 80% of screen height
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#fafafa',
            width: '100%',
            paddingBottom: '100px',
            overflow: 'hidden'
        }}>

            {/* ---------------------------------------------
          SECTION 1: HERO ("WE CREATE")
      --------------------------------------------- */}
            <div ref={heroRef} style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px'
            }}>

                {/* STATIC TOP TEXT */}
                <h2 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontFamily: 'Georgia, serif',
                    color: '#1a1a1a',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.1
                }}>
                    WE CREATE
                </h2>

                {/* ROTATING WORD CONTAINER */}
                {/* We make a window (height of 1 line) and hide the overflow */}
                <div style={{
                    height: 'clamp(3rem, 8vw, 6rem)', // Matches font size
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    {/* THE MOVING LIST */}
                    <div ref={wordsRef} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="word-item">STORIES</div>
                        <div className="word-item">EXPERIENCES</div>
                        <div className="word-item">MEMORIES</div>
                    </div>
                </div>

                {/* INLINE STYLES FOR THE WORDS */}
                <style>{`
          .word-item {
            font-size: clamp(3rem, 8vw, 6rem);
            font-family: Arial, sans-serif;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            text-align: center;
            line-height: 1; /* Tight line height */
            height: clamp(3rem, 8vw, 6rem); /* Height matches container */
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
            </div>


            {/* ---------------------------------------------
          SECTION 2: LOGIC (The Dashboard)
      --------------------------------------------- */}
            <div style={{
                padding: '100px 20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#555',
                    marginBottom: '80px',
                    maxWidth: '600px'
                }}>
                    Static sites are forgotten. Motion is remembered. We build high-performance experiences that rank high and load fast.
                </p>

                {/* THE GRID CONTAINER */}
                <div ref={gridRef} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px'
                }}>

                    {/* Block 1: Velocity */}
                    <div>
                        <div style={{
                            height: '150px',
                            background: '#eee',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px'
                        }}>
                            {/* Placeholder for Odometer */}
                            <span style={{ color: '#999' }}>SPEED.svg</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Velocity</h3>
                        <p style={{ color: '#666', lineHeight: 1.6 }}>
                            No video files. No bloat. Just pure, weightless code that loads instantly.
                        </p>
                    </div>

                    {/* Block 2: Visibility */}
                    <div>
                        <div style={{
                            height: '150px',
                            background: '#eee',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: '#999' }}>SEO.svg</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Visibility</h3>
                        <p style={{ color: '#666', lineHeight: 1.6 }}>
                            Google reads every word. High-performance SEO that doesn't sacrifice style.
                        </p>
                    </div>

                    {/* Block 3: Fluency */}
                    <div>
                        <div style={{
                            height: '150px',
                            background: '#eee',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px'
                        }}>
                            <span style={{ color: '#999' }}>DEVICE.svg</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Fluency</h3>
                        <p style={{ color: '#666', lineHeight: 1.6 }}>
                            One fluid experience across every device. From 27-inch iMacs to 5-inch screens.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ContentLayer;