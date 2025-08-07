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
	isVerified: boolean;
	profileImage?: string;
};

export type AuthResponse = {
	user?: User;
	message?: string;
	requiresVerification?: boolean;
};

export type SignupResponse = {
	message: string;
	user: {
		id: string;
		name: string;
		email: string;
		isVerified: boolean;
	};
};

export type LoginError = {
	message: string;
	requiresVerification?: boolean;
};
