// Assignment Code
const generateBtn = document.getElementById("generate")
const passwordField = document.getElementById("password")

function questionUser() {

  passwordField.innerText = ''

  setTimeout(function() {

    let request = {
      useLowercaseLetters: confirm("Do you want to include UPPERCASE letters in your password?"),
      useUppercaseLetters: confirm("Do you want to include lowercase letters in your password?"),
      useNumbers: confirm("Do you want to include numbers in your password?"),
      useSpecialLetters: confirm("Do you want to include special characters in your password?"),
      passwordLength: prompt("How many characters would you like your password to be?"  )
    }
  
    let randomValue = randomValueGenerator(request)
  
    passwordField.innerText = randomValue

  }, 100)

}

function randomValueGenerator(requestPayload) {

  // Empty string buffer
  let randomGeneratedValue = ""

  // Determine which entropy generator(s) are used
  let entropyGenerators = getEntropyGenerators(requestPayload)

  for (let i = 0; i < requestPayload.passwordLength; i++) {

    // Determine the index limit of the entropy generator array
    let iteratorLimit = entropyGenerators.length - 1

    // Randomly determine the entropy generator to execute,
    // then invoke the generator to return a random character,
    // finally append the the result of the entropy generator
    // to the 'randomGeneratedValue' string buffer
    randomGeneratedValue += entropyGenerators[rand(0, iteratorLimit)]()

  }

  return randomGeneratedValue

}

function getEntropyGenerators({ useNumbers, useLowercaseLetters, useUppercaseLetters, useSpecialLetters }) {

  // Empty array buffer
  let arr = [ ] 

  // When useLowercaseLetters is true.
  // utilize the getLowercaseLetter generator
  if (useLowercaseLetters)
    arr.push(getLowercaseLetter)

  // When useUppercaseLetters is true.
  // utilize the getUppercaseLetter generator
  if (useUppercaseLetters)
    arr.push(getUppercaseLetter)

  // When useSpecialLetters is true.
  // utilize the getSpecialLetter generator
  if (useSpecialLetters)
    arr.push(getSpecialLetter)

  // When useNumbers is true.
  // utilize the getNumber generator
  if (useNumbers)
    arr.push(getNumber)

  return arr

}

let getUppercaseLetter = () => getRandomValueFromStr("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

let getLowercaseLetter = () => getRandomValueFromStr("abcdefghijklmnopqrstuvwxyz")

let getNumber = () => getRandomValueFromStr("123456789")

let getSpecialLetter = () => getRandomValueFromStr("!@#$%^&*()-_=+?,><:;")

/**
 * Given an array, return a random value from it
 * @param arr
 * @returns {*}
 */
let getRandomValueFromArr = (arr) => arr[rand(0, arr.length - 1)]

/**
 * Given a string, returns a random character from it
 * @param str
 * @returns {*}
 */
let getRandomValueFromStr = (str) => getRandomValueFromArr(str.split(''))

/**
 * Given a minimum number (inclusive) and a maximum number (inclusive), returns a pseudorandom number in range.
 *
 * @param min
 * @param max
 * @returns {number}
 */
let rand = (min, max) => {
  let randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum)
}


generateBtn.addEventListener("click", questionUser)

console.log(getUppercaseLetter)