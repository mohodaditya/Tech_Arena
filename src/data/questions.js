export const questions = {
  dsa: [
    // Original questions
    {
      question: "Which data structure follows FIFO (First In First Out) principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
      explanation: "Queue follows First In First Out order where elements are inserted at the rear and removed from the front.",
      category: "DSA"
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      answer: "O(log n)",
      explanation: "Binary search halves the search space in each step, resulting in logarithmic time complexity.",
      category: "DSA"
    },
    {
      question: "Which sorting algorithm has the best average case time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      answer: "Quick Sort",
      explanation: "Quick Sort has O(n log n) average case time complexity, making it one of the most efficient sorting algorithms.",
      category: "DSA"
    },
    {
      question: "What is a complete binary tree?",
      options: ["All nodes have two children", "All levels are filled except possibly the last", "All nodes have at most one child", "Tree with no nodes"],
      answer: "All levels are filled except possibly the last",
      explanation: "A complete binary tree has all levels filled except possibly the last level, which is filled from left to right.",
      category: "DSA"
    },
    {
      question: "Which data structure is used in DFS traversal?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
      explanation: "DFS (Depth First Search) uses a stack data structure to keep track of vertices to visit.",
      category: "DSA"
    },
    // New questions from your list
    {
      question: "Which data structure is used in recursion?",
      options: ["Queue", "Stack", "Heap", "Graph"],
      answer: "Stack",
      explanation: "Recursion uses function call stack to store states until base condition is reached.",
      category: "DSA"
    },
    {
      question: "Which of the following is not a stable sorting algorithm?",
      options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
      answer: "Quick Sort",
      explanation: "Quick Sort is not guaranteed to maintain order of equal elements, hence not stable by default.",
      category: "DSA"
    },
    {
      question: "Which traversal of binary tree gives nodes in sorted order?",
      options: ["Preorder", "Inorder", "Postorder", "Level Order"],
      answer: "Inorder",
      explanation: "Inorder traversal of a Binary Search Tree gives elements in ascending order.",
      category: "DSA"
    },
    {
      question: "Which of the following has O(1) time complexity for insertion and deletion from both ends?",
      options: ["Stack", "Queue", "Deque", "Linked List"],
      answer: "Deque",
      explanation: "Deque (Double Ended Queue) allows insertion and deletion from both ends in O(1) time.",
      category: "DSA"
    }
  ],
  dbms: [
    // Original questions
    {
      question: "What does ACID stand for in database systems?",
      options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integration, Data", "Application, Client, Interface, Database", "Authentication, Control, Identity, Distribution"],
      answer: "Atomicity, Consistency, Isolation, Durability",
      explanation: "ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent access), Durability (permanent changes).",
      category: "DBMS"
    },
    {
      question: "Which normal form eliminates transitive dependencies?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: "3NF",
      explanation: "Third Normal Form (3NF) eliminates transitive dependencies where non-key attributes depend on other non-key attributes.",
      category: "DBMS"
    },
    {
      question: "What is a foreign key?",
      options: ["Primary key of same table", "Unique identifier", "Reference to primary key of another table", "Index on table"],
      answer: "Reference to primary key of another table",
      explanation: "A foreign key is a column that references the primary key of another table, establishing relationships between tables.",
      category: "DBMS"
    },
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["INSERT", "UPDATE", "DELETE", "SELECT"],
      answer: "SELECT",
      explanation: "SELECT statement is used to query and retrieve data from one or more database tables.",
      category: "DBMS"
    },
    {
      question: "What is database deadlock?",
      options: ["Database crash", "Two transactions waiting for each other", "Memory overflow", "Connection timeout"],
      answer: "Two transactions waiting for each other",
      explanation: "Deadlock occurs when two or more transactions are waiting for each other to release resources, creating a circular dependency.",
      category: "DBMS"
    },
    // New questions from your list
    {
      question: "What does SQL stand for?",
      options: ["Structured Query Language", "Simple Query Language", "System Query Language", "Sequential Query Language"],
      answer: "Structured Query Language",
      explanation: "SQL stands for Structured Query Language, used for managing data in relational databases.",
      category: "DBMS"
    },
    {
      question: "Which normal form removes partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: "2NF",
      explanation: "2NF removes partial dependency by ensuring all non-key attributes are fully functionally dependent on the primary key.",
      category: "DBMS"
    },
    {
      question: "Which SQL command is used to remove all rows from a table without removing the table structure?",
      options: ["DELETE", "TRUNCATE", "DROP", "REMOVE"],
      answer: "TRUNCATE",
      explanation: "TRUNCATE removes all rows but keeps table schema. DROP removes table structure.",
      category: "DBMS"
    }
  ],
  os: [
    // Original questions
    {
      question: "What is the main purpose of an operating system?",
      options: ["Run applications", "Manage hardware resources", "Provide user interface", "All of the above"],
      answer: "All of the above",
      explanation: "Operating system manages hardware resources, provides user interface, and enables running of applications.",
      category: "OS"
    },
    {
      question: "Which scheduling algorithm can cause starvation?",
      options: ["FCFS", "Round Robin", "Priority Scheduling", "SJF"],
      answer: "Priority Scheduling",
      explanation: "Priority scheduling can cause starvation where low-priority processes may never get executed if high-priority processes keep arriving.",
      category: "OS"
    },
    {
      question: "What is a process in operating systems?",
      options: ["Program in execution", "Compiled code", "Memory location", "CPU instruction"],
      answer: "Program in execution",
      explanation: "A process is a program that is currently being executed by the CPU, including its memory space and system resources.",
      category: "OS"
    },
    {
      question: "What is virtual memory?",
      options: ["Physical RAM", "Hard disk space used as RAM", "CPU cache", "ROM memory"],
      answer: "Hard disk space used as RAM",
      explanation: "Virtual memory allows the system to use hard disk space as an extension of RAM when physical memory is insufficient.",
      category: "OS"
    },
    {
      question: "What is a semaphore?",
      options: ["Memory location", "Synchronization tool", "File system", "Network protocol"],
      answer: "Synchronization tool",
      explanation: "Semaphore is a synchronization primitive used to control access to shared resources in concurrent programming.",
      category: "OS"
    },
    // New questions from your list
    {
      question: "Which scheduling algorithm may cause starvation?",
      options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
      answer: "SJF",
      explanation: "Shortest Job First can cause starvation for longer processes if short processes keep coming.",
      category: "OS"
    },
    {
      question: "Which memory management technique suffers from external fragmentation?",
      options: ["Paging", "Segmentation", "Demand Paging", "None"],
      answer: "Segmentation",
      explanation: "Segmentation leads to variable sized memory blocks, causing external fragmentation.",
      category: "OS"
    }
  ],
  cn: [
    // Original questions
    {
      question: "Which layer of OSI model handles routing?",
      options: ["Physical", "Data Link", "Network", "Transport"],
      answer: "Network",
      explanation: "The Network layer (Layer 3) of the OSI model is responsible for routing packets between different networks.",
      category: "CN"
    },
    {
      question: "What does TCP stand for?",
      options: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Control Protocol", "Technical Control Protocol"],
      answer: "Transmission Control Protocol",
      explanation: "TCP (Transmission Control Protocol) is a reliable, connection-oriented protocol that ensures data delivery.",
      category: "CN"
    },
    {
      question: "Which protocol is connectionless?",
      options: ["TCP", "HTTP", "UDP", "FTP"],
      answer: "UDP",
      explanation: "UDP (User Datagram Protocol) is connectionless and does not guarantee delivery, making it faster but less reliable than TCP.",
      category: "CN"
    },
    {
      question: "What is the default port for HTTP?",
      options: ["21", "22", "80", "443"],
      answer: "80",
      explanation: "HTTP (HyperText Transfer Protocol) uses port 80 by default, while HTTPS uses port 443.",
      category: "CN"
    },
    {
      question: "What is DNS used for?",
      options: ["File transfer", "Domain name resolution", "Email routing", "Network security"],
      answer: "Domain name resolution",
      explanation: "DNS (Domain Name System) translates human-readable domain names into IP addresses.",
      category: "CN"
    },
    // New questions from your list
    {
      question: "Which layer of the OSI model is responsible for logical addressing (IP addresses)?",
      options: ["Physical", "Network", "Transport", "Data Link"],
      answer: "Network",
      explanation: "The Network layer is responsible for logical addressing and routing of data packets.",
      category: "CN"
    },
    {
      question: "Which protocol is connection-oriented?",
      options: ["UDP", "IP", "TCP", "HTTP"],
      answer: "TCP",
      explanation: "TCP establishes a reliable, connection-oriented communication before data transfer.",
      category: "CN"
    }
  ],
  oops: [
    // Original questions
    {
      question: "What is encapsulation in OOP?",
      options: ["Hiding implementation details", "Creating multiple classes", "Inheriting properties", "Overriding methods"],
      answer: "Hiding implementation details",
      explanation: "Encapsulation is the principle of hiding internal implementation details and exposing only necessary interfaces.",
      category: "OOPs"
    },
    {
      question: "Which OOP concept allows a class to inherit from another class?",
      options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
      answer: "Inheritance",
      explanation: "Inheritance allows a class (child) to inherit properties and methods from another class (parent).",
      category: "OOPs"
    },
    {
      question: "What is method overriding?",
      options: ["Creating new methods", "Redefining inherited methods", "Deleting methods", "Copying methods"],
      answer: "Redefining inherited methods",
      explanation: "Method overriding allows a subclass to provide a specific implementation of a method that is already defined in its parent class.",
      category: "OOPs"
    },
    {
      question: "What is an abstract class?",
      options: ["Class with no methods", "Class that cannot be instantiated", "Class with only variables", "Class with one method"],
      answer: "Class that cannot be instantiated",
      explanation: "An abstract class cannot be instantiated directly and typically contains one or more abstract methods that must be implemented by subclasses.",
      category: "OOPs"
    },
    {
      question: "What is polymorphism?",
      options: ["Multiple inheritance", "Same interface, different implementation", "Creating objects", "Destroying objects"],
      answer: "Same interface, different implementation",
      explanation: "Polymorphism allows objects of different types to be treated as instances of the same type through a common interface.",
      category: "OOPs"
    },
    // New questions from your list
    {
      question: "Which OOP principle is used when one class inherits the properties of another?",
      options: ["Polymorphism", "Abstraction", "Encapsulation", "Inheritance"],
      answer: "Inheritance",
      explanation: "Inheritance allows one class to acquire the properties and behavior of another.",
      category: "OOPs"
    },
    {
      question: "Which OOP concept hides internal implementation and exposes only necessary details?",
      options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
      answer: "Abstraction",
      explanation: "Abstraction shows essential features and hides implementation details from the user.",
      category: "OOPs"
    }
  ],
  aptitude: [
    // Original questions
    {
      question: "If a clock shows 3:15, what is the angle between hour and minute hands?",
      options: ["7.5°", "15°", "22.5°", "30°"],
      answer: "7.5°",
      explanation: "At 3:15, minute hand is at 90° (15*6) and hour hand is at 97.5° (3*30 + 15*0.5). Difference is 7.5°.",
      category: "Aptitude"
    },
    {
      question: "A train 200m long crosses a platform 300m long in 25 seconds. What is its speed?",
      options: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"],
      answer: "20 m/s",
      explanation: "Total distance = 200 + 300 = 500m. Speed = 500m / 25s = 20 m/s.",
      category: "Aptitude"
    },
    {
      question: "If 15 workers can build a wall in 12 days, how many days will 20 workers take?",
      options: ["8 days", "9 days", "10 days", "16 days"],
      answer: "9 days",
      explanation: "Work = 15 × 12 = 180 worker-days. For 20 workers: 180 ÷ 20 = 9 days.",
      category: "Aptitude"
    },
    {
      question: "What is 25% of 80?",
      options: ["15", "20", "25", "30"],
      answer: "20",
      explanation: "25% of 80 = (25/100) × 80 = 0.25 × 80 = 20.",
      category: "Aptitude"
    },
    {
      question: "If A:B = 2:3 and B:C = 4:5, what is A:B:C?",
      options: ["2:3:5", "8:12:15", "6:9:15", "4:6:10"],
      answer: "8:12:15",
      explanation: "A:B = 2:3, B:C = 4:5. To find A:B:C, make B equal: A:B = 8:12, B:C = 12:15. So A:B:C = 8:12:15.",
      category: "Aptitude"
    },
    // New questions from your list
    {
      question: "What is 25% of 480?",
      options: ["120", "100", "130", "140"],
      answer: "120",
      explanation: "25% = 1/4 → 480 × 1/4 = 120.",
      category: "Aptitude"
    },
    {
      question: "Find the missing number: 2, 6, 12, 20, ?",
      options: ["28", "30", "32", "26"],
      answer: "30",
      explanation: "Pattern is n² + n: (1²+1)=2, (2²+2)=6, (3²+3)=12, (4²+4)=20, (5²+5)=30.",
      category: "Aptitude"
    }
  ],
  finance: [
    // Original questions
    {
      question: "What is compound interest?",
      options: ["Interest on principal only", "Interest on principal and accumulated interest", "Simple interest calculation", "Bank charges"],
      answer: "Interest on principal and accumulated interest",
      explanation: "Compound interest is calculated on the principal amount and also on the accumulated interest from previous periods.",
      category: "Finance"
    },
    {
      question: "What does ROI stand for?",
      options: ["Return on Investment", "Rate of Interest", "Risk of Investment", "Revenue on Investment"],
      answer: "Return on Investment",
      explanation: "ROI (Return on Investment) measures the efficiency of an investment by comparing the gain or loss relative to its cost.",
      category: "Finance"
    },
    {
      question: "What is a stock dividend?",
      options: ["Cash payment to shareholders", "Additional shares given to shareholders", "Company debt", "Market price"],
      answer: "Additional shares given to shareholders",
      explanation: "A stock dividend is a payment made by a company to its shareholders in the form of additional shares rather than cash.",
      category: "Finance"
    },
    {
      question: "What is inflation?",
      options: ["Decrease in prices", "Increase in general price level", "Currency devaluation", "Market crash"],
      answer: "Increase in general price level",
      explanation: "Inflation is the rate at which the general level of prices for goods and services rises, reducing purchasing power.",
      category: "Finance"
    },
    {
      question: "What is a mutual fund?",
      options: ["Individual stock", "Pooled investment vehicle", "Bank account", "Insurance policy"],
      answer: "Pooled investment vehicle",
      explanation: "A mutual fund pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.",
      category: "Finance"
    },
    // New questions from your list
    {
      question: "If you invest ₹10,000 at 10% simple interest for 2 years, what is the interest earned?",
      options: ["₹1000", "₹2000", "₹1500", "₹2500"],
      answer: "₹2000",
      explanation: "Simple Interest = (P × R × T) / 100 = (10000 × 10 × 2)/100 = ₹2000.",
      category: "Finance"
    }
  ],
  development: [
    // Original questions
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      answer: "Hyper Text Markup Language",
      explanation: "HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications.",
      category: "Development"
    },
    {
      question: "Which of the following is a JavaScript framework?",
      options: ["Django", "Laravel", "React", "Flask"],
      answer: "React",
      explanation: "React is a JavaScript library/framework for building user interfaces, particularly web applications.",
      category: "Development"
    },
    {
      question: "What is CSS used for?",
      options: ["Database management", "Styling web pages", "Server-side logic", "Network protocols"],
      answer: "Styling web pages",
      explanation: "CSS (Cascading Style Sheets) is used to describe the presentation and styling of HTML documents.",
      category: "Development"
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Integration"],
      answer: "Application Programming Interface",
      explanation: "API (Application Programming Interface) is a set of protocols and tools for building software applications.",
      category: "Development"
    },
    {
      question: "Which HTTP method is used to retrieve data?",
      options: ["POST", "PUT", "DELETE", "GET"],
      answer: "GET",
      explanation: "The GET method is used to retrieve data from a server without modifying any resources.",
      category: "Development"
    },
    // New question from your list
    {
      question: "Which of the following is NOT a frontend technology?",
      options: ["HTML", "CSS", "JavaScript", "Node.js"],
      answer: "Node.js",
      explanation: "Node.js is a backend runtime environment for running JavaScript on the server.",
      category: "Development"
    }
  ],
  ml: [
    // Original questions
    {
      question: "What is supervised learning?",
      options: ["Learning without labeled data", "Learning with labeled training data", "Learning through trial and error", "Learning from user feedback"],
      answer: "Learning with labeled training data",
      explanation: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs.",
      category: "Machine Learning"
    },
    {
      question: "Which algorithm is commonly used for classification?",
      options: ["K-means", "Linear Regression", "Decision Tree", "PCA"],
      answer: "Decision Tree",
      explanation: "Decision Trees are commonly used for both classification and regression tasks by creating a tree-like model of decisions.",
      category: "Machine Learning"
    },
    {
      question: "What is overfitting in machine learning?",
      options: ["Model performs well on all data", "Model memorizes training data but fails on new data", "Model is too simple", "Model has too few parameters"],
      answer: "Model memorizes training data but fails on new data",
      explanation: "Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize to new data.",
      category: "Machine Learning"
    },
    {
      question: "What is the purpose of cross-validation?",
      options: ["To increase model complexity", "To evaluate model performance", "To reduce training time", "To increase dataset size"],
      answer: "To evaluate model performance",
      explanation: "Cross-validation is used to assess how well a model will generalize to an independent dataset.",
      category: "Machine Learning"
    },
    {
      question: "What is a neural network?",
      options: ["A type of database", "A network of interconnected nodes", "A sorting algorithm", "A data structure"],
      answer: "A network of interconnected nodes",
      explanation: "A neural network is a computing system inspired by biological neural networks, consisting of interconnected nodes (neurons).",
      category: "Machine Learning"
    },
    // New question from your list
    {
      question: "Which of the following is supervised learning?",
      options: ["K-means", "Linear Regression", "Apriori", "PCA"],
      answer: "Linear Regression",
      explanation: "Supervised learning uses labeled data, and Linear Regression predicts continuous outcomes.",
      category: "Machine Learning"
    }
  ],
  // New category from your list
  ai: [
    {
      question: "Which algorithm is used by chatbots for conversation?",
      options: ["DFS", "BFS", "NLP models", "Sorting algorithms"],
      answer: "NLP models",
      explanation: "Chatbots rely on Natural Language Processing (NLP) models to understand and respond to human text.",
      category: "AI"
    }
  ]
};

// Function to get random mix of questions
export const getRandomMix = (count = 10) => {
  const allQuestions = [];
  Object.keys(questions).forEach(category => {
    questions[category].forEach(q => {
      allQuestions.push({ ...q, category });
    });
  });
  
  // Shuffle array and return specified count
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const categories = [
  { id: 'dsa', name: 'DSA', description: 'Data Structures & Algorithms', icon: '🔗' },
  { id: 'dbms', name: 'DBMS', description: 'Database Management Systems', icon: '🗄️' },
  { id: 'os', name: 'OS', description: 'Operating Systems', icon: '💻' },
  { id: 'cn', name: 'CN', description: 'Computer Networks', icon: '🌐' },
  { id: 'oops', name: 'OOPs', description: 'Object Oriented Programming', icon: '🎯' },
  { id: 'aptitude', name: 'Aptitude', description: 'Logical Reasoning', icon: '🧠' },
  { id: 'finance', name: 'Finance', description: 'Financial Concepts', icon: '💰' },
  { id: 'development', name: 'Development', description: 'Web Development', icon: '⚡' },
  { id: 'ml', name: 'Machine Learning', description: 'AI & ML Concepts', icon: '🤖' },
  { id: 'ai', name: 'AI', description: 'Artificial Intelligence', icon: '🧠' },
  { id: 'random', name: 'Random Mix', description: 'Mixed Questions from All Categories', icon: '🎲' }
];