import Request from '@/models/Request';
import connect from '@/utils/database';
import generateNumericUUID from '@/utils/gen-req-id';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: any) {
	await connect();

	try {
		const requests = await Request.find({});
		return NextResponse.json(requests, { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}

export async function POST(request: NextRequest) {
	try {
		await connect();
		const requestId = generateNumericUUID();

		const {
			customerName,
			email,
			phoneNumber,
			requestType,
			details,
			attachment,
		} = await request.json();

		const newRequest = await new Request({
			requestId,
			customerName,
			email,
			phoneNumber,
			requestType,
			details,
			attachment,
		});

		await newRequest.save();
		// console.log(newRequest);
		return new NextResponse(newRequest, { status: 201 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}
