'use client';
import { useState } from 'react';
import { UploadButton } from '@/utils/uploadthing';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import validateEmail from '@/utils/email-validate';
import validateMobile from '@/utils/phone-validate';

export default function Form() {
	const [error, setError] = useState<string>('');

	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [phoneNumber, setPhoneNumber] = useState<string>();
	const [requestType, setRequestType] = useState<string>('Gas Connection');
	const [details, setDetails] = useState<string>();
	const [file, setFile] = useState<string>();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name) return;
		if (!email) return;
		if (!validateEmail(email)) {
			setError('Invalid Email');
			return;
		}

		if (!phoneNumber) return;
		if (!validateMobile(phoneNumber)) {
			setError('Invalid Phone number');
			return;
		}
		if (!requestType) return;
		if (!details) return;
		if (!file) return;

		try {
			const res = await fetch('/api/requests', {
				method: 'POST',
				body: JSON.stringify({
					customerName: name,
					email,
					phoneNumber,
					requestType,
					details,
					attachment: file,
				}),
			});
			if (!res.ok) {
				setError('Something went wrong');
				throw new Error(await res.text());
			}
			setError('');

			setName('');
			setEmail('');
			setPhoneNumber('');
			setRequestType('');
			setDetails('');
			setFile(undefined);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Accordion
				type="single"
				collapsible
				className="w-full flex flex-col items-center">
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<p className="text-xs text-center">Want to raise a new Request?</p>
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex w-full justify-center">
							<form
								onSubmit={onSubmit}
								className=" space-y-4">
								<h2 className="text-2xl font-semibold">
									Submit Service Request
								</h2>
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
										placeholder="John"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Email
									</label>
									<input
										type="text"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
										placeholder="name@example.com"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Phone Number
									</label>
									<input
										type="text"
										name="phone"
										id="phone"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
										placeholder="9876543210"
										required
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</div>
								<div>
									<label
										htmlFor="requestType"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Request Type
									</label>
									<select
										name="requestType"
										id="requestType"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
										required
										value={requestType}
										onChange={(e) => setRequestType(e.target.value)}>
										<option
											value=""
											disabled>
											Select
										</option>
										<option value="Gas Connection">Gas Connection</option>
										<option value="Gas Leak">Gas Leak</option>
										<option value="Billing Inquiry">Billing Inquiry</option>
										<option value="Meter Reading">Meter Reading</option>
										<option value="Service Interruption">
											Service Interruption
										</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div>
									<label
										htmlFor="details"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										Details
									</label>
									<textarea
										name="details"
										id="details"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
										required
										value={details}
										onChange={(e) => setDetails(e.target.value)}
									/>
								</div>

								<div>
									<label
										htmlFor="file"
										className="block mb-2 text-sm font-medium text-gray-900 ">
										File
									</label>
									<UploadButton
										endpoint="imageUploader"
										onClientUploadComplete={(res) => {
											setFile(res[0].url);
										}}
										onUploadError={(error: Error) => {
											alert(`ERROR! ${error.message}`);
										}}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
									/>
								</div>
								<div>
									<p className="p-2 sm:text-sm w-full text-red-500">{error}</p>
								</div>

								<button
									type="submit"
									className="p-2 w-full border  bg-white text-slate-900 rounded-lg ">
									Submit
								</button>
							</form>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
