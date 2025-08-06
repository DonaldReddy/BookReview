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
