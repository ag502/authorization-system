import { memo } from "react";
import styled from "styled-components";

function AuthForm({ children }) {
  return <AuthFormContainer>{children}</AuthFormContainer>;
}

const AuthFormContainer = styled.form`
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  > div {
    margin-bottom: 15px;
  }
`;

export default memo(AuthForm);
