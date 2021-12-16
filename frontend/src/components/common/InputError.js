import styled from "styled-components";

function InputError({ content }) {
  return (
    <InputErrorContainer>
      <span>{content}</span>
    </InputErrorContainer>
  );
}

const InputErrorContainer = styled.div`
  font-size: 0.8rem;
  color: #d32f2f;
`;

export default InputError;
