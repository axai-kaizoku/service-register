export interface RequestProp {
	_id: string;
	requestId: string;
	customerName: string;
	email: string;
	phoneNumber: string;
	requestType: string;
	details: string;
	attachment: string;
	status: string;
	createdAt: Date;
	resolvedAt: Date;
}
