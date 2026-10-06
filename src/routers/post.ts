import { Router } from 'express'
import { getPostsHandler, getPostByIdHandler, createPostHandler } from '../transport/post.js'

const router = Router()

router.get('/', getPostsHandler)
router.get('/:id', getPostByIdHandler)
router.post('/', createPostHandler)

export default router