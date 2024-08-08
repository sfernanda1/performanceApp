import React, { useRef, useState, MouseEvent } from 'react';

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!containerRef.current) return;
    setStartX(e.pageX - (containerRef.current.offsetLeft || 0));
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - (startX || 0)) * 2;
    containerRef.current.scrollLeft = (scrollLeft || 0) - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ overflowX: 'scroll', display: 'flex', flexWrap: 'nowrap', width: "90vw", gap: '10px', scrollbarWidth: 'none' }}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;