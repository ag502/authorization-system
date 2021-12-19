import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../layout/auth-form";
import {
  ValidationInput,
  InputError,
  Button,
  SnackBar,
} from "../components/common";

import Validator from "../common/validator";
import useFormik from "../hooks/useFormik";
import { requestLogin } from "../common/api/auth";
import { inputPlaceholder, validationMessage } from "../common/constants";
import { addTokenToLocalStorage } from "../common/manageToken";

const validate = (values) => {
  const errors = {};

  errors.id = Validator()
    .require(validationMessage.ID_REQUIRED)
    .email(validationMessage.VALUE_ABNORMAL)
    .max(validationMessage.EXCEED_MAX_LENGTH(45), 45)
    .test(values.id);

  errors.password = Validator()
    .require(validationMessage.PASSWORD_REQUIRED)
    .test(values.password);

  return errors;
};

function Login() {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { id: "", password: "" },
    validate,
  });

  const handleLoginClick = async () => {
    try {
      const { token } = await requestLogin({
        id: formik.values.id,
        password: formik.values.password,
      });
      addTokenToLocalStorage(token);
      navigate("/main");
    } catch (err) {
      setSnackBarMsg(err);
      setSnackBarOpen(true);
    }
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  return (
    <>
      <AuthForm>
        <div>
          <ValidationInput
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
          <ValidationInput
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
        <Button fontColor='#ffffff' fullWidth onClick={handleLoginClick}>
          로그인
        </Button>
        <RegisterLinkContainer>
          <RegisterLink to='/register'>Register Now</RegisterLink>
        </RegisterLinkContainer>
      </AuthForm>
      <SnackBar
        open={snackBarOpen}
        message={snackBarMsg}
        onClose={handleSnackBarClose}
        autoHideDuration={600}
        severity='error'
      />
    </>
  );
}

const RegisterLinkContainer = styled.div`
  text-align: center;
  && {
    margin: 10px 0px 0px;
  }
`;

const RegisterLink = styled(Link)`
  color: #0aaf9e;
  font-weight: bold;
`;

export default Login;
