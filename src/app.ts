import express from 'express';
import type { Express } from 'express';
import { createPostRepository } from './repositories/post.ts';
import { createPostService } from './services/post.ts';
import {
  createGetPostsHandler,
  createGetPostByIdHandler,
  createPostHandler
} from './transport/post.ts';
import { createPostRouter } from './routers/post.ts';

export function createApp(): Express {
  const app = express();

  const postRepository = createPostRepository();
  const postService = createPostService(postRepository);

  const handlers = {
    getPosts: createGetPostsHandler(postService),
    getPostById: createGetPostByIdHandler(postService),
    createPost: createPostHandler(postService)
  };

  const postRouter = createPostRouter(handlers);

  app.use(express.json());

  app.use('/posts', postRouter);

  return app;
}