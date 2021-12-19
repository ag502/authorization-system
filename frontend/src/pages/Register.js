import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthForm from "../layout/auth-form";
import {
  ValidationInput,
  InputError,
  Button,
  SnackBar,
} from "../components/common";

import Validator from "../common/validator";
import useFormik from "../hooks/useFormik";
import { requestRegister } from "../common/api/auth";
import {
  inputPlaceholder,
  validationMessage,
  requestMessage,
} from "../common/constants";

const validate = (values) => {
  const errors = {};

  errors.id = Validator()
    .require(validationMessage.ID_REQUIRED)
    .email(validationMessage.VALUE_ABNORMAL)
    .max(validationMessage.EXCEED_MAX_LENGTH(45), 45)
    .test(values.id);

  errors.password = Validator()
    .require(validationMessage.PASSWORD_REQUIRED)
    .password(validationMessage.PASSWORD_ABNORMAL)
    .test(values.password);

  errors.passwordCheck = Validator()
    .require(validationMessage.PASSWORD_REQUIRED)
    .correct(validationMessage.PASSWORD_NOT_MATCHED, values.password)
    .test(values.passwordCheck);

  return errors;
};

function Register() {
  const navigate = useNavigate();

  const [snackBarStatus, setSnackBarStatus] = useState({
    open: false,
    message: "",
    severity: "error",
    delay: 600,
  });

  const formik = useFormik({
    initialValues: { id: "", password: "", passwordCheck: "" },
    validate,
  });

  useEffect(() => {
    const { open, severity } = snackBarStatus;
    if (!open && severity === "success") {
      navigate("/");
    }
  }, [snackBarStatus.open]);

  const handleRegisterClick = async () => {
    const canSubmit = formik.handleSubmit();
    if (!canSubmit) {
      return;
    }
    try {
      await requestRegister({
        id: formik.values.id,
        password: formik.values.password,
      });
      setSnackBarStatus((props) => ({
        ...props,
        open: true,
        severity: "success",
        message: requestMessage.REGISTER_SUCCESS,
      }));
    } catch (err) {
      setSnackBarStatus((props) => ({
        ...props,
        open: true,
        message: err,
      }));
    }
  };

  const handleSnackBarClose = () => {
    setSnackBarStatus((props) => ({
      ...props,
      open: false,
    }));
  };

  return (
    <>
      <SnackBar
        open={snackBarStatus.open}
        message={snackBarStatus.message}
        onClose={handleSnackBarClose}
        severity={snackBarStatus.severity}
        authDuration={snackBarStatus.delay}
        action={snackBarStatus.action}
      />
      <AuthForm>
        <div>
          <ValidationInput
            name='id'
            type='text'
            fullWidth
            placeholder={inputPlaceholder.REGISTER_ID}
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
        <div>
          <ValidationInput
            name='passwordCheck'
            type='password'
            fullWidth
            placeholder={inputPlaceholder.PASSWORD_CHECK}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordCheck}
            isError={
              formik.touched.passwordCheck && formik.errors.passwordCheck
            }
          />
          {formik.touched.passwordCheck && formik.errors.passwordCheck ? (
            <InputError content={formik.errors.passwordCheck} />
          ) : null}
        </div>
        <Button fontColor='#ffffff' fullWidth onClick={handleRegisterClick}>
          회원가입
        </Button>
      </AuthForm>
    </>
  );
}

export default Register;
