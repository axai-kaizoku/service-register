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
									<p>
										<span className="font-semibold">Request ID: </span>{' '}
										{request?.requestId}
									</p>
									<p>
										<span className="font-semibold">Name: </span>{' '}
										{request?.customerName}
									</p>
									<p>
										<span className="font-semibold">Email: </span>{' '}
										{request?.email}
									</p>
									<p>
										<span className="font-semibold">Phone Number: </span>{' '}
										{request?.phoneNumber}
									</p>
									<p>
										<span className="font-semibold">Request Type: </span>{' '}
										{request?.requestType}
									</p>
									<p>
										<span className="font-semibold">Details: </span>{' '}
										{request?.details}
									</p>
									<p>
										<span className="font-semibold">Attachement: </span>
										{request?.attachment === '' ? (
											'No attachment'
										) : (
											<Image
												src={request?.attachment as string}
												alt="attachment"
												width={300}
												height={300}
												className="object-contain "
											/>
										)}
									</p>
									<p>
										<span className="font-semibold">Status: </span>{' '}
										{request?.status}
									</p>
									<p>
										<span className="font-semibold">Raised on: </span>{' '}
										{formatDate(request?.createdAt!)}
									</p>
									<p>
										<span className="font-semibold">Resolved on: </span>{' '}
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
