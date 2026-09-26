let posts = [
  {
    id: 1,
    title: "КОТИ",
    content: "коти, коти",
    author: "CAT_lvl100",
    category: "cats"
  },
  {
    id: 2,
    title: "Dogs",
    content: "dog",
    author: "Dog_lvl0",
    category: "dogs"
  }
];

let nextId = 3

export function getAll(category, take) {
  let result = [...posts]

  if (category !== undefined) {
    result = result.filter((post) => post.category === category);
  }

  if (take !== undefined) {
    result = result.slice(0, take)
  }

  return result;
}

export function getById(id) {
  return posts.find((post) => post.id === id)
}

export function addPost({ title, content, author, category }) {
  return new Promise((resolve) => {
    const newPost = {
      id: nextId++,
      title,
      content,
      author,
      category
    };

    posts.push(newPost)
    resolve(newPost)
  });
}