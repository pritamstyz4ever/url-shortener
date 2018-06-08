import validator from 'validator';

function validateInput(data) {
  const errors = {};
  if (validator.isEmpty(data.link)) {
    errors.link = 'Input is empty';
  }
  if (!validator.isURL(data.link) && !validator.isEmpty(data.link)) {
    errors.link = 'It is not a valid url.';
  }
  if (validator.isEmpty(data.tags)) {
    errors.tags = 'Input is empty';
  }
  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid
  }
}

export default validateInput;
