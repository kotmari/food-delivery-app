import * as yup from 'yup';

export const orderSchema = yup.object({
  userName: yup.string().required('Name required'),
  userEmail: yup.string().email('Invalid email').required(),
  userPhone: yup.string().min(10).required(),
  userAddress: yup.string().required(),
  totalPrice: yup.number().positive().required(),
  items: yup.array().of(
    yup.object({
      id: yup.string().required(),
      quantity: yup.number().min(1).required()
    })
  ).min(1, 'The shopping cart cannot be empty')
});