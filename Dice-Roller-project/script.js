// Select the button and the result paragraph
const rollBtn = document.getElementById('rollBtn');
const result = document.getElementById('result');

// Add click event listener to the roll button
rollBtn.addEventListener('click', function() {
  // Generate a random number between 1 and 6
  const diceRoll = Math.floor(Math.random() * 6) + 1;

  // Display the result
  result.textContent = `You rolled a ${diceRoll}!`;
});
