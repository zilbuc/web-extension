module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    launchOptions.extensions.push('./build');

    return launchOptions;
  });
};
