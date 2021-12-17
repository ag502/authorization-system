import styled from "styled-components";

import AuthForm from "../layout/auth-form";
import { Input, InputError, Button } from "../components/common";

import Validator from "../common/validator";
import useFormik from "../hooks/useFormik";
import { inputPlaceholder, validationMessage } from "../common/constants";

const validate = (values) => {
  const errors = {};

  errors.id = Validator()
    .email(validationMessage.VALUE_ABNORMAL)
    .max(validationMessage.EXCEED_MAX_LENGTH(45), 45)
    .require(validationMessage.ID_REQUIRED)
    .test(values.id);

  errors.password = Validator()
    .require(validationMessage.PASSWORD_REQUIRED)
    .test(values.password);

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
          placeholder={inputPlaceholder.ID}
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
          placeholder={inputPlaceholder.PASSWORD}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isError={formik.touched.password && formik.errors.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <InputError content={formik.errors.password} />
        ) : null}
      </div>
      <Button fontColor='#ffffff' fullWidth>
        로그인
      </Button>
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
