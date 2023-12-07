import { join } from "path";
import { syncReadFile } from "../../../utils";

export const Day3Puzzle1 = () => {
  // parse the input.txt file into a string
  const engineText = syncReadFile(join(__dirname, "../input.txt"));
  
  // split the text file into rows
  const engineRowsList = engineText.split('\n');

  const enginePartNumbers = [];
  for(let rowId = 0; rowId < engineRowsList.length; rowId++) {
    const rowCharactersList = engineRowsList[rowId].replace(/\.+/g, " ").trim().split(' ');
    console.log(rowCharactersList);
    
    for(let colId = 0; colId < rowCharactersList.length; colId++) {

    }
  }
};

export const Day3Puzzle2 = () => {
  console.log("Do something for puzzle 2, Day3");
};
