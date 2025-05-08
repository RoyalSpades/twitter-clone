'use client'
import { useEffect, useState } from "react";

interface InlineXmlSvgProps extends React.SVGAttributes<SVGElement> {
    src: string; // path to xml file
    loadingFallback?: React.ReactNode; // Optional loading ui
    errorFallback?: React.ReactNode; // Optional Error UI
  }

const BannerLogo: React.FC<InlineXmlSvgProps> = ({ 
    src, 
    className,
    width,
    height,
    fill,
    stroke,
    viewBox,
    loadingFallback = <span>Loading...</span>,
    errorFallback = <span>Failed to load SVG</span>,
    ...rest
}) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        setSvgContent(null); // Reset on src change
        setError(false);

        fetch(src)
        .then((res) => {
            // if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then((xmlText) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            const svg = xmlDoc.querySelector('svg');
    
            if (!svg) throw new Error('No <svg> found');
    
            if (className) svg.setAttribute('class', className);
            if (width) svg.setAttribute('width', width.toString());
            if (height) svg.setAttribute('height', height.toString());
            if (fill) svg.setAttribute('fill', fill);
            if (stroke) svg.setAttribute('stroke', stroke);
            if (viewBox) svg.setAttribute('viewBox', viewBox);
    
        // Apply remaining props
        Object.entries(rest).forEach(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
              svg.setAttribute(key, value.toString());
            }
          });
  
          setSvgContent(svg.outerHTML);
        })
        .catch((err) => {
          console.error('SVG Load Error:', err);
          setError(true);
        });
    }, [src, className, width, height, fill, stroke, viewBox, rest]);

    if (error) return <>{errorFallback}</>;
    if (!svgContent) return <>{loadingFallback}</>;

    return (
        <div 
            className="Ducati999"
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

export default BannerLogo;