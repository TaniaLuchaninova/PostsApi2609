import postService from '../services/post.js'

export function getPostsHandler(req, res) {
  const { category, take } = req.query

  let takeNum
  if (take !== undefined) {
    takeNum = Number(take)
    if (!Number.isInteger(takeNum) || takeNum <= 0) {
      return res.status(422).json({
        message: 'Query parameter "take" must be a positive integer'
      });
    }
  }

  const posts = postService.getPosts(category, takeNum)
  res.status(200).json({ posts });
}

export function getPostByIdHandler(req, res) {
  const { id } = req.params
  const idNum = Number(id)

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return res.status(422).json({
      message: 'Route parameter "id" must be a positive integer'
    })
  }

  try {
    const post = postService.getPostById(idNum)
    res.status(200).json({ post })
  } catch (err) {
    if (err.message === 'POST_NOT_FOUND') {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function createPostHandler(req, res) {
  const { title, content, author, category } = req.body

  const errors = []

  if (!title) {
    errors.push('title is required')
  }
  if (!content) {
    errors.push('content is required')
  }
  if (!author) {
    errors.push('author is required')
  }
  if (!category) {
    errors.push('category is required')
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors })
  }

  try {
    const newPost = await postService.createPost({
      title,
      content,
      author,
      category
    });

    res.status(201).json({ post: newPost })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}