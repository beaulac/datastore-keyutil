"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base32 = require("base32.js");
const key_path_elements_1 = require("./key.path.elements");
const base32Options = { type: 'crockford', lc: false };
const encode = (buf) => base32.encode(buf, base32Options), decode = (str) => base32.decode(str, base32Options);
const MAX_UINT_16 = 0xFFFF, uint16EncodedSize = 2 + 1;
const MAX_UINT_32 = 0xFFFFFFFF, uint32EncodedSize = 4 + 1;
function encodeDsId(datastoreId) {
    const { mantissa, exponent } = decomposeId(datastoreId);
    if (mantissa > MAX_UINT_32) {
        throw Error('DS ID is not divisible enough');
    }
    let buf;
    if (mantissa < MAX_UINT_16) {
        buf = Buffer.allocUnsafe(uint16EncodedSize);
        buf.writeUInt16LE(mantissa, 0);
    }
    else {
        buf = Buffer.allocUnsafe(uint32EncodedSize);
        buf.writeUInt32LE(mantissa, 0);
    }
    buf.writeUInt8(exponent, buf.length - 1);
    return encode(buf);
}
exports.encodeDsId = encodeDsId;
function decodeDsId(encodedId) {
    const buf = decode(encodedId);
    let coefficient;
    switch (buf.length) {
        case (uint16EncodedSize):
            coefficient = buf.readUInt16LE(0);
            break;
        case (uint32EncodedSize):
            coefficient = buf.readUInt32LE(0);
            break;
        default:
            throw Error(`Invalid encoded DS ID: ${encodedId}`);
    }
    const exponent = buf.readUInt8(buf.length - 1);
    return coefficient * Math.pow(2, exponent);
}
exports.decodeDsId = decodeDsId;
function decomposeId(datastoreId) {
    datastoreId = key_path_elements_1.coerceDsIdToInt(datastoreId);
    const largestPowerOfTwoDivisor = datastoreId & -datastoreId;
    return largestPowerOfTwoDivisor > 0
        ? { mantissa: datastoreId / largestPowerOfTwoDivisor, exponent: Math.log2(largestPowerOfTwoDivisor) }
        : fallbackDecompose_(datastoreId);
}
function fallbackDecompose_(datastoreIntId) {
    let mantissa = datastoreIntId, exponent = 0;
    while (mantissa % 2 === 0) {
        mantissa /= 2;
        ++exponent;
    }
    return { mantissa, exponent };
}
