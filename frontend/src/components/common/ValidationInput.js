import styled from "styled-components";
import Input from "./Input";

const ValidationInput = styled(Input)`
  && {
    border-color: ${(props) => (props.isError ? "#d32f2f" : "#f5f5f5")};
  }
  outline-color: #0aaf9e;
  margin-bottom: 10px;
`;

export default ValidationInput;
