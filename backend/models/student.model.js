const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store as a hashed value
    name: { type: String },
    roll_no: { type: String },
    dept: { type: String },
    student_email: { type: String, unique: true },
    room_no: { type: String },
    room_type: { type: String, enum: ['AC', 'Non-AC'] },
    num_of_roommates: { type: Number },
    hostel_block: { type: String },
    student_phone: { type: String },
    parents_phone: { type: String },
    parents_email: { type: String },
    permanent_address: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);
