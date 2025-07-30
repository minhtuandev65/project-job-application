export const handleChangeWithTouch = (formik) => (event) => {
  const { name, value } = event.target;
  formik.setFieldTouched(name, true);
  formik.setFieldValue(name, value);
};
