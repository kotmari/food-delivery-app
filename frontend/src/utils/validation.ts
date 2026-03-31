import * as yup from 'yup';

const uaPhoneRegExp = /^(?:\+38)?(0\d{9})$/;

export const orderSchema = yup.object({
 userName: yup
    .string()
    .min(2, 'Name is too short')
    .required('Name required'),

  userEmail: yup
    .string()
    .email('Please enter a valid email address')
    .matches(/@[^.]+\.[^.]+/, 'Email must have a valid domain')
    .required('Email is required'),

  userPhone: yup
  .string()
  .matches(uaPhoneRegExp, 'Format: +380XXXXXXXXX or 0XXXXXXXXX')
  .required(),

  userAddress: yup
    .string()
    .min(10, 'Please provide a more detailed address')
    .required('Address is required'),
 
});