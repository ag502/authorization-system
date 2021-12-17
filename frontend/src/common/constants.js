export const validationMessage = {
  ID_REQUIRED: "아이디를 입력해 주세요",
  PASSWORD_REQUIRED: "비밀번호를 입력해 주세요",
  VALUE_ABNORMAL: "올바르지 않은 형식입니다",
  EXCEED_MAX_LENGTH(length) {
    return `최대 ${length}자 입니다`;
  },
};

export const inputPlaceholder = {
  ID: "아이디를 입력해 주세요",
  PASSWORD: "비밀번호를 입력해 주세요",
};
