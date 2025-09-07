// Inside src/components/study-groups/EditGroupModal.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const EditGroupModal = ({ isOpen, onClose, group, onUpdateGroup }) => {
    const { t } = useTranslation();
    // Initialize state with the group's current details
    const [formData, setFormData] = useState({
        name: group?.name || '',
        subject: group?.subject || '',
        description: group?.description || '',
    });

    // This effect ensures the form updates if a different group is selected
    useEffect(() => {
        if (group) {
            setFormData({
                name: group.name,
                subject: group.subject,
                description: group.description,
            });
        }
    }, [group]);

    if (!isOpen || !group) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateGroup(formData); // Pass the updated data to the parent
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-light-bg-alt dark:bg-dark-bg-alt rounded-2xl shadow-2xl w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-light-border dark:border-dark-border">
                    <h2 className="text-2xl font-bold">{t('studyGroups.editTitle', 'Edit Group Details')}</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <Input
                            label={t('studyGroups.groupName', 'Group Name')}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                         <Input
                            label={t('studyGroups.subjectLabel', 'Subject')}
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">
                                {t('studyGroups.groupDescription', 'Description')}
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-dark-bg/50 flex justify-end gap-3 border-t border-light-border dark:border-dark-border">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            {t('common.cancel', 'Cancel')}
                        </Button>
                        <Button type="submit" variant="primary">
                            {t('common.saveChanges', 'Save Changes')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGroupModal;