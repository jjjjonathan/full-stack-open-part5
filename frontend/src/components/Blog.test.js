import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

let component;

beforeEach(() => {
  const blog = {
    title: 'Living for what now?',
    author: 'Progressive Author',
    url: 'google.com',
    likes: 23,
    id: 12345,
    user: {
      name: 'Jonathan',
      username: 'jjjjonathan',
      id: 54321,
    },
  };

  const user = {
    name: 'Jonathan',
    username: 'jjjjonathan',
    id: 54321,
  };

  component = render(<Blog blog={blog} user={user} />);
});

test('Blog renders title and author, but not its URL or likes by default', () => {
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'Living for what now?'
  );
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'Progressive Author'
  );
  expect(component.container.querySelector('.blog div')).toHaveStyle(
    'display: none'
  );
});

test('URL and likes are shown when button clicked', () => {
  const button = component.getByText('Show details');
  fireEvent.click(button);
  expect(component.container.querySelector('.blog div')).not.toHaveStyle(
    'display: none'
  );
});
