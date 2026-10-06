import type { Request, Response } from 'express';
import { postService } from '../services/post.ts';

export function getPostsHandler(req: Request, res: Response): void {
  const { category, take } = req.query;

  let takeNum: number | undefined;
  if (take !== undefined) {
    takeNum = Number(take);
    if (!Number.isInteger(takeNum) || takeNum <= 0) {
      res.status(422).json({
        message: 'Query parameter "take" must be a positive integer'
      });
      return;
    }
  }

  const posts = postService.getPosts(category as string | undefined, takeNum);
  res.status(200).json({ posts });
}

export function getPostByIdHandler(req: Request, res: Response): void {
  const { id } = req.params;
  const idNum = Number(id);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    res.status(422).json({
      message: 'Route parameter "id" must be a positive integer'
    });
    return;
  }

  try {
    const post = postService.getPostById(idNum);
    res.status(200).json({ post });
  } catch (err) {
    if (err instanceof Error && err.message === 'POST_NOT_FOUND') {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createPostHandler(
  req: Request,
  res: Response
): Promise<void> {
  const { title, content, author, category } = req.body;

  const errors: string[] = [];

  if (!title) {
    errors.push('title is required');
  }
  if (!content) {
    errors.push('content is required');
  }
  if (!author) {
    errors.push('author is required');
  }
  if (!category) {
    errors.push('category is required');
  }

  if (errors.length > 0) {
    res.status(422).json({ errors });
    return;
  }

  try {
    const newPost = await postService.createPost({
      title,
      content,
      author,
      category
    });

    res.status(201).json({ post: newPost });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}