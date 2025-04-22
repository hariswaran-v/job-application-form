const formEl = document.getElementById("empData");
const localStorageKey = "userData";

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
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

validateForm.onSuccess((e) => {
  const formData = new FormData(formEl);

  const formValueObj = Object.fromEntries(formData.entries());
  const newUserData = [];

  // Get existing Localstorage value if it's exist !
  const exisitngUserData = localStorage.getItem(localStorageKey);
  // Parse that string into Javascript value
  const exisitngUserDataArray = JSON.parse(exisitngUserData);
  if (exisitngUserDataArray) {
    // Create a new array and push the existing Localstorage value into new array
    exisitngUserDataArray.push(formValueObj);
    // push the new array (which has all the into the Localstorage)
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(exisitngUserDataArray)
    );
  } else {
    newUserData.push(formValueObj);
    localStorage.setItem(localStorageKey, JSON.stringify(newUserData));
  }
  alert("Registration is successfullu done !");
  formEl.reset();
});
function getAllUserDatas() {
  // Get all stored user datas which are available in localstorage
  const userData = localStorage.getItem(localStorageKey);
  const userDataArr = JSON.parse(userData);

  if (userDataArr) {
    const appCardEl = document.getElementById("appCard");
    appCardEl.classList.remove("hidden");
    // Write those value into the table UI
    const tableEl = document.getElementById("userDataTable");

    const newFinalValue = [];

    const finalData = userDataArr.map((userData, index) => {
      const trEl = document.createElement("tr");
      const tdEl1 = document.createElement("td");
      const tdEl2 = document.createElement("td");
      const tdEl3 = document.createElement("td");
      const tdEl4 = document.createElement("td");
      const tdEl5 = document.createElement("td");
      const tdEl6 = document.createElement("td");
      const tdEl7 = document.createElement("td");
      const tdEl8 = document.createElement("td");
      const deleteBtnEl = document.createElement("button");

      trEl.classList.add("text-sm");
      tdEl1.classList.add("px-2", "py-1", "border");
      tdEl1.textContent = index + 1;

      tdEl2.classList.add("px-2", "py-1", "border");
      tdEl2.textContent = userData.name;

      tdEl3.classList.add("px-2", "py-1", "border");
      tdEl3.textContent = userData.mobile;

      tdEl4.classList.add("px-2", "py-1", "border");
      tdEl4.textContent = formatMyDate(userData["dob"]) ;

      tdEl5.classList.add("px-2", "py-1", "border");
      tdEl5.textContent = userData["email"];

      tdEl6.classList.add("px-2", "py-1", "border");
      tdEl6.textContent = userData["education"];

      tdEl7.classList.add("px-2", "py-1", "border");
      tdEl7.textContent = userData["skill"];

      deleteBtnEl.className =
        "px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded";
      deleteBtnEl.textContent = "Delete";
      deleteBtnEl.addEventListener("click", (e) => {
        deleteCourierRequest(courierData);
      });

      tdEl8.classList.add("px-2", "py-1", "border");
      tdEl8.append(deleteBtnEl);

      trEl.append(tdEl1, tdEl2, tdEl3, tdEl4, tdEl5, tdEl6, tdEl7, tdEl8);
      newFinalValue.push(trEl);
    });

    //appending the value inside of the table row
    newFinalValue.forEach((el) => tableEl.append(el));
    // Display the UI with those datas.
  } else {
    console.log("No value available on localstorage");
  }
}

getAllUserDatas();
