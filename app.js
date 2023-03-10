var express = require("express")
var body_parser = require("body-parser");
var app = express();
var encryption = require('./encrypt_decrypt');

app.set('view engine','ejs');
app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(body_parser.json());
// var decryption_key = null;
app.get('/',(req,res)=>{
//     const crypto = require('crypto');
// //
// // // Generate a pair of keys
// //     const { server_privateKey, server_publicKey } = crypto.generateKeyPairSync('rsa', {
// //         modulusLength: 2048,
// //         publicExponent: 0x10001,
// //         publicKeyEncoding: {
// //             type: 'spki',
// //             format: 'pem'
// //         },
// //         privateKeyEncoding: {
// //             type: 'pkcs8',
// //             format: 'pem'
// //         }
// //     });
// //     const { client_privateKey, client_publicKey } = crypto.generateKeyPairSync('rsa', {
// //         modulusLength: 2048,
// //         publicExponent: 0x10001,
// //         publicKeyEncoding: {
// //             type: 'spki',
// //             format: 'pem'
// //         },
// //         privateKeyEncoding: {
// //             type: 'pkcs8',
// //             format: 'pem'
// //         }
// //     });
// //
//     let {privateKey,publicKey} = encryption.generate_key();
//     // console.log("Private Key = ",privateKey," Public Key = ",publicKey);
// // Encryption
//     const plaintext = 'This is the message to be encrypted';
//     // const buffer = Buffer.from(plaintext);
//     // const encrypted = crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
//     // console.log('Encrypted:', encrypted.toString('base64'));
//     let encrypted= encryption.enc(plaintext,publicKey);
// // Decryption
//     const decrypted = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, encrypted);
//     console.log('Decrypted:', decrypted.toString());
//
//     // res.render('demo2');
//
//     // console.log("Private Key = ",privateKey,"Public Key = ",publicKey);
//
//     res.send();

    const crypto = require('crypto');

    let { privateKey, publicKey } = encryption.generate_key();
    console.log('Private Key:', privateKey);
    console.log('Public Key:', publicKey);

    const plaintext = 'This is the message to be encrypted';
    console.log('Plaintext:', plaintext);

    const encrypted = encryption.enc(plaintext, publicKey);
    console.log('Encrypted:', encrypted);

    encryption.dec(encrypted, privateKey);

    res.render('final',{privateKey : privateKey,encrypted : encrypted});
});

app.post('/get_encypted_data',(req,res)=>{
    let data = req.params.enc_data;
    if(decryption_key === null) {
        res.sendStatus(401);
    } else {
        res.sendStatus(200);
    }
})

app.post("/key",(req,res)=>{
    console.log(req.body);
    if(req.params.key !== undefined) {
        decryption_key = req.params.key;
    } else {
        res.sendStatus(401);
    }
    decryption_key = req.params.key;
})

app.listen(3000,()=>{
    console.log("http://localhost:3000");
});