import React from "react";
import PropTypes from "prop-types";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onCh, onBl } = props;

  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;

CustomInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  i_id: PropTypes.string,
  i_class: PropTypes.string,
  name: PropTypes.string,
  val: PropTypes.string || PropTypes.number,
  onCh: PropTypes.func,
  onBl: PropTypes.func,
};
