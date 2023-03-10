const crypto = require("crypto");

function key_pair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicExponent: 0x10001,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
}

// function generate_key() {
//     let keys = key_pair();
//     let {privateKey,publicKey} = keys;
//     return {privateKey,publicKey};
// }
//
// function enc(plainText,publicKey) {
//     const buffer = Buffer.from(plainText,"base64");
//     const encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
//     return encrypted.toString('base64');
// }
//
// function dec(cipherText,privateKey) {
//     const decrypted = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, cipherText);
//     console.log('Decrypted:', decrypted.toString());
// }

function generate_key() {
    const keys = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    const { privateKey, publicKey } = keys;
    return { privateKey, publicKey };
}

function enc(plainText, publicKey) {
    const buffer = Buffer.from(plainText, 'utf-8');
    const encrypted = crypto.publicEncrypt(
        { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
        buffer
    );
    return encrypted.toString('base64');
}

function dec(cipherText, privateKey) {
    const buffer = Buffer.from(cipherText, 'base64');
    const decrypted = crypto.privateDecrypt(
        { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
        buffer
    );
    return decrypted.toString('utf-8');
}

module.exports = {generate_key,enc,dec}