import type { Post } from '../domain/posts/entity.ts';
import type { PostRepository } from '../domain/posts/repository.ts';

export function createPostRepository(): PostRepository {
  const posts: Post[] = [
    {
      id: 1,
      title: 'КОТИ',
      content: 'коти, коти',
      author: 'CAT_lvl100',
      category: 'cats'
    },
    {
      id: 2,
      title: 'Dogs',
      content: 'dog',
      author: 'Dog_lvl0',
      category: 'dogs'
    }
  ];

  let nextId = 3;

  return {
    getAll(category?: string, take?: number): Post[] {
      let result = [...posts];

      if (category !== undefined) {
        result = result.filter((post) => post.category === category);
      }

      if (take !== undefined) {
        result = result.slice(0, take);
      }

      return result;
    },

    getById(id: number): Post | undefined {
      return posts.find((post) => post.id === id);
    },

    addPost(data: {
      title: string;
      content: string;
      author: string;
      category: string;
    }): Promise<Post> {
      return new Promise((resolve) => {
        const newPost: Post = {
          id: nextId++,
          title: data.title,
          content: data.content,
          author: data.author,
          category: data.category
        };

        posts.push(newPost);
        resolve(newPost);
      });
    }
  };
}