/**
 * Exam Board Data Service
 * Contains information about different exam boards, subjects, and paper codes
 */

// IGCSE Subject Data
export const igcseSubjects = [
  {
    code: '0500',
    name: 'English First Language',
    papers: [
      { code: 'Paper 1', name: 'Reading', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Directed Writing and Composition', type: 'Essay' },
      { code: 'Paper 3', name: 'Coursework Portfolio', type: 'Coursework' }
    ]
  },
  {
    code: '0510',
    name: 'English as a Second Language',
    papers: [
      { code: 'Paper 1', name: 'Reading and Writing (Core)', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Reading and Writing (Extended)', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Listening (Core)', type: 'Multiple Choice' },
      { code: 'Paper 4', name: 'Listening (Extended)', type: 'Multiple Choice' },
      { code: 'Paper 5', name: 'Speaking', type: 'Oral' }
    ]
  },
  {
    code: '0511',
    name: 'English as a Second Language (Count-in Speaking)',
    papers: [
      { code: 'Paper 1', name: 'Reading and Writing (Core)', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Reading and Writing (Extended)', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Listening (Core)', type: 'Multiple Choice' },
      { code: 'Paper 4', name: 'Listening (Extended)', type: 'Multiple Choice' },
      { code: 'Paper 5', name: 'Speaking', type: 'Oral' }
    ]
  },
  {
    code: '0520',
    name: 'French - Foreign Language',
    papers: [
      { code: 'Paper 1', name: 'Listening', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Reading', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Speaking', type: 'Oral' },
      { code: 'Paper 4', name: 'Writing', type: 'Essay' }
    ]
  },
  {
    code: '0525',
    name: 'German - Foreign Language',
    papers: [
      { code: 'Paper 1', name: 'Listening', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Reading', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Speaking', type: 'Oral' },
      { code: 'Paper 4', name: 'Writing', type: 'Essay' }
    ]
  },
  {
    code: '0530',
    name: 'Spanish - Foreign Language',
    papers: [
      { code: 'Paper 1', name: 'Listening', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Reading', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Speaking', type: 'Oral' },
      { code: 'Paper 4', name: 'Writing', type: 'Essay' }
    ]
  },
  {
    code: '0580',
    name: 'Mathematics',
    papers: [
      { code: 'Paper 1', name: 'Short Answer (Core)', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Short Answer (Extended)', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Structured Questions (Core)', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Structured Questions (Extended)', type: 'Structured Questions' }
    ]
  },
  {
    code: '0606',
    name: 'Additional Mathematics',
    papers: [
      { code: 'Paper 1', name: 'Short Answer', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Long Answer', type: 'Structured Questions' }
    ]
  },
  {
    code: '0607',
    name: 'Cambridge International Mathematics',
    papers: [
      { code: 'Paper 1', name: 'Short Answer (Core)', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Short Answer (Extended)', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Structured Questions (Core)', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Structured Questions (Extended)', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Investigation (Core)', type: 'Structured Questions' },
      { code: 'Paper 6', name: 'Investigation (Extended)', type: 'Structured Questions' }
    ]
  },
  {
    code: '0610',
    name: 'Biology',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice (Core)', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Multiple Choice (Extended)', type: 'Multiple Choice' },
      { code: 'Paper 3', name: 'Theory (Core)', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Theory (Extended)', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Practical Test', type: 'Practical' },
      { code: 'Paper 6', name: 'Alternative to Practical', type: 'Structured Questions' }
    ]
  },
  {
    code: '0620',
    name: 'Chemistry',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice (Core)', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Multiple Choice (Extended)', type: 'Multiple Choice' },
      { code: 'Paper 3', name: 'Theory (Core)', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Theory (Extended)', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Practical Test', type: 'Practical' },
      { code: 'Paper 6', name: 'Alternative to Practical', type: 'Structured Questions' }
    ]
  },
  {
    code: '0625',
    name: 'Physics',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice (Core)', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Multiple Choice (Extended)', type: 'Multiple Choice' },
      { code: 'Paper 3', name: 'Theory (Core)', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Theory (Extended)', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Practical Test', type: 'Practical' },
      { code: 'Paper 6', name: 'Alternative to Practical', type: 'Structured Questions' }
    ]
  },
  {
    code: '0654',
    name: 'Co-ordinated Sciences (Double Award)',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice (Core)', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Multiple Choice (Extended)', type: 'Multiple Choice' },
      { code: 'Paper 3', name: 'Theory (Core)', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Theory (Extended)', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Practical Test', type: 'Practical' },
      { code: 'Paper 6', name: 'Alternative to Practical', type: 'Structured Questions' }
    ]
  },
  {
    code: '0460',
    name: 'Geography',
    papers: [
      { code: 'Paper 1', name: 'Geographical Themes', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Geographical Skills', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Coursework', type: 'Coursework' },
      { code: 'Paper 4', name: 'Alternative to Coursework', type: 'Structured Questions' }
    ]
  },
  {
    code: '0470',
    name: 'History',
    papers: [
      { code: 'Paper 1', name: 'Core Content', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Source-based Investigation', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Coursework', type: 'Coursework' },
      { code: 'Paper 4', name: 'Alternative to Coursework', type: 'Structured Questions' }
    ]
  },
  {
    code: '0450',
    name: 'Business Studies',
    papers: [
      { code: 'Paper 1', name: 'Short Answer and Data Response', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Case Study', type: 'Structured Questions' }
    ]
  },
  {
    code: '0455',
    name: 'Economics',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Structured Questions', type: 'Structured Questions' }
    ]
  },
  {
    code: '0417',
    name: 'Information and Communication Technology',
    papers: [
      { code: 'Paper 1', name: 'Theory', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Document Production, Data Manipulation and Presentations', type: 'Practical' },
      { code: 'Paper 3', name: 'Data Analysis and Website Authoring', type: 'Practical' }
    ]
  },
  {
    code: '0478',
    name: 'Computer Science',
    papers: [
      { code: 'Paper 1', name: 'Theory', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Problem-solving and Programming', type: 'Structured Questions' }
    ]
  },
  {
    code: '0413',
    name: 'Physical Education',
    papers: [
      { code: 'Paper 1', name: 'Theory', type: 'Structured Questions' },
      { code: 'Component 2', name: 'Coursework', type: 'Coursework' }
    ]
  },
  {
    code: '0400',
    name: 'Art & Design',
    papers: [
      { code: 'Component 1', name: 'Broad-based assignment', type: 'Coursework' },
      { code: 'Component 2', name: 'Design-based assignment', type: 'Coursework' }
    ]
  },
  {
    code: '0410',
    name: 'Music',
    papers: [
      { code: 'Component 1', name: 'Listening', type: 'Structured Questions' },
      { code: 'Component 2', name: 'Performing', type: 'Coursework' },
      { code: 'Component 3', name: 'Composing', type: 'Coursework' }
    ]
  }
];

// IBDP Subject Data
export const ibdpSubjects = [
  // Group 1: Studies in Language and Literature
  {
    code: 'Group 1',
    name: 'English A: Literature',
    papers: [
      { code: 'Paper 1', name: 'Guided Literary Analysis', type: 'Essay' },
      { code: 'Paper 2', name: 'Comparative Essay', type: 'Essay' },
      { code: 'HL Essay', name: 'Higher Level Essay', type: 'Essay' },
      { code: 'IOC', name: 'Individual Oral Commentary', type: 'Oral' }
    ]
  },
  {
    code: 'Group 1',
    name: 'English A: Language and Literature',
    papers: [
      { code: 'Paper 1', name: 'Textual Analysis', type: 'Essay' },
      { code: 'Paper 2', name: 'Comparative Essay', type: 'Essay' },
      { code: 'HL Essay', name: 'Higher Level Essay', type: 'Essay' },
      { code: 'IOC', name: 'Individual Oral Commentary', type: 'Oral' }
    ]
  },
  {
    code: 'Group 1',
    name: 'Literature and Performance (SL only)',
    papers: [
      { code: 'Paper 1', name: 'Literary Analysis', type: 'Essay' },
      { code: 'Paper 2', name: 'Comparative Essay', type: 'Essay' },
      { code: 'IA', name: 'Performance and Individual Oral', type: 'Oral' }
    ]
  },
  // Group 2: Language Acquisition
  {
    code: 'Group 2',
    name: 'French B',
    papers: [
      { code: 'Paper 1', name: 'Productive Skills', type: 'Essay' },
      { code: 'Paper 2', name: 'Receptive Skills', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Oral', type: 'Oral' }
    ]
  },
  {
    code: 'Group 2',
    name: 'Spanish B',
    papers: [
      { code: 'Paper 1', name: 'Productive Skills', type: 'Essay' },
      { code: 'Paper 2', name: 'Receptive Skills', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Oral', type: 'Oral' }
    ]
  },
  {
    code: 'Group 2',
    name: 'German B',
    papers: [
      { code: 'Paper 1', name: 'Productive Skills', type: 'Essay' },
      { code: 'Paper 2', name: 'Receptive Skills', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Oral', type: 'Oral' }
    ]
  },
  {
    code: 'Group 2',
    name: 'Mandarin Ab Initio',
    papers: [
      { code: 'Paper 1', name: 'Productive Skills', type: 'Essay' },
      { code: 'Paper 2', name: 'Receptive Skills', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Oral', type: 'Oral' }
    ]
  },
  // Group 3: Individuals and Societies
  {
    code: 'Group 3',
    name: 'Economics',
    papers: [
      { code: 'Paper 1', name: 'Microeconomics', type: 'Essay' },
      { code: 'Paper 2', name: 'Macroeconomics', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'HL Extension (HL only)', type: 'Structured Questions' },
      { code: 'IA', name: 'Portfolio', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 3',
    name: 'History',
    papers: [
      { code: 'Paper 1', name: 'Source-based Paper', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Essay Paper', type: 'Essay' },
      { code: 'Paper 3', name: 'Regional History (HL only)', type: 'Essay' },
      { code: 'IA', name: 'Historical Investigation', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 3',
    name: 'Business Management',
    papers: [
      { code: 'Paper 1', name: 'Case Study', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Structured Questions', type: 'Structured Questions' },
      { code: 'IA', name: 'Research Project', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 3',
    name: 'Psychology',
    papers: [
      { code: 'Paper 1', name: 'Core', type: 'Essay' },
      { code: 'Paper 2', name: 'Options', type: 'Essay' },
      { code: 'Paper 3', name: 'Approaches (HL only)', type: 'Structured Questions' },
      { code: 'IA', name: 'Experimental Study', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 3',
    name: 'Geography',
    papers: [
      { code: 'Paper 1', name: 'Geographic Themes', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Global Change', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'HL Extension (HL only)', type: 'Essay' },
      { code: 'IA', name: 'Fieldwork', type: 'Coursework' }
    ]
  },
  // Group 4: Sciences
  {
    code: 'Group 4',
    name: 'Biology',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Data-based Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Options', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Investigation', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 4',
    name: 'Chemistry',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Data-based Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Options', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Investigation', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 4',
    name: 'Physics',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Data-based Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Options', type: 'Structured Questions' },
      { code: 'IA', name: 'Individual Investigation', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 4',
    name: 'Computer Science',
    papers: [
      { code: 'Paper 1', name: 'Core Topics', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Option Topic', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Case Study (HL only)', type: 'Essay' },
      { code: 'IA', name: 'Solution', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 4',
    name: 'Design Technology',
    papers: [
      { code: 'Paper 1', name: 'Core Topics', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Core Topics', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'HL Extension (HL only)', type: 'Structured Questions' },
      { code: 'IA', name: 'Design Project', type: 'Coursework' }
    ]
  },
  // Group 5: Mathematics
  {
    code: 'Group 5',
    name: 'Mathematics: Analysis and Approaches',
    papers: [
      { code: 'Paper 1', name: 'No Calculator', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Calculator', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'HL only', type: 'Structured Questions' },
      { code: 'IA', name: 'Mathematical Exploration', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 5',
    name: 'Mathematics: Applications and Interpretation',
    papers: [
      { code: 'Paper 1', name: 'Calculator', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Calculator', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'HL only', type: 'Structured Questions' },
      { code: 'IA', name: 'Mathematical Exploration', type: 'Coursework' }
    ]
  },
  // Group 6: The Arts
  {
    code: 'Group 6',
    name: 'Visual Arts',
    papers: [
      { code: 'Exhibition', name: 'Exhibition', type: 'Coursework' },
      { code: 'Process Portfolio', name: 'Process Portfolio', type: 'Coursework' },
      { code: 'Comparative Study', name: 'Comparative Study', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 6',
    name: 'Theatre',
    papers: [
      { code: 'Director\'s Notebook', name: 'Director\'s Notebook', type: 'Coursework' },
      { code: 'Research Presentation', name: 'Research Presentation', type: 'Oral' },
      { code: 'Collaborative Project', name: 'Collaborative Project', type: 'Coursework' },
      { code: 'Solo Theatre Piece', name: 'Solo Theatre Piece (HL only)', type: 'Coursework' }
    ]
  },
  {
    code: 'Group 6',
    name: 'Music',
    papers: [
      { code: 'Exploring Music', name: 'Listening Paper', type: 'Structured Questions' },
      { code: 'Experimenting', name: 'Creating', type: 'Coursework' },
      { code: 'Presenting', name: 'Performing', type: 'Coursework' }
    ]
  },
  // Core
  {
    code: 'Core',
    name: 'Theory of Knowledge',
    papers: [
      { code: 'Essay', name: 'Prescribed Title Essay', type: 'Essay' },
      { code: 'Exhibition', name: 'TOK Exhibition', type: 'Coursework' }
    ]
  },
  {
    code: 'Core',
    name: 'Extended Essay',
    papers: [
      { code: 'EE', name: 'Extended Essay', type: 'Essay' }
    ]
  }
];

// A Level Subject Data
export const aLevelSubjects = [
  {
    code: '9706',
    name: 'Accounting',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Structured Questions (A Level only)', type: 'Structured Questions' }
    ]
  },
  {
    code: '9700',
    name: 'Biology',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'AS Level Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Advanced Practical Skills', type: 'Practical' },
      { code: 'Paper 4', name: 'A Level Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Planning, Analysis and Evaluation', type: 'Structured Questions' }
    ]
  },
  {
    code: '9701',
    name: 'Chemistry',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'AS Level Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Advanced Practical Skills', type: 'Practical' },
      { code: 'Paper 4', name: 'A Level Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Planning, Analysis and Evaluation', type: 'Structured Questions' }
    ]
  },
  {
    code: '9708',
    name: 'Economics',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'Data Response and Essay', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Multiple Choice (A Level only)', type: 'Multiple Choice' },
      { code: 'Paper 4', name: 'Data Response and Essays (A Level only)', type: 'Structured Questions' }
    ]
  },
  {
    code: '9609',
    name: 'Business',
    papers: [
      { code: 'Paper 1', name: 'Short Answer and Essay', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Data Response', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Case Study', type: 'Structured Questions' }
    ]
  },
  {
    code: '9695',
    name: 'English Literature',
    papers: [
      { code: 'Paper 1', name: 'Drama and Poetry', type: 'Essay' },
      { code: 'Paper 2', name: 'Prose and Unseen', type: 'Essay' },
      { code: 'Paper 3', name: 'Shakespeare and Drama', type: 'Essay' },
      { code: 'Paper 4', name: 'Pre- and Post-1900 Poetry and Prose', type: 'Essay' }
    ]
  },
  {
    code: '9093',
    name: 'English Language',
    papers: [
      { code: 'Paper 1', name: 'Reading', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Writing', type: 'Essay' },
      { code: 'Paper 3', name: 'Text Analysis', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Language Topics', type: 'Essay' }
    ]
  },
  {
    code: '9709',
    name: 'Mathematics',
    papers: [
      { code: 'Paper 1', name: 'Pure Mathematics 1', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Pure Mathematics 2', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Pure Mathematics 3', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Mechanics', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Probability & Statistics 1', type: 'Structured Questions' },
      { code: 'Paper 6', name: 'Probability & Statistics 2', type: 'Structured Questions' }
    ]
  },
  {
    code: '9231',
    name: 'Further Mathematics',
    papers: [
      { code: 'Paper 1', name: 'Further Pure Mathematics 1', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Further Pure Mathematics 2', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Further Mechanics', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Further Statistics', type: 'Structured Questions' }
    ]
  },
  {
    code: '9389',
    name: 'History',
    papers: [
      { code: 'Paper 1', name: 'Document Question', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Outline Study', type: 'Essay' },
      { code: 'Paper 3', name: 'Interpretations Question', type: 'Essay' },
      { code: 'Paper 4', name: 'Depth Study', type: 'Essay' }
    ]
  },
  {
    code: '9696',
    name: 'Geography',
    papers: [
      { code: 'Paper 1', name: 'Core Physical Geography', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Core Human Geography', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Advanced Physical Geography Options', type: 'Essay' },
      { code: 'Paper 4', name: 'Advanced Human Geography Options', type: 'Essay' }
    ]
  },
  {
    code: '9618',
    name: 'Computer Science',
    papers: [
      { code: 'Paper 1', name: 'Theory Fundamentals', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Fundamental Problem-solving and Programming Skills', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Advanced Theory', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Further Problem-solving and Programming Skills', type: 'Structured Questions' }
    ]
  },
  {
    code: '9626',
    name: 'Information Technology',
    papers: [
      { code: 'Paper 1', name: 'Theory', type: 'Structured Questions' },
      { code: 'Paper 2', name: 'Practical', type: 'Practical' },
      { code: 'Paper 3', name: 'Advanced Theory', type: 'Structured Questions' },
      { code: 'Paper 4', name: 'Advanced Practical', type: 'Practical' }
    ]
  },
  {
    code: '9702',
    name: 'Physics',
    papers: [
      { code: 'Paper 1', name: 'Multiple Choice', type: 'Multiple Choice' },
      { code: 'Paper 2', name: 'AS Level Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 3', name: 'Advanced Practical Skills', type: 'Practical' },
      { code: 'Paper 4', name: 'A Level Structured Questions', type: 'Structured Questions' },
      { code: 'Paper 5', name: 'Planning, Analysis and Evaluation', type: 'Structured Questions' }
    ]
  }
];

// Available sessions
export const examSessions = [
  'February/March',
  'May/June',
  'October/November'
];

// Available years (last 10 years)
export const examYears = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

// Get subjects by exam board
export const getSubjectsByExamBoard = (examBoard) => {
  switch (examBoard) {
    case 'IGCSE':
      return igcseSubjects;
    case 'IBDP':
      return ibdpSubjects;
    case 'AS Level':
    case 'A Level':
      return aLevelSubjects;
    default:
      return [];
  }
};

// Get papers by exam board and subject code
export const getPapersBySubject = (examBoard, subjectCode) => {
  const subjects = getSubjectsByExamBoard(examBoard);
  const subject = subjects.find(s => s.code === subjectCode);
  return subject ? subject.papers : [];
};

// Get subject name by code
export const getSubjectNameByCode = (examBoard, subjectCode) => {
  const subjects = getSubjectsByExamBoard(examBoard);
  const subject = subjects.find(s => s.code === subjectCode);
  return subject ? subject.name : '';
};

// Generate sample data for demo purposes
export const generateSampleData = () => {
  const samplePapers = [];
  const samplePlannedPapers = [];
  
  // Generate sample past papers
  igcseSubjects.slice(0, 5).forEach(subject => {
    subject.papers.slice(0, 2).forEach(paper => {
      // Generate papers for the last 2 years
      for (let i = 0; i < 2; i++) {
        const year = new Date().getFullYear() - i;
        const session = i % 2 === 0 ? 'May/June' : 'October/November';
        const mark = Math.floor(Math.random() * 30) + 70; // Random mark between 70-99
        const maxMark = 100;
        const percentage = (mark / maxMark) * 100;
        
        // Determine grade based on percentage
        let grade = '';
        if (percentage >= 90) grade = 'A*';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 60) grade = 'C';
        else if (percentage >= 50) grade = 'D';
        else if (percentage >= 40) grade = 'E';
        else grade = 'U';
        
        // Create sample paper
        samplePapers.push({
          id: `sample-${subject.code}-${paper.code}-${year}-${session}`.replace(/\s+/g, '-').toLowerCase(),
          examBoard: 'IGCSE',
          subject: subject.name,
          subjectCode: subject.code,
          paperCode: `${subject.code}/${paper.code}`,
          paperName: paper.name,
          yearSession: `${session} ${year}`,
          paperType: paper.type,
          timeTaken: Math.floor(Math.random() * 30) + 60, // Random time between 60-90 minutes
          mark,
          maxMark,
          grade,
          difficulty: ['Easy', 'Moderate', 'Hard'][Math.floor(Math.random() * 3)],
          comments: `Sample comments for ${subject.name} ${paper.code}`,
          timestamp: new Date(Date.now() - (i * 30 * 24 * 60 * 60 * 1000)).toISOString() // Spread over the last few months
        });
      }
    });
    
    // Generate sample planned papers
    subject.papers.slice(2, 3).forEach(paper => {
      const year = new Date().getFullYear() - 3; // Papers from 3 years ago
      const session = 'May/June';
      
      // Create sample planned paper
      samplePlannedPapers.push({
        id: `planned-${subject.code}-${paper.code}-${year}-${session}`.replace(/\s+/g, '-').toLowerCase(),
        examBoard: 'IGCSE',
        subject: subject.name,
        subjectCode: subject.code,
        paperCode: `${subject.code}/${paper.code}`,
        paperName: paper.name,
        yearSession: `${session} ${year}`,
        paperType: paper.type,
        deadline: new Date(Date.now() + (Math.floor(Math.random() * 14) + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random deadline in the next 2 weeks
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        notes: `Plan to solve ${subject.name} ${paper.code} from ${session} ${year}`
      });
    });
  });
  
  return { samplePapers, samplePlannedPapers };
};
