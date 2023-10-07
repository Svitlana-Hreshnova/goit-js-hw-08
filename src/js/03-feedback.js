import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

const loadFormState = () => {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }
};

const throttledSaveFormState = throttle(saveFormState, 500);

loadFormState();

form.addEventListener('input', () => {
  throttledSaveFormState();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!emailInput.value || !messageInput.value) {
    alert('Будь ласка, заповніть усі поля форми.');
    return;
  }

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';

  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
});
