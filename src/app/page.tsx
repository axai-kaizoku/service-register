import Form from '@/components/Form';
import SearchReq from '@/components/SearchReq';

export default function Home() {
	return (
		<div className="flex flex-col w-full min-h-screen items-center">
			<SearchReq />
			<hr className="border-t h-1 border-black" />
			<Form />
		</div>
	);
}
