// For the default version
const algoliasearch = require('algoliasearch');
const client = algoliasearch('AEHY4UFE1J', '5516d295d2daa1c4430175900a7b3397');
const index = client.initIndex('SmarterTeacher');

// only query string
index.search('query string')
  .then(({ hits }) => {
  console.log(hits);
});