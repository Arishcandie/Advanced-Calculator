let display = document.getElementById('display');
let memory = 0;

// Theme Toggle
const themeButton = document.getElementById('theme-button');
const body = document.body;

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  themeButton.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeButton.textContent = '☀️ Light Mode';
} else {
  body.classList.remove('dark-mode');
  themeButton.textContent = '🌙 Dark Mode';
}

// Update Display
function updateDisplay(value) {
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    display.value += value;
  }
}

// Clear Display
function clearDisplay() {
  display.value = '0';
}

// Backspace
function backspace() {
  display.value = display.value.slice(0, -1) || '0';
}

// Calculate
function calculate() {
  try {
    let expression = display.value;
    expression = expression.replace(/√/g, 'Math.sqrt');
    expression = expression.replace(/\^/g, '**');
    display.value = eval(expression);
  } catch (e) {
    display.value = 'Error';
  }
}

// Memory Functions
function memoryAdd() {
  memory += parseFloat(display.value) || 0;
}

function memorySubtract() {
  memory -= parseFloat(display.value) || 0;
}

function memoryRecall() {
  display.value = memory;
}

function memoryClear() {
  memory = 0;
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9\.\+\-\*\/%]/.test(key)) {
    updateDisplay(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});