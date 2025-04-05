import React, { useRef, useEffect } from 'react';

interface TextareaProps {
  content: string;
  onChange: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({ content, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle direct paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      try {
        // We're already handling the paste in the textarea natively,
        // but we can add additional processing here if needed
        console.log('Paste event detected');
      } catch (error) {
        console.error('Error handling paste:', error);
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
  }, [onChange]);

  // Allow Ctrl+V to work properly
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ensure native paste behavior works as expected
    if (e.ctrlKey && e.key === 'v') {
      // Let the default behavior proceed
      console.log('Ctrl+V detected, allowing native paste');
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="text-area"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Enter your text here to analyze..."
      aria-label="Text content"
    />
  );
};

export default Textarea;
