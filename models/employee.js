const mongoose = require('mongoose');

const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;

const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate: [emailRegex, 'Email is not valid']
    },
    gender: {
        type: String,
        required: [true, 'Please enter gender'],
        lowercase: true,
        enum: ["male", "female", "other"]
    },
    salary: {
        type: Number,
        required: [true, 'Please enter salary'],
        min: [0, 'Salary must be a positive number']
    },
    created: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    },
});

// Virtuals
EmployeeSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

EmployeeSchema.virtual('bonus').get(function () {
    return this.salary * 0.1;
});

// Instance Methods
EmployeeSchema.methods.getFullName = function (salutation) {
    return `${salutation} ${this.firstname} ${this.lastname}`;
};

// Static Methods
EmployeeSchema.statics.getEmployeeByFirstName = function (name) {
    return this.find({ firstname: name });
};

EmployeeSchema.statics.getEmployeeByLastName = function (name) {
    return this.find({ lastname: name });
};

EmployeeSchema.statics.sortBy = function (fieldName, order = 'asc') {
    const sortObject = {};
    sortObject[fieldName] = order.toLowerCase() === 'asc' ? 1 : -1;
    return this.find({}).sort(sortObject);
};

// Middleware
EmployeeSchema.pre('save', function (next) {
    this.updatedat = Date.now();
    next();
});

EmployeeSchema.pre('findOneAndUpdate', function () {
    this.set({ updatedat: Date.now() });
});

// Hooks
const logDocument = (doc) => {
    console.log('%s has been processed', doc._id);
};

EmployeeSchema.post('init', logDocument);
EmployeeSchema.post('validate', logDocument);
EmployeeSchema.post('save', logDocument);
EmployeeSchema.post('remove', logDocument);

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
