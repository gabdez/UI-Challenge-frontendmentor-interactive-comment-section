export interface User {
    username: string
    image: Record<string, string>
}
export interface Commentary {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replies: Comment[]
    user: User
}