import  keccak256 from 'keccak256'
import { v4 as uuidv4 } from 'uuid'
import  { base32 } from 'rfc4648'

const DERIVE_PATH_KECCAK = "m/44'/60'/1'/0/0"


const StrToBuf = (str) => {
    return Buffer.from(str).toString('hex')
}

const B64ToHex = (str) => {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

const HexToBuf = (str) => {
    return new Uint8Array(str.match(/[\da-f]{2}/gi).map( (h) => {
        return parseInt(h, 16)
    }))
}

const BufToHex = (buffer) => {
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

const B64ToBuf = (str) => {
    return HexToBuf( B64ToHex(str) )
}

const HexToB32 = (str) => {
    var encoded = base32.stringify(Buffer.from(str, 'hex'))
    return encoded.replace(/(=+)$/, '').toLowerCase();
}

const B32ToHex = (str) => {
    var bytes = base32.parse(str, {
        out: Buffer.alloc,
        loose: true
    });
    return bytes.toString('hex')
}

const addressify = (str) => {
    return convert(keccak256(str)).from('buf').to('b32')
}


const guid = () =>{
    return uuidv4()
}

const utils = {
    convert: (x) => {
        return {
            from: (orig) => {
                switch(orig){
                    case 'text': return {
                        to: (dest) => {
                            switch(dest){
                                case 'buf': return Buffer.from(x);
                                case 'hex': return Buffer.from(x).toString('hex');
                                case 'b32': return HexToB32(Buffer.from(x).toString('hex'));
                                case 'b64': return Buffer.from(x).toString('base64');
                                case 'text': return x;
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'hex': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return Buffer.from(x, 'hex').toString();
                                case 'buf': return Buffer.from(x, 'hex');
                                case 'b32': return HexToB32(x);
                                case 'b64': return Buffer.from('68656c6c6f20776f726c6421', 'hex').toString('base64');
                                case 'text': return x;
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'b64': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return Buffer.from(x, 'base64').toString();
                                case 'hex': return Buffer.from(x, 'base64').toString('hex');
                                case 'buf': return Buffer.from(x, 'base64');
                                case 'b32': return HexToB32(Buffer.from(x, 'base64').toString('hex'));
                                case 'b64': return x;
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'b32': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return Buffer.from(B32ToHex(x), 'hex').toString();
                                case 'hex': return B32ToHex(x);
                                case 'buf': return Buffer.from(B32ToHex(x), 'hex');
                                case 'b64': return Buffer.from(B32ToHex(x), 'hex').toString('base64');
                                case 'b32': return x;
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'buf': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return x.toString();
                                case 'hex': return x.toString('hex');
                                case 'b32': return HexToB32(x.toString('hex'));
                                case 'b64': return x.toString('base64');
                                case 'buf': return x;
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    default: throw 'unkown origin encoding base'
                };
            },
        }
    },
    guid: guid,
    addressify: addressify,
}

export default utils