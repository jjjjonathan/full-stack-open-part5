const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total likes', () => {
  test('when list has one blog equals the likes of that blog', () => {
    const blogs = [
      {
        _id: '6068f9775eea4f0b7b41acc4',
        title: 'How to be baller',
        author: 'Jonny the dog',
        url: 'http://google.com',
        likes: 5,
        __v: 0,
      },
    ];

    expect(listHelper.totalLikes(blogs)).toBe(5);
  });

  test('of empty list is zero', () => {
    const blogs = [];

    expect(listHelper.totalLikes(blogs)).toBe(0);
  });

  test('of four blogs should be correct', () => {
    const blogs = [
      {
        _id: '6068f9775eea4f0b7b41acc4',
        title: 'How to be baller',
        author: 'Jonny the dog',
        url: 'http://google.com',
        likes: 5,
        __v: 0,
      },
      {
        _id: '6068fdb06386360e5acf3e58',
        title: 'How to be a dog',
        author: 'Jonny the dog',
        url: 'http://google.com/dog',
        likes: 345,
        __v: 0,
      },
      {
        _id: '60690a40054fa30fc4bf1604',
        title: 'How to be a frog',
        author: 'Jonny the frog',
        url: 'http://google.com/frog',
        likes: 3453,
        __v: 0,
      },
      {
        _id: '60690dc2099f551234c8a5ea',
        title: 'Jingle Bells the novel',
        author: 'Miranda Frogsgrove',
        url: 'http://google.com/novel',
        likes: 3453234,
        __v: 0,
      },
    ];

    expect(listHelper.totalLikes(blogs)).toBe(3457037);
  });

  test('of six blogs should be correct', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
      },
    ];

    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe('Favorite blog', () => {
  test("when there's only one blog is that blog", () => {
    const blogs = [
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
      },
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2,
    });
  });

  test('of many blogs should be correct', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url:
          'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
      },
    ];

    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});
