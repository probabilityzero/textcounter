import React from 'react';

interface TextareaProps {
  content: string;
  onChange: (value: string) => void;
}

const Textarea: React.FC<TextareaProps> = ({ content, onChange }) => {
  return (
    <textarea
      className="text-area"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your text here to analyze..."
      aria-label="Text content"
    />
  );
};

export default Textarea;
