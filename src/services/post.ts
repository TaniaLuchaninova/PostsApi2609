
import { PostRepository } from '../repositories/post.ts';

const postRepository = new PostRepository();

export function getPosts(category?: string, take?: number) {
  return postRepository.getAll(category, take);
}

export function getPostById(id: number) {
  const post = postRepository.getById(id);

  if (!post) {
    throw new Error('POST_NOT_FOUND');
  }

  return post;
}

export async function createPost(data: {
  title: string;
  content: string;
  author: string;
  category: string;
}) {
  return await postRepository.addPost(data);
}

export const postService = { getPosts, getPostById, createPost };