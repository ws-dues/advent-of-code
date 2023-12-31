#!/usr/bin/env zsh

# note: include `unset EXCEPTION` if adding error handling to function

# The function below uses jq to manipulate json. See https://jqlang.github.io/jq/ for details.

build_typescript_template() {
  #{
    local template_directory_name=$1;
    if [[ "" == $template_directory_name ]]; then
      print "Error: no directory name provided.";
      exit 1;
    elif [[ -d $template_directory_name ]]; then
      print "Error: ${template_directory_name} directory already exists";
      exit 1;
    fi

    # make the specified directory to contain the TypeScript template project
    mkdir $template_directory_name;

    # add the initial files
    local src="./${template_directory_name}/src";
    mkdir $src;

    ## build initial application file
    touch $src/$template_directory_name.ts;
    echo "export const ${template_directory_name}Puzzle1 = () => {
  console.log('Do something for puzzle 1, ${template_directory_name}');
};

export const ${template_directory_name}Puzzle2 = () => {
  console.log('Do something for puzzle 2, ${template_directory_name}');
};
" >> $src/$template_directory_name.ts;

    ## build initial index file
    touch $src/index.ts;
    echo "import { ${template_directory_name}Puzzle1, ${template_directory_name}Puzzle2 } from './${template_directory_name}';

console.log('Solution to Puzzle 1: ', ${template_directory_name}Puzzle1());
console.log('Solution to Puzzle 2: ', ${template_directory_name}Puzzle2());
" >> $src/index.ts;

    # add Advent of Code files
    touch ./$template_directory_name/input.txt;

    # initialize yarn package manager for project
    cd $template_directory_name;
    yarn init;

    # add start script to package.json.
    jq '.scripts.start="ts-node ./src/index.ts"' package.json > temp.json;
    jq '.' temp.json > package.json;
    rm -rf temp.json;

    # add packages
    yarn add -D typescript ts-node @types/node;

    # initialize typescript configuration
    yarn tsc --init;

    echo "Basic TypeScript project stubbed out in ${template_directory_name}";
  #} #always {
    #if catch *; then
      #print "Caught some exception.";
    #fi
  #}
}

build_typescript_template "$@"
