const dummy = (blogs) => 1;

const totalLikes = (list) => {
  return list.reduce((prev, { likes }) => prev + likes, 0);
};

const favoriteBlog = (list) => {
  return list.reduce((favBlog, current) => {
    if (favBlog.likes <= current.likes) {
      return current;
    }
    return favBlog;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
