import React from 'react';

const ContentLayer = () => {
    return (
        <div style={{
            position: 'relative',
            zIndex: 10, // Higher than Hotel (which is z-index 1 usually)
            backgroundColor: '#fafafa', // Apple Off-White
            width: '100%',
            paddingBottom: '100px', // Space at the bottom
            overflow: 'hidden' // Keeps things tidy
        }}>

            {/* ---------------------------------------------
          SECTION 1: HERO ("WE CREATE")
      --------------------------------------------- */}
            <div style={{
                height: '100vh', // Full screen height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px'
            }}>
                <h2 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)', // Responsive huge text
                    fontFamily: 'Georgia, serif', // Placeholder for your font
                    color: '#1a1a1a',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.1
                }}>
                    WE CREATE
                </h2>

                {/* The Rotating Word (Placeholder Static for now) */}
                <h2 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    fontFamily: 'Arial, sans-serif', // Contrast font
                    fontWeight: '900',
                    color: '#1a1a1a',
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.1
                }}>
                    STORIES
                </h2>
            </div>


            {/* ---------------------------------------------
          SECTION 2: LOGIC (The Dashboard)
      --------------------------------------------- */}
            <div style={{
                padding: '100px 20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Intro Text */}
                <p style={{
                    fontSize: '1.2rem',
                    color: '#555',
                    marginBottom: '80px',
                    maxWidth: '600px'
                }}>
                    Static sites are forgotten. Motion is remembered. We build high-performance experiences that rank high and load fast.
                </p>

                {/* The Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
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
                            justifyContent: 'center'
                        }}>
                            {/* PLACEHOLDER FOR ODOMETER SVG */}
                            [Speed Odometer SVG]
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Velocity</h3>
                        <p style={{ color: '#666', lineHeight: 1.6 }}>
                            No video files. No bloat. Just pure, weightless code that loads instantly.
                        </p>
                    </div>

                    {/* Block 2: Visibility (SEO) */}
                    <div>
                        <div style={{
                            height: '150px',
                            background: '#eee',
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* PLACEHOLDER FOR ODOMETER SVG */}
                            [SEO Dial SVG]
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
                            justifyContent: 'center'
                        }}>
                            {/* PLACEHOLDER FOR DEVICE SVG */}
                            [Device Icon SVG]
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