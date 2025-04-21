const formEl = document.getElementById("empData");

const validateForm = new JustValidate("#empData", {
  errorLabelCssClass: "form-error",
});

validateForm.addField("#name", [
  { rule: "required" },
  { rule: "minLength", value: 3 },
  { rule: "maxLength", value: 30 },
]);
validateForm.addField("#mobile", [
  { rule: "required", errorMessage: "Value should be a number" },
  {
    rule: "customRegexp",
    value: /^[0-9]{10}$/,
    errorMessage: "Mobile number must be exactly 10 digits",
  },
]);
validateForm.addField("#dob", [
  { rule: "required", errorMessage: "Select the valid date and time" },
]);
validateForm.addField("#email", [
  { rule: "required", errorMessage: "Enter the valid email" },
]);
validateForm.addField("#address", [
  { rule: "required", errorMessage: "Enter your proper address" },
]);
validateForm.addField("#education", [
  { rule: "required", errorMessage: "The field is required" },
]);
validateForm.addField("#skill", [
  { rule: "required", errorMessage: "The field is required" },
]);
validateForm.addField("#checkbox", [
  { rule: "required", errorMessage: "The field is required" },
]);
