'use client';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { RequestProp } from '@/types';
import { formatDate } from '@/utils/format-date';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
	const router = useRouter();
	const [requests, setRequests] = useState<RequestProp[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const { data: session, status: sessionStatus } = useSession();
	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.replace('/login');
		}
	}, [sessionStatus, router]);

	const fetchRequests = async () => {
		setLoading(true);
		const response = await fetch('/api/requests');
		const data = await response.json();
		setRequests(data);
		setLoading(false);
	};
	const handleChange = async (id: string, status: string) => {
		setLoading(true);
		const response = await fetch(`/api/requests/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ status }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setLoading(false);

		if (response.ok) {
			fetchRequests();
		}
	};
	useEffect(() => {
		fetchRequests();
	}, []);

	return (
		<>
			<div className="w-full h-[90vh]">
				<div className="p-7 flex flex-row justify-between">
					<h1 className="text-3xl font-semibold ">Admin Dashboard</h1>
				</div>
				<div className="flex items-center justify-center">
					<div className="w-full mx-5 border "></div>
				</div>
				<div className="w-full h-2/3 flex flex-row justify-center items-center">
					<div className=" w-11/12 h-full flex flex-row justify-between p-6">
						<div className=" bg-slate-50  shadow-lg w-11/12 p-3 rounded">
							<div>
								<h1 className="text-xl font-bold">Requests</h1>
								<div className="border rounded border-gray-600"></div>
								<div className="w-full mt-2 overflow-y-auto max-h-[40vh]">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>RequestID</TableHead>
												<TableHead>Customer Name</TableHead>
												<TableHead>Email</TableHead>
												<TableHead>Phone Number</TableHead>
												<TableHead>Request Type</TableHead>
												<TableHead>Created At</TableHead>
												<TableHead>Status</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{loading ? (
												<TableCaption
													aria-colspan={5}
													className="w-full flex justify-center items-center ">
													<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
												</TableCaption>
											) : (
												requests!.map((req, i) => (
													<TableRow key={i}>
														<TableCell className="font-medium">
															{req.requestId}
														</TableCell>
														<TableCell>{req.customerName}</TableCell>
														<TableCell>{req.email}</TableCell>
														<TableCell>{req.phoneNumber}</TableCell>
														<TableCell>{req.requestType}</TableCell>
														<TableCell>{formatDate(req.createdAt)}</TableCell>
														<TableCell>
															<select
																name="status"
																id="status"
																value={req.status}
																onChange={(e) =>
																	handleChange(req.requestId, e.target.value)
																}>
																<option value="Pending">Pending</option>
																<option value="In Progress">In Progress</option>
																<option value="Resolved">Resolved</option>
															</select>
														</TableCell>
													</TableRow>
												))
											)}
										</TableBody>
									</Table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
