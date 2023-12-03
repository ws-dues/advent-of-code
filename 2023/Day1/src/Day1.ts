import { join, parse } from "path";
import { syncReadFile } from "../../../utils";

export const Day1Puzzle1 = () => {
  // parse the input.txt file into a string
  const elfCalibrationText = syncReadFile(join(__dirname, "../input.txt"));

  // elf inventories are separated by blank lines, split into array of strings
  // representing separate elf calibration strings
  const elfCalibrationRawValues = elfCalibrationText.split("\n");

  // For each raw value, identify the double-digit value hidden therein
  // Note that when only a single digit is present, the double-digit value
  // has that digit in both places.
  const revealedNumbers = elfCalibrationRawValues.map((fullString) => {
    const digitsFromString = Array.from(fullString.matchAll(/([0-9]){1}/g));
    // refactor: this is not readable
    const revealedValue =
      digitsFromString[0][0] + digitsFromString[digitsFromString.length - 1][0];
    return Number.parseInt(revealedValue);
  });

  return revealedNumbers.reduce((sum, currentNumber) => sum + currentNumber, 0);
};

const parseNumberFromString = (numberString: string): number => {
  const digit = Number.parseInt(numberString);
  if (digit) {
    return digit;
  }

  switch (numberString) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return 0;
  }
};

const reverseString = (inputString: string): string => {
  return Array.from(inputString).reverse().join("");
};

export const Day1Puzzle2 = () => {
  // parse the input.txt file into a string
  const elfCalibrationText = syncReadFile(join(__dirname, "../input.txt"));

  // elf inventories are separated by blank lines, split into array of strings
  // representing separate elf calibration strings
  const elfCalibrationRawValues = elfCalibrationText.split("\n");

  // For each raw value, identify the double-digit value hidden therein
  // Note that when only a single digit is present, the double-digit value
  // has that digit in both places.
  const revealedNumbers = elfCalibrationRawValues.map((fullString) => {
    const firstDigitString = fullString.match(
      /([0-9]){1}|one|two|three|four|five|six|seven|eight|nine/g
    )?.[0];

    // refactor: how better to find last digit?
    // move names into array and use that with find logic instead of regexp?
    const lastDigitStringReversed = reverseString(fullString).match(
      /([0-9]){1}|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g
    )?.[0];

    if (
      firstDigitString === undefined ||
      lastDigitStringReversed === undefined
    ) {
      throw new Error(`No digit found in ${fullString}`);
    }

    const lastDigitString = reverseString(lastDigitStringReversed);
    return (
      parseNumberFromString(firstDigitString) * 10 +
      parseNumberFromString(lastDigitString)
    );
  });

  return revealedNumbers.reduce((sum, currentNumber) => sum + currentNumber, 0);
};
