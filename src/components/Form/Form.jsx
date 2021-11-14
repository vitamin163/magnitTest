import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';
import { Button, Input, Error } from '..';
import { countErrorText, handleErrorText } from './constatnts';
import { fetchUserData } from '../../store/action';
import { isLoading as isFetching, getError } from '../../store/reducer';
import { ResetForm } from './ResetForm.jsx';
import './Form.css';

const mapState = (state) => ({
  isLoading: isFetching(state),
  error: getError(state),
});

export const Form = () => {
  const { isLoading, error } = useSelector(mapState);
  const dispatch = useDispatch();

  const [count, setCount] = useState('');

  const handleSubmit = (values) => {
    setCount(values.count);
    dispatch(fetchUserData(values));
  };

  const countHandler = (setFieldValue) => ({ target }) => {
    let value = '';
    if (target.value > 0) {
      value = target.value;
    }
    return setFieldValue('count', value);
  };

  const validationSchema = yup.object().shape({
    count: yup.number().max(100, countErrorText).required(countErrorText),
    handle: yup.string().required(handleErrorText),
  });

  const initialValues = {
    count,
    handle: '',
  };

  return (
    <Formik
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    initialValues={initialValues}
    enableReinitialize
    >
      {({
        handleChange, setFieldValue, values, errors, touched,
      }) => (
          <FormikForm className="form">
            <Input name='count' value={values.count} onChange={countHandler(setFieldValue)} placeholder='Количество посылок' errorMessage={touched.count ? errors.count : null} />
            <Input name='handle' value={values.handle} onChange={handleChange} placeholder='Хэндл пользователя' errorMessage={touched.handle ? errors.handle : null} />
            <Button type='submit' isLoading={isLoading}>Добавить</Button>
            <ResetForm isLoading={isLoading} error={error} />
            <Error errorText={error} />
          </FormikForm>
      )}
    </Formik>
  );
};
