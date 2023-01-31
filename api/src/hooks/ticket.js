var svg2img = require('svg2img');
// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return context => {
    var svgString = [
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="236" height="120" ',
      'viewBox="0 0 236 120">',
      '<rect x="14" y="23" width="200" height="50" fill="#55FF55" stroke="black" stroke-width="1" />',
      '</svg>'
    ].join('');
    svg2img(svgString, function(error, buffer) {
      //returns a Buffer

      context.data.name = buffer;
      return context;
    });
  };
};
