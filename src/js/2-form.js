const formData = { email: '', message: '' };
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const savedDataFromLS = localStorage.getItem('feedback-form-state');

if (savedDataFromLS) {
  try {
    const parsedData = JSON.parse(savedDataFromLS);
    formData.email = parsedData.email;
    formData.message = parsedData.message;
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  } catch (error) {
    console.log(error);
  }
}

const onFormFieldChange = event => {
  const { target: formFieldEl } = event;
  const fieldValue = formFieldEl.value;
  const fieldName = formFieldEl.name;
  formData[fieldName] = fieldValue;
  try {
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } catch (error) {
    console.log(error);
  }
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const { currentTarget: formEl } = event;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields!');
    return;
  }
  formEl.reset();
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  console.log(formData);
};

form.addEventListener('change', onFormFieldChange);
form.addEventListener('submit', onFeedbackFormSubmit);
