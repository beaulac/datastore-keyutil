import * as base32 from 'base32.js';
import { coerceDsIdToInt, DatastoreIdLike } from './key.path.elements';

const base32Options = {type: 'crockford', lc: false};
const encode = (buf: Buffer) => base32.encode(buf, base32Options)
    , decode = (str: string) => base32.decode(str, base32Options);

const MAX_UINT_16 = 0xFFFF
    , uint16EncodedSize = 2 + 1;

const MAX_UINT_32 = 0xFFFFFFFF
    , uint32EncodedSize = 4 + 1;

export function encodeDsId(datastoreId: DatastoreIdLike): string {
    const {mantissa, exponent} = decomposeId(datastoreId);

    if (mantissa > MAX_UINT_32) {
        throw Error('DS ID is not divisible enough');
    }

    let buf;
    if (mantissa < MAX_UINT_16) {
        buf = Buffer.allocUnsafe(uint16EncodedSize);
        buf.writeUInt16LE(mantissa, 0);
    } else {
        buf = Buffer.allocUnsafe(uint32EncodedSize);
        buf.writeUInt32LE(mantissa, 0);
    }

    buf.writeUInt8(exponent, buf.length - 1);

    return encode(buf);
}

export function decodeDsId(encodedId: string): number {
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

/**
 * Datastore IDs are always highly divisible by 2.
 * We can exploit this to greatly shorten their encoded length,
 * by factoring out the largest power of 2 it is divisible by.
 *
 * Yes; this is a gross implementation-dependent kludge :)
 *
 * @param {DatastoreIdLike} datastoreId
 * @returns DecomposedId
 */
function decomposeId(datastoreId: DatastoreIdLike): DecomposedId {
    datastoreId = coerceDsIdToInt(datastoreId);
    // Bitwise magic:
    // The only bit == 1 in both a number AND its two's complement
    // corresponds to the largest power of 2 it is divisible by.
    const largestPowerOfTwoDivisor = datastoreId & -datastoreId;

    return largestPowerOfTwoDivisor > 0 // JS doesn't deal well when the number is divisible by 2^(>=31)
        ? {mantissa: datastoreId / largestPowerOfTwoDivisor, exponent: Math.log2(largestPowerOfTwoDivisor)}
        : fallbackDecompose_(datastoreId as number);
}

/**
 * Very rarely the number will be *too* divisible by two (2^(>=31)).
 * This iterative method still works, though.
 */
function fallbackDecompose_(datastoreIntId: number): DecomposedId {
    let mantissa = datastoreIntId, exponent = 0;
    while (mantissa % 2 === 0) {
        mantissa /= 2;
        ++exponent;
    }
    return {mantissa, exponent};
}

interface DecomposedId {
    mantissa: number;
    exponent: number;
}
