import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';

interface SwipeableViewsProps {
  children: React.ReactNode[];
  index: number;
  onChangeIndex: (index: number) => void;
  enableSwipe?: boolean;
  threshold?: number;
}

export default function SwipeableViews({ 
  children, 
  index, 
  onChangeIndex, 
  enableSwipe = true,
  threshold = 50
}: SwipeableViewsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Calcular el offset basado en el índice actual
  const offset = useTransform(x, (value) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    return -index * containerWidth + value;
  });
  
  useEffect(() => {
    x.set(0);
  }, [index, x]);
  
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (!enableSwipe) return;
    
    const { offset: dragOffset, velocity } = info;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    
    // Determinar si el swipe es suficiente para cambiar de vista
    const swipeThreshold = Math.min(threshold, containerWidth * 0.2);
    const shouldSwipe = Math.abs(dragOffset.x) > swipeThreshold || Math.abs(velocity.x) > 500;
    
    if (shouldSwipe) {
      if (dragOffset.x > 0 && index > 0) {
        // Swipe derecha - vista anterior
        onChangeIndex(index - 1);
      } else if (dragOffset.x < 0 && index < children.length - 1) {
        // Swipe izquierda - vista siguiente
        onChangeIndex(index + 1);
      }
    }
    
    // Reset position
    x.set(0);
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
    >
      <motion.div
        className="flex h-full"
        style={{ x: offset }}
        drag={enableSwipe ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={{ 
          x: isDragging ? undefined : -index * (containerRef.current?.offsetWidth || 0)
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-full"
            style={{ 
              pointerEvents: isDragging ? 'none' : 'auto',
              userSelect: isDragging ? 'none' : 'auto'
            }}
          >
            {child}
          </div>
        ))}
      </motion.div>
      
      {/* Indicadores de página */}
      {children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {children.map((_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.8 }}
              onClick={() => onChangeIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index 
                  ? 'bg-vortex-accent w-6' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Hook para manejar swipe gestures personalizados
export const useSwipeGesture = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold: number = 50
) => {
  const [startX, setStartX] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    
    setStartX(null);
  };
  
  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd
  };
};