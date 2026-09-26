import postRepository from '../repositories/post.js'

export function getPosts(category, take) {
  return postRepository.getAll(category, take)
}

export function getPostById(id) {
  const post = postRepository.getById(id);

  if (!post) {
    throw new Error('POST_NOT_FOUND');
  }

  return post;
}

export async function createPost(data) {
  return await postRepository.addPost(data)
}