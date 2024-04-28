export const formatDate = (date: Date) => {
	const userDate = new Date(date);

	const hours = userDate.getHours();
	const minutes = userDate.getMinutes();

	const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

	const options: any = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	const formattedDate = userDate.toLocaleString('en-US', options);

	return `${formattedTime} ${formattedDate}`;
};
