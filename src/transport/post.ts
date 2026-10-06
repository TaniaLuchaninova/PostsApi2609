import type { Request, Response } from 'express';
import type { createPostService } from '../services/post.ts';

type PostService = ReturnType<typeof createPostService>;

export function createGetPostsHandler(postService: PostService) {
  return function getPostsHandler(req: Request, res: Response): void {
    const { category, take } = req.query as { category?: string; take?: string };

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

    const posts = postService.getPosts(category, takeNum);
    res.status(200).json({ posts });
  };
}

export function createGetPostByIdHandler(postService: PostService) {
  return function getPostByIdHandler(req: Request, res: Response): void {
    const idNum = Number(req.params.id);

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
  };
}

export function createPostHandler(postService: PostService) {
  return async function createPostHandlerInner(
    req: Request,
    res: Response
  ): Promise<void> {
    const { title, content, author, category } = req.body as Partial<CreatePostDto>;

    const errors: string[] = [];

    if (!title) errors.push('title is required');
    if (!content) errors.push('content is required');
    if (!author) errors.push('author is required');
    if (!category) errors.push('category is required');

    if (errors.length > 0) {
      res.status(422).json({ errors });
      return;
    }

    try {
      const newPost = await postService.createPost({
        title: title as string,
        content: content as string,
        author: author as string,
        category: category as string
      });

      res.status(201).json({ post: newPost });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}