import React from 'react';

const Notification = ({ message, isError }) => {
  const normalStyle = () => ({ fontSize: 20, color: 'green' });
  const errorStyle = () => ({ fontSize: 20, color: 'red' });

  return (
    <div style={isError ? errorStyle() : normalStyle()}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
