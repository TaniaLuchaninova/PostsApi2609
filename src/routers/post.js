import { Router } from 'express'
import { getPostsHandler, getPostByIdHandler, createPostHandler } from '../handlers/post.js'

const router = Router()

router.get('/', getPostsHandler)
router.get('/:id', getPostByIdHandler)
router.post('/', createPostHandler)

export default router