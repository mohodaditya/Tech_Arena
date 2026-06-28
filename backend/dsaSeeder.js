const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DSAProblem = require('./models/DSAProblem');
const dsaProblems = require('./data/dsaProblems.json');

dotenv.config({ override: true });

const seedDSA = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for DSA seeding...');

        // Clear existing DSA problems
        await DSAProblem.deleteMany({});
        console.log('Cleared existing DSA problems.');

        // Insert all problems
        const inserted = await DSAProblem.insertMany(dsaProblems);
        console.log(`Seeded ${inserted.length} DSA problems successfully!`);

        inserted.forEach(p => {
            console.log(`  ✓ ${p.title} (${p.difficulty}) — ${p.testCases.length} test cases`);
        });

        process.exit(0);
    } catch (error) {
        console.error('DSA Seeding error:', error);
        process.exit(1);
    }
};

seedDSA();
