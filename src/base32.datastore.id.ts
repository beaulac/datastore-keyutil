import * as base32 from 'base32.js';
import { coerceDsIdToInt, DatastoreIdLike } from './key.path.elements';

const MAX_UINT_32 = 0xFFFFFFFF;

const base32Options = {type: 'crockford', lc: false};
const encoder = () => new base32.Encoder(base32Options)
    , decoder = () => new base32.Decoder(base32Options);

const bufferSize = 5;
const exponentOffset = bufferSize - 1;


export function encodeDsId(datastoreId: DatastoreIdLike): string {
    const {mantissa, exponent} = decomposeId(datastoreId);

    if (mantissa > MAX_UINT_32) {
        throw Error('DS ID is not divisible enough');
    }

    const buf = Buffer.allocUnsafe(bufferSize);
    buf.writeUInt32LE(mantissa, 0);
    buf.writeUInt8(exponent, exponentOffset);

    return encoder().finalize(buf);
}

export function decodeDsId(encodedId: string): number {
    const buf = decoder().finalize(encodedId);

    if (buf.length !== bufferSize) {
        throw Error(`Invalid encoded DS ID: ${encodedId}`);
    }

    const coefficient = buf.readUInt32LE(0)
        , exponent = buf.readUInt8(exponentOffset);

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
    const largestPowerOfTwoDivisor = Math.log2(datastoreId & -datastoreId);
    return {
        mantissa: datastoreId / largestPowerOfTwoDivisor,
        exponent: Math.log2(largestPowerOfTwoDivisor)
    };
}

interface DecomposedId {
    mantissa: number;
    exponent: number;
}
