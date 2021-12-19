export const validationMessage = {
  ID_REQUIRED: "아이디를 입력해 주세요",
  PASSWORD_REQUIRED: "비밀번호를 입력해 주세요",
  VALUE_ABNORMAL: "올바르지 않은 형식입니다",
  EXCEED_MAX_LENGTH(length) {
    return `최대 ${length}자 입니다`;
  },
};

export const requestMessage = {
  SERVER_ERROR: "서버 오류입니다. 잠시 후에 시도해 주세요",
  ACCOUNT_NOT_EXIST: "존재하지 않는 계정 입니다",
  NOT_AUTHORIZED: "로그인 해주세요",
};

export const inputPlaceholder = {
  ID: "아이디를 입력해 주세요",
  PASSWORD: "비밀번호를 입력해 주세요",
};
