/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} avatarUrl
 * @property {number} level
 * @property {number} xp
 * @property {number} xpToNextLevel
 * @property {number} reputation
 * @property {object} stats
 * @property {number} stats.decksMastered
 * @property {number} stats.hoursStudied
 * @property {number} stats.studyStreak
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {boolean} unlocked
 * @property {React.ReactNode} icon
 * @property {string} [unlockedDate]
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} text
 * @property {string} timestamp
 * @property {number} xpGained
 */

/**
 * @typedef {Object} Flashcard
 * @property {string} id
 * @property {string} question
 * @property {string} answer
 * @property {number} srsLevel - Spaced Repetition System level (e.g., 0-8)
 * @property {Date} nextReviewDate
 */

/**
 * @typedef {Object} Deck
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {number} cardCount
 * @property {string} author
 */

/**
 * @typedef {Object} StudyGroup
 * @property {string} id
 * @property {string} name
 * @property {string} subject
 * @property {number} members
 * @property {number} capacity
 * @property {number} compatibilityScore
 * @property {string} activeTime
 * @property {string[]} [tags]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Mentor
 * @property {string} id
 * @property {string} name
 * @property {string} avatarUrl
 * @property {string} expertise
 * @property {number} rating
 * @property {number} rate - per hour
 * @property {('online' | 'offline')[]} modes
 * @property {string[]} availableSlots
 */

/**
 * @typedef {Object} BookedSession
 * @property {string} id
 * @property {string} mentorName
 * @property {string} subject
 * @property {string} time
 * @property {string} avatarUrl
 * @property {string} [meetingLink]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} LeaderboardEntry
 * @property {number} rank
 * @property {string} name
 * @property {string} avatarUrl
 * @property {number} score
 * @property {boolean} isCurrentUser
 */

// This export statement ensures the file is treated as a module.
export {};