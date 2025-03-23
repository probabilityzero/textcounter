interface TextareaProps {
    content: string;
    onChange: (value: string) => void;
  }

  const Textarea: React.FC<TextareaProps> = ({ content, onChange }) => {
    return (
      <textarea
        className="w-full h-64 p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your text here..."
      />
    );
  };

  export default Textarea;
