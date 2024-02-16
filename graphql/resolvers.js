const User = require('../models/user'); // adjust the path as necessary
const Employee = require('../models/employee'); // adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email: username }] });
            if (!user) {
                throw new Error('User not found');
            }

            // const isValidPassword = await bcrypt.compare(password, user.password);
            // if (!isValidPassword) {
            //     throw new Error('Invalid password');
            // }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return { token, user: { ...user._doc, password: null } }; // do not include password in the result
        },
        getAllEmployees: async () => {
            return await Employee.find({});
        },
        getEmployeeById: async (_, { eid }) => {
            return await Employee.findById(eid);
        },
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return { token, user: { ...newUser._doc, password: null } };
        },
        createEmployee: async (_, { firstname, lastname, email, gender, salary }) => {
            const newEmployee = new Employee({ firstname, lastname, email, gender, salary });
            await newEmployee.save();
            return newEmployee;
        },
        updateEmployee: async (_, { eid, firstname, lastname, email, gender, salary }) => {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                eid,
                { $set: { firstname, lastname, email, gender, salary } },
                { new: true }
            );
            return updatedEmployee;
        },
        deleteEmployee: async (_, { eid }) => {
            try {
                const deletedEmployee = await Employee.findByIdAndDelete(eid);
                if (!deletedEmployee) {
                    throw new Error('Employee not found');
                }
                return deletedEmployee;
            } catch (error) {
                // It's a good practice to log the error for debugging purposes
                console.error('Error deleting employee:', error);
                throw new Error('Error deleting employee');
            }
        },
    },
};

module.exports = resolvers;
