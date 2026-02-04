import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 1. IMPORT YOUR COMPONENTS
import SkyBackground from './SkyBG';
import HotelVector from './HotelBG.svg?react';
import Rangerover from './Rangerover';

gsap.registerPlugin(ScrollTrigger);

// 🔴 FIX FOR MOBILE JITTER: Tell GSAP to ignore the address bar resizing
ScrollTrigger.config({ ignoreMobileResize: true });

// ==============================================
// 🎬 DIRECTOR'S SCRIPT
// ==============================================

const SKY_START = "top top";
const SKY_END = "1000px top";
const HOTEL_LIGHTS_START = "800px top";

// PHASE 1: FURNITURE (1200 -> 2400)
const FURNITURE_START = "1200px top";
const FURNITURE_END = "2400px top";

// PHASE 2: DOORS (2400 -> 3400)
const DOORS_START = "3000px top";
const DOORS_END = "3800px top";

// PHASE 3: FADE TO WHITE (3400 -> 4000)
const FADE_TO_WHITE_START = "3400px top";
const FADE_TO_WHITE_END = "4500px top";

// ==============================================

const ScrollMeter = () => {
    const [metrics, setMetrics] = useState({ percent: 0, pixels: 0 });
    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY;
            let percent = total > 0 ? (current / total) * 100 : 0;
            setMetrics({ percent: Math.round(Math.max(0, Math.min(percent, 100))), pixels: Math.round(current) });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div style={{
            position: 'fixed', top: 20, right: 20, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.85)', color: '#00FF00',
            padding: '10px 15px', borderRadius: '6px', fontFamily: 'monospace',
            fontWeight: 'bold', fontSize: '14px', pointerEvents: 'none', whiteSpace: 'pre'
        }}>
            SCROLL: {metrics.percent}%{"\n"}PIXELS: {metrics.pixels}px
        </div>
    );
};

const HotelLayer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- 1. WINDOW LIGHTS ---
            const windows = "#windowLights > g";
            gsap.set("#windowLights", { display: "block" });
            gsap.set(windows, { opacity: 0 });

            gsap.to(windows, {
                opacity: 0.8,
                ease: "none",
                duration: 0.05,
                stagger: { amount: 5, from: "random" },
                scrollTrigger: {
                    trigger: "body",
                    start: HOTEL_LIGHTS_START,
                    end: FURNITURE_START,
                    scrub: 1
                }
            });

            // --- 2. FURNITURE TIMELINE ---
            const furnitureTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: FURNITURE_START,
                    end: FURNITURE_END,
                    scrub: true
                }
            });

            const group1_Parasols = ["#TwoLeftParasol", "#OneLeftParasol", "#TwoRightParasol", "#OneRightParasol"];
            const group2_Tables = ["#TwoLeftTableChair", "#OneLeftTableChair", "#TwoRightTableChair", "#OneRightTableChair"];
            const group3_Trees = ["#LeftLemonTree", "#RightLemonTree"];

            furnitureTl.from(group1_Parasols, { y: 150, opacity: 0, duration: 1, ease: "power2.out" });
            furnitureTl.from(group2_Tables, { y: 150, opacity: 0, duration: 1, ease: "power2.out" });
            furnitureTl.from(group3_Trees, { y: 150, opacity: 0, duration: 1, ease: "power2.out" });

            // --- 3. DOOR TIMELINE ---
            const doorTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "body",
                    start: DOORS_START,
                    end: DOORS_END,
                    scrub: true
                }
            });

            const leftDoors = ["#onedoor-L-container", "#twodoor-L-container", "#threedoor-L-container"];
            const rightDoors = ["#onedoor-R-container", "#twodoor-R-container", "#threedoor-R-container"];

            doorTl.to(leftDoors, { scaleX: -1, transformOrigin: "left center", ease: "none" }, 0);
            doorTl.to(rightDoors, { scaleX: -1, transformOrigin: "right center", ease: "none" }, 0);

            // --- 4. WHITE SCREEN FADE IN ---
            gsap.fromTo("#white-overlay",
                { opacity: 0 },
                {
                    opacity: 1,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: "body",
                        start: FADE_TO_WHITE_START,
                        end: FADE_TO_WHITE_END,
                        scrub: true
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{
            position: 'fixed',

            /* 🔴 1. ANCHOR TO BOTTOM */
            bottom: 0,
            left: 0,
            width: '100%',

            /* 🔴 2. LOCK TO SMALL HEIGHT (No growing, no shrinking) */
            height: '100svh',

            /* 🔴 3. ALIGN TO BOTTOM */
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',

            zIndex: 1,
            pointerEvents: 'none'
        }}>

            {/* HOTEL ILLUSTRATION */}
            <HotelVector
                className="hotel-vector"
                style={{
                    /* 1. LIMIT WIDTH (Already there) */
                    maxWidth: '1600px',

                    /* 2. LIMIT HEIGHT (The Fix!) */
                    /* Never let the building be taller than 85% of the screen */
                    maxHeight: '85vh',

                    /* 3. MAINTAIN ASPECT RATIO */
                    height: 'auto',
                    width: 'auto',

                    /* 4. LAYOUT */
                    display: 'block',

                    /* 5. CENTER IT (Crucial if it shrinks) */
                    margin: '0 auto'
                }}
            />

            {/* WHITE OVERLAY SCREEN */}
            <div id="white-overlay" style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                backgroundColor: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
                opacity: 0
            }}>
                <div style={{ textAlign: 'center', color: 'black' }}>
                    <h1 style={{
                        fontFamily: '"Times New Roman", serif',
                        fontSize: '4rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        margin: 0
                    }}>
                        Hotel Lisbon
                    </h1>
                    <p style={{
                        fontFamily: 'sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.4em',
                        marginTop: '20px',
                        color: '#666'
                    }}>
                        OPENING 2028
                    </p>
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <div id="main-container" style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
            <SkyBackground start={SKY_START} end={SKY_END} />
            <ScrollMeter />
            <HotelLayer />

            {/* JEEP CONTAINER */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                <Rangerover />
            </div>

            {/* SPACER */}
            <div style={{ height: '8000px' }} />
        </div>
    );
}

export default App;