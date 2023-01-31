// Inspired by react-scripts
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/env.js

const fs = require('fs');
const path = require('path');

const ENV = Object.assign({}, process.env); // needed to prevent webpack from hardcoding NODE_ENV value during compilation
const DOT_ENV = path.join(__dirname, '..', '.env');
const NODE_ENV = ENV.NODE_ENV || 'development';

// use Object.assign() to prevent webpack-uglyjs from throwing an invalid assignment error
Object.assign(process.env, { NODE_ENV });

const dotenvFiles = [
  `${DOT_ENV}.${NODE_ENV}.local`,
  `${DOT_ENV}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${DOT_ENV}.local`,
  DOT_ENV
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile
      })
    );
  }
});
