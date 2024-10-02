/** Get global css variables with JS */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = "";
  try {
    // If no value is obtained, an empty string will be returned.
    cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVariableName);
  } catch (error) {
    console.error(error);
  }
  return cssVariableValue;
};

/** Setting global CSS variables with JS */
export const setCssVariableValue = (
  cssVariableName: string,
  cssVariableValue: string
) => {
  try {
    document.documentElement.style.setProperty(
      cssVariableName,
      cssVariableValue
    );
  } catch (error) {
    console.error(error);
  }
};
