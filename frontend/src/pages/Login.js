import styled from "styled-components";

import AuthForm from "../layout/auth-form";
import { Input, InputError } from "../components/common";

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
      <div>
        <LoginInput
          name='id'
          type='text'
          fullWidth
          placeholder='아이디를 입력해 주세요'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.id}
          isError={formik.touched.id && formik.errors.id}
        />
        {formik.touched.id && formik.errors.id ? (
          <InputError content={formik.errors.id} />
        ) : null}
      </div>
      <div>
        <LoginInput
          name='password'
          type='password'
          fullWidth
          placeholder='비밀번호를 입력해 주세요'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isError={formik.touched.password && formik.errors.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <InputError content={formik.errors.password} />
        ) : null}
      </div>
    </AuthForm>
  );
}

const LoginInput = styled(Input)`
  && {
    border-color: ${(props) => (props.isError ? "#d32f2f" : "#f5f5f5")};
  }
  outline-color: #0aaf9e;
  margin-bottom: 10px;
`;

export default Login;
