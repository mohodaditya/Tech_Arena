const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Question = require('./models/Question');

dotenv.config({ override: true });

connectDB();

const importData = async () => {
    try {
        await Question.deleteMany(); // Clear existing data

        const dataDir = path.join(__dirname, 'data');
        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir);

            for (const file of files) {
                if (file.endsWith('.json')) {
                    const filePath = path.join(dataDir, file);
                    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                    if (Array.isArray(fileData)) {
                        await Question.insertMany(fileData);
                        console.log(`Imported ${fileData.length} questions from ${file}`);
                    }
                }
            }
        } else {
            console.log('No data directory found.');
        }

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Question.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
