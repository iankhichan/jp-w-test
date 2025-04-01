import React, { useCallback, useEffect, useRef, useState } from 'react';

interface DraggableWidgetProps {
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  className?: string;
}

export const DraggableStickyWidget: React.FC<DraggableWidgetProps> = ({
  children,
  initialPosition,
  className = '',
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    if (initialPosition) return initialPosition;
    // Default to center of screen
    return {
      x: typeof window !== 'undefined' ? window.innerWidth - 100 : 0,
      y: typeof window !== 'undefined' ? window.innerHeight - 100 : 0,
    };
  });

  const dragData = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const handleStartDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!widgetRef.current) return;

      setIsDragging(true);
      const rect = widgetRef.current.getBoundingClientRect();

      if ('touches' in e) {
        dragData.current = {
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          initialX: rect.left,
          initialY: rect.top,
        };
      } else {
        dragData.current = {
          startX: e.clientX,
          startY: e.clientY,
          initialX: rect.left,
          initialY: rect.top,
        };
      }
    },
    []
  );

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragData.current.startX;
      const deltaY = clientY - dragData.current.startY;

      const newX = dragData.current.initialX + deltaX;
      const newY = Math.max(
        0,
        Math.min(
          window.innerHeight - (widgetRef.current?.offsetHeight || 0),
          dragData.current.initialY + deltaY
        )
      );

      setPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleStopDrag = useCallback(() => {
    if (!isDragging || !widgetRef.current) return;

    setIsDragging(false);
    const rect = widgetRef.current.getBoundingClientRect();
    const distanceFromLeft = rect.left;
    const distanceFromRight = window.innerWidth - rect.right;

    // Snap to nearest edge
    const newX =
      distanceFromLeft < distanceFromRight ? 0 : window.innerWidth - rect.width;
    setPosition((prev) => ({ ...prev, x: newX }));
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('mouseup', handleStopDrag);
      window.addEventListener('touchend', handleStopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('mouseup', handleStopDrag);
      window.removeEventListener('touchend', handleStopDrag);
    };
  }, [isDragging, handleDrag, handleStopDrag]);

  return (
    <div
      ref={widgetRef}
      className={`fixed cursor-grab select-none touch-none p-0 ${
        isDragging ? 'cursor-grabbing' : ''
      } ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging
          ? 'none'
          : 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
        willChange: 'transform',
      }}
      onMouseDown={handleStartDrag}
      onTouchStart={handleStartDrag}
    >
      {children}
    </div>
  );
};
