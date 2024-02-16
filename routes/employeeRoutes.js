const express = require('express');
const Employee = require('../models/employee');
const User = require("../models/user");
const router = express.Router();

// Create a new employee
router.post('/employees', async (req, res) => {
    try {
        const { firstname, lastname, email, gender, salary } = req.body;
        if (!firstname || !lastname || !email || !gender || !salary) {
            return res.status(400).send({ error: 'Missing required employee details' });
        }
        const employee = new Employee({ firstname, lastname, email, gender, salary });
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get an employee by ID
router.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an employee by ID
router.put('/employees/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstname', 'lastname', 'email', 'gender', 'salary']; // Adjust as necessary
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        updates.forEach((update) => (employee[update] = req.body[update]));
        await employee.save();
        res.send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a user by ID
router.delete('/employees/:id', async (req, res) => {
    try {
        const employees = await Employee.findOneAndDelete({ _id: req.params.id });
        if (!employees) {
            return res.status(404).send({ message: 'Employee was not found' });
        }
        res.send({ message: 'Employee has been deleted successfully', employees});
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error: error.message });
    }
});



module.exports = router;
