import { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import "./Login.css";

type FieldType = {
  username?: string;
  password?: string;
};

interface StructProps {
  handleLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

function Login(props: StructProps) {
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [userNameVal, setUsernameVal] = useState('');
  const [userPass, setUserPass] = useState('');

  useEffect(() => {
    if (props.isError) {
      setShowErrorMsg(true);
    }
  },[props.isError])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const userEmail = values.username || '';
    const userPassword = values.password || '';
    
    props?.handleLogin(userEmail, userPassword);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const inputOnChangeUsename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowErrorMsg(false);
    setUsernameVal(e.target.value);
  }

  const inputOnChangePass= (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowErrorMsg(false);
    setUserPass(e.target.value);
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, width: '100%', margin: '100px auto' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="username"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input onChange={inputOnChangeUsename} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={inputOnChangePass} />
      </Form.Item>

      {showErrorMsg && <p className='errorMessageLogin'>Incorrect email or password</p>}

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={props.isLoading} disabled={Boolean(!userNameVal || !userPass)} >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login;
