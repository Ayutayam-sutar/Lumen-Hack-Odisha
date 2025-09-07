import { ICONS } from '../constants';

export const mockDecks = [
  { id: '1', title: 'React Hooks Mastery', description: 'Deep dive into every React hook.', tags: ['React', 'Frontend'], cardCount: 45, author: 'Jane Doe' },
  { id: '2', title: 'Advanced TypeScript', description: 'Generics, decorators, and more.', tags: ['TypeScript', 'Programming'], cardCount: 62, author: 'John Smith' },
  { id: '3', title: 'Quantum Physics 101', description: 'The fundamentals of quantum mechanics.', tags: ['Science', 'Physics'], cardCount: 80, author: 'Albert A.' },
];

export const mockGroups = [
    { id: 'g1', name: 'Frontend Wizards', subject: 'React', members: 4, capacity: 5, compatibilityScore: 92, activeTime: 'Evenings (PST)', tags: ['Beginner-Friendly', 'Project-Based'], createdAt: '2024-08-15T10:00:00Z' },
    { id: 'g2', name: 'TypeScript Titans', subject: 'TypeScript', members: 2, capacity: 4, compatibilityScore: 85, activeTime: 'Weekends', tags: ['Intermediate', 'Code Review'], createdAt: '2024-09-01T12:30:00Z' },
    { id: 'g3', name: 'Physics Phenoms', subject: 'Quantum Physics', members: 5, capacity: 5, compatibilityScore: 78, activeTime: 'Afternoons (EST)', tags: ['Advanced', 'Problem Solving'], createdAt: '2024-07-20T18:00:00Z' },
];

export const mockUser = {
    id: 'u1',
    name: 'ALOO ARJUN',
    email: 'alex.doe@example.com',
    avatarUrl: 'https://media.tenor.com/LxdvJ57qah0AAAAe/allu-arjun-bunny.png',
    level: 7,
    xp: 450,
    xpToNextLevel: 1000,
    reputation: 120,
    stats: {
        decksMastered: 12,
        hoursStudied: 142,
        studyStreak: 12,
    },
};

export const ALL_ACHIEVEMENTS = [
    { id: 'streak7Days', icon: ICONS.dashboard },
    { id: 'deckCreator', icon: ICONS.decks },
    { id: 'studyVeteran', icon: ICONS.solve },
    { id: 'top10Contender', icon: ICONS.leaderboard },
    { id: 'socialLearner', icon: ICONS.groups },
    { id: 'polymath', icon: ICONS.logo },
];

export const mockActivity = [
    { id: 'act1', text: "Completed 'React Hooks Mastery' deck.", timestamp: '2 hours ago', xpGained: 50 },
    { id: 'act2', text: "Daily Login Streak: Day 12", timestamp: '8 hours ago', xpGained: 10 },
    { id: 'act3', text: "Helped a student in Doubt Solver.", timestamp: 'Yesterday', xpGained: 75 },
    { id: 'act4', text: "Created a new deck: 'CSS Grids'.", timestamp: '3 days ago', xpGained: 100 },
    { id: 'act5', text: "Joined the 'Frontend Wizards' study group.", timestamp: '4 days ago', xpGained: 25 },
];


export const mockMentors = [
    { id: 'm1', name: 'Priya Sharma', avatarUrl: 'https://picsum.photos/seed/priya/200/200', expertise: 'Physics & Calculus', rating: 4.9, rate: 800, modes: ['online', 'offline'], availableSlots: ["4:00 PM", "5:00 PM", "7:00 PM"] },
    { id: 'm2', name: 'Rajesh Kumar', avatarUrl: 'https://picsum.photos/seed/rajesh/200/200', expertise: 'Organic Chemistry', rating: 4.8, rate: 950, modes: ['online'], availableSlots: ["3:00 PM", "6:00 PM"] },
    { id: 'm3', name: 'Anjali Singh', avatarUrl: 'https://picsum.photos/seed/anjali/200/200', expertise: 'Data Structures & Algorithms', rating: 5.0, rate: 1200, modes: ['online', 'offline'], availableSlots: ["5:00 PM", "6:00 PM", "8:00 PM"] },
    { id: 'm4', name: 'Vikram Mehta', avatarUrl: 'https://picsum.photos/seed/vikram/200/200', expertise: 'React & Frontend Architecture', rating: 4.9, rate: 1500, modes: ['online'], availableSlots: ["10:00 AM", "11:00 AM", "2:00 PM"] },
    { id: 'm5', name: 'Sunita Patil', avatarUrl: 'https://picsum.photos/seed/sunita/200/200', expertise: 'History & Political Science', rating: 4.7, rate: 600, modes: ['offline'], availableSlots: ["1:00 PM", "3:00 PM"] },
    { id: 'm6', name: 'Amit Desai', avatarUrl: 'https://picsum.photos/seed/amit/200/200', expertise: 'Machine Learning', rating: 4.9, rate: 2000, modes: ['online'], availableSlots: ["7:00 PM", "8:00 PM", "9:00 PM"] },
];


