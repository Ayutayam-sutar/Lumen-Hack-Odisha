import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {object} PromptExampleProps
 * @property {string} title - The title of the prompt example.
 * @property {string} prompt - The text content of the prompt.
 */

/**
 * A component to display an AI prompt example with a copy button.
 * @param {PromptExampleProps} props
 */
const PromptExample = ({ title, prompt }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Using document.execCommand for broader compatibility in restricted environments
    const textArea = document.createElement("textarea");
    textArea.value = prompt;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="not-prose">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 relative">
            <pre className="whitespace-pre-wrap text-sm text">
                <code>{prompt}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
                {copied ? t('learnAi.copied') : t('learnAi.copyPrompt')}
            </button>
        </div>
    </div>
  );
};

export default PromptExample;
