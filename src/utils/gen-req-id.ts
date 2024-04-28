import { v4 as uuidv4 } from 'uuid';

export default function generateNumericUUID() {
	const uuid = uuidv4();
	const numericUUID = parseInt(uuid.replace(/-/g, '').substring(0, 8), 16);
	const paddedNumericUUID = String(numericUUID).padStart(8, '0');

	return paddedNumericUUID;
}
