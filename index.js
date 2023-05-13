const keccak256 = require('keccak256')
const{ v4:uuidv4 } = require('uuid')
const { base32 } = require('rfc4648')

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
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'buf': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return x.toString();
                                case 'hex': return x.toString('hex');
                                case 'b32': return HexToB32(x);
                                case 'b64': return x.toString('base64');
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'b32': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return 0;
                                case 'hex': return 0;
                                case 'buf': return 0;
                                case 'b64': return 0;
                                default: throw 'unkown destination encoding base'
                            }
                        }
                    };

                    case 'b64': return {
                        to: (dest) => {
                            switch(dest){
                                case 'text': return 0;
                                case 'hex': return 0;
                                case 'buf': return 0;
                                case 'b32': return 0;
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

module.exports =  utils