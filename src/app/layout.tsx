import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getServerSession } from 'next-auth';
import AuthProvider from '@/utils/SessionProvider';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'E-Service',
	description: 'A compliant registering and resolving platform',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider session={session}>
					<Header />
					<main className="bg-slate-200">{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}
