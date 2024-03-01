const fs = require("fs");

const filename = "10m.txt";

// використовувала
// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs

function findMaxMinMedianMean(filename) {
  const numbers = fs
    .readFileSync(filename, "utf8") // читаємо файл
    .split("\n")
    .map(Number)
    .filter((number) => !isNaN(number)); //на всяк випадок фільтруємо

  const n = numbers.length;
  let maxNumber = -Infinity;
  let minNumber = Infinity;
  let sum = 0;

  // Знаходимо максимальне та мінімальне
  for (let i = 0; i < n; i++) {
    const number = numbers[i];
    sum += number;
    if (number > maxNumber) {
      maxNumber = number;
    }
    if (number < minNumber) {
      minNumber = number;
    }
  }

  // Знаходимо медіану

  // Медіана - це значення, яке розділяє впорядкований набір даних на дві рівні частини. Іншими словами, медіана - це значення, яке перебуває в середині набору даних, коли він впорядкований за зростанням або за спаданням.

  // Приклад:
  // Розглянемо набір даних: {3, 6, 7, 8, 8, 10, 13, 15, 100}.

  // Спочатку впорядкуємо цей набір за зростанням: {3, 6, 7, 8, 8, 10, 13, 15, 100}.
  // Довжина цього набору даних - 9. Так як це непарна кількість, медіана буде рівна значенню в середині, тобто 8. (це число, що перебуває в середині: 8, 7, 8).
  // Тепер, якщо б у наборі була парна кількість чисел, то медіана обчислювалася б як середнє арифметичне двох середніх чисел. Наприклад, у наборі {1, 2, 4, 6}, медіана буде (2 + 4) / 2 = 3.
  numbers.sort((a, b) => a - b);
  let median;
  if (n % 2 === 0) {
    median = (numbers[n / 2 - 1] + numbers[n / 2]) / 2;
  } else {
    median = numbers[Math.floor(n / 2)];
  }

  // середнє
  const mean = sum / n;

  // послідовність чисел, яка збільшується
  let increasingSequence = [];
  let maxIncreasingSequence = [];
  for (let i = 0; i < n - 1; i++) {
    if (numbers[i] < numbers[i + 1]) {
      increasingSequence.push(numbers[i]);
    } else {
      increasingSequence.push(numbers[i]);
      if (increasingSequence.length > maxIncreasingSequence.length) {
        maxIncreasingSequence = [...increasingSequence];
      }
      increasingSequence = [];
    }
  }

  // послідовність чисел, яка зменшується
  let decreasingSequence = [];
  let maxDecreasingSequence = [];
  for (let i = 0; i < n - 1; i++) {
    if (numbers[i] > numbers[i + 1]) {
      decreasingSequence.push(numbers[i]);
    } else {
      decreasingSequence.push(numbers[i]);
      if (decreasingSequence.length > maxDecreasingSequence.length) {
        maxDecreasingSequence = [...decreasingSequence];
      }
      decreasingSequence = [];
    }
  }

  return {
    maxNumber,
    minNumber,
    median,
    mean,
    maxIncreasingSequence,
    maxDecreasingSequence,
  };
}

const {
  maxNumber,
  minNumber,
  median,
  mean,
  maxIncreasingSequence,
  maxDecreasingSequence,
} = findMaxMinMedianMean(filename);
console.log("Максимальне", maxNumber);
console.log("Мінімальне", minNumber);
console.log("Медіана:", median);
console.log("Середнє", mean);
console.log("Найбільша збільшувана послідовність", maxIncreasingSequence);
console.log("Найбільша послідовність, що зменшується:", maxDecreasingSequence);
