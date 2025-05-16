// Utility functions for number system converter

// Format display values for readability
function formatDisplayValue(val, base) {
  if (!val) return '';
  
  if (base === 'binary') {
    // Group binary in sets of 4 for readability
    return val.replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
  }
  
  if (base === 'hexadecimal') {
    // Group hexadecimal in sets of 2 for readability
    return val.replace(/\B(?=(\w{2})+(?!\w))/g, ' ').toUpperCase();
  }
  
  return val;
}

// Parse a number from any base to decimal
function parseFromBase(value, base) {
  switch (base) {
    case 'binary':
      return parseInt(value, 2);
    case 'decimal':
      return parseInt(value, 10);
    case 'octal':
      return parseInt(value, 8);
    case 'hexadecimal':
      return parseInt(value, 16);
    default:
      throw new Error('Invalid base');
  }
}

// Convert a decimal number to any base
function convertToBase(decimalValue, targetBase) {
  switch (targetBase) {
    case 'binary':
      return decimalValue.toString(2);
    case 'decimal':
      return decimalValue.toString(10);
    case 'octal':
      return decimalValue.toString(8);
    case 'hexadecimal':
      return decimalValue.toString(16);
    default:
      throw new Error('Invalid target base');
  }
}

// Get the opposite of a binary string (1's complement)
function getOnesComplement(binaryStr) {
  return binaryStr
    .split('')
    .map(bit => (bit === '0' ? '1' : '0'))
    .join('');
}

// Get two's complement of a binary string
function getTwosComplement(binaryStr) {
  const onesComplement = getOnesComplement(binaryStr);
  
  // Add 1 to the 1's complement
  let carry = 1;
  const result = [];
  
  for (let i = onesComplement.length - 1; i >= 0; i--) {
    const bit = onesComplement[i];
    const sum = parseInt(bit) + carry;
    
    if (sum === 2) {
      result.unshift('0');
      carry = 1;
    } else {
      result.unshift(sum.toString());
      carry = 0;
    }
  }
  
  return result.join('');
}

// Set the current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});