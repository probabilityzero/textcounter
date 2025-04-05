import React, { useRef, useEffect, useState } from 'react';

interface TextareaProps {
  content: string;
  onChange: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({ content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPasting, setIsPasting] = useState(false);

  // Handle direct paste from clipboard with debounce to prevent freezing
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (isPasting) return; // Prevent multiple paste events from firing
      
      try {
        setIsPasting(true);
        
        // Let the browser handle the paste natively
        // This is more efficient than trying to extract and set the content ourselves
        console.log('Paste event detected');
        
        // Use setTimeout to avoid blocking the UI during paste
        setTimeout(() => {
          setIsPasting(false);
          
          // For very large pastes, give the browser time to render before getting value
          if (textareaRef.current && textareaRef.current.value.length > content.length + 10000) {
            // Add some visual feedback for large pastes
            console.log('Large paste detected, processing...');
          }
        }, 100);
      } catch (error) {
        console.error('Error handling paste:', error);
        setIsPasting(false);
      }
    };

    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.addEventListener('paste', handlePaste);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener('paste', handlePaste);
      }
    };
  }, [content.length, isPasting]);

  // Handle changes with throttling for large inputs
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // For very large text changes, use requestAnimationFrame to prevent UI freeze
    if (Math.abs(newValue.length - content.length) > 5000) {
      window.requestAnimationFrame(() => {
        onChange(newValue);
      });
    } else {
      onChange(newValue);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="text-area"
      value={content}
      onChange={handleChange}
      placeholder="Enter your text here to analyze..."
      aria-label="Text content"
      spellCheck={true}
      // Add a reasonable max length to prevent browser crashes
      maxLength={1000000} // 1M chars should be enough
    />
  );
};

export default Textarea;
