import React, { useEffect, useRef } from 'react';
import CarSvg from './car.svg?react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rangerover = () => {
    const carRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. SETUP ASSETS
            // ------------------------------------------------
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


            // 2. THE LOGIC CONTROLLER
            // ------------------------------------------------
            ScrollTrigger.create({
                trigger: trackRef.current,

                // 🔴 DELAYED START:
                // Was: "20% top" (~1200px)
                // Now: "2500px top" -> Waits until you have scrolled 2500px down.
                // This guarantees the sky is pitch black before the car moves.
                start: "650px top",

                // ACTION A: SCROLLING DOWN (Drive Away)
                onEnter: () => {
                    // 1. Lights On
                    gsap.to(headlights, { opacity: 0.9, duration: 0.2 });

                    // 2. Drive Left (Off screen)
                    gsap.to(carRef.current, {
                        x: "-120vw",
                        duration: 4,
                        ease: "power1.in",
                        overwrite: true
                    });

                    // 3. Effects
                    spinWheels(4);
                    bounceCar(4);
                },

                // ACTION B: SCROLLING UP (Return & Park)
                onLeaveBack: () => {
                    // 1. Teleport to Right Side (Invisible)
                    gsap.set(carRef.current, { x: "100vw" });
                    gsap.set(headlights, { opacity: 0.9 });

                    // 2. Drive Left (Into Parking Spot)
                    gsap.to(carRef.current, {
                        x: 0,
                        duration: 3,
                        ease: "power2.out",
                        overwrite: true
                    });

                    // 3. Turn Lights OFF after parking
                    gsap.to(headlights, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 3
                    });

                    // 4. Effects
                    spinWheels(3);
                    bounceCar(3);
                }
            });

        });
        return () => ctx.revert();
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