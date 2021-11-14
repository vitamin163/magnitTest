import React from 'react';
import classNames from 'classnames';
import { Loader } from '..';
import './Button.css';

export const Button = (props) => {
  const {
    children, isLoading, isDisabled, ...otherProps
  } = props;
  return (<button className={classNames('button', { 'button_is-disabled': isDisabled || isLoading })} disabled={isLoading || isDisabled} {...otherProps}>
    {isLoading ? <Loader /> : children}
    </button>);
};
