const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((acc, blog) => {
    return Math.max(acc, blog.likes);
  }, 0);

  const favorite = blogs.find((blog) => {
    return blog.likes === mostLikes;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
