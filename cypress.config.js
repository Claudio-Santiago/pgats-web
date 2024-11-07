const { defineConfig } = require('cypress');

module.exports = defineConfig({
  watchForFileChanges: false,
  //video: true,
  //videoCompression: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    //baseUrl: '',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
