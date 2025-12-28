"use strict";

const contactForm = document.getElementById("contactForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const subjectSelect = document.getElementById("subject");
const messageInput = document.getElementById("message");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

const messageCounter = document.getElementById("messageCounter");
const formSuccess = document.getElementById("formSuccess");

function showError(inputElement, errorElement, message) {
  inputElement.classList.remove("input-valid");
  inputElement.classList.add("input-error");
  errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
  inputElement.classList.remove("input-error");
  inputElement.classList.add("input-valid");
  errorElement.textContent = "";
}

function updateMessageCounter() {
  const length = messageInput.value.trim().length;
  messageCounter.textContent = `${length} / 20 characters`;

  if (length < 20) {
    messageCounter.style.color = "red";
  } else {
    messageCounter.style.color = "lightgreen";
  }
}

messageInput.addEventListener("input", updateMessageCounter);



function validateName(inputElement, errorElement, fieldLabel) {
  const value = inputElement.value.trim();
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/; // يسمح بأحرف + مسافة + ' -

  if (value === "") {
    showError(inputElement, errorElement, `${fieldLabel} is required.`);
    return false;
  }

  if (!nameRegex.test(value)) {
    showError(inputElement, errorElement, `${fieldLabel} should contain letters only.`);
    return false;
  }

  clearError(inputElement, errorElement);
  return true;
}


function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showError(emailInput, emailError, "Email is required.");
    return false;
  }

  if (!value.includes("@") || !value.includes(".")) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    return false;
  }

  clearError(emailInput, emailError);
  return true;
}

function validateSubject() {
  const value = subjectSelect.value;

  if (value === "") {
    showError(subjectSelect, subjectError, "Please choose a subject.");
    return false;
  }

  clearError(subjectSelect, subjectError);
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();

  if (value.length < 20) {
    showError(
      messageInput,
      messageError,
      "Message must be at least 20 characters long."
    );
    return false;
  }

  clearError(messageInput, messageError);
  return true;
}


firstNameInput.addEventListener("input", function () {
  validateName(firstNameInput, firstNameError, "First Name");
});

lastNameInput.addEventListener("input", function () {
  validateName(lastNameInput, lastNameError, "Last Name");
});

emailInput.addEventListener("input", validateEmail);

subjectSelect.addEventListener("change", validateSubject);

messageInput.addEventListener("input", validateMessage);


contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const isFirstNameOk = validateName(firstNameInput, firstNameError, "First Name");
  const isLastNameOk = validateName(lastNameInput, lastNameError, "Last Name");
  const isEmailOk = validateEmail();
  const isSubjectOk = validateSubject();
  const isMessageOk = validateMessage();

  const formIsValid = isFirstNameOk && isLastNameOk && isEmailOk && isSubjectOk && isMessageOk;

  if (!formIsValid) {
    formSuccess.textContent = "";
    return;
  }


  const firstName = firstNameInput.value.trim();
  formSuccess.textContent = `Thank you ${firstName}! I will contact you soon!`;


  formSuccess.classList.add("visible");


  clearForm();

  setTimeout(function () {
    formSuccess.textContent = "";
    formSuccess.classList.remove("visible");
  }, 3000);
});

function clearForm() {
  contactForm.reset();
  messageCounter.textContent = "0 / 20 characters";
  messageCounter.style.color = "red";


  const inputs = [firstNameInput, lastNameInput, emailInput, phoneInput, subjectSelect, messageInput];
  inputs.forEach(function (input) {
    input.classList.remove("input-error", "input-valid");
  });


  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
}


const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", function () {
  clearForm();
  formSuccess.textContent = "";
});
