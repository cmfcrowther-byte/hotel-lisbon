import React, { useEffect, useRef } from 'react';
import CarSvg from './car.svg?react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rangerover = () => {
    const carRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        // We use matchMedia to handle Mobile vs Desktop logic separately
        const mm = gsap.matchMedia();

        // 1. SHARED SETUP (Assets & Helpers)
        // ------------------------------------------------
        // These run once and are available to both mobile and desktop logic
        const wheels = gsap.utils.toArray("[id*='wheel-']");
        wheels.sort((a, b) => (a.id > b.id) ? 1 : -1);
        wheels.forEach(w => w.style.display = 'none');
        if (wheels.length > 0) wheels[0].style.display = 'block';

        const headlights = gsap.utils.selector(carRef.current)("#headlight-beam");
        const svgElement = carRef.current.querySelector("svg");

        gsap.set(headlights, { opacity: 0 });

        // Helper: Spin Wheels
        const spinWheels = (duration) => {
            if (wheels.length === 0) return;
            const proxy = { frame: 0 };
            gsap.to(proxy, {
                frame: wheels.length * 20,
                duration: duration,
                ease: "none",
                onUpdate: () => {
                    const index = Math.floor(proxy.frame) % wheels.length;
                    wheels.forEach((w, i) => {
                        w.style.display = (i === index) ? 'block' : 'none';
                    });
                }
            });
        };

        // Helper: Bounce Car
        const bounceCar = (duration) => {
            gsap.fromTo(svgElement,
                { y: 0 },
                {
                    y: 4,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    duration: 0.15
                }
            );
            gsap.delayedCall(duration, () => {
                gsap.killTweensOf(svgElement);
                gsap.to(svgElement, { y: 0, duration: 0.2 });
            });
        };


        // 2. DESKTOP LOGIC (Min-Width: 769px)
        // ------------------------------------------------
        // 🔴 STRICTLY NO CHANGES HERE (As requested)
        mm.add("(min-width: 769px)", () => {

            // Ensure car starts at parking spot (x: 0) on Desktop
            gsap.set(carRef.current, { x: 0 });

            ScrollTrigger.create({
                trigger: trackRef.current,
                start: "650px top",

                // ACTION A: Drive Away
                onEnter: () => {
                    gsap.to(headlights, { opacity: 0.9, duration: 0.2 });
                    gsap.to(carRef.current, {
                        x: "-120vw",
                        duration: 4,
                        ease: "power1.in",
                        overwrite: true
                    });
                    spinWheels(4);
                    bounceCar(4);
                },

                // ACTION B: Return & Park
                onLeaveBack: () => {
                    gsap.set(carRef.current, { x: "100vw" });
                    gsap.set(headlights, { opacity: 0.9 });
                    gsap.to(carRef.current, {
                        x: 0,
                        duration: 3,
                        ease: "power2.out",
                        overwrite: true
                    });
                    gsap.to(headlights, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 3
                    });
                    spinWheels(3);
                    bounceCar(3);
                }
            });
        });


        // 3. MOBILE LOGIC (Max-Width: 768px)
        // ------------------------------------------------
        // 🔴 NEW LOGIC: Start Off-Screen Right -> Roll Through -> Disappear Left
        mm.add("(max-width: 768px)", () => {

            // 1. Start HIDDEN off to the right
            gsap.set(carRef.current, { x: "120vw" });

            ScrollTrigger.create({
                trigger: trackRef.current,
                start: "650px top",

                // ACTION A: Drive ACROSS the screen (Right to Left)
                onEnter: () => {
                    // Lights On
                    gsap.to(headlights, { opacity: 0.9, duration: 0.2 });

                    // Drive from Off-Screen Right ("120vw") to Off-Screen Left ("-120vw")
                    gsap.fromTo(carRef.current,
                        { x: "120vw" }, // Force start point
                        {
                            x: "-150vw", // Drive all the way off left
                            duration: 5, // Slightly slower for dramatic effect
                            ease: "power1.inOut",
                            overwrite: true
                        }
                    );

                    spinWheels(5);
                    bounceCar(5);
                },

                // ACTION B: Reset (If they scroll back up)
                onLeaveBack: () => {
                    // Drive back to hiding spot on the right?
                    gsap.to(carRef.current, {
                        x: "120vw", // Go back to waiting room
                        duration: 3,
                        ease: "power2.inOut",
                        overwrite: true
                    });

                    gsap.to(headlights, { opacity: 0, duration: 0.5 });
                    spinWheels(3);
                    bounceCar(3);
                }
            });
        });

        return () => mm.revert(); // Clean up both when component unmounts
    }, []);

    return (
        <>
            <div ref={carRef} style={{
                position: 'fixed',
                bottom: '2%',
                right: '5%',
                left: 'auto',
                width: '450px',
                zIndex: 100,
                pointerEvents: 'none'
            }}>
                <CarSvg style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            <div ref={trackRef} style={{
                width: '100%',
                height: '6000px',
                position: 'relative',
                zIndex: -1,
            }}>
            </div>
        </>
    );
};

export default Rangerover;