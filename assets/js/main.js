const id = uuid.v4();
const formEl = document.getElementById("empData");
const localStorageKey = "userData";
const tableEl = document.getElementById("userDataTable");

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
  // Get existing Localstorage value if it's exist !
  const exisitngUserData = localStorage.getItem(localStorageKey);
  // Parse that string into Javascript value
  const exisitngUserDataArray = JSON.parse(exisitngUserData);

  //Based on the id, increment the id

  formData.append("createdAt", Date.now());

  const formValueObj = Object.fromEntries(formData.entries());
  formValueObj.id = uuid.v4(); // Add UUID id

  console.log(formValueObj);

  const newUserData = [];

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
  alert(`✅ "${formValueObj.name}" Registration is successfully done.`);
  formEl.reset();
  getAllUserDatas();
});

function getAllUserDatas() {
  // Get all stored user datas which are available in localstorage
  const userData = localStorage.getItem(localStorageKey);
  const userDataArr = JSON.parse(userData);
  const appCardEl = document.getElementById("appCard");

  if (userDataArr && userDataArr.length > 0) {
    appCardEl.classList.remove("hidden");
    // Write those value into the table UI

    tableEl.innerHTML = "";

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
      tdEl4.textContent = formatMyDate(userData["dob"]);

      tdEl5.classList.add("px-2", "py-1", "border");
      tdEl5.textContent = userData["email"];

      tdEl6.classList.add("px-2", "py-1", "border");
      tdEl6.textContent = userData["education"];

      tdEl7.classList.add("px-2", "py-1", "border");
      tdEl7.textContent = userData["skill"];

      deleteBtnEl.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="inline-block mr-1 text-red-500">
    <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"/>
  </svg> 
`;
      deleteBtnEl.addEventListener("click", (e) => {
        deleteCourierRequest(userData);
      });

      tdEl8.classList.add("px-2", "py-1", "border");
      tdEl8.append(deleteBtnEl);

      trEl.append(tdEl1, tdEl2, tdEl3, tdEl4, tdEl5, tdEl6, tdEl7, tdEl8);
      newFinalValue.push(trEl);
    });

    //appending the value inside of the table row
    newFinalValue.forEach((el) => tableEl.append(el));

    //Show the applications count in UI
    const appCountEl = document.getElementById("appCount");
    appCountEl.textContent = newFinalValue.length;
  } else {
    appCardEl.classList.add("hidden");
    console.log("No value available on this list");
  }
}
function deleteCourierRequest(jobAppRequest) {
  const confirmation = confirm(
    `Do you want to delete "${jobAppRequest["name"]}" record !`
  );

  if (confirmation) {
    const existingCourierData = localStorage.getItem(localStorageKey);
    const courierDataObj = JSON.parse(existingCourierData);
    const otherRecords = courierDataObj.filter(
      (jobAppReq) => jobAppReq.id != jobAppRequest["id"]
    );
    // Push it localstorage again, this time, i'm deleting that record (courierRequestId)
    localStorage.setItem(localStorageKey, JSON.stringify(otherRecords));
    getAllUserDatas();
  }
}
getAllUserDatas();
