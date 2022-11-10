import { Button, Form, Input, PageHeader } from 'antd'
import { useHandleLogin } from '../../lib'

import styles from './login.module.scss'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { Path } from 'shared/config'

export const Login = () => {
  const { handleLogin } = useHandleLogin()
  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    return navigate(Path.Map)
  }, [navigate])

  return (
    <>
      <PageHeader title="Вход" onBack={handleGoBack} />
      <Form className={styles.form} onFinish={handleLogin}>
        <Form.Item name='username' label='Имя пользователя'>
          <Input  />
        </Form.Item>
        <Form.Item name='password' label='Пароль'>
          <Input.Password />
        </Form.Item>
        <Button
          block
          className={styles.button}
          type='primary'
          htmlType='submit'
        >
          Войти
        </Button>
      </Form>
    </>
  )
}
