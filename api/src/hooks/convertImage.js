const util = require('util');
const bwipjs = require('bwip-js');
const getBarcode = util.promisify(bwipjs.toBuffer);
const uuidv1 = require('uuid/v1');
const v1options = {
  clockseq: 0x123456789
};
module.exports = function convertImage() {
  return async context => {
    let printCounter = context.data.printCounter;
    if (printCounter < 1000 && printCounter > 99) {
      printCounter = '0' + printCounter;
    } else if (printCounter < 99 && printCounter > 10) {
      printCounter = '00' + printCounter;
    } else {
      printCounter = '000' + printCounter;
    }
    const chaine =
      '2201' +
      `${Math.floor(Date.now() / 1000).toString()}` +
      `${printCounter}` +
      `${context.data.meta.emergencyProduct.startStationCode}` +
      `${context.data.meta.emergencyProduct.endStationCode}`;
    const png = await getBarcode({
      bcid: 'code128', // Barcode type
      text: chaine,
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: 'center' // Always good to set this
    });

    context.data.barcodeImage =
      'data:image/png;base64,' + png.toString('base64');
    context.data.serialNumber = chaine;
    context.data.barcode = uuidv1(v1options);

    return context;
  };
};
