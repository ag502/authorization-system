import styled from "styled-components";

import AuthForm from "../layout/auth-form";
import { Input } from "../components/common";

import useFormik from "../hooks/useFormik";

const validate = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = "아이디를 입력해 주세요.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해 주세요.";
  }

  return errors;
};

function Login() {
  const formik = useFormik({
    initialValues: { id: "", password: "" },
    validate,
  });

  return (
    <AuthForm>
      <LoginInput
        name='id'
        type='text'
        fullWidth
        placeholder='아이디를 입력해 주세요'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.id}
      />
      {formik.touched.id && formik.errors.id ? (
        <div>{formik.errors.id}</div>
      ) : null}
      <LoginInput
        name='password'
        type='password'
        fullWidth
        placeholder='비밀번호를 입력해 주세요'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
    </AuthForm>
  );
}

const LoginInput = styled(Input)`
  margin-bottom: 25px; ;
`;

export default Login;
