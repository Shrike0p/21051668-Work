const express = require('express');
const axios = require('axios');

const app = express();

const WINDOW_SIZE = 10;
const numberWindow = [];

function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

function updateWindow(newNumbers) {
  console.log('New numbers:', newNumbers);
  newNumbers.forEach((num) => {
    if (!numberWindow.includes(num)) {
      if (numberWindow.length >= WINDOW_SIZE) {
        numberWindow.shift(); // Remove the oldest element
      }
      numberWindow.push(num); // Add the new unique number
    }
  });
}

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  const windowPrevState = [...numberWindow];
  console.log('Window previous state:', windowPrevState);

  let fetchedNumbers = [];
  if (numberid === 'e') {
    fetchedNumbers = [2, 4, 6, 8, 10];
  } else if (numberid === 'p') {
    fetchedNumbers = [2, 3, 5, 7, 11];
  } else if (numberid === 'f') {
    fetchedNumbers = [1, 1, 2, 3, 5];
  } else if (numberid === 'r') {
    fetchedNumbers = [1, 7, 12, 18, 22];
  }

  updateWindow(fetchedNumbers);

  const windowCurrState = [...numberWindow];
  console.log('Window current state:', windowCurrState);

  const avg = calculateAverage(windowCurrState);

  const response = {
    windowPrevState,
    windowCurrState,
    fetchedNumbers,
    avg: avg.toFixed(2), // Format to 2 decimal places
  };

  res.json(response);
});

const PORT = 9876;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
