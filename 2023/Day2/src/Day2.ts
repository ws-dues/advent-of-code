import { join } from "path";
import { syncReadFile } from "../../../utils";

export const Day2Puzzle1 = () => {
  // parse the input.txt file into a string
  const cubeGamesRecordText = syncReadFile(join(__dirname, "../input.txt"));

  // elf inventories are separated by blank lines, split into array of strings
  // representing separate elf calibration strings
  const cubeGamesRecordList = cubeGamesRecordText.split("\n");

  const sumIds = cubeGamesRecordList.reduce((sum, cubeGameRecord) => {
    // split game id from sequence of cube subsets
    const [rawIdString, rawCubeSubsetsString] = cubeGameRecord.split(":");

    const gameId = Number.parseInt(rawIdString.replace("Game ", ""));

    const rawCubeSubsets = rawCubeSubsetsString
      .split(";")
      .map((subset) => subset.split(","));

    const isGamePossibleWithinBounds = rawCubeSubsets.every((rawCubeSubset) =>
      rawCubeSubset.every((diceRecord) => {
        const [diceNumberString, color] = diceRecord.trim().split(" ");
        const diceNumber = Number.parseInt(diceNumberString);

        switch (color) {
          case "red":
            return diceNumber <= 12;
          case "green":
            return diceNumber <= 13;
          case "blue":
            return diceNumber <= 14;
          default:
            throw new Error("invalid dice record");
        }
      })
    );

    if(isGamePossibleWithinBounds) {
      return sum + gameId;
    }

    return sum;
  }, 0);

  return sumIds;
};
