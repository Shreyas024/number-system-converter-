// Explanation UI handling

document.addEventListener('DOMContentLoaded', () => {
  const explanationSection = document.getElementById('explanation-section');
  const explanationToggle = document.getElementById('explanation-toggle');
  const explanationHeader = document.querySelector('.explanation-header');
  const explanationContent = document.getElementById('explanation-content');
  
  // Toggle explanation content visibility
  explanationToggle.addEventListener('click', () => {
    explanationHeader.classList.toggle('expanded');
    explanationContent.classList.toggle('expanded');
  });
  
  // Render explanation steps
  function renderExplanationSteps(steps) {
    if (!steps || steps.length === 0) {
      explanationSection.classList.remove('visible');
      return;
    }
    
    explanationSection.classList.add('visible');
    explanationContent.innerHTML = '';
    
    steps.forEach((step, index) => {
      const stepElement = document.createElement('div');
      stepElement.className = 'explanation-step';
      
      const titleElement = document.createElement('h4');
      titleElement.className = 'step-title';
      titleElement.textContent = `${index + 1}. ${step.title}`;
      
      const descriptionElement = document.createElement('p');
      descriptionElement.className = 'step-description';
      descriptionElement.textContent = step.explanation;
      
      stepElement.appendChild(titleElement);
      stepElement.appendChild(descriptionElement);
      
      explanationContent.appendChild(stepElement);
    });
  }
  
  // Make function available globally
  window.renderExplanationSteps = renderExplanationSteps;
});