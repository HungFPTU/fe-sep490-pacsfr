"use client";

import React, { useState, useEffect } from 'react';

interface ScrollIndicatorProps {
    containerRef: React.RefObject<HTMLDivElement>;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ containerRef }) => {
    const [showTopShadow, setShowTopShadow] = useState(false);
    const [showBottomShadow, setShowBottomShadow] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            
            // Show top shadow if scrolled down
            setShowTopShadow(scrollTop > 10);
            
            // Show bottom shadow if not at bottom
            setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 10);
        };

        // Initial check
        handleScroll();

        container.addEventListener('scroll', handleScroll);
        
        // Check on resize
        const resizeObserver = new ResizeObserver(handleScroll);
        resizeObserver.observe(container);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            resizeObserver.disconnect();
        };
    }, [containerRef]);

    return (
        <>
            {/* Top shadow indicator */}
            {showTopShadow && (
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-yellow-50 to-transparent pointer-events-none z-20" />
            )}
            
            {/* Bottom shadow indicator */}
            {showBottomShadow && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-50 to-transparent pointer-events-none z-20" />
            )}
        </>
    );
};

