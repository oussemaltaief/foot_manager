const { convert } = require('convert-svg-to-png');
const bwipjs = require('bwip-js');
const util = require('util');
const getBarcode = util.promisify(bwipjs.toBuffer);
var WebSocket = require('ws');

function SetsubscriptionInfos() {
  return async context => {
    const chaine = 'this is not clear yet';
    const png = await getBarcode({
      bcid: 'code128', // Barcode type
      text: chaine, // Text to encode
      scale: 2, // 3x scaling factor
      height: 9, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: 'center' // Always good to set this
    });
    context.data.serialNumber = chaine;
    context.data.barcodeImage =
      'data:image/png;base64,' + png.toString('base64');
    var svg = `<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 509.41 512.96">
    <defs>
    <style>.cls-1,.cls-2{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{fill:#a79f97;}.cls-4,.cls-5{font-size:17.68px;font-family:Prometo-Light, Prometo;}.cls-24,.cls-4,.cls-5,.cls-6{fill:#fff;}.cls-5{letter-spacing:-0.11em;}.cls-6{font-size:16.5px;}.cls-16,.cls-19,.cls-21,.cls-22,.cls-28,.cls-6,.cls-9{font-family:Prometo-Medium, Prometo;}.cls-7{clip-path:url(#clip-path-3);}.cls-8{fill:#a3a0a0;}.cls-9{font-size:17px;}.cls-10{letter-spacing:-0.02em;}.cls-11{letter-spacing:0em;}.cls-12{letter-spacing:-0.01em;}.cls-13{letter-spacing:-0.01em;}.cls-14{letter-spacing:-0.01em;}.cls-15{letter-spacing:-0.09em;}.cls-16{font-size:38px;}.cls-17{letter-spacing:-0.11em;}.cls-18{letter-spacing:-0.02em;}.cls-19{opacity:0.31;font-size:29px;}.cls-20{letter-spacing:0.01em;}.cls-21{font-size:23px;}.cls-22{font-size:10px;}.cls-23{letter-spacing:-0.02em;}.cls-25{letter-spacing:-0.02em;}.cls-26{letter-spacing:-0.03em;}.cls-27{letter-spacing:-0.02em;}.cls-28{font-size:15px;}.cls-29{letter-spacing:-0.01em;}.cls-30{letter-spacing:-0.06em;}.cls-31{letter-spacing:-0.01em;}.cls-32{letter-spacing:-0.03em;}.cls-33{letter-spacing:-0.11em;}.cls-34{letter-spacing:-0.03em;}.cls-35{letter-spacing:-0.11em;}</style><clipPath id="clip-path"><rect class="cls-1" x="88.27" y="148.82" width="39.33" height="26.45"/></clipPath><clipPath id="clip-path-3" transform="translate(-61.81 -124)"><path class="cls-2" d="M97.89,153s-8.09,0-8.09,8.09v8.21s0,8.09,8.09,8.09H118s8.09,0,8.09-8.09v-8.21s0-8.09-8.09-8.09H97.89"/>
    </clipPath>
    </defs>
    <title>etacabonnement2</title>
    <path class="cls-3" d="M525.86,124.67h-185v0h-.41l.07-.4.05-.28H520a24.06,24.06,0,0,1,5.83.67" transform="translate(-61.81 -124)"/>
    <text class="cls-4" transform="translate(232.8 64.87) scale(0.99 1)">Minist</text>
    <text class="cls-4" transform="translate(279.04 64.87) scale(0.99 1)">èr</text>
    <text class="cls-4" transform="translate(294.86 64.87) scale(0.99 1)">e du </text>
    <text class="cls-5" transform="translate(332.8 64.87) scale(0.99 1)">Tr</text>
    <text class="cls-4" transform="translate(348.01 64.87) scale(0.99 1)">ansport</text>
    <text class="cls-6" transform="translate(70.88 44.98) scale(0.99 1)">République algérienne</text>
    <text class="cls-6" transform="translate(237.24 44.98) scale(0.99 1)">, démocr</text>
    <text class="cls-6" transform="translate(300.75 44.98) scale(0.99 1)">atique et populair</text>
    <text class="cls-6" transform="translate(432.44 44.98) scale(0.99 1)">e </text>
    <g class="cls-7"></g><rect class="cls-8" y="188.08" width="478.37" height="324.88"/>
    <text class="cls-9" transform="translate(66.04 226.19)">République algérienn<tspan class="cls-10" x="163.98" y="0">e</tspan>
    <tspan class="cls-11" x="172.92" y="0">, démoc</tspan><tspan class="cls-12" x="232.63" y="0">r</tspan>
    <tspan x="238.93" y="0">atique et populai</tspan><tspan class="cls-13" x="369.47" y="0">r</tspan>
    <tspan x="375.83" y="0">e</tspan><tspan x="207.4" y="20.4">Ministè</tspan>
    <tspan class="cls-14" x="264.26" y="20.4">r</tspan><tspan x="270.62" y="20.4">e du </tspan>
    <tspan class="cls-15" x="307.97" y="20.4">T</tspan><tspan class="cls-12" x="317.6" y="20.4">r</tspan>
    <tspan x="323.91" y="20.4">ansport</tspan></text>
    <text class="cls-16" transform="translate(359.49 289.76)">E<tspan class="cls-17" x="23.03" y="0">T</tspan><tspan class="cls-18" x="43.81" y="0">A</tspan><tspan x="69.88" y="0">C</tspan></text><text class="cls-19" transform="translate(261.81 329.07)">A<tspan class="cls-20" x="20.59" y="0">B</tspan><tspan x="39.35" y="0">ONNEMENT</tspan></text>
    <text class="cls-21" transform="translate(33.67 347.61)">${
  context.data.firstname
}+${context.data.lastname}</text>
    <text class="cls-22" transform="translate(34 320.95)">NOM &amp; PRENOM</text>
    <text class="cls-21" transform="translate(33.67 412.61)">${
  context.data.address
}</text>
    <text class="cls-22" transform="translate(34 385.95)">ADRESSE</text><rect class="cls-24" x="29.54" y="429.56" width="421.67" height="54" rx="12" ry="12"/>
    <text class="cls-21" transform="translate(33.67 273.65)">photo</text>
    <text class="cls-21" transform="translate(161.87 462.65)">${
  context.data.barcodeImage
}</text>
    <text class="cls-28" transform="translate(379.38 507.11)"><tspan class="cls-29">ww</tspan><tspan class="cls-30" x="23.19" y="0">w</tspan><tspan class="cls-29" x="34.05" y="0">.</tspan><tspan x="37.13" y="0">etac</tspan><tspan class="cls-31" x="66.7" y="0">.</tspan><tspan x="69.78" y="0">dz</tspan></text>
    <text class="cls-21" transform="translate(268.95 387.11)">${
  context.data.validTo
}</text>
    <text class="cls-22" transform="translate(269.29 360.45)"><tspan class="cls-34">D</tspan><tspan class="cls-35" x="6.66" y="0">A</tspan><tspan x="12.63" y="0">TE CRE</tspan><tspan class="cls-35" x="45.98" y="0">A</tspan><tspan x="51.95" y="0">TION</tspan></text>
    </svg>`;
    const svgtopng = await convert(svg, { width: 125, height: 456 });
    console.log(svgtopng);
    context.data.subscriptionImg =
      'data:image/png;base64,' + svgtopng.toString('base64');
  };
}

function printSubscription(img) {
  var connection = new WebSocket('ws://localhost:8000/');
  connection.onopen = function() {
    connection.send(JSON.stringify({ img }));
  };
  console.log('i am printing the subscribtion');
}

module.exports = {
  SetsubscriptionInfos,
  printSubscription
};
