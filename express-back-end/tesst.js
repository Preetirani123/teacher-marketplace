let stringSimilarity = require("string-similarity");

let similarity = stringSimilarity.compareTwoStrings("healed", "sealed");

let matches = stringSimilarity.findBestMatch("A Test for students in Kindergarten " +
"Science in the province of Saskatchewan A Test for students in Grade 8 Science in " + 
"the province of Yukon A Lesson Plan for students in Grade 12 Art and Music in the " + 
"province of Saskatchewan", [
  'A worksheet for your student in Math class in Grade 3',
 'European Explorers & Age of Exploration | Print or Digital | Distance Learning',
 'A Lesson Plan for your student in Physics class',
 'A worksheet for your kindergarten class',
 'Earth Day Activities Choice Board for Science',
 'Adding and Subtracting Decimals Math Project | Distance Learning',
 'Pollution Reading Passage & Comprehension Activities',
 'SHAKESPEARE BIOGRAPHY WEBQUEST',
 'A Lesson Plan for grade 12 Mathematics',
 'The Diary of Anne Frank DRAMA Unit for Play Version (Goodrich & Hackett)',
 'A Lesson Plan for grade 6 Science',
 'A worksheet for students in Kindergarten French in the province of Alberta',
 'A Test for students in Grade 1 Science in the province of Saskatchewan',
 'A worksheet for students in Kindergarten Art and Music in the province of Manitoba',
 'A Test for students in Grade 5 Art and Music in the province of Nunavut',
 'A Test for students in Grade 11 French in the province of Ontario',
 'A worksheet for students in Grade 3 Science in the province of Manitoba',
 'A worksheet for students in Kindergarten French in the province of Yukon',
 'A Test for students in Grade 2 Social Studies in the province of Manitoba',
 'A Lesson Plan for students in Grade 10 Biology in the province of Quebec',
 'A Lesson Plan for students in Grade 8 Social Studies in the province of Yukon',
 'A Test for students in Grade 4 Chemistry in the province of Manitoba',
' A worksheet for students in Kindergarten Physics in the province of Ontario',
' A worksheet for students in Grade 1 Art and Music in the province of New Brunswick',
 'A worksheet for students in Kindergarten English in the province of Yukon',
 'A Lesson Plan for students in Grade 12 Chemistry in the province of Nunavut',
 'A Test for students in Grade 2 French in the province of Northwest Territories',
 'A worksheet for students in Grade 3 English in the province of Northwest Territories',
 'A worksheet for students in Grade 5 Art and Music in the province of Prince Edward Island',
 "A worksheet for students in Grade 12 Science in the province of Yukon",
 "A Test for students in Grade 1 English in the province of Quebec",
 "A Test for students in Grade 3 Mathematics in the province of Newfoundland and Labrador",
 "A worksheet for students in Grade 6 Social Studies in the province of Quebec"
]);
console.log(similarity)
console.log(matches)