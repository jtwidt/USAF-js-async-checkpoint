#!/usr/bin/env node

// I - txt with a list of pokemon
// O - Log Pokemon types to console
// C - none
// E - empty File; pokemon doesn't exist

const fetch = require('node-fetch');
const fs = require('fs');

function readInput(input) {
  // Reads an input file and returns the contents as a string
  var data = fs.readFileSync(input, { encoding: 'utf8' });

  // split the data into an array based on \n (newline) character
  var pokemon = data.split('\n');

  // output the resulting array
  return pokemon;
}

function logPokemonData(pokemon) {
  // for each pokemon in the array
  pokemon.forEach((element) => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + element.toLowerCase()) //send a GET command with the pokemon name appended
      .then((response) => response.json())
      .then((data) => {
        let pokemonName = data.name; // get the name from the JSON reply
        let fixedName = pokemonName[0].toUpperCase + pokemonName.slice(1); // Capitalize the Pokemon name

        let pokeType = data.types.map((kind) => kind.type.name); // Map any multiple types to a single array

        let outputString = fixedName + ': ' + pokeType.join(', '); // Create the ouput string
        console.log(outputString);
      })
      .catch(function () {
        console.log('The pokemon ' + element + ' does not exist.');
      });
  });
}

var test = logPokemonData(readInput('input.txt'));
