import { Router } from 'express';
import type { RequestHandler } from 'express';

export function createPostRouter(handlers: {
  getPosts: RequestHandler;
  getPostById: RequestHandler;
  createPost: RequestHandler;
}) {
  const router = Router();

  router.get('/', handlers.getPosts);
  router.get('/:id', handlers.getPostById);
  router.post('/', handlers.createPost);

  return router;
}