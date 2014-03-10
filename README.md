# Mochify

TDD for browserified code with Mocha, PhantomJS and WebDriver

- Fast roundtrip
- No test HTML page
- No server
- Supports most Mocha reporters

## Install

```
npm install mochify -g
```

- Download and install Phantom.JS: <http://phantomjs.org/>
- Make sure that the phantomjs executable is in your `PATH`

## Usage

Run `mochify` from within your project directory to browserify your scripts,
decorated with a Mocha test runner, run it in PhantomJS and see the output
right in your console.

Options:

- `--watch` use [watchify][] to watch your files and run the tests on change
- `--wd` use [min-webdriver][] to run the tests in multiple real browsers
- `--reporter` or `-R` to change the Mocha reporter (see further down)
- `--cover` to check code coverage with [coverify][]
- `--node` to run test cases on node (useful with `--cover`)

## Browser setup

![mochify](http://maxantoni.de/img/mochify.png)

- Download the «Selenium Server Standalone» JAR from here:
  <https://code.google.com/p/selenium/downloads/list>
- Except for Firefox, you will also need drivers for each browser.
- The driver for Google Chrome can be found here:
  <http://chromedriver.storage.googleapis.com/index.html>
- Put the drivers in the same directory as the JAR file and run:

```
java -jar selenium-server-standalone-2.39.0.jar
```

Create `.min-wd` in your project root:

```
{
  "hostname"  : "localhost",
  "port"      : 4444,
  "browsers"  : [{
    "name"    : "internet explorer",
    "version" : "9"
  }, {
    "name"    : "chrome"
  }, {
    "name"    : "firefox"
  }]
}
```

Thant's it! Now `mochify --wd` will run your Mocha test cases in the configured
browsers simultaniously. If you installed mochify without `-g`, you will need
to run `node_modules/.bin/mochify --wd`.

## Example package.json configuration

```
"devDependencies" : {
  "mocha"         : "*",
  "browserify"    : "*",
  "mochify"       : "*"
},
"scripts"         : {
  "start"         : "mochify --watch"
  "test-phantom"  : "mochify",
  "test-wd"       : "mochify --wd",
  "test"          : "npm run test-phantom && npm run test-wd"
}
```

## Reporters

Mocha reporters known to work:

- min
- dot
- list
- spec (default)
- tap
- json
- doc
- xunit
- markdown

Note: Consuming the output of a machine readable reporter may not work as
expected with `--wd`.

## License

MIT

[watchify]: https://github.com/substack/watchify
[coverify]: https://github.com/substack/coverify
[min-webdriver]: https://github.com/mantoni/min-webdriver
