export const validationMessage = {
  ID_REQUIRED: "이메일을 입력해 주세요",
  PASSWORD_REQUIRED: "비밀번호를 입력해 주세요",
  VALUE_ABNORMAL: "올바르지 않은 형식입니다",
  EXCEED_MAX_LENGTH(length) {
    return `최대 ${length}자 입니다`;
  },
  PASSWORD_ABNORMAL:
    "비밀번호는 10자 이하의 영문, 숫자, 특수문자를 사용해야 합니다",
  PASSWORD_NOT_MATCHED: "비밀번호가 일치하지 않습니다",
};

export const requestMessage = {
  SERVER_ERROR: "서버 오류입니다. 잠시 후에 시도해 주세요",
  ACCOUNT_NOT_EXIST: "존재하지 않는 계정 입니다",
  NOT_AUTHORIZED: "로그인 해주세요",
  NOT_ADMIN: "권한이 없습니다",
  ALREADY_EXISTED: "이미 존재하는 계정 입니다",
  REGISTER_SUCCESS: "가입 되었습니다",
};

export const inputPlaceholder = {
  ID: "아이디를 입력해 주세요",
  PASSWORD: "비밀번호를 입력해 주세요",
  PASSWORD_CHECK: "비밀번호를 한 번더 입력해 주세요",
  REGISTER_ID: "이메일을 입력해 주세요",
};
