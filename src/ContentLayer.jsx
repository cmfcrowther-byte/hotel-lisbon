import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContentLayer = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const staticTextRef = useRef(null); // Ref for "ENGINEERING"
    const wordsRef = useRef(null);      // Ref for the rolling words
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ---------------------------------------------
            // 1. HERO ANIMATION (Roll & Split)
            // ---------------------------------------------
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=3000", // Long scroll distance
                    pin: true,
                    scrub: 1,
                }
            });

            // STEP A: Roll the words UP (Motion -> Immersion)
            tl.to(wordsRef.current, {
                yPercent: -66.6,
                ease: "steps(2)",
                duration: 2
            });

            // STEP B: The "Red Sea Split" (Forceful Version)
            // We use a label "split" to make sure they happen at the exact same time
            tl.add("split");

            // Move ENGINEERING to the Left (Off screen)
            tl.to(staticTextRef.current, {
                x: -window.innerWidth, // Move left by full screen width
                opacity: 0,
                ease: "power2.in",
                duration: 1
            }, "split");

            // Move IMMERSION to the Right (Off screen)
            tl.to(wordsRef.current, {
                x: window.innerWidth, // Move right by full screen width
                opacity: 0,
                ease: "power2.in",
                duration: 1
            }, "split");


            // ---------------------------------------------
            // 2. DASHBOARD ANIMATION (The Pop-Up Grid)
            // ---------------------------------------------
            const blocks = gsap.utils.toArray(gridRef.current.children);

            gsap.fromTo(blocks,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 70%",
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
          SECTION 1: HERO ("ENGINEERING...")
      --------------------------------------------- */}
            <div ref={heroRef} style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                overflow: 'hidden'
            }}>

                {/* CONTAINER FOR THE SPLIT ANIMATION */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>

                    {/* STATIC TOP TEXT ("ENGINEERING") */}
                    <h2 ref={staticTextRef} style={{
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)', // Small & Elegant
                        fontFamily: 'Georgia, serif',
                        color: '#1a1a1a',
                        margin: 0,
                        textAlign: 'center',
                        lineHeight: 1.1,
                        willChange: 'transform'
                    }}>
                        ENGINEERING
                    </h2>

                    {/* ROTATING WORD CONTAINER */}
                    <div style={{
                        height: 'clamp(2rem, 4vw, 3.5rem)', // Matches font size
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        {/* THE MOVING LIST */}
                        <div ref={wordsRef} style={{ display: 'flex', flexDirection: 'column', willChange: 'transform' }}>
                            <div className="word-item">MOTION</div>
                            <div className="word-item">ATTENTION</div>
                            <div className="word-item">IMMERSION</div>
                        </div>
                    </div>

                </div>

                {/* INLINE STYLES FOR THE WORDS */}
                <style>{`
          .word-item {
            font-size: clamp(2rem, 4vw, 3.5rem); 
            font-family: Arial, sans-serif;
            font-weight: 900;
            color: #1a1a1a;
            margin: 0;
            text-align: center;
            line-height: 1; 
            height: clamp(2rem, 4vw, 3.5rem);
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
                    maxWidth: '600px',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic'
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