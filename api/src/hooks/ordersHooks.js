const v1options = {
  clockseq: 0x123456789
};
const uuidv1 = require('uuid/v1');
const bwipjs = require('bwip-js');
const util = require('util');
const Pusher = require('pusher');
const pusher = new Pusher({
  appId: '737358',
  key: '4b3f9f62ed6c5a73725b',
  secret: 'ed27fbc4084ad3b0d470',
  cluster: 'eu',
  encrypted: true
});
const getBarcode = util.promisify(bwipjs.toBuffer);

function convertImage() {
  return async context => {
    let printCounter = 0;
    for (let j = 0; j < context.data.lines.length; j++) {
      const element = context.data.lines[j];
      element.tickets = [];
      for (
        let passengers = 0;
        passengers < element.meta.passengers;
        passengers++
      ) {
        for (let i = 0; i < element.count; i++) {
          const chaine =
            '2201' +
            `${Math.floor(Date.now() / 1000).toString()}` +
            `${
              printCounter >= 10
                ? printCounter.toString()
                : '0' + printCounter.toString()
            }` +
            `${
              context.data.meta.orderedProduct.caisseSerialNumber >= 10
                ? context.data.meta.orderedProduct.caisseSerialNumber
                : '0' + context.data.meta.orderedProduct.caisseSerialNumber
            }` +
            `${element.meta.productfirstStationCode}` +
            `${element.meta.productendStationCode}`;
          const png = await getBarcode({
            bcid: 'code128', // Barcode type
            text: chaine,
            scale: 3, // 3x scaling factor
            height: 10, // Bar height, in millimeters
            includetext: true, // Show human-readable text
            textxalign: 'center' // Always good to set this
          });
          const e = {
            price: element.free[i].price,
            barcode: uuidv1(v1options),
            serialNumber: chaine,
            barcodeImage: 'data:image/png;base64,' + png.toString('base64')
          };

          element.tickets.push(e);
          printCounter++;
        }
      }
    }
    pusher.trigger('order', 'order', { data: 'true' });

    return context;
  };
}


module.exports = {
  convertImage
};
