function calculateAge() {
    const name = document.getElementById('name').value.trim();
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const resultElement = document.getElementById('result');
  
    // Check if name is entered
    if (!name) {
      resultElement.innerHTML = "<p style='color: red;'>Please enter your name!</p>";
      return;
    }
  
    // Check if all fields are filled
    if (!day || !month || !year) {
      resultElement.innerHTML = "<p style='color: red;'>Please enter your full birth date!</p>";
      return;
    }
  
    // Create the birth date
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
  
    // Check if the date is valid and not in the future
    if (birthDate > currentDate) {
      resultElement.innerHTML = "<p style='color: red;'>Your birth date cannot be in the future!</p>";
      return;
    }
  
    const diffInMilliseconds = currentDate - birthDate;
    const ageDate = new Date(diffInMilliseconds);
  
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
  
    // Display personalized message
    resultElement.innerHTML = `
      <p>Hello, <span style="color: #8e44ad;">${name}</span>!</p>
      <p>You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.</p>
    `;
  }