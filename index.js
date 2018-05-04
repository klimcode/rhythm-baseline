#!/usr/bin/env node

const PATH = require('path');
const EXPRESS = require('express');
const CORS = require('cors');
const OPN = require('opn');
// Klimcode scripts
const BRIEF = require('brief-async');
const FILE = require('fs-handy-wraps');

const TOOLS = require('./tools');

const appDir = FILE.CWD;
const userSettings = require(PATH.join(appDir, 'package.json')).stringifier;

const defSettings = {
  input: 'input',
  output: 'rhythm',
  outputFileName: 'baselines.scss',
  host: 'localhost',
  port: 8765,
  timeout: 300,
};
const settings = Object.assign(defSettings, userSettings);
const INPUT_DIR = PATH.resolve(appDir, settings.input);
const OUTPUT_DIR = PATH.resolve(appDir, settings.output);
const outputFilePath = PATH.resolve(OUTPUT_DIR, settings.outputFileName);


const log = function logToConsole(...args) {
  console.log(...args); // eslint-disable-line no-console
};


const startServer = function startServerAndOpenBrowser(args, resolve) {
  const dir = args;
  const server = EXPRESS();
  const { host, port } = settings;

  server.use('/', EXPRESS.static(dir));
  server.use(EXPRESS.json());
  server.use(CORS({ credentials: true, origin: true }));
  server.post('/', (req, res) => {
    if (req.body) {
      res.send('Server got data ⊙﹏⊙');
      resolve(req.body);
    }
  });
  server.listen(port, host);

  OPN(`http://${host}:${port}`)
    .then(() => log('browser opened'));
};

const postProcess = function processInput(input, resolve) {
  log('POST message received');
  const scssCode = input.reduce((result, font) => { // enlist all Font Families
    const familySanitized = font.fontFamily
      .replace(/ /g, '_')
      .toLowerCase();

    const fontData = font.data.reduce((acc, sizes) => { // Rules for the Font Family
      const data = Object.assign(sizes, { familySanitized });
      const values = TOOLS.getCSSValues(data);
      const scssRule = TOOLS.getCSSCode(values);

      return `${acc}\n${scssRule}`;
    }, `//rules for: ${font.fontFamily}`);


    return `${result}\n${fontData}`;
  }, '');

  FILE.write(
    outputFilePath,
    scssCode,
    () => {
      log(`Result is placed to file: ${outputFilePath}`);
      resolve();
      process.exit(0);
    },
  );
};

const roadmap = [
  [INPUT_DIR],      startServer,
  [startServer],    postProcess,
];
BRIEF(roadmap);
