import test from '@loomat/testkit'
import utils from './index.js'

const GUID_LENGHT = 36

/// CASES
const text = 'hello world!'
const hex =  '68656c6c6f20776f726c6421'
const b64 =  'aGVsbG8gd29ybGQh'
const b32 =  'nbswy3dpeb3w64tmmqqq'
const buf = Buffer.from(text)

var cases = ([
    // GUID
    {
        name: 'guid generation',
        fn: () => utils.guid().length == GUID_LENGHT,
    },

    //CONVERSION
    {
        name: 'convert text to hex',
        fn: () => utils.convert(text).from('text').to('hex') == hex,
    },
    {
        name: 'convert text to b64',
        fn: () => utils.convert(text).from('text').to('b64') == b64,
    },
    {
        name: 'convert text to 32',
        fn: () => utils.convert(text).from('text').to('b32') == b32,
    },
    {
        name: 'convert text to buf',
        fn: () => Buffer.compare(buf, utils.convert(text).from('text').to('buf'))  == 0,
    },
    {
        name: 'convert hex to text',
        fn: () => utils.convert(hex).from('hex').to('text') == text,
    },
    {
        name: 'convert hex to b64',
        fn: () => utils.convert(hex).from('hex').to('b64') == b64,
    },
    {
        name: 'convert hex to 32',
        fn: () => utils.convert(hex).from('hex').to('b32') == b32,
    },
    {
        name: 'convert hex to buf',
        fn: () => Buffer.compare(buf, utils.convert(hex).from('hex').to('buf'))  == 0,
    },
    {
        name: 'convert b64 to text',
        fn: () => utils.convert(b64).from('b64').to('text') == text,
    },
    {
        name: 'convert b64 to hex',
        fn: () => utils.convert(b64).from('b64').to('hex') == hex,
    },
    {
        name: 'convert b64 to 32',
        fn: () => utils.convert(b64).from('b64').to('b32') == b32,
    },
    {
        name: 'convert b64 to buf',
        fn: () => Buffer.compare(buf, utils.convert(b64).from('b64').to('buf'))  == 0,
    },
    {
        name: 'convert b32 to text',
        fn: () => utils.convert(b32).from('b32').to('text') == text,
    },
    {
        name: 'convert b32 to hex',
        fn: () => utils.convert(b32).from('b32').to('hex') == hex,
    },
    {
        name: 'convert b32 to b64',
        fn: () => utils.convert(b32).from('b32').to('b64') == b64,
    },
    {
        name: 'convert b32 to buf',
        fn: () => Buffer.compare(buf, utils.convert(b32).from('b32').to('buf'))  == 0,
    },
    {
        name: 'convert buf to text',
        fn: () => utils.convert(buf).from('buf').to('text') == text,
    },
    {
        name: 'convert buf to hex',
        fn: () => utils.convert(buf).from('buf').to('hex') == hex,
    },
    {
        name: 'convert buf to b64',
        fn: () => utils.convert(buf).from('buf').to('b64') == b64,
    },
    {
        name: 'convert buf to b32',
        fn: () => utils.convert(buf).from('buf').to('b32') == b32,
    },


])

test(cases)