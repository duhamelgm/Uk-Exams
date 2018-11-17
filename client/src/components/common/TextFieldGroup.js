import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

const TextFieldGroup = ({
  formGroupClass,
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  readOnly
}) => {
  return (
    <FormGroup className={formGroupClass}>
      {label ? <Label>{label}</Label> : ""}
      <Input
        type={type}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </FormGroup>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  readOnly: PropTypes.bool
};

TextFieldGroup.defaultProps = {
  type: "text",
  readOnly: false
};

export default TextFieldGroup;
