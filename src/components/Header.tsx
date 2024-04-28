'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
	const { data: session }: any = useSession();
	return (
		<header>
			<nav className="w-full py-6 shadow-lg bg-slate-200 flex flex-col md:flex-row items-center px-20 justify-between">
				<h1 className="font-bold text-2xl pb-6 md:pb-0 whitespace-nowrap">
					<Link href="/">E-Service</Link>
				</h1>
				{session ? (
					<div className="flex gap-8">
						<p className="text-black whitespace-nowrap cursor-pointer hover:underline">
							<Link href="/dashboard">Admin Dashboard</Link>
						</p>
						<p
							className="text-black cursor-pointer hover:underline"
							onClick={() => signOut()}>
							Logout
						</p>
					</div>
				) : (
					<p className="text-black cursor-pointer hover:underline">
						<Link href="/login">Admin Login</Link>
					</p>
				)}
			</nav>
		</header>
	);
}
