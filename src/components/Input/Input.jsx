import React from 'react';
import './Input.css';

export const Input = (props) => {
  const { errorMessage, ...otherProps } = props;
  return (
    <div>
      <input className='base-input' {...otherProps} />
      <div className='base-input__error'>{errorMessage}</div>
    </div>
  );
};
