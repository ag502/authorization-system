import { memo } from "react";
import styled from "styled-components";

function AuthForm({ children }) {
  return <AuthFormContainer>{children}</AuthFormContainer>;
}

const AuthFormContainer = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: red;
  border-radius: 10px;
`;

export default memo(AuthForm);
