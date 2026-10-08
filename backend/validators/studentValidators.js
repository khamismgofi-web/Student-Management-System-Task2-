const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/;
 
function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}
 
export function validateStudent(body) {
  const input = body ?? {};
  const errors = [];
  const values = {
    first_name: cleanText(input.first_name),
    last_name: cleanText(input.last_name),
    email: cleanText(input.email).toLowerCase(),
    course: cleanText(input.course),
    year_of_study: input.year_of_study,
    phone: cleanText(input.phone) || null,
  };
 
  if (!values.first_name) errors.push('first_name is required');
  if (!values.last_name) errors.push('last_name is required');
  if (!values.course) errors.push('course is required');
 
  if (!values.email) {
    errors.push('email is required');
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.push('email is not a valid email address');
  }
 
  const year = values.year_of_study;
  if (!Number.isInteger(year) || year < 1 || year > 10) {
    errors.push('year_of_study must be a whole number from 1 to 10');
  }
 
  if (values.phone && !PHONE_PATTERN.test(values.phone)) {
    errors.push('phone must be 7 to 10 characters: digits, spaces, + ( ) -');
  }
 
  return { errors, values };
}