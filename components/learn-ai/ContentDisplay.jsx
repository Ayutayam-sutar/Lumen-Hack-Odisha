import React from 'react';
import PromptExample from './PromptExample';
import Card from '../atoms/Card';

/**
 * @typedef {object} Example
 * @property {string} title
 * @property {string} prompt
 */

/**
 * @typedef {object} SectionData
 * @property {string} title
 * @property {string} content
 * @property {Example[]} [examples]
 */

/**
 * @typedef {object} ContentDisplayProps
 * @property {SectionData} section
 */

/**
 * Renders a formatted content section with a title, paragraphs, and optional prompt examples.
 * @param {ContentDisplayProps} props
 */
const ContentDisplay = ({ section }) => {
    return (
        <Card className="p-8">
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <h1>{section.title}</h1>
                {section.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}

                {section.examples && (
                    <div className="mt-8 space-y-6">
                        {section.examples.map((example, index) => (
                            <PromptExample key={index} title={example.title} prompt={example.prompt} />
                        ))}
                    </div>
                )}
            </article>
        </Card>
    );
};

export default ContentDisplay;
