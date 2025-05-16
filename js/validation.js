// Input validation functions

// Validate input based on selected base
function validateInput(value, base) {
  if (!value) return '';
  
  const patterns = {
    binary: /^[01]+$/,
    decimal: /^[-+]?\d+$/,
    octal: /^[0-7]+$/,
    hexadecimal: /^[0-9a-fA-F]+$/
  };
  
  if (!patterns[base].test(value)) {
    return `Invalid ${base} number format`;
  }
  
  return '';
}

// Update input state based on validation
function updateInputValidation(input, errorMessage, errorElement) {
  if (errorMessage) {
    input.classList.add('error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('visible');
  } else {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
  }
}

// Update input placeholder based on selected base
function updateInputPlaceholder(input, base) {
  const placeholders = {
    binary: 'Enter a binary number (e.g., 1010)',
    decimal: 'Enter a decimal number (e.g., 42)',
    octal: 'Enter an octal number (e.g., 52)',
    hexadecimal: 'Enter a hexadecimal number (e.g., 2A)'
  };
  
  input.placeholder = placeholders[base] || 'Enter a number';
}