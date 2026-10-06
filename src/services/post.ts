import type { PostRepository } from '../domain/posts/repository.ts';

export function createPostService(postRepository: PostRepository) {
  return {
    getPosts(category?: string, take?: number) {
      return postRepository.getAll(category, take);
    },

    getPostById(id: number) {
      const post = postRepository.getById(id);

      if (!post) {
        throw new Error('POST_NOT_FOUND');
      }

      return post;
    },

    async createPost(data: {
      title: string;
      content: string;
      author: string;
      category: string;
    }) {
      return await postRepository.addPost(data);
    }
  };
}