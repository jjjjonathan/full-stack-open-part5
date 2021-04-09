import React from 'react';

const Create = ({
  onSubmit,
  title,
  onTitleChange,
  author,
  onAuthorChange,
  url,
  onUrlChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="title" style={{ marginRight: 5 }}>
          Title:
        </label>
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={onTitleChange}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="author" style={{ marginRight: 5 }}>
          Author:
        </label>
        <input
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={onAuthorChange}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <label htmlFor="url" style={{ marginRight: 5 }}>
          URL:
        </label>
        <input
          type="text"
          value={url}
          name="url"
          id="url"
          onChange={onUrlChange}
        />
      </div>
      <button type="submit" style={{ marginBottom: 15 }}>
        Add to list
      </button>
    </form>
  );
};

export default Create;
