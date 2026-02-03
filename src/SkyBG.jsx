import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 🔴 WE ADD 'props' HERE SO IT CAN LISTEN TO APP.JSX
const Sky = (props) => {
    const skyRef = useRef(null);

    // 🔴 IF NO ORDERS ARE GIVEN, DEFAULT TO "bottom bottom"
    // BUT WE WILL GIVE IT ORDERS IN APP.JSX
    const startPoint = props.start || "top top";
    const endPoint = props.end || "bottom bottom";

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Debug: Let's log to console so you know it's receiving the order
            console.log("SKY ORDERS RECEIVED:", startPoint, endPoint);

            gsap.fromTo(skyRef.current,
                { backgroundColor: "#e4dcd1ff" }, // Day
                {
                    backgroundColor: "#00091dd4", // Night
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: startPoint,  // <--- LISTENS TO YOUR COMMAND
                        end: endPoint,      // <--- LISTENS TO YOUR COMMAND
                        scrub: 1
                    }
                }
            );
        });
        return () => ctx.revert();
    }, [startPoint, endPoint]); // <--- Updates if orders change

    return (
        <div ref={skyRef} style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            zIndex: 0, pointerEvents: 'none', backgroundColor: "#e4dcd1ff"
        }} />
    );
};

export default Sky;