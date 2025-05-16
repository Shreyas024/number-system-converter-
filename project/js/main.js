// Main application initialization

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  console.log('Number System Converter initialized');
  
  // Set default active base
  const defaultBase = 'binary';
  const defaultType = 'unsigned';
  
  // Set input placeholder based on default base
  const numberInput = document.getElementById('number-input');
  updateInputPlaceholder(numberInput, defaultBase);
  
  // Focus input on page load
  numberInput.focus();
});