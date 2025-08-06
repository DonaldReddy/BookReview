export type Book = {
	id: string;
	title: string;
	author: string;
	description: string;
	genre?: string[];
	coverImage: string | File | null;
	rating: number;
	ratingCount: number;
	featured: "NO" | "YES";
	createdAt: Date;
};

export type User = {
	id: string;
	name: string;
	email: string;
	role: string;
	profileImage?: string;
	isVerified?: boolean;
};

export type AuthResponse = {
	user: User;
	message?: string;
};

export type EmailVerificationResponse = {
	message: string;
	user?: User;
};
