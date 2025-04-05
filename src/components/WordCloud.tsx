import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

interface WordCloudProps {
  words: { text: string; value: number }[];
}

// Define a Word type to help TypeScript
interface Word {
  text: string;
  size: number;
  value: number;
  x?: number;
  y?: number;
  rotate?: number;
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!containerRef.current || words.length === 0) return;
    
    const width = containerRef.current.clientWidth;
    const height = 300;
    
    // Clear previous cloud
    d3.select(containerRef.current).selectAll("*").remove();
    
    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    
    // Color scheme based on theme
    const colorScheme = isDarkMode 
      ? d3.scaleOrdinal(["#f5d0a9", "#f5904c", "#e6b389", "#ffb74d", "#ffa726", "#ff9800"])
      : d3.scaleOrdinal(d3.schemeCategory10);
    
    // Find min and max values safely
    const minValue = Math.min(...words.map(d => d.value));
    const maxValue = Math.max(...words.map(d => d.value));
    
    // Scale font size based on value
    const fontSize = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([15, 60]);
    
    // Create the word cloud layout
    const layout = cloud()
      .size([width, height])
      .words(words.map(d => ({ 
        text: d.text, 
        size: fontSize(d.value), 
        value: d.value 
      } as Word)))
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font("Inter")
      .fontSize(d => d.size) // This is now safe because we've typed it properly
      .on("end", draw);
    
    layout.start();
    
    // Draw the words
    function draw(words: Word[]) {
      svg.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Inter, sans-serif")
        .style("fill", (_, i) => colorScheme(i.toString()))
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x || 0},${d.y || 0}) rotate(${d.rotate || 0})`)
        .text(d => d.text)
        .style("cursor", "pointer")
        .on("mouseover", function() {
          d3.select(this).style("opacity", 0.7);
        })
        .on("mouseout", function() {
          d3.select(this).style("opacity", 1);
        })
        .append("title")
        .text(d => `${d.text}: ${d.value}`);
    }
    
  }, [words, isDarkMode]);
  
  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-text-secondary">
        No words found for visualization
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="w-full h-64"></div>
  );
};

export default WordCloud;