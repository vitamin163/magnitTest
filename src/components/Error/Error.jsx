import React from 'react';
import './Error.css';

export const Error = ({ errorText }) => {
  if (!errorText) return null;
  return <div className='error'>{errorText}</div>;
};
