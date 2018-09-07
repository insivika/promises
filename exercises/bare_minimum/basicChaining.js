/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');

console.log('test');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
      .then(function(user) {
        promisification.getGitHubProfileAsync(user)
          .then(function(userInfo) {
               
            fs.writeFile(writeFilePath, JSON.stringify(userInfo, null, 4), 'utf8', function(err, data) {

              if (err) { reject(err); } else {
                console.log('data', data);
                resolve(data);
              }
            });
          })
          .catch(function(error) {
            reject(error);
          });
      })
      .catch(function(error) {
        reject(error);
      });

    // .then(promisification.getGitHubProfileAsync(user))
    // .then(promiseConstructor.writeFileAsync(userInfo, writeFilePath))
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