export const mockBookedSessions = [
  { id: 'bs1', mentorName: 'Priya Sharma', subject: 'Physics & Calculus', time: 'Tomorrow, 4:00 PM', avatarUrl: 'https://picsum.photos/seed/priya/200/200', meetingLink: 'https://meet.google.com/xyz-abc-pqr', notes: 'Please review chapter 3 on thermodynamics before the session.' },
  { id: 'bs2', mentorName: 'Vikram Mehta', subject: 'React Architecture', time: 'Oct 28, 10:00 AM', avatarUrl: 'https://picsum.photos/seed/vikram/200/200', meetingLink: 'https://meet.google.com/def-ghi-jkl', notes: 'We will be discussing state management strategies.' },
  { id: 'bs3', mentorName: 'Anjali Singh', subject: 'Data Structures', time: 'Nov 2, 6:00 PM', avatarUrl: 'https://picsum.photos/seed/anjali/200/200', meetingLink: 'https://meet.google.com/mno-pqr-stu', notes: 'Focus on Big O notation and common sorting algorithms.' },
];


export const mockXpLeaderboard = [
  { rank: 1, name: 'Sonia Patel', avatarUrl: 'https://picsum.photos/seed/sonia/40/40', score: 12500, isCurrentUser: false },
  { rank: 2, name: 'Rohan Verma', avatarUrl: 'https://picsum.photos/seed/rohan/40/40', score: 11800, isCurrentUser: false },
  { rank: 3, name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user/40/40', score: 11250, isCurrentUser: true },
  { rank: 4, name: 'Priya Singh', avatarUrl: 'https://picsum.photos/seed/priyaleader/40/40', score: 10900, isCurrentUser: false },
  { rank: 10, name: 'Amit Desai', avatarUrl: 'https://picsum.photos/seed/amit/40/40', score: 9500, isCurrentUser: false },
];

export const mockReputationLeaderboard = [
  { rank: 1, name: 'Vikram Mehta', avatarUrl: 'https://picsum.photos/seed/vikram/40/40', score: 850, isCurrentUser: false },
  { rank: 2, name: 'Anjali Singh', avatarUrl: 'https://picsum.photos/seed/anjali/40/40', score: 780, isCurrentUser: false },
  { rank: 3, name: 'Rohan Verma', avatarUrl: 'https://picsum.photos/seed/rohan/40/40', score: 620, isCurrentUser: false },
  { rank: 4, name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user/40/40', score: 195, isCurrentUser: true },
];

export const learnAiContent = {
  introduction: {
    title: 'Introduction to Prompt Engineering',
    content: `Prompt engineering is the process of structuring text that can be interpreted and understood by a generative AI model. It's a way of communicating with the AI to get it to produce the desired output, from a short story to a piece of code. Think of it as learning how to ask the right questions to get the best answers.`,
  },
  'prompting-techniques': {
    title: 'Core Prompting Techniques',
    content: `To get the best results from a large language model (LLM), you need to be clear and specific. Here are some key techniques: \n\n**1. Zero-Shot Prompting:** You ask the model to perform a task without giving it any examples. This works well for general knowledge tasks. \n\n**2. Few-Shot Prompting:** You provide a few examples of the task you want the model to perform. This helps the model understand the context and format you expect. \n\n**3. Chain-of-Thought Prompting:** You ask the model to "think step-by-step" to solve a problem. This is especially useful for complex reasoning and mathematical tasks.`,
    examples: [
      { 
        title: 'Zero-Shot Example', 
        prompt: `Classify the following text into one of three categories: "Sports", "Technology", or "Politics".\n\nText: "The new bill was passed by a narrow margin after a long debate in the senate."`
      },
      { 
        title: 'Few-Shot Example',
        prompt: `Translate the following English phrases to French:\n\n"Hello" -> "Bonjour"\n"Good morning" -> "Bonjour"\n"How are you?" -> "Comment ça va?"\n"Thank you" ->`
      },
      { 
        title: 'Chain-of-Thought Example',
        prompt: `John has 5 apples. He buys 3 more boxes of apples, and each box contains 4 apples. He then gives half of all his apples to his friend. How many apples does John have left? Let's think step by step.`
      }
    ]
  }
};
