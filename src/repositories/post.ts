import type { Post } from '../domain/posts/entity.ts'; 
import type { PostRepositoryContract } from '../domain/posts/repository.ts';

export class PostRepository implements PostRepositoryContract {
  private posts: Post[] = [
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

  private nextId = 3;

  getAll(category?: string, take?: number): Post[] {
    let result = [...this.posts];

    if (category !== undefined) {
      result = result.filter((post) => post.category === category);
    }

    if (take !== undefined) {
      result = result.slice(0, take);
    }

    return result;
  }

  getById(id: number): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  addPost(data: {
    title: string;
    content: string;
    author: string;
    category: string;
  }): Promise<Post> {
    return new Promise((resolve) => {
      const newPost: Post = {
        id: this.nextId++,
        title: data.title,
        content: data.content,
        author: data.author,
        category: data.category
      };

      this.posts.push(newPost);
      resolve(newPost);
    });
  }
}