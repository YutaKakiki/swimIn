import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  name: yup.string().required('名前を入力してください'),
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
  password: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードは８語以上で入力してください'),
  password_confirmation: yup
    .string()
    .required('パスワードを入力してください')
    .oneOf([yup.ref('password')], 'パスワードが一致していません'),
})

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
  password: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードは８語以上で入力してください'),
})

export const editSchema = yup.object().shape({
  name: yup.string().required('名前を入力してください'),
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
})

export const serchUserSchema = yup.object().shape({
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
})
