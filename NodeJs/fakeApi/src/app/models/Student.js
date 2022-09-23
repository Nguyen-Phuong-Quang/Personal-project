const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const StudentSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String, default: 'empty' },
        email: { type: String, default: 'empty' },
        phoneNumber: { type: String, default: 'empty' },
        address: { type: String, default: 'empty' },
        slug: { type: String, slug: 'name', unique: true }

    },
    {
        _id: false,
        timestamps: true
    }
)

// Add plugins
mongoose.plugin(slug);
StudentSchema.plugin(AutoIncrement);
StudentSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('student', StudentSchema);