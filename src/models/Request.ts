import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestSchema = new Schema({
	requestId: {
		type: String,
		unique: true,
		required: true,
	},
	customerName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	requestType: {
		type: String,
		enum: [
			'Gas Connection',
			'Gas Leak',
			'Billing Inquiry',
			'Meter Reading',
			'Service Interruption',
			'Other',
		],
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
	attachment: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Pending', 'In Progress', '1446893771'],
		default: 'Pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resolvedAt: {
		type: Date,
	},
});

export default mongoose.models.Request ||
	mongoose.model('Request', requestSchema);
