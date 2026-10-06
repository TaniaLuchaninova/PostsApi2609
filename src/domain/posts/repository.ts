import type { Post } from './entity.ts';

export interface PostRepository {
  getAll: (category?: string, take?: number) => Post[];
  getById: (id: number) => Post | undefined;
  addPost: (data: {
    title: string;
    content: string;
    author: string;
    category: string;
  }) => Promise<Post>;
}