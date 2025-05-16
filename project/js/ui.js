// UI interaction handling

document.addEventListener('DOMContentLoaded', () => {
  // Get UI elements
  const numberInput = document.getElementById('number-input');
  const errorMessage = document.getElementById('error-message');
  const baseButtons = document.querySelectorAll('.base-button');
  const typeButtons = document.querySelectorAll('.type-button');
  const resultsSection = document.getElementById('results-section');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const copyButtons = document.querySelectorAll('.copy-button');
  
  // State
  let currentBase = 'binary';
  let currentType = 'unsigned';
  
  // Update results display
  function updateResults(results) {
    if (!results) {
      resultsSection.classList.remove('visible');
      return;
    }
    
    resultsSection.classList.add('visible');
    
    // Update each result value
    Object.keys(results).forEach(base => {
      const valueElement = document.querySelector(`.${base}-value`);
      if (valueElement) {
        // For binary and hex, keep the prefix span separate
        if (base === 'binary' || base === 'hexadecimal' || base === 'octal') {
          const prefixSpan = valueElement.querySelector('.result-prefix');
          const restOfContent = document.createTextNode(formatDisplayValue(results[base], base));
          
          // Clear and repopulate
          valueElement.innerHTML = '';
          if (results[base]) {
            valueElement.appendChild(prefixSpan);
            valueElement.appendChild(restOfContent);
          }
        } else {
          valueElement.textContent = formatDisplayValue(results[base], base);
        }
      }
      
      // Mark source base card
      const card = document.querySelector(`.result-card[data-base="${base}"]`);
      if (card) {
        if (base === currentBase) {
          card.classList.add('source');
        } else {
          card.classList.remove('source');
        }
      }
    });
  }
  
  // Handle input changes
  numberInput.addEventListener('input', () => {
    const value = numberInput.value.trim();
    
    // Validate input
    const validationError = validateInput(value, currentBase);
    updateInputValidation(numberInput, validationError, errorMessage);
    
    // Only perform conversion if input is valid
    if (!validationError && value) {
      try {
        const results = convertNumber(value, currentBase, currentType);
        updateResults(results);
        
        // Generate and display explanation
        const steps = getConversionSteps(value, currentBase, currentType);
        renderExplanationSteps(steps);
      } catch (err) {
        updateInputValidation(numberInput, err.message, errorMessage);
        updateResults(null);
      }
    } else if (!value) {
      // Clear results if input is empty
      updateResults({
        binary: '',
        decimal: '',
        octal: '',
        hexadecimal: ''
      });
      renderExplanationSteps([]);
    }
  });
  
  // Handle base selection
  baseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const base = button.getAttribute('data-base');
      
      // Update UI
      baseButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      // Update state
      currentBase = base;
      updateInputPlaceholder(numberInput, base);
      
      // Re-validate and convert with new base
      const value = numberInput.value.trim();
      const validationError = validateInput(value, currentBase);
      updateInputValidation(numberInput, validationError, errorMessage);
      
      if (!validationError && value) {
        try {
          const results = convertNumber(value, currentBase, currentType);
          updateResults(results);
          
          // Generate and display explanation
          const steps = getConversionSteps(value, currentBase, currentType);
          renderExplanationSteps(steps);
        } catch (err) {
          updateInputValidation(numberInput, err.message, errorMessage);
        }
      }
    });
  });
  
  // Handle number type selection
  typeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');
      
      // Update UI
      typeButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      // Update state
      currentType = type;
      
      // Re-convert with new type
      const value = numberInput.value.trim();
      if (!errorMessage.classList.contains('visible') && value) {
        try {
          const results = convertNumber(value, currentBase, currentType);
          updateResults(results);
          
          // Generate and display explanation
          const steps = getConversionSteps(value, currentBase, currentType);
          renderExplanationSteps(steps);
        } catch (err) {
          updateInputValidation(numberInput, err.message, errorMessage);
        }
      }
    });
  });
  
  // Handle tab switching
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Update tab buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      // Update tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabName}-tab`).classList.add('active');
    });
  });
  
  // Handle copy to clipboard
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const resultCard = button.closest('.result-card');
      const base = resultCard.getAttribute('data-base');
      const valueElement = resultCard.querySelector(`.${base}-value`);
      
      // Get text content without the prefix element
      let textToCopy = valueElement.textContent;
      
      // For bases with prefixes, we'll include them in the copy
      if (base === 'binary') {
        textToCopy = '0b' + textToCopy.replace(/\s/g, '');
      } else if (base === 'octal') {
        textToCopy = '0o' + textToCopy.replace(/\s/g, '');
      } else if (base === 'hexadecimal') {
        textToCopy = '0x' + textToCopy.replace(/\s/g, '');
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show success indication
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.classList.remove('copied');
        }, 2000);
      });
    });
  });
});