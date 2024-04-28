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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
	const router = useRouter();
	const { data: session, status: sessionStatus } = useSession();
	useEffect(() => {
		if (sessionStatus === 'unauthenticated') {
			router.replace('/login');
		}
	}, [sessionStatus, router]);

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
												<TableHead>Name</TableHead>
												<TableHead>Room No.</TableHead>
												<TableHead>Check In</TableHead>
												<TableHead>Check Out</TableHead>
												<TableHead>Status</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{false ? (
												<TableCaption
													aria-colspan={5}
													className="w-full flex justify-center items-center ">
													<div className="w-9 h-9 border-t-8 rounded-full border-8 border-t-slate-500 border-gray-300 animate-spin"></div>
												</TableCaption>
											) : (
												Array(1, 2, 3, 4, 51, 2, 3, 4, 5).map((_, i) => (
													<TableRow key={i}>
														<TableCell className="font-medium">
															{/* {order.user.name} */}User
														</TableCell>
														<TableCell>
															{/* {order.rooms
															.map((room: RoomProps) => room.roomNumber)
															.join(', ')} */}
															101
														</TableCell>
														<TableCell>
															{/* {formatOrderDate(order.checkIn)} */}30th
														</TableCell>
														<TableCell>
															{/* {formatOrderDate(order.checkOut)} */}29th
														</TableCell>
														<TableCell>Pending</TableCell>
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
