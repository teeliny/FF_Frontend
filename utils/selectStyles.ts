import { StylesConfig } from 'react-select';

export const countryStyles: StylesConfig = {
  container: (styles) => ({ ...styles, ":hover": { border: "2px solid #0A3085" }, outline: "none" }),
  control: (styles) => ({ ...styles, backgroundColor: '#ffffff22', height: "3.5rem", border: "1px solid #0A3085", color: "#ffffff", "::placeholder": { color: "#f00"} }),
  input: (styles) => ({ ...styles, "::placeholder": { color: "red" }}),
  placeholder: (styles) => ({...styles, color: "#ffffff", opacity: 0.5, content: '"Country"' }),
  singleValue: (styles) => ({ ...styles, color: "#ffffff", outline: "none" }),
  dropdownIndicator: (styles) => ({ ...styles, color: "#ffffff", }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#ffffff"
        : isFocused
        ? "#0A3085"
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? '#0A3085'
        : isFocused
        ? "#ffffff"
        : "#0A3085",
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#ffffff"
            : "#D1A33B"
          : undefined,
      },
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#ffffff",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#ff0000",
    backgroundColor: "#ffffff"
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#ff0000",
    ':hover': {
      opacity: "0.5"
    },
  }),
};

export const wishStyles: StylesConfig = {
  container: (styles) => ({ ...styles, ":hover": { border: "none" }, outline: "none" }),
  control: (styles) => ({ ...styles, backgroundColor: '#ffffff', height: "5.5rem", border: "none", color: "#0A3085", "::placeholder": { color: "#f00"} }),
  input: (styles) => ({ ...styles, outline: "none", "::placeholder": { color: "red" }}),
  placeholder: (styles) => ({...styles, color: "#0A3085", opacity: 0.5, content: '"Country"' }),
  singleValue: (styles) => ({ ...styles, color: "#0A3085", outline: "none" }),
  dropdownIndicator: (styles) => ({ ...styles, color: "#0A3085", }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#ffffff"
        : isFocused
        ? "#0A3085"
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? '#0A3085'
        : isFocused
        ? "#ffffff"
        : "#0A3085",
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? "#ffffff"
            : "#D1A33B"
          : undefined,
      },
    };
  },
};