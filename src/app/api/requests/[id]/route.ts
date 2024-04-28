import Request from '@/models/Request';
import connect from '@/utils/database';
import { NextResponse } from 'next/server';

export async function GET(
	request: any,
	{ params }: { params: { id: string } },
) {
	await connect();
	try {
		const id = params.id;
		const req = await Request.findOne({ requestId: id });
		if (!req) {
			return Response.json('No Request found with this ID');
		}
		return NextResponse.json(req, { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}

export async function PUT(
	request: any,
	{ params }: { params: { id: string } },
) {
	await connect();
	try {
		const id = params.id;
		const { status } = await request.json();
		const req = await Request.findOne({ requestId: id });
		req.status = status;
		await req.save();

		return NextResponse.json(req, { status: 200 });
	} catch (error: any) {
		return new NextResponse(error, {
			status: 500,
		});
	}
}
