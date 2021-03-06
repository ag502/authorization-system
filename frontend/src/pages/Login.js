import { useState, useEffect, useCallback } from "react";
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
import { checkLogin, requestLogin } from "../common/api/auth";
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

  const formik = useFormik({
    initialValues: { id: "", password: "" },
    validate,
  });

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const { userData } = await checkLogin();
      if (userData.roll === "admin") {
        navigate("/admin");
      } else {
        navigate("/main");
      }
    } catch (err) {}
  }, []);

  const handleLoginClick = async () => {
    const canSubmit = formik.handleSubmit();
    if (!canSubmit) {
      return;
    }
    try {
      const { token, roll } = await requestLogin({
        id: formik.values.id,
        password: formik.values.password,
      });
      addTokenToLocalStorage(token);
      if (roll === "admin") {
        navigate("/admin");
      } else {
        navigate("/main");
      }
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
          ?????????
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
