// Inside src/pages/GroupDetailPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { AuthContext } from '../contexts/AuthContext';
import Card from '../components/atoms/Card';
import Button from '../components/atoms/Button';
import Skeleton from '../components/atoms/Skeleton';
import EditGroupModal from '../components/study-groups/EditGroupModal'; // 1. Import the new modal

const GroupDetailPage = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // 2. Add state to control the edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchGroup = async () => { /* ... (this function remains the same) ... */ 
            try { setIsLoading(true); const response = await apiClient.get(`/groups/${groupId}`); setGroup(response.data); } catch (err) { setError('Could not find this study group.'); } finally { setIsLoading(false); }
        };
        fetchGroup();
    }, [groupId]);

    const handleJoinGroup = async () => { /* ... (this function remains the same) ... */ 
        setIsProcessing(true); try { const response = await apiClient.put(`/groups/${groupId}/join`); setGroup(response.data); } catch (err) { console.error("Failed to join group:", err); } finally { setIsProcessing(false); }
    };
    
    const handleLeaveGroup = async () => { /* ... (this function remains the same) ... */
        setIsProcessing(true); try { const response = await apiClient.put(`/groups/${groupId}/leave`); setGroup(response.data); } catch (err) { console.error("Failed to leave group:", err); } finally { setIsProcessing(false); }
    };

    const handleDeleteGroup = async () => { /* ... (this function remains the same) ... */
        if (window.confirm('Are you sure you want to permanently delete this group?')) { setIsProcessing(true); try { await apiClient.delete(`/groups/${groupId}`); navigate('/app/groups'); } catch (err) { console.error("Failed to delete group:", err); } finally { setIsProcessing(false); } }
    };

    // 3. This function calls our backend update route
    const handleUpdateGroup = async (updatedDetails) => {
        setIsProcessing(true);
        try {
            const response = await apiClient.put(`/groups/${groupId}`, updatedDetails);
            setGroup(response.data); // Update the page with the new details
            setIsEditModalOpen(false); // Close the modal on success
        } catch (err) {
            console.error("Failed to update group:", err);
            // Optionally, show an error message in the modal
        } finally {
            setIsProcessing(false);
        }
    };
    
    // ... (isLoading, error, and null checks remain the same) ...
    if (isLoading) { return ( <Card className="p-8 space-y-6"><Skeleton className="h-10 w-3/4" /><Skeleton className="h-6 w-1/2" /><Skeleton className="h-24 w-full" /><Skeleton className="h-8 w-1/4" /><Skeleton className="h-12 w-full" /></Card> );}
    if (error) { return <p className="text-center text-red-500">{error}</p>; }
    if (!group || !currentUser) { return null; }

    const isMember = group.members.some(member => member._id === currentUser.id);
    const isCreator = group.createdBy._id === currentUser.id;
    const isFull = group.members.length >= group.maxMembers;

    return (
        <>
            <div className="space-y-6">
                <Link to="/app/groups" className="text-primary hover:underline">&larr; Back to all groups</Link>
                <Card className="p-8">
                    {/* Group details rendering remains the same */}
                    <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
                    <p className="text-xl font-semibold text-primary mb-4">{group.subject}</p>
                    <p className="text-light-text-muted dark:text-dark-text-muted mb-6">{group.description}</p>
                    <div className="border-t border-light-border dark:border-dark-border pt-6">
                        <h2 className="text-2xl font-bold mb-4">Members ({group.members.length} / {group.maxMembers})</h2>
                        <ul className="space-y-3">{group.members.map(member => ( <li key={member._id} className="flex items-center justify-between bg-light-bg dark:bg-dark-bg p-3 rounded-lg"><span className="font-semibold">{member.name}</span>{group.createdBy._id === member._id && (<span className="text-xs font-bold text-accent-500 bg-accent-100 dark:bg-accent-900/50 px-2 py-1 rounded-full">CREATOR</span>)}</li>))}</ul>
                    </div>
                    
                    <div className="mt-8 border-t border-light-border dark:border-dark-border pt-6 flex flex-wrap items-center gap-4">
                        {isCreator ? (
                            <>
                                <p className="font-semibold text-accent-500 flex-shrink-0">You are the creator of this group.</p>
                                <div className="flex-grow flex items-center gap-4 justify-end">
                                    {/* 4. Add the "Edit Group" button */}
                                    <Button variant="secondary" onClick={() => setIsEditModalOpen(true)} disabled={isProcessing}>
                                        Edit Group
                                    </Button>
                                    <Button variant="danger-outline" onClick={handleDeleteGroup} disabled={isProcessing}>
                                        {isProcessing ? 'Deleting...' : 'Delete Group'}
                                    </Button>
                                </div>
                            </>
                        ) : isMember ? (
                            <Button variant="danger" onClick={handleLeaveGroup} disabled={isProcessing}>
                                {isProcessing ? 'Leaving...' : 'Leave Group'}
                            </Button>
                        ) : isFull ? (
                            <Button variant="primary" disabled>Group is Full</Button>
                        ) : (
                            <Button variant="primary" onClick={handleJoinGroup} disabled={isProcessing}>
                                {isProcessing ? 'Joining...' : 'Join Group'}
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
            
            {/* 5. Render the new EditGroupModal */}
            <EditGroupModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                group={group}
                onUpdateGroup={handleUpdateGroup}
            />
        </>
    );
};

export default GroupDetailPage;