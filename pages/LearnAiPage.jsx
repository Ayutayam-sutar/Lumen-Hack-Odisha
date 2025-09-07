import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/atoms/Card';
import { getAILearningContent } from '../services/geminiService';
import { ICONS } from '../constants';
import Button from '../components/atoms/Button';
import Skeleton from '../components/atoms/Skeleton';
import Input from '../components/atoms/Input';

// This is now the initial data, not a constant used for rendering
const INITIAL_TOPICS = [
    { id: 'Prompt Engineering', titleKey: 'learnAi.topicPrompting', icon: ICONS.learnAi },
    { id: 'Large Language Models', titleKey: 'learnAi.topicLLMs', icon: ICONS.aiTutor },
    { id: 'Machine Learning Basics', titleKey: 'learnAi.topicML', icon: ICONS.machineLearning },
    { id: 'AI in Cybersecurity', titleKey: 'learnAi.topicCybersecurity', icon: ICONS.cybersecurity },
];

const TopicCard = ({ topic, onSelect }) => {
    const { t } = useTranslation();
    return (
        <Card 
            className=" tracking-in-expand hover:shadow-lg hover:shadow-orange-400/50 hover:outline hover:outline-offset-1 hover:outline-1 hover:outline-orange-400 p-6 flex flex-col items-center text-center gap-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
            onClick={() => onSelect(topic.id)}
        >
            <div className="text-6xl text-primary">{topic.icon}</div>
            <h3 className="font-bold text-lg">{topic.isCustom ? topic.id : t(topic.titleKey)}</h3>
        </Card>
    );
}

const AddTopicCard = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <Card 
            className="p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-all duration-300 h-full"
            onClick={onClick}
        >
            <div className="text-6xl text-gray-400 dark:text-gray-500">+</div>
            <h3 className="font-bold text-lg text-gray-500 dark:text-gray-400">{t('learnAi.addNewTopic', 'Add New Topic')}</h3>
        </Card>
    );
};

const CreateTopicModal = ({ isOpen, onClose, onTopicCreate }) => {
    const { t } = useTranslation();
    const [newTopic, setNewTopic] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (newTopic.trim()) {
            onTopicCreate(newTopic.trim());
            setNewTopic('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">{t('learnAi.createTopicTitle', 'Create a New Study Topic')}</h2>
                <Input
                    label={t('learnAi.topicNameLabel', 'Topic Name')}
                    placeholder={t('learnAi.topicNamePlaceholder', 'e.g., Neural Networks')}
                    value={newTopic}
                    onChange={e => setNewTopic(e.target.value)}
                    autoFocus
                />
                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="secondary" onClick={onClose}>{t('common.cancel', 'Cancel')}</Button>
                    <Button variant="primary" onClick={handleSubmit} disabled={!newTopic.trim()}>{t('common.create', 'Create')}</Button>
                </div>
            </div>
        </div>
    );
};

const ContentDisplay = ({ content }) => {
    // This component remains unchanged
    const { t } = useTranslation();
    return (
        <Card className="hover:shadow-lg hover:shadow-orange-400/50 hover:outline hover:outline-offset-1 hover:outline-1 hover:outline-orange-400 p-8">
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <h1>{content.title}</h1>
                
                <h2 className="!mb-2 !text-2xl">{t('learnAi.introduction')}</h2>
                <p>{content.introduction}</p>

                <h2 className="!mb-2 !text-2xl">{t('learnAi.learningRoadmap')}</h2>
                <ol className="list-decimal pl-5 space-y-2">
                    {content.learningRoadmap.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>

                <h2 className="!mb-4 !text-2xl">{t('learnAi.keyConcepts')}</h2>
                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.keyConcepts.map((concept) => (
                        <Card key={concept.concept} className="p-4">
                            <h3 className="font-bold text-lg text-primary">{concept.concept}</h3>
                            <p className="text-sm">{concept.explanation}</p>
                        </Card>
                    ))}
                </div>

                <h2 className="!mt-8 !mb-4 !text-2xl">{t('learnAi.researchPapers')}</h2>
                <div className="not-prose space-y-4">
                    {content.researchPapers.map((paper) => (
                         <Card key={paper.title} className="p-4">
                            <h3 className="font-bold text-lg">{paper.title}</h3>
                            <p className="text-sm italic text-light-text-muted dark:text-dark-text-muted">{paper.authors}</p>
                            <p className="text-sm my-2">{paper.summary}</p>
                            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                                {t('learnAi.readPaper')} &rarr;
                            </a>
                        </Card>
                    ))}
                </div>
            </article>
        </Card>
    );
};


const LearnAiPage = () => {
    const { t } = useTranslation();
    const [topics, setTopics] = useState(INITIAL_TOPICS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(null);

    const handleAddNewTopic = (newTopicName) => {
        const newTopic = {
            id: newTopicName, // Use the name as the ID for custom topics
            titleKey: newTopicName,
            icon: ICONS.customTopic || '💡', // Provide a default icon
            isCustom: true, // Flag to indicate it's a user-created topic
        };
        setTopics(prevTopics => [...prevTopics, newTopic]);
        setIsCreateModalOpen(false);
    };

    useEffect(() => {
        if (selectedTopicId) {
            const fetchContent = async () => {
                setIsLoading(true);
                setContent(null);
              try {
                const fetchedContent = await getAILearningContent(selectedTopicId);
                setContent(fetchedContent);
              } catch (error) {
                  console.error("Failed to fetch AI content:", error);
                  // Optionally set an error state to show in the UI
              } finally {
                setIsLoading(false);
              }
            };
            fetchContent();
        }
    }, [selectedTopicId]);

    if (selectedTopicId) {
        return (
             <div>
                <Button onClick={() => setSelectedTopicId(null)} variant="secondary" className="mb-6">
                    &larr; {t('learnAi.backToTopics')}
                </Button>
                {isLoading && (
                     <Card className="p-8 space-y-6">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-5/6" />
                        <div className="pt-4 space-y-3">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </Card>
                )}
                {content && <ContentDisplay content={content} />}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">{t('learnAi.title')}</h1>
                <p className="text-lg text-light-text-muted dark:text-dark-text-muted">{t('learnAi.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {topics.map(topic => (
                   <TopicCard key={topic.id} topic={topic} onSelect={setSelectedTopicId} />
               ))}
                <AddTopicCard onClick={() => setIsCreateModalOpen(true)} />
            </div>
            <CreateTopicModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onTopicCreate={handleAddNewTopic}
            />
        </div>
    );
};

export default LearnAiPage;