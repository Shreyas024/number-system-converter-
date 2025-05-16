// Number conversion functions

// Convert from source base and type to all bases
function convertNumber(value, sourceBase, numberType) {
  if (!value) {
    return {
      binary: '',
      decimal: '',
      octal: '',
      hexadecimal: ''
    };
  }
  
  let decimalValue;
  let isNegative = false;
  
  // Handle negative numbers
  if (sourceBase === 'decimal' && value.startsWith('-')) {
    isNegative = true;
    value = value.substring(1);
  }
  
  // Parse the number to decimal first
  decimalValue = parseFromBase(value, sourceBase);
  
  // Apply sign based on number type
  if (isNegative) {
    // Handle negative numbers based on numbering type
    if (numberType === 'unsigned') {
      throw new Error('Unsigned numbers cannot be negative');
    }
    
    decimalValue = -decimalValue;
  }
  
  // Convert decimal to all bases
  const results = {
    binary: convertToBase(Math.abs(decimalValue), 'binary'),
    decimal: Math.abs(decimalValue).toString(),
    octal: convertToBase(Math.abs(decimalValue), 'octal'),
    hexadecimal: convertToBase(Math.abs(decimalValue), 'hexadecimal')
  };
  
  // Apply sign representation based on number type
  if (isNegative) {
    if (numberType === 'signed') {
      // Represent using 1's complement
      // Pad to minimum 8 bits
      let binaryPadded = results.binary.padStart(8, '0');
      results.binary = getOnesComplement(binaryPadded);
      
      // Recalculate other bases from the new binary
      const newDecimal = parseInt(results.binary, 2);
      results.decimal = newDecimal.toString();
      results.octal = convertToBase(newDecimal, 'octal');
      results.hexadecimal = convertToBase(newDecimal, 'hexadecimal');
    } else if (numberType === 'twos-complement') {
      // Represent using 2's complement
      // Pad to minimum 8 bits
      let binaryPadded = results.binary.padStart(8, '0');
      results.binary = getTwosComplement(binaryPadded);
      
      // Recalculate other bases from the new binary
      const newDecimal = parseInt(results.binary, 2);
      results.decimal = newDecimal.toString();
      results.octal = convertToBase(newDecimal, 'octal');
      results.hexadecimal = convertToBase(newDecimal, 'hexadecimal');
    } else {
      // For unsigned, we'd throw an error earlier
      results.decimal = `-${results.decimal}`;
    }
  }
  
  return results;
}

// Generate step-by-step explanation for conversion
function getConversionSteps(value, sourceBase, numberType) {
  if (!value) return [];
  
  const steps = [];
  
  // Validate if the conversion is negative in an unsigned system
  if (sourceBase === 'decimal' && value.startsWith('-') && numberType === 'unsigned') {
    return [
      {
        title: 'Invalid Conversion',
        explanation: 'Negative numbers cannot be represented in unsigned format. Please change the number type to signed or two\'s complement.'
      }
    ];
  }
  
  let isNegative = false;
  let absValue = value;
  
  // Check for negative values in decimal
  if (sourceBase === 'decimal' && value.startsWith('-')) {
    isNegative = true;
    absValue = value.substring(1);
  }
  
  // Step 1: Parse to decimal if needed
  if (sourceBase !== 'decimal') {
    const decimalValue = parseFromBase(absValue, sourceBase);
    
    let explanation = `To convert from ${sourceBase} to decimal, we multiply each digit by its corresponding power of the base.\n\n`;
    
    if (sourceBase === 'binary') {
      explanation += `For binary number ${formatDisplayValue(absValue, 'binary')}:\n`;
      
      const digits = absValue.split('').reverse();
      let calcSteps = digits.map((digit, i) => {
        return `${digit} × 2^${i} = ${digit * Math.pow(2, i)}`;
      }).reverse().join('\n');
      
      explanation += calcSteps + '\n\nSum: ' + decimalValue;
    } else if (sourceBase === 'octal') {
      explanation += `For octal number ${absValue}:\n`;
      
      const digits = absValue.split('').reverse();
      let calcSteps = digits.map((digit, i) => {
        return `${digit} × 8^${i} = ${digit * Math.pow(8, i)}`;
      }).reverse().join('\n');
      
      explanation += calcSteps + '\n\nSum: ' + decimalValue;
    } else if (sourceBase === 'hexadecimal') {
      explanation += `For hexadecimal number ${absValue}:\n`;
      
      const digits = absValue.split('').reverse();
      let calcSteps = digits.map((digit, i) => {
        const digitValue = parseInt(digit, 16);
        return `${digit.toUpperCase()} (${digitValue}) × 16^${i} = ${digitValue * Math.pow(16, i)}`;
      }).reverse().join('\n');
      
      explanation += calcSteps + '\n\nSum: ' + decimalValue;
    }
    
    steps.push({
      title: `Convert ${sourceBase} to decimal`,
      explanation: explanation
    });
  }
  
  // Get the decimal value to use for further conversions
  let decimalValue;
  if (sourceBase === 'decimal') {
    decimalValue = parseInt(absValue, 10);
  } else {
    decimalValue = parseFromBase(absValue, sourceBase);
  }
  
  // Handle negative numbers
  if (isNegative) {
    steps.push({
      title: 'Handle negative value',
      explanation: `The original input is negative: ${value}\n\nWe'll convert the absolute value first and then apply the appropriate sign representation based on the selected number type (${numberType}).`
    });
  }
  
  // Step 2: Convert decimal to target bases
  if (sourceBase !== 'binary') {
    const binaryValue = convertToBase(decimalValue, 'binary');
    
    let explanation = `To convert from decimal to binary, we divide the number by 2 repeatedly and collect the remainders in reverse order.\n\n`;
    explanation += `For decimal number ${decimalValue}:\n`;
    
    let quotient = decimalValue;
    let divisions = [];
    
    while (quotient > 0) {
      const remainder = quotient % 2;
      divisions.push(`${quotient} ÷ 2 = ${Math.floor(quotient / 2)} with remainder ${remainder}`);
      quotient = Math.floor(quotient / 2);
    }
    
    explanation += divisions.join('\n') + '\n\nCollecting remainders from bottom to top: ' + binaryValue;
    
    steps.push({
      title: 'Convert decimal to binary',
      explanation: explanation
    });
  }
  
  if (sourceBase !== 'octal') {
    const octalValue = convertToBase(decimalValue, 'octal');
    
    let explanation = `To convert from decimal to octal, we divide the number by 8 repeatedly and collect the remainders in reverse order.\n\n`;
    explanation += `For decimal number ${decimalValue}:\n`;
    
    let quotient = decimalValue;
    let divisions = [];
    
    while (quotient > 0) {
      const remainder = quotient % 8;
      divisions.push(`${quotient} ÷ 8 = ${Math.floor(quotient / 8)} with remainder ${remainder}`);
      quotient = Math.floor(quotient / 8);
    }
    
    explanation += divisions.join('\n') + '\n\nCollecting remainders from bottom to top: ' + octalValue;
    
    steps.push({
      title: 'Convert decimal to octal',
      explanation: explanation
    });
  }
  
  if (sourceBase !== 'hexadecimal') {
    const hexValue = convertToBase(decimalValue, 'hexadecimal').toUpperCase();
    
    let explanation = `To convert from decimal to hexadecimal, we divide the number by 16 repeatedly and collect the remainders in reverse order.\n\n`;
    explanation += `For decimal number ${decimalValue}:\n`;
    
    let quotient = decimalValue;
    let divisions = [];
    
    while (quotient > 0) {
      const remainder = quotient % 16;
      const hexDigit = remainder.toString(16).toUpperCase();
      divisions.push(`${quotient} ÷ 16 = ${Math.floor(quotient / 16)} with remainder ${remainder} (${hexDigit})`);
      quotient = Math.floor(quotient / 16);
    }
    
    explanation += divisions.join('\n') + '\n\nCollecting remainders from bottom to top: ' + hexValue;
    
    steps.push({
      title: 'Convert decimal to hexadecimal',
      explanation: explanation
    });
  }
  
  // Handle number type conversions for negative numbers
  if (isNegative) {
    if (numberType === 'signed') {
      const binaryValue = convertToBase(decimalValue, 'binary').padStart(8, '0');
      const onesComplement = getOnesComplement(binaryValue);
      
      let explanation = `For negative numbers in signed (1's complement) representation:\n\n`;
      explanation += `1. The binary representation of absolute value ${decimalValue} is ${formatDisplayValue(binaryValue, 'binary')}\n`;
      explanation += `2. To get 1's complement, we flip all bits:\n`;
      explanation += `   ${formatDisplayValue(binaryValue, 'binary')} → ${formatDisplayValue(onesComplement, 'binary')}\n\n`;
      explanation += `This is the 1's complement representation of -${decimalValue}.`;
      
      steps.push({
        title: 'Apply 1\'s complement for negative value',
        explanation: explanation
      });
    } else if (numberType === 'twos-complement') {
      const binaryValue = convertToBase(decimalValue, 'binary').padStart(8, '0');
      const onesComplement = getOnesComplement(binaryValue);
      const twosComplement = getTwosComplement(binaryValue);
      
      let explanation = `For negative numbers in two's complement representation:\n\n`;
      explanation += `1. The binary representation of absolute value ${decimalValue} is ${formatDisplayValue(binaryValue, 'binary')}\n`;
      explanation += `2. First, we get the 1's complement by flipping all bits:\n`;
      explanation += `   ${formatDisplayValue(binaryValue, 'binary')} → ${formatDisplayValue(onesComplement, 'binary')}\n`;
      explanation += `3. Then we add 1 to get the two's complement:\n`;
      explanation += `   ${formatDisplayValue(onesComplement, 'binary')} + 1 = ${formatDisplayValue(twosComplement, 'binary')}\n\n`;
      explanation += `This is the two's complement representation of -${decimalValue}.`;
      
      steps.push({
        title: 'Apply 2\'s complement for negative value',
        explanation: explanation
      });
    }
  }
  
  return steps;
}