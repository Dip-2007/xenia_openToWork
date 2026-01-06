import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  gradientColorStart?: string;
  gradientColorEnd?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  gradientColorStart = 'rgba(0, 0, 0, 0)',
  gradientColorEnd = '#060010',
  className = '',
  style = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // Use a Map to track decaying hover states: "x,y" -> intensity (0.0 to 1.0)
  const hoverMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width * 2 + canvas.height * 2) / 2
      );
      gradient.addColorStop(0, gradientColorStart);
      gradient.addColorStop(1, gradientColorEnd);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      // 1. Decay Hover Map
      hoverMap.current.forEach((intensity, key) => {
        const newIntensity = intensity - 0.05; // Decay rate
        if (newIntensity <= 0) {
          hoverMap.current.delete(key);
        } else {
          hoverMap.current.set(key, newIntensity);
        }
      });

      // 2. Draw Grid & Highlights
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          // Identity in grid coordinates
          const gridX = Math.floor((x - startX) / squareSize);
          const gridY = Math.floor((y - startY) / squareSize);
          const key = `${gridX},${gridY}`;

          // Draw highlight if active in map
          if (hoverMap.current.has(key)) {
            const intensity = hoverMap.current.get(key);
            // Parse base color to add alpha
            // Assuming hoverFillColor is rgba, we replace the alpha?
            // User provided "rgba(0, 119, 181, 0.1)"
            // Let's simple use global alpha for fill
            ctx.globalAlpha = intensity;
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
            ctx.globalAlpha = 1.0;
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      const key = `${hoveredSquareX},${hoveredSquareY}`;
      // Set to full intensity
      hoverMap.current.set(key, 1.0);
    };

    /* Legacy leave handler removed */

    canvas.addEventListener('mousemove', handleMouseMove);
    /* canvas.addEventListener('mouseleave', handleMouseLeave); */
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      /* canvas.removeEventListener('mouseleave', handleMouseLeave); */
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, gradientColorStart, gradientColorEnd]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', border: 'none', display: 'block', ...style }} className={className} />;
};

export default Squares;
