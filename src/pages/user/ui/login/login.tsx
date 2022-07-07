import { Button, Form, Input } from 'antd'
import { useLogin } from '../../lib'

import styles from './login.module.scss'

export const Login = () => {
  const { handleLogin } = useLogin()

  return (
    <Form className={styles.form} onFinish={handleLogin}>
      <Form.Item name='username' label='Имя пользователя'>
        <Input />
      </Form.Item>
      <Form.Item name='password' label='Пароль'>
        <Input.Password />
      </Form.Item>
      <Button block className={styles.button} type='primary' htmlType='submit'>
        Войти
      </Button>
    </Form>
  )
}
