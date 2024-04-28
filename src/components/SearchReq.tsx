'use client';

import { RequestProp } from '@/types';
import { formatDate } from '@/utils/format-date';
import Image from 'next/image';
import { useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';

export default function SearchReq() {
	const [id, setId] = useState<string>('');
	const [request, setRequest] = useState<RequestProp | null>(null);
	const [error, setError] = useState<string>('');
	const handleSearch = async () => {
		if (id.length < 0 || id.trim() === '') {
			setError('Enter valid Request ID');
			return;
		}
		const response = await fetch(`/api/requests/${id}`);
		if (!response.ok) {
			setError('No Request found with ID');
			return;
		}
		const data = await response.json();

		setRequest(data);
		setError('');
		setId('');
	};
	return (
		<>
			<div className="w-2/4 py-20 md:pt-40 md:pb-20 mt-8 mb-4 space-y-6">
				<h1 className="text-3xl font-semibold">Search Request</h1>
				<input
					type="text"
					placeholder="Request ID"
					value={id}
					onChange={(e) => setId(e.target.value)}
					className="p-2.5 border rounded-lg w-full mb-2"
				/>
				<div>
					<p className="p-2 sm:text-sm w-full text-red-500">{error}</p>
				</div>
				<button
					onClick={() => handleSearch()}
					className="p-2 border border-slate-600 rounded-lg">
					Search
				</button>
			</div>
			<Accordion
				type="single"
				collapsible
				className="w-full flex flex-col items-center">
				<AccordionItem value="item-1">
					<AccordionTrigger>
						{request && <p className="text-xs text-center">Request Details</p>}
					</AccordionTrigger>
					<AccordionContent>
						{request && (
							<>
								<div className="space-y-4 flex flex-col">
									<p>Request ID: {request?.requestId}</p>
									<p>Name: {request?.customerName}</p>
									<p>Email: {request?.email}</p>
									<p>Phone Number: {request?.phoneNumber}</p>
									<p>Request Type: {request?.requestType}</p>
									<p>Details: {request?.details}</p>
									<p>
										Attachement:
										<Image
											src={request?.attachment as string}
											alt="attachment"
											width={300}
											height={300}
											className="object-contain "
										/>
									</p>
									<p>Status: {request?.status}</p>
									<p>Raised on: {formatDate(request?.createdAt!)}</p>
									<p>
										Resolved on:{' '}
										{request?.resolvedAt
											? formatDate(request?.resolvedAt!)
											: '-'}
									</p>
								</div>
							</>
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
