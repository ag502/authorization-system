class Validation {
  constructor() {
    this._validator = [];
  }

  _require(value) {
    return value;
  }

  _max = (limit) => (value) => {
    return value.length <= limit;
  };

  _password = (value) => {
    const passwordReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    return passwordReg.test(value);
  };

  _email = (value) => {
    const emailReg =
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    return emailReg.test(value);
  };

  _correct = (targetValue) => (value) => {
    return targetValue === value;
  };

  require(msg) {
    this._validator.push({ fn: this._require, msg });
    return this;
  }

  max(msg, limit) {
    this._validator.push({ fn: this._max(limit), msg });
    return this;
  }

  password(msg) {
    this._validator.push({ fn: this._password, msg });
    return this;
  }

  email(msg) {
    this._validator.push({ fn: this._email, msg });
    return this;
  }

  correct(msg, targetValue) {
    this._validator.push({ fn: this._correct(targetValue), msg });
    return this;
  }

  test(value) {
    let error = "";
    for (let i = 0; i < this._validator.length; i++) {
      const { fn, msg } = this._validator[i];
      if (!fn(value)) {
        error = msg;
        break;
      }
    }
    return error;
  }
}

const Validator = () => new Validation();
export default Validator;
