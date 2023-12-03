import { join } from "path";
import { syncReadFile } from '../../../utils';

const Day2 = () => {
  // parse the input.txt file into a string
  const elfCalibrationText = syncReadFile(join(__dirname, "../input.txt"));

  // elf inventories are separated by blank lines, split into array of strings
  // representing separate elf calibration strings
  const elfCalibrationRawValues = elfCalibrationText.split("\n");

};

export default Day2;
