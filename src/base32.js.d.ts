/// <reference types="node" />
declare module 'base32.js' {

    function charmap(alphabet: string, mappings: CharacterMap): CharacterMap;

    function encode(buf: Buffer, options: Options): string;

    function decode(str: string, options: Options): Buffer;

    interface Options {
        lc?: boolean;
        alphabet?: string;
        type?: string;
        charmap?: CharacterMap;
    }

    class Decoder {
        constructor(options?: Options);

        buf: Array<number>;
        shift: number;
        carry: number;

        write(str: string): this;

        finalize(str: string): Buffer
    }

    class Encoder {
        constructor(options?: Options);

        buf: string;
        shift: number;
        carry: number;

        write(buf: Uint8Array): this;

        finalize(buf: Buffer): string;
    }

    interface CharacterMap {
        [charToReplace: string]: number;

        [charToReplace: number]: number;
    }

    interface Base32Variant {
        alphabet: string;
        charmap: CharacterMap;
    }

    const crockford: Base32Variant;
    const rfc4648: Base32Variant;
    const base32hex: Base32Variant;
}
