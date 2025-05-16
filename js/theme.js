// Theme management
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check if theme is stored in localStorage
  const savedTheme = localStorage.getItem('theme');
  // Check if user prefers dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
    htmlElement.classList.add('dark');
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    
    // Save preference to localStorage
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});