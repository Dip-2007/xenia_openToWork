import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_BURST_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 350;

// CHANGED: Default to "Sky Blue" / Cyan (RGB for #0ea5e9)
const DEFAULT_GLOW_COLOR = '14, 165, 233'; 

// --- Utility: Random Range ---
const random = (min, max) => Math.random() * (max - min) + min;

// --- Component: Particle ---
const createParticleElement = (x, y, color) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: ${random(2, 6)}px;
    height: ${random(2, 6)}px;
    border-radius: 50%;
    background: rgb(${color});
    box-shadow: 0 0 10px rgb(${color});
    pointer-events: none;
    z-index: 20;
    left: ${x}px;
    top: ${y}px;
    will-change: transform, opacity;
  `;
  return el;
};

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  rainbow = false,
  enableTilt = false,
  clickEffect = false,
  enableMagnetism = false,
  magnetismStrength = 0.05,
  // CHANGED: Dark Slate Blue background to match the cyan theme better than black
  background = 'linear-gradient(180deg, #dfe6f3ff 0%, #98b7fbff 100%)'

}) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const particlesRef = useRef([]);
  const isHoveredRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, velX: 0, velY: 0, lastX: 0, lastY: 0 });

  // --- Logic: Dynamic Color (Rainbow) ---
  const getCurrentColor = useCallback(() => {
    if (!rainbow) return glowColor;
    const hue = (Date.now() / 20) % 360;
    return gsap.utils.hslaToRgb(`hsla(${hue}, 80%, 60%, 1)`).match(/\d+, \d+, \d+/)[0];
  }, [rainbow, glowColor]);

  // --- Logic: Particle Spawning ---
  const spawnParticle = useCallback((x, y, type = 'hover') => {
    if (!cardRef.current) return;
    
    const color = getCurrentColor();
    const particle = createParticleElement(x, y, color);
    cardRef.current.appendChild(particle);
    particlesRef.current.push(particle);

    if (type === 'burst') {
        const angle = random(0, Math.PI * 2);
        const velocity = random(50, 150);
        
        gsap.to(particle, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            scale: 0,
            duration: random(0.5, 1.2),
            ease: 'power3.out',
            onComplete: () => {
                particle.remove();
                particlesRef.current = particlesRef.current.filter(p => p !== particle);
            }
        });
    } else {
        const velX = mouseRef.current.velX * 0.5;
        const velY = mouseRef.current.velY * 0.5;

        gsap.to(particle, {
            x: (Math.random() - 0.5) * 60 + velX,
            y: (Math.random() - 0.5) * 60 + velY,
            opacity: 0,
            scale: 0.2,
            duration: random(1, 2.5),
            ease: 'power2.out',
            onComplete: () => {
                particle.remove();
                particlesRef.current = particlesRef.current.filter(p => p !== particle);
            }
        });
    }
  }, [getCurrentColor]);

  // --- Logic: Continuous Hover Loop ---
  useEffect(() => {
    if (disableAnimations) return;
    let interval;
    
    const loop = () => {
        if (isHoveredRef.current) {
             if (Math.random() > (1 - (particleCount / 100))) {
                const rect = cardRef.current.getBoundingClientRect();
                const spawnX = mouseRef.current.x - rect.left + (Math.random() - 0.5) * 20;
                const spawnY = mouseRef.current.y - rect.top + (Math.random() - 0.5) * 20;
                spawnParticle(spawnX, spawnY, 'hover');
             }
        }
    };

    interval = setInterval(loop, 50);
    return () => clearInterval(interval);
  }, [disableAnimations, particleCount, spawnParticle]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      gsap.to(element, { scale: 1.02, duration: 0.4, ease: 'back.out(1.7)' });
      element.style.setProperty('--glow-color', getCurrentColor());
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      gsap.to(element, {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
      if (contentRef.current) {
         gsap.to(contentRef.current.children, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      }
    };

    const handleMouseMove = e => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseRef.current.velX = e.clientX - mouseRef.current.lastX;
      mouseRef.current.velY = e.clientY - mouseRef.current.lastY;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.2,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
            x: (x - centerX) * magnetismStrength,
            y: (y - centerY) * magnetismStrength,
            duration: 0.4,
            ease: 'power2.out'
        });
      }

      const parallaxItems = element.querySelectorAll('[data-parallax]');
      parallaxItems.forEach(item => {
        const depth = parseFloat(item.getAttribute('data-parallax')) || 10;
        const moveX = ((x - centerX) / centerX) * depth;
        const moveY = ((y - centerY) / centerY) * depth;
        
        gsap.to(item, {
            x: moveX,
            y: moveY,
            duration: 0.2,
            ease: 'power1.out'
        });
      });
      
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
      if(rainbow) element.style.setProperty('--glow-color', getCurrentColor());
    };

    const handleClick = e => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < DEFAULT_BURST_COUNT; i++) {
        spawnParticle(x, y, 'burst');
      }

      gsap.fromTo(element, 
        { scale: 0.97 }, 
        { scale: 1.02, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
      );
      
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.background = `radial-gradient(circle, rgba(${getCurrentColor()}, 0.5) 0%, transparent 70%)`;
      element.appendChild(ripple);

      gsap.fromTo(ripple,
        { width: 0, height: 0, opacity: 1 },
        { width: 500, height: 500, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
    };
  }, [enableTilt, enableMagnetism, clickEffect, magnetismStrength, rainbow, spawnParticle, getCurrentColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} group relative isolate`}
      style={{ 
        ...style, 
        transformStyle: 'preserve-3d',
        '--glow-color': glowColor,
        // Remove background overrides here so style/className works
        border: style.border || `1px solid rgba(${glowColor}, 0.15)`,
        boxShadow: style.boxShadow || '0 4px 20px rgba(0,0,0,0.5)' 
      }}
    >
      {/* Background Glow Layer - Absolute, behind content but on top of base background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
            background: `
                radial-gradient(
                    circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                    rgba(var(--glow-color), 0.10) 0%, 
                    transparent 80%
                )
            `,
            opacity: 1, // Always visible logic handled by gradient transparency? Or passed prop?
            // If we want it to be subtle, maybe lower opacity
            borderRadius: 'inherit',
            zIndex: 0
        }}
      />

      <div ref={contentRef} className="relative z-10 w-full h-full pointer-events-none">
        <div className="pointer-events-auto w-full h-full">
            {children}
        </div>
      </div>
      
      {/* Interactive Border Glow */}
      <div 
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
            border: '1px solid rgba(var(--glow-color), 0.6)',
            boxShadow: 'inset 0 0 20px rgba(var(--glow-color), 0.1)',
            zIndex: 20
        }}
      />
    </div>
  );
};

const GlobalSpotlight = ({
  gridRef,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    Object.assign(spotlight.style, {
      position: 'fixed',
      width: `${spotlightRadius * 2}px`,
      height: `${spotlightRadius * 2}px`,
      borderRadius: '50%',
      pointerEvents: 'none',
      background: `radial-gradient(circle, rgba(${glowColor}, 0.1) 0%, transparent 70%)`,
      zIndex: 9999,
      transform: 'translate(-50%, -50%)',
      opacity: 0,
      mixBlendMode: 'screen',
      willChange: 'transform, opacity, left, top',
      transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
       gsap.to(spotlight, {
         left: e.clientX,
         top: e.clientY,
         duration: 0.5, 
         ease: 'power2.out'
       });

       const bounds = gridRef.current.getBoundingClientRect();
       const isInside = (
         e.clientX >= bounds.left && 
         e.clientX <= bounds.right && 
         e.clientY >= bounds.top && 
         e.clientY <= bounds.bottom
       );
       
       spotlight.style.opacity = isInside ? '1' : '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        spotlight.remove();
    }
  }, [gridRef, enabled, spotlightRadius, glowColor]);

  return null;
};

export { ParticleCard, GlobalSpotlight };
export default ParticleCard;