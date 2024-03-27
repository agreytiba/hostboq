// setup.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel'); // Assuming your User model is defined in userModel.js
const connectDB = require('./config/db');

// Call the connectDB function before creating the admin user
connectDB();

// Function to create an admin user
async function createAdminUser() {
    try {
        // Check if an admin user already exists
        const existingAdmin = await User.findOne({ accessLevel: 'admin' });

        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Define the desired password for the admin user
        const adminPassword = 'admin@0404'; // Change this to the desired password

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Create admin user data
        const adminUserData = {
            name: 'Admin', // Change as needed
            email: 'admin@test.com', // Change as needed
            phone: '1234567890', // Change as needed
            accessLevel: 'admin',
            password: hashedPassword
        };

        // Create the admin user
        const adminUser = await User.create(adminUserData);
        console.log('Admin user created successfully:', adminUser);
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        // Disconnect from MongoDB
        mongoose.disconnect();
    }
}

// Call the function to create the admin user
createAdminUser();
