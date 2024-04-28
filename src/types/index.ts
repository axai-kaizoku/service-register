export interface RequestProp {
	_id: String;
	requestId: String;
	customerName: String;
	email: String;
	phoneNumber: String;
	requestType: String;
	details: String;
	attachment: String;
	status: String;
	createdAt: Date;
	resolvedAt: Date;
}
