require('./setting')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const { getAggregateVotesInPollMessage, downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@whiskeysockets/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');
const { addResponTesti, delResponTesti, isAlreadyResponTesti, sendResponTesti, updateResponTesti, getDataResponTesti } = require('./lib/respon-testi');
const { addResponProduk, delResponProduk, resetProdukAll, isAlreadyResponProduk, sendResponProduk, updateResponProduk, getDataResponProduk } = require('./lib/respon-produk');
// apinya
const fs = require("fs");
const chalk = require('chalk');
const axios = require("axios");
const speed = require("performance-now");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const { TelegraPh, UploadFileUgu } = require('./lib/Upload_Url');
const fetch = require('node-fetch');
const jimp = require('jimp')
const qs = require("qs");
const toMs = require('ms');
const ms = require('parse-ms');
const QRCode = require('qrcode');

// Database
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const antilink2 = JSON.parse(fs.readFileSync('./database/antilink2.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const db_respon_testi = JSON.parse(fs.readFileSync('./database/list-testi.json'));
const db_respon_produk = JSON.parse(fs.readFileSync('./database/list-produk.json'));
const { addSaldo, minSaldo, cekSaldo } = require("./lib/deposit");
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
const {payment, apikeyAtlantic } = require("./setting")
let depositPath = "./database/deposit/"
let topupPath = "./database/topup/"

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(NaF, msg, m, setting, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
global.prefa = ['','.']
const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${global.ownerNumber}`,"6285607806470@s.whatsapp.net","628816226737@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const mime = (quoted.msg || quoted).mimetype || ''
const isCommand = chats.startsWith(prefix);
const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? chats.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = NaF.user.id.split(':')[0] + '@s.whatsapp.net'
const toJSON = j => JSON.stringify(j, null,'\t')

// Group
const groupMetadata = isGroup ? await NaF.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isAntiLink2 = antilink.includes(from) ? true : false
const isWelcome = isGroup ? welcome.includes(from) : false

// Quoted
const quoted = m.quoted ? m.quoted : m
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = NaF.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = NaF.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
}
  
 



const reply = (teks) => {NaF.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await NaF.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
NaF.groupParticipantsUpdate(from, [sender], "remove")
}
}

//Antilink 2
if (isGroup && isAntiLink2 && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await NaF.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
}
}

// Response Addlist
if (isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
NaF.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
NaF.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {quoted: msg})
}
}
if (!isGroup && isAlreadyResponTesti(chats, db_respon_testi)) {
var get_data_respon = getDataResponTesti(chats, db_respon_testi)
NaF.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}
if (!isGroup && isAlreadyResponProduk(chats, db_respon_produk)) {
var get_data_respon = getDataResponProduk(chats, db_respon_produk)
NaF.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return NaF.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By ${global.ownerName}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.botName},;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: `${global.qris}` }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

if (chats === "payment_ovo") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "OVO",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (isListMessage === "payqris") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "QRIS",
data: {
iddepo: "",
qr: "",
amount_deposit: "",
nominal: "",
pajak: "",
exp: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (isListMessage === "paygopay") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "GOPAY",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "amount") {
if (isNaN(chats)) return reply("Masukan hanya angka ya")
data_deposit.data.amount_deposit = Number(chats)
if (data_deposit.data.amount_deposit < 2000) return reply(`Deposit Minimal Rp2000`)
if (data_deposit.data.amount_deposit > 5000000) return reply(`Nominal Deposit terlalu tinggi`)
data_deposit.session = "konfirmasi_deposit";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
if (data_deposit.payment === "QRIS") {
	let pajakny = await toJSON(0.01 * data_deposit.data.amount_deposit)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("reff_id", data_deposit.ID);
key.append("nominal", data_deposit.data.amount_deposit+Number(pajakny));
key.append("type", "ewallet")
key.append("metode", "qrisfast")
fetch("https://atlantich2h.com/deposit/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
	QRCode.toFile("./depoqris.jpg", res.data.qr_string, { margin: 2, scale: 10 })
if (!res.status) return reply(res.message)
data_deposit.result = res.status
data_deposit.data.iddepo = res.data.id
data_deposit.data.qr = "./depoqris.jpg"
data_deposit.data.pajak = res.data.nominal - data_deposit.data.amount_deposit
data_deposit.data.nominal = res.data.nominal
data_deposit.data.exp = res.data.expired_at
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
NaF.sendMessage(from, { text: `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID: ${data_deposit.ID}
▪ Number: ${data_deposit.number.split('@')[0]}
▪ Payment: ${data_deposit.payment}
▪ Jumlah Deposit: Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin: Rp${toRupiah(res.data.nominal - data_deposit.data.amount_deposit)}
▪ Total Pembayaran: Rp${toRupiah(res.data.nominal)}

_Ketik *lanjut* untuk melanjutkan_
_Ketik *batal* untuk membatalkan_` }, { quoted: msg })
})
} else {
NaF.sendMessage(from, {text: `「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID : ${data_deposit.ID}
▪ Nomer : ${data_deposit.number.split('@')[0]}
▪ Payment : ${data_deposit.payment}
▪ Jumlah Deposit : Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin : Rp0
▪ Total Pembayaran : Rp${toRupiah(data_deposit.data.amount_deposit)}

_Ketik Lanjut untuk melanjutkan_
_Ketik Batal untuk membatalkan_`}, { quoted: msg })
}
} else if (data_deposit.session === "konfirmasi_deposit") {
if (chats.toLowerCase() === "lanjut") {
 if (data_deposit.payment === "QRIS") {
var qr_fexf =`༆━━[ *PAYMENT QRIS* ]━━࿐

*▪ID:* ${data_deposit.ID}
*▪Nomer:* ${data_deposit.number.split("@")[0]}
*▪Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}
*▪Pajak Admin:* Rp${toRupiah(data_deposit.data.pajak)}
*▪Total Pembayaran:* Rp${toRupiah(data_deposit.data.nominal)}
*▪Expired:* ${data_deposit.data.exp}

_Silahkan scan QRIS diatas, ketik batal untuk membatalkan_`
NaF.sendMessage(from, { image: fs.readFileSync(data_deposit.data.qr), caption: qr_fexf }, { quoted: msg })
} else if (data_deposit.payment === "GOPAY") {
var py_dana =`༆━━[ *PAYMENT GOPAY* ]━━࿐
 
*Nomer :* ${payment.gopay.nomer}
*AN :* ${payment.gopay.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
reply(py_dana)
}} else if (chats.toLowerCase() === "batal") {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_deposit.data.iddepo);
fetch("https://atlantich2h.com/deposit/cancel", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
reply(`Baik kak, deposit dengan ID: ${data_deposit.ID} dibatalkan`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
})
}}}}


if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.payment === "QRIS") {
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_deposit.data.iddepo);
fetch("https://atlantich2h.com/deposit/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
console.log(res); // For Debugging
console.log(color("[DEPOSIT QRIS]", "green"), `-> ${sender}`) // For Debugging
if (res.status == false) {
	clearInterval(intervals);
} else if (res.data.status === "success") {
reply(`*DEPOSIT SUKSES*\n*Status:* success\n*ID:* ${data_deposit.ID}\n*Nomer:* ${data_deposit.number.split("@")[0]}\n*Jumlah Deposit:* Rp${toRupiah(data_deposit.data.amount_deposit)}\n*Pajak Admin:* Rp${toRupiah(data_deposit.data.pajak)}\n*Total Pembayaran:* Rp${toRupiah(data_deposit.data.nominal)}\n\n_Terimakasih kak sudah deposit._`)
addSaldo(sender, Number(data_deposit.data.amount_deposit), db_saldo)
fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === "expired") {
console.log(res)
reply(`Deposit anda telah *Expired*`)
fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (res.data.status === "cancel") {
if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return fs.unlinkSync(depositPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
}
})
}, 3000)
}
}

if (fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
	if (!msg.key.fromMe) {
let data_topup = JSON.parse(fs.readFileSync(topupPath + sender.split("@")[0] + ".json"))
if (data_topup.session === "target") {
if (isNaN(chats)) return reply("Hanya Masukan Nomor/Id Tidak boleh ada karakter lain")
data_topup.data.target = chats
data_topup.session = "konfirmasi_topup";
fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
NaF.sendMessage(from,
{text: `*TARGET:* ${data_topup.data.target}\nPastikan ID/Nomor yg anda masukan benar`,
buttonText: "Tekan Disini",
sections: [{title: "Pilih Lanjut/Batal",
rows: [
{title: "Lanjut", rowId: "lanjut", description: "Lanjut untuk Melanjutkan Transaksi"},
{title: "Batal", rowId: "batal", description: "Batal Untuk membatalkan Transaksi"}]}
]})
} else if (data_topup.session === "konfirmasi_topup") {
	if (isListMessage === "lanjut") {
	let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("code", data_topup.data.code)
key.append("reff_id", require("crypto").randomBytes(5).toString("hex").toUpperCase())
key.append("target", data_topup.data.target)
fetch("https://atlantich2h.com/transaksi/create", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
	if (!res.status) return reply('Server maintenance.')
	let persen = (untung / 100) * res.data.price
	data_topup.result = res.status
	data_topup.data.idtopup = res.data.id
	data_topup.data.id = res.data.reff_id
	data_topup.data.price = res.data.price + Number(Math.ceil(persen))
	data_topup.data.layanan =  res.data.layanan
	fs.writeFileSync(topupPath + sender.split("@")[0] + ".json", JSON.stringify(data_topup, null, 3));
	reply(`*「 ${res.message.toUpperCase()} 」*\n\n*PESAN:* _Tunggu sejenak, Bot sedang memproses pesanan anda✅_`)	
})
await sleep(5000)
var intervals = setInterval(function() {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("id", data_topup.data.idtopup)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/transaksi/status", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(responsep => responsep.json())
.then(resss => {
console.log(resss); // For Debugging
console.log(color("[TRANSAKSI]", "green"), `-> ${sender}`) // For Debugging
if (resss.status == false) {
	clearInterval(intervals);
	} else
if (resss.data.status === "success") {
	let persen = (untung / 100) * resss.data.price
reply(`*「  TOPUP SUKSES  」*\n*⌬ Status:* Suksess\n*⌬ ID Order:* ${resss.data.reff_id}\n*⌬ Layanan:* ${resss.data.layanan}\n*⌬ Nomor Tujuan:* ${resss.data.target}\n*⌬ Price:* Rp${toRupiah(Number(resss.data.price) + Number(Math.ceil(persen)))}\n\n*⌬ SN:*\n${resss.data.sn}\n\n_Terimakasih kak sudah order.️_`)
minSaldo(sender, (Number(resss.data.price) + Number(Math.ceil(persen))), db_saldo)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (resss.data.status === 'failed') {
console.log(resss)
reply(`❌Pesanan dibatalkan!\nAlasan : ${resss.data.message}`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} else if (resss.data.status === 'cansel') {
console.log(resss)
reply(`❌Pesanan dibatalkan!\nAlasan : ${resss.data.message}`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
clearInterval(intervals);
return;
} 
})
}, 3000)
	} else if (isListMessage === "batal") {
		reply(`Pesanan dibatalkan!`)
fs.unlinkSync(topupPath + sender.split("@")[0] + ".json")
	}}}}
	
	

// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
	case 'help': case 'menu':{
		let simbol = `${pickRandom(["⭔","⌬","〆","»"])}`
		if (isGroup) {
			let text = `👋 *Hai Kak ${pushname} ${ucapanWaktu}*

*Sebelumnya Saya Hanya Ingin Menggigatkan Bahwasanya Bot Ini Adalah Bot WhatsApp Khusus Topup Jadi Tolong Pergunakan Dengan Bijak Ya, Udah Dewasa Tau Kan kak Mana Yang Bener Mana Yang Salah*

☰ *Informasi Bot*
 
🤖 *Nama Bot :* ${global.botName}
🛍️ *Nama Store :* ${global.namaStore}
👤 *Nama Owner :* ${global.ownerName}
📅 *Tanggal&Waktu :* ${tanggal} & ${jam}


☰ *Iformasi Pengguna*
 
👤 *Nama User :* ${pushname}
🏦 *Saldo User:* Rp${toRupiah(cekSaldo(sender, db_saldo))}
🔴 *Status User :* -

*Untuk Melihat Menu Silahkan Gunakan Bot Secara Private Chat* ✨🌛
`
NaF.sendMessage(from, {text: text}, {quoted: msg})
} else {
var rows = [
{
title: "Daftar Harga",
rowId: "#pricelist",
description: "Menampilkan layanan Yang tersedia"
},
{
title: "Menu Bot",
rowId: "#menu2",
description: "Menampilkan Fitur bot WhatsApp"
},
{
title: "Owner",
rowId: "#hubown",
description: "Pemilik Bot ini"
}
]
var dep_but = {
text: `👋 *Hai Kak ${pushname} ${ucapanWaktu}*

*Sebelumnya Saya Hanya Ingin Menggigatkan Bahwasanya Bot Ini Adalah Bot WhatsApp Khusus Topup Jadi Tolong Pergunakan Dengan Bijak Ya, Udah Dewasa Tau Kan kak Mana Yang Bener Mana Yang Salah*

☰ *Informasi Bot*
 
🤖 *Nama Bot :* ${global.botName}
🛍️ *Nama Store :* ${global.namaStore}
👤 *Nama Owner :* ${global.ownerName}
📅 *Tanggal&Waktu :* ${tanggal} & ${jam}


☰ *Iformasi Pengguna*
 
👤 *Nama User :* ${pushname}
🏦 *Saldo User:* Rp${toRupiah(cekSaldo(sender, db_saldo))}
🔴 *Status User :* -
`,
buttonText: "Pilih disini",
sections: [ { title: "Pilih sesuai kebutuhan Mu", rows } ]
}
NaF.sendMessage(from, dep_but, {quoted: msg})
}
}
break
	case 'menu2': case 'allmenu': {
		const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${global.ownerName}`
let simbol = '⨠'
	let menu = `👋 *Hai Kak ${pushname} ${ucapanWaktu}*

*Sebelumnya Saya Hanya Ingin Menggigatkan Bahwasanya Bot Ini Adalah Bot WhatsApp Khusus Topup Jadi Tolong Pergunakan Dengan Bijak Ya, Udah Dewasa Tau Kan kak Mana Yang Bener Mana Yang Salah*

☰ *Informasi Bot*
 
🤖 *Nama Bot :* ${global.botName}
🛍️ *Nama Store :* ${global.namaStore}
👤 *Nama Owner :* ${global.ownerName}
📅 *Tanggal&Waktu :* ${tanggal} & ${jam}


☰ *Iformasi Pengguna*
 
👤 *Nama User :* ${pushname}
🏦 *Saldo User:* Rp${toRupiah(cekSaldo(sender, db_saldo))}
🔴 *Status User :* -

❏ *Awal Menu*
${simbol} *dev*
${simbol} *owner*

❏ *Pushkontak Menu*
${simbol} *cekidgc*
${simbol} *pushkontakv1*
${simbol} *pushkontakv2*
${simbol} *pushkontakv3*
${simbol} *pushkontakv4*
${simbol} *savekontak*
${simbol} *savekontak2*
${simbol} *sharemember*
${simbol} *cekmember*
${simbol} *sendkontak*

❏ *Share Menu*
${simbol} *post*
${simbol} *jpm*
${simbol} *jasher*

❏ *Fm Menu*
${simbol} *win list|perkalian|fee
${simbol} *win2 perkalian|fee*
${simbol} *win3 fee*
${simbol} *reffall fee*
*Untuk fee isi biaya admin berapa % di fm (tanpa simbol %)*
*Untuk perkalian isi win dikali berapa*
*misalnya: .win list|perkalian|fee*
*contoh: .win list|2|10*
*misalnya: .reffall fee*
*contoh: .reffall 5*

❏ *Topup Menu*
${simbol} *Pricelist*  
${simbol} *Saldo* (Saldo User)
${simbol} *Deposit*
${simbol} *Depo*
${simbol} *Bukti* (bukti deposit)
${simbol} *Tambah*
${simbol} *kali*
${simbol} *bagi*
${simbol} *kurang*

❏ *Main Menu*
${simbol} *Deposit*
${simbol} *Bukti*
${simbol} *Produk*
${simbol} *listproduk*
${simbol} *Donasi*
${simbol} *Pembayaran*
${simbol} *Bayar*
${simbol} *Script*
${simbol} *S*
${simbol} *Sticker*

❏ *Group Menu*
${simbol} *Hidetag*
${simbol} *Welcome (on/off)*
${simbol} *Group open*
${simbol} *Group close* 
${simbol} *Antilink (kick)*
${simbol} *Antilink2 (no kick)*
${simbol} *Kick*
${simbol} *Proses*
${simbol} *Done*
${simbol} *Linkgc*
${simbol} *Tagall*
${simbol} *Revoke*
${simbol} *Delete*
${simbol} *Addlist* (Support image)
${simbol} *Dellist*
${simbol} *List*
${simbol} *Shop*
${simbol} *Hapuslist*

❏ *Owner Menu*
${simbol} *ceksaldo*
${simbol} *getprofil*
${simbol} *addsaldo*
${simbol} *minsaldo*
${simbol} *addtesti*
${simbol} *deltesti*
${simbol} *addproduk*
${simbol} *delproduk*
${simbol} *join*
${simbol} *sendbyr* 62xxx
${simbol} *block* 62xxx 
${simbol} *unblock* 62xxx
${simbol} *addsaldo* (+ saldo user)
${simbol} *minsaldo* (- saldo user)
${simbol} *cekip* (ip provider)
${simbol} *ceksaldo* (saldo di website)
${simbol} *getprofil* (cek profil)
${simbol} *setprofit* (Set Keuntungan)
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: menu, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
}
break
case 'sticker': case 's': case 'stiker':{
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./gambar/${tanggal}.jpg`)
reply(mess.wait)
NaF.sendImageAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else if (isVideo || isQuotedVideo) {
let media = await downloadAndSaveMediaMessage('video', `./sticker/${tanggal}.mp4`)
reply(mess.wait)
NaF.sendVideoAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else {
reply(`Kirim/reply gambar/vidio dengan caption *${prefix+command}*`)
}
}
break
case 'owner':{
var owner_Nya = `${global.ownerNumber}`
sendContact(from, owner_Nya, `${global.ownerName}`, msg)
reply('*Itu kak nomor owner ku, Chat aja gk usah malu😆*')
}
break
case 'hubown':
reply(`Hallo kak✨\nJikalau ada bug maupun masalah bisa lapor ke owner ya kak, kaka juga bisa berkenalan dengan owner saya😊\n(wa.me/${global.kontakOwner})`)
break
case 'dev': case 'developer':
reply(`Hallo kak✨\nPemilik Bot Dan Script Ini Adalah😊\nwa.me/6285607806470 (Ryu)\nnwa.me/628816226737 (Nabzx)`)
break
case 'yt':
case 'youtube':
	NaF.sendMessage(from, 
{text: `Jangan Lupa Subscriber yah kak😉🙏
*Link* : ${global.linkyt}`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	NaF.sendMessage(from, {text: `Admin Kurang ngurus ig uyy Jadi subscribe aja YouTube admin\n\nLink \n${global.linkig}`},
{quoted: msg})
break
case 'gc':
case 'groupadmin':
	NaF.sendMessage(from, 
{text: `*Group  ${global.ownerName}*\n
Group1 : ${global.linkgc1}
Group2 : ${global.linkgc2}`},
{quoted: msg})
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Saweria :* ${global.sawer}
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
}
break
case 'sendbyr':{
	if (!isOwner) return reply(mess.OnlyOwner)
	if (!q) return reply('*Contoh:*\n.add 628xxx')
	var number = q.replace(/[^0-9]/gi, '')+'@s.whatsapp.net'
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

_Pembayaran ini Telah di kirim oleh Admin_
_Melalui bot ini🙏_


OK, thanks udah order di *${global.namaStore}*
`
NaF.sendMessage(number, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
reply (`Suksess Owner ku tercinta 😘🙏`)
}
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await NaF.groupAcceptInvite(ini_urrrl).then((res) => reply(`Berhasil Join ke grup...`)).catch((err) => reply(`Eror.. Mungkin bot telah di kick Dari grup tersebut`))
}
break
case 'payment':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

OK, thanks udah order di *${global.botName}*
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
}
break
case 'proses':{
let tek = (`「 *TRANSAKSI PENDING* 」\n\n\`\`\`🎀 PRODUK : ${q}\n📆 TANGGAL : ${tanggal}\n⌚ JAM  : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya??*\n*Atau Chat : Wa.me//${global.kontakOwner}*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
NaF.sendMessage(from,
{text: tek})
NaF.sendMessage(`${global.ownerNumber}`, {text: `*👋HALLO OWNER KU, ADA YANG ORDER PRODUK ${q} NIH*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
case 'done':{
let tek = (`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM  : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *${global.namaStore}*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE THENKS👍' }, type: 1 },
]
NaF.sendMessage(from,
{text: tek})
}
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
NaF.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?\nContoh #tagall hallo`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
NaF.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
NaF.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
NaF.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await NaF.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await NaF.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'antilink2':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink2) return reply('Antilink 2 sudah aktif')
antilink2.push(from)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Activate Antilink 2 In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink2) return reply('Antilink 2 belum aktif')
let anu = antilink2.indexOf(from)
antilink2.splice(anu, 1)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Disabling Antilink 2 In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
NaF.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
NaF.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
NaF.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
NaF.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'welcome':{
if (!isGroup) return reply('Khusus Group!') 
if (!msg.key.fromMe && !isOwner && !isGroupAdmins) return reply("Mau ngapain?, Fitur ini khusus admin")
if (!args[0]) return reply('*Kirim Format*\n\n.welcome on\n.welcome off')
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcome.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
var posi = welcome.indexOf(from)
welcome.splice(posi, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
case 'shop':
case 'list':
  if (!isGroup) {
 return reply(mess.OnlyGrup);
  }
  if (db_respon_list.length === 0) {
 return reply(`Belum ada list message di database`);
  }
  if (!isAlreadyResponListGroup(from, db_respon_list)) {
 return reply(`Belum ada list message yang terdaftar di group ini`);
  }
  var arr_rows = [];
  for (let x of db_respon_list) {
 if (x.id === from) {
arr_rows.push({
  title: x.key,
  rowId: x.key
});
 }
  }
  let tekny = `Hai @${sender.split("@")[0]}\nBerikut list item yang tersedia di group ini!\n\nSilahkan ketik nama produk yang diinginkan!\n\n`;
  for (let i of arr_rows) {
 tekny += `Produk : ${i.title}\n\n`;
  }
  var listMsg = {
 text: tekny,
  };
  NaF.sendMessage(from, listMsg);
  break;
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa\n\nAtau kalian bisa Reply/Kasih Image dengan caption: #${command} tes@apa`)
if (isImage || isQuotedImage) {
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender.split('@')[0]}.jpg`)
let url = await TelegraPh(media)
addResponList(from, args1, args2, true, url, db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
	addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
}
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
let tekny = `Hai @${sender.split("@")[0]}\nSilahkan Hapus list dengan Mengetik #hapuslist Nama list\n\nContoh: #hapuslist Tes\n\n`;
  for (let i of arr_rows) {
 tekny += `List : ${i.title}\n\n`;
  }
var listMsg = {
 text: tekny,
  };
NaF.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'testi':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list testi\n\n`
for (let x of db_respon_testi) {
teks += `*LIST TESTI:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Testi yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
NaF.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addtesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} testi1@testimoni sc bot`)
if (isAlreadyResponTesti(args1, db_respon_testi)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponTesti(args1, args2, true, tphurl, db_respon_testi)
reply(`Berhasil menambah List testi *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'deltesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} testi1`)
if (!isAlreadyResponTesti(q, db_respon_testi)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponTesti(q, db_respon_testi)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'listproduk': case 'produk':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list produk\n\n`
for (let x of db_respon_produk) {
teks += `*LIST PRODUK:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Produk yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
NaF.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} diamond_ml@list mu`)
if (isAlreadyResponProduk(args1, db_respon_produk)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponProduk(args1, args2, true, tphurl, db_respon_produk)
reply(`Berhasil menambah List Produk *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'delproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} diamond_ml`)
if (!isAlreadyResponProduk(q, db_respon_produk)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponProduk(q, db_respon_produk)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'deposit': case 'depo':{
	if (isGroup) return reply(mess.OnlyPM)
var rows = [
{
title: "QRIS (Recommend)",
rowId: "payqris",
description: "Sistem: Otomatis"
},
{
title: "GOPAY (Not Recommend)",
rowId: "paygopay",
description: "Sistem: manual"
}
]
var dep_but = {
text: `ingin melakukan deposit saldo? silahkan pilih payment yang tersedia☺`,
buttonText: "Pilih disini",
sections: [ { title: "PAYMENT DEPOSIT", rows } ]
}
NaF.sendMessage(from, dep_but)
}
break
case 'bukti':
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return reply(`Maaf *@${sender.split('@')[0]}* sepertinya kamu belum pernah melakukan deposit`)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await NaF.downloadAndSaveMediaMessage(msg, "image", `./database/deposit/${sender.split('@')[0]}.jpg`)

let oke_bang = fs.readFileSync(`./database/deposit/${sender.split('@')[0]}.jpg`)
let data_depo = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))

let caption_bukti =`「 *DEPOSIT USER* 」
⭔ID: ${data_depo.ID}
⭔Nomer: @${data_depo.number.split('@')[0]}
⭔Payment: ${data_depo.payment}
⭔Tanggal: ${data_depo.date.split(' ')[0]}
⭔Jumlah Deposit: Rp${toRupiah(data_depo.data.amount_deposit)}
⭔Pajak Admin : Rp0
⭔Total Pembayaran : Rp${toRupiah(data_depo.data.amount_deposit)}

Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi

Jika sudah masuk konfirmasi dengan cara klik *#accdepo*
Jika belum masuk batalkan dengan cara ketik *#rejectdepo*`

let bukti_bayar = {
image: oke_bang,
caption: caption_bukti,
mentions: [data_depo.number],
title: 'Bukti pembayaran',
footer: 'Press The Button Below',
headerType: 5 
}
NaF.sendMessage(`${global.ownerNumber}`, bukti_bayar)
reply(`Mohon tunggu ya kak, sampai di Konfirmasi oleh owner ☺`)
fs.unlinkSync(`./database/deposit/${sender.split('@')[0]}.jpg`)
break
case 'accdepo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh: ${prefix+command} 628xxx`)
let orang = q.split(",")[0].replace(/[^0-9]/g, '')
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
addSaldo(data_deposit.number, Number(data_deposit.data.amount_deposit), db_saldo)
var text_sukses = `「 *DEPOSIT SUKSES* 」
⭔ID : ${data_deposit.ID}
⭔Nomer: @${data_deposit.number.split('@')[0]}
⭔Nomer: ${data_deposit.number.split('@')[0]}
⭔Payment: ${data_deposit.payment}
⭔Tanggal: ${data_deposit.date.split(' ')[0]}
⭔Jumlah Deposit: Rp${toRupiah(data_deposit.data.amount_deposit)}`
reply(`${text_sukses}\n`)
NaF.sendMessage(data_deposit.number, { text: `${text_sukses}\n\n_Deposit kamu telah dikonfirmasi oleh admin, silahkan cek saldo dengan cara ketik #saldo_`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break
case 'rejectdepo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh: ${prefix+command} 628xxx`)
let orang = q.split(",")[0].replace(/[^0-9]/g, '')
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
reply(`Sukses Reject  Deposit `)
NaF.sendMessage(data_deposit.number, { text: `Maaf Deposit Dengan ID : *${data_deposit.ID}* Ditolak, Jika ada kendala hubungin Owner Bot.\nwa.me/${global.ownerNumber}`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break

case 'saldo':{
reply(`*━━ CHECK YOUR INFO ━━* 

 _• *Name:* ${pushname}_
 _• *Nomer:* ${sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_

*Note :*
_Saldo hanya bisa untuk topup_
_Tidak bisa ditarik atau transfer_!`)
}
break
case 'addsaldo':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[0]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[1]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
addSaldo(q.split("|")[0]+"@s.whatsapp.net", Number(q.split("|")[1]), db_saldo)
await sleep(50)
NaF.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
NaF.sendTextMentions(q.split("|")[0]+"@s.whatsapp.net", `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
break
case 'minsaldo':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[0]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[1]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) == 0) return reply("Dia belum terdaftar di database saldo.")
if (cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) < q.split("|")[1] && cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) !== 0) return reply(`Dia saldonya ${cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo)}, jadi jangan melebihi ${cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo)} yah kak??`)
minSaldo(q.split("|")[0]+"@s.whatsapp.net", Number(q.split("|")[1]), db_saldo)
await sleep(50)
NaF.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
break
case 'topup':{
if (cekSaldo(sender, db_saldo) < 1) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan topup.`)
if (!q) return reply(`Ingin Topup? silahkan ketik #cekharga`)
if (!fs.existsSync(topupPath + sender.split("@")[0] + ".json")) {
let cekhar = new URLSearchParams()
cekhar.append("api_key", apikeyAtlantic)
cekhar.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: cekhar,
redirect: 'follow'
})
.then(responsee => responsee.json())
.then(ress => {
let listproduk
for (let x of ress.data) {
if (x.code == q.split(",")[0]) {
listproduk = x ? x : false
}
}
if (!listproduk) return reply(`_Code produk *${q.split(",")[0]}* Tidak sesuai_`)
let kntungan = (untung / 100) * listproduk.price.replace(/[^0-9]/g, '')
if (cekSaldo(sender, db_saldo) < Number(listproduk.price.replace(/[^0-9]/g, '')) + Number(Math.ceil(kntungan))) return reply(`Maaf *${pushname},*\n🍁saldo anda kurang dari Rp${toRupiah(Number(listproduk.price.replace(/[^0-9]/g, '')) + Number(Math.ceil(kntungan)))}, Silahkan Ketik #deposit Untuk melakukan deposit`)
var object_buy = {
	session: "target",
number: sender,
result: "",
data: {
target: "",
code: q,
idtopup: "",
id: "",
price: "",
layanan: ""
}
}
fs.writeFile(topupPath + sender.split("@")[0] + ".json", JSON.stringify(object_buy, null, 3), () => {
	reply(`_Masukan Id/nomor Target_\n\nNOTE: [Untuk layanan Mobile legends, id & zone digabung tanpa ada karakter lain.\ncontoh yg salah: 733383273(8294)❌\ncontoh yg benar: 7333832738294]✅`)
})

})
} else {
reply(`Kamu sedang melakukan topup, mohong tunggu sampai proses topup selesai.`)
}
}
break

case 'pricelist':{
	if (isGroup) return reply(mess.OnlyPM)
const sections = [
{title: "🍿 Kategori Layanan Terpopuler",
rows: [
{title: "Jasa Pasang Bot WA", rowId: prefix+"jasapasang", description: "list harga Jasa Pasang Murah"},
{title: "Panel Ptrodactyl", rowId: prefix+"buypanel", description: "list Harga Panel Ptrodactyl"},
{title: "Free fire", rowId: prefix+"ff", description: "list harga Topup FF Murah"},
{title: "Dana", rowId: prefix+"dana", description: "list produk Saldo Dana"},
]},
{title: "🎮 Topup Game",
rows: [
{title: "Free fire", rowId: prefix+"ff", description: "list harga Topup FF Murah"},
{title: "Pubg Mobile", rowId: prefix+"pubg", description: "list harga Topup Pubg Mobile"},
{title: "Mobile legends", rowId: prefix+"ml", description: "list harga Topup ML Murah"},
{title: "Call of Duty MOBILE", rowId: prefix+"cod", description: "list harga Topup COD Murah"},
{title: "Arena Of Valor", rowId: prefix+"aov", description: "list harga Topup AOV Murah"},
{title: "Genshin Impact", rowId: prefix+"Genshin", description: "list harga Topup Genshin Murah"},
{title: "Stumble Guys", rowId: prefix+"stumble", description: "list harga Topup Stumble Murah"},
{title: "Point blank", rowId: prefix+"pb", description: "list harga Topup PB Murah"},
{title: "Arena Breakout", rowId: prefix+"ab", description: "list harga Topup AB Murah"},
{title: "8 Ball Pool", rowId: prefix+"8bp", description: "list harga Topup 8BP Murah"},
{title: "Ace Racer", rowId: prefix+"ar", description: "list harga Topup Ace Racer Murah"},
]},
{title: "⚡ Kebutuhan Hosting WA",
rows: [
{title: "Jasa Pasang Bot WhatsApp", rowId: prefix+"jasapasang", description: "list harga Jasa Pasang Murah"},
{title: "Panel Ptrodactyl", rowId: prefix+"buypanel", description: "list Harga Panel Ptrodactyl"},
{title: "Script Bot WA", rowId: prefix+"buysc", description: "list Harga Script Bot WA"},
{title: "Jasa Tambah Fitur Bot WA", rowId: prefix+"jasatambahfitur", description: "list Harga Jasa Tambah Fitur Bot WA"},
]},
{title: "🏦 Topup E-Wallet",
rows: [
{title: "Google Play", rowId: prefix+"gp", description: "list produk Saldo Google Play"},
{title: "Dana", rowId: prefix+"dana", description: "list produk Saldo Dana"},
{title: "Gopay", rowId: prefix+"gopay", description: "list harga Saldo Gopay"},
{title: "Ovo", rowId: prefix+"ovo", description: "list harga Saldo Ovo"},
{title: "Shopeepay", rowId: prefix+"shopeepay", description: "list harga Saldo Shopeepay"},
{title: "LinkAja", rowId: prefix+"linkaja", description: "list harga Saldo LinkAja"},
{title: "Voucher Alfamart", rowId: prefix+"alfa", description: "list harga Voucher Alfamart"},
]},
{title: "🌐 Isi Ulang Kuota Internet",
rows: [
{title: "Smartfren", rowId: prefix+"Smartfren", description: "list produk Kuota Smartfren"},
{title: "Telkomsel", rowId: prefix+"Telkomsel", description: "list produk Kouta Telkomsel"},
{title: "Indosat", rowId: prefix+"Indosat", description: "list produk Kouta Indosat"},
{title: "Axis", rowId: prefix+"Axis", description: "list produk Kouta Axis"},
{title: "Three", rowId: prefix+"Three", description: "list produk Kouta Three"},
]},
{title: "📞 Isi Ulang Pulsa",
rows: [
{title: "Smartfren", rowId: prefix+"pul_martfren", description: "list produk Pulsa Smartfren"},
{title: "Telkomsel", rowId: prefix+"pul_telkomsel", description: "list produk Pulsa Telkomsel"},
{title: "Indosat", rowId: prefix+"pul_indosat", description: "list produk Pulsa Indosat"},
{title: "Axis", rowId: prefix+"pul_axis", description: "list produk Pulsa Axis"},
{title: "Three", rowId: prefix+"pul_three", description: "list produk Pulsa Three"},
]},
{title: "🎮 Langganan Aplikasi",
rows: [
{title: "Alight Motion Premium", rowId: prefix+"alightmotion", description: "list harga Am Premium Murah"},
{title: "Netflix Premium", rowId: prefix+"netflix", description: "list harga Netflix Premium"},
{title: "Prime Video Premium", rowId: prefix+"primevideo", description: "list harga Prime Video Premium"},
{title: "Canva Pro", rowId: prefix+"canvapro", description: "list harga Canva Pro"},
{title: "Disney Premium", rowId: prefix+"disneyprem", description: "list harga Disney Premium"},
{title: "Voucher Iqiyi Premium", rowId: prefix+"iqiyiprem", description: "list harga Voucher Iqiyi Premium"},
{title: "Vidio Premium", rowId: prefix+"vidioprem", description: "list harga Vidio Premium"},
]},
{title: "🏠 Token Listrik Rumah",
rows: [
{title: "PLN", rowId: prefix+"pln", description: "list produk Token Pln"},
]}
]
let isian = `List Layanan Produk Yang Tersedia, Isi Saldo bisa ketik #deposit`
const listMessage = {
text: isian,
buttonText: 'Tekan Disini',
sections
}
NaF.sendMessage(from, listMessage)
}
break
case 'setprofit':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Gunakan dengan kata command: ${prefix+command} 20%\n\n_Text 20% bisa kalian ganti dengan seberapa besar Keuntungan Yg Akan anda Peroleh_`)
if (q.replace(/[^0-9]/g, '') < 1) return reply('Minimal 1%')
if (q.replace(/[^0-9]/g, '') > 99) return reply('Maksimal 99%')
untung = q.replace(/[^0-9]/g, '')
await reply(`Profit Anda telah distel menjadi ${q.replace(/[^0-9]/g, '')}%`)
}
break
case 'buysc':{
	if (isGroup) return reply(mess.OnlyPM)
const sections = [
 {title: "🛍️ Produk Script Populer",
rows: [
{title: "Script Bug Biasa", rowId: prefix+"scbugbiasa", description: "Harga Rp30.000 | Status ✅"},
{title: "Script Bug VIP", rowId: prefix+"scbugvip", description: "Harga Rp50.000 | Status ✅"},
{title: "Script Cpanel", rowId: prefix+"sccpanel", description: "Harga Rp20.000 | Status ✅"},
]},
{title: "📒 Daftar Harga Script",
rows: [
{title: "Sc Topup Game Otomatis", rowId: prefix+"sctopup", description: "Harga Rp30.000 | Status ✅"},
{title: "Sc Jaga Grup", rowId: prefix+"scmd", description: "Harga Rp15.000 | Status ✅"},
{title: "Sc Ddos Website", rowId: prefix+"scddos", description: "Harga Rp30.000 | Status ✅"},
{title: "Sc Encrypt Dan Decrypt Otomatis", rowId: prefix+"scencdec", description: "Harga Rp45.000 | Status ✅"},
{title: "Sc Lock Otp WA", rowId: prefix+"sctempor", description: "Harga Rp10.000 | Status ✅"},
]}
]
let isian = `List Layanan Produk Yang Tersedia, Isi Saldo bisa ketik #deposit\n\nScript yang saya jual semuanya script premium bukan script gratisan`
const listMessage = {
text: isian,
buttonText: 'Tekan Disini',
sections
}
NaF.sendMessage(from, listMessage)
}
break
case "scbugbiasa": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 30000, db_saldo);
break;
}
case "scbugvip": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 50000, db_saldo);
break;
}
case "sccpanel": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 20000, db_saldo);
break;
}
case "sctopup": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 30000, db_saldo);
break;
}
case "scmd": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 15000, db_saldo);
break;
}
case "scddos": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 30000, db_saldo);
break;
}
case "scencdec": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 45000, db_saldo);
break;
}
case "sctempor": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Tunggu Agar Owner Mengirim Script Nya

Silahkan Chat Owner Jika Script Belum Dikirim +6285607806470
*Hanya Ketika Diatas 30 Menit, Dan Jangan Spam*

Melanggar Ketentuan Diatas Maka Script Tidak Akan Saya Kirim Dan Saya Anggap Done`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
NaF.sendMessage('6285607806470@s.whatsapp.net', { 
text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

// Mengurangi saldo pengguna
minSaldo(sender, 10000, db_saldo);
break;
}
case 'buypanel':{
	if (isGroup) return reply(mess.OnlyPM)
const sections = [
 {title: "🛍️ Produk Populer",
rows: [
{title: "Beli Admin Panel", rowId: prefix+"addadmin", description: "Harga Rp20.000 | Status ✅"},
{title: "Beli Reseller Panel", rowId: prefix+"resellerpanel", description: "Harga Rp15.000 | Status ✅"},
]},
{title: "📒 Daftar Harga Panel",
rows: [
{title: "Paket 1GB / Cpu 30%", rowId: prefix+"1gb", description: "Harga Rp2.000 | Status ✅"},
{title: "Paket 2GB / Cpu 30%", rowId: prefix+"2gb", description: "Harga Rp3.000 | Status ✅"},
{title: "Paket 3GB / Cpu 75%", rowId: prefix+"3gb", description: "Harga Rp4.000 | Status ✅"},
{title: "Paket 4GB / Cpu 100%", rowId: prefix+"4gb", description: "Harga Rp5.000 | Status ✅"},
{title: "Paket 5GB / Cpu 130%", rowId: prefix+"5gb", description: "Harga Rp6.000 | Status ✅"},
{title: "Paket 6GB / Cpu 150%", rowId: prefix+"6gb", description: "Harga Rp7.000 | Status ✅"},
{title: "Paket 7GB / Cpu 175%", rowId: prefix+"7gb", description: "Harga Rp8.000 | Status ✅"},
{title: "Paket 8GB / Cpu 200%", rowId: prefix+"8gb", description: "Harga Rp9.000 | Status ✅"},
{title: "Paket 9GB / Cpu 230%", rowId: prefix+"9gb", description: "Harga Rp10.000 | Status ✅"},
{title: "Paket 10GB / Cpu 250%", rowId: prefix+"10gb", description: "Harga Rp11.000 | Status ✅"},
{title: "Paket Unli / Cpu Unli", rowId: prefix+"unli", description: "Harga Rp12.000 | Status ✅"},
]}
]
let isian = `List Layanan Produk Yang Tersedia, Isi Saldo bisa ketik #deposit\n\nSilahkan mengganti nama Whatsapp anda karena username diambil dari nama Whatsapp anda`
const listMessage = {
text: isian,
buttonText: 'Tekan Disini',
sections
}
NaF.sendMessage(from, listMessage)
}
break

case 'resellerpanel':{
if (cekSaldo(sender,db_saldo) < 15000) return NaF.sendMessage(from, { text: `Maaf *${pushname}*, sepertinya saldo kamu kurang dari Rp15.000 Silahkan melakukan deposit terlebih dahulu sebelum ${command}`, mentions: [sender]}, { quoted: m })
let tek = (`「 *DETAIL PEMBELIAN RESELLER* 」\n\n\`\`\`🎀 PRODUK : ${q}\n📆 TANGGAL : ${tanggal}\n⌚ JAM  : ${jam}\n✨ STATUS  : ✅\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya??*\n*Atau Chat : Wa.me//${global.kontakOwner}*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
NaF.sendMessage(from,
{text: tek})
NaF.sendMessage(`${global.ownerNumber}`, {text: `*👋HALLO OWNER KU, ADA YANG ORDER PRODUK RESELLER PANEL NIH*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
  
case 'ml':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP ML*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "MOBILE LEGENDS" && i.category !== "Membership") {
	let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List diamond Mobile Legends",
buttonText: "tekan disini",
sections: [
{
title: "Diamond Mobile Legends",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'ff':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP FF*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "FREE FIRE") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'pubg':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP PUBG*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "PUBG MOBILE" && i.category !== "Voucher") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'cod':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP COD*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Call of Duty MOBILE") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'aov':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP AOV*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "ARENA OF VALOR") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'stumble':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP STUMBLE*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Stumble Guys") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'genshin':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP GENSHIN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Genshin Impact") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'pb':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP PB*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "POINT BLANK") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'ab':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP ARENA BREAKOUT*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Arena Breakout") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case '8bp':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP 8BP*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "8 Ball Pool") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'ar':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOPUP ACE RACER*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Ace Racer") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break
case 'pln':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA TOKEN PLN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "PLN") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'gp':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO GOOGLE PLAY*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "GOOGLE PLAY INDONESIA") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'dana':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO DANA*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "DANA") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'alightmotion':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA ALIGHT MOTION*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Alight Motion") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'netflix':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA NETFLIX*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Netflix") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'primevideo':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PRIME VIDEO*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Prime Video") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'canvapro':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA CANVA PRO*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "canva") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'disneyprem':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA DISNEY PREMIUM*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Disney") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'iqiyiprem':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA VOUCHER IQIYI PREMIUM*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Iqiyi") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'vidioprem':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA VIDIO PREMIUM*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "Vidio") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'gopay':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO GOPAY*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "GO PAY") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'ovo':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO OVO*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "OVO") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'shopeepay':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO SHOPEEPAY*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "SHOPEE PAY") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'linkaja': {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA SALDO LINKAJA*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "LinkAja") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'alfa': {
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA VOUCHER ALFAMART*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "ALFAMART VOUCHER") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'smartfren':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA SMARTFREN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "SMARTFREN" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'telkomsel':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA TELKOMSEL*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "TELKOMSEL" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'axis':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA AXIS*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "AXIS" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'indosat':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA INDOSAT*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "INDOSAT" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'three':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA KUOTA THREE*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "TRI" && i.type !== "Pulsa Transfer" && i.category !== "Pulsa Reguler" && i.type !== "Voucher") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'pul_smartfren':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA SMARTFREN*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "SMARTFREN" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'pul_telkomsel':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA TELKOMSEL*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "TELKOMSEL" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'pul_axis':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA AXIS*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "AXIS" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'pul_indosat':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA INDOSAT*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "INDOSAT" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'pul_three':{
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
key.append("type", "prabayar")
fetch("https://atlantich2h.com/layanan/price_list", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) {
reply('Server maintenance.')
NaF.sendMessage(`${global.ownerNumber}`, { text: 'Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider' })
} else {
var regeXcomp = (a, b) => {
var aPrice = Number(a.price.replace(/[^0-9.-]+/g,""));
var bPrice = Number(b.price.replace(/[^0-9.-]+/g,""));
return aPrice - bPrice
};
let teks = `*LIST HARGA PULSA THREE*\n\nIngin melakukan topup? ketik *${prefix}topup*\n\n`
res.data.sort(regeXcomp)
let listny = [];
for (let i of res.data) {
if (i.provider == "THREE" && i.category == "Pulsa Reguler") {
let prof = (untung / 100) * i.price
listny.push({
title: `${i.name}`,
rowId: `#topup ${i.code}`,
description: `Harga: Rp${toRupiah(Number(i.price)  + Number(Math.ceil(prof)))} | Status ${i.status == "available" ? "✅" : "❎"}`
})
}
}
var listMessage = {
text: "Berikut List Yg Kami sediakan\nIsi saldo? bisa ketik #deposit. Selamat berbelanja 🛍️",
buttonText: "tekan disini",
sections: [
{
title: "Pilih list yang tersedia",
rows: listny
}]}
NaF.sendMessage(from, listMessage)
}
})
}
break

case 'getprofil':
case 'ceksaldo':{
if (!isOwner) return reply(mess.OnlyOwner)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
fetch("https://atlantich2h.com/get_profile", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) return reply('Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider')
reply(`*ATLANTIC PEDIA PROFILE*\n*Name:* ${res.data.name}\n*Username:* ${res.data.username}\n*Email:* ${res.data.email}\n*Sisa Saldo:* Rp${toRupiah(res.data.balance)}`)
})
}
break

case "1gb": {
 if (cekSaldo(sender,db_saldo) < 2000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "1GB"
let egg = global.eggsnya
let loc = global.location
let memo = "1048"
let cpu = "30"
let disk = "0"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg" 
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain} 

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 2000, db_saldo)
break
  

case "2gb": {
 if (cekSaldo(sender,db_saldo) < 3000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "2GB"
let egg = global.eggsnya
let loc = global.location
let memo = "2048"
let cpu = "50"
let disk = "0"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 3000, db_saldo)
break
  

case "3gb": {
 if (cekSaldo(sender,db_saldo) < 4000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "3GB"
let egg = global.eggsnya
let loc = global.location
let memo = "3048"
let cpu = "75"
let disk = "3048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 4000, db_saldo)
break
  

case "4gb": {
 if (cekSaldo(sender,db_saldo) < 5000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "4GB"
let egg = global.eggsnya
let loc = global.location
let memo = "4048"
let cpu = "100"
let disk = "4048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 5000, db_saldo)
break
 

case "5gb": {
 if (cekSaldo(sender,db_saldo) < 6000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "5GB"
let egg = global.eggsnya
let loc = global.location
let memo = "5048"
let cpu = "130"
let disk = "5048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 6000, db_saldo)
break
  

case "6gb": {
 if (cekSaldo(sender,db_saldo) < 7000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "6GB"
let egg = global.eggsnya
let loc = global.location
let memo = "6048"
let cpu = "150"
let disk = "6048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 7000, db_saldo)
break
 

case "7gb": {
 if (cekSaldo(sender,db_saldo) < 8000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "7GB"
let egg = global.eggsnya
let loc = global.location
let memo = "7048"
let cpu = "175"
let disk = "7048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 8000, db_saldo)
break
  

case "8gb": {
 if (cekSaldo(sender,db_saldo) < 9000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "8GB"
let egg = global.eggsnya
let loc = global.location
let memo = "8048"
let cpu = "200"
let disk = "8048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 9000, db_saldo)
break
  

case "9gb": {
 if (cekSaldo(sender,db_saldo) < 10000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "9GB"
let egg = global.eggsnya
let loc = global.location
let memo = "9048"
let cpu = "230"
let disk = "9048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 10000, db_saldo)
break
  

case "10gb": {
 if (cekSaldo(sender,db_saldo) < 11000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "10GB"
let egg = global.eggsnya
let loc = global.location
let memo = "11048"
let cpu = "250"
let disk = "11048"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 11000, db_saldo)
break
  

case "unli": {
 if (cekSaldo(sender,db_saldo) < 2000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "Unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 12000, db_saldo)
break

case "addadmin": {
 if (cekSaldo(sender,db_saldo) < 2000) return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`)

let username = `${pushname.replace(/[^a-zA-Z0-9]/g, '')}`;
 let u = `${sender.split('@')[0]}`;
let name = username + "Unli"
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@Panel.Pterodactyl"
akunlo = "https://telegra.ph/file/35364a1f137efc69b529f.jpg"
if (!u) return
let d = (await NaF.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username + "123456789"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"root_admin" : true,
"password": password
})
})
let data = await f.json();
if (data.errors) return reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
reply(`SUCCES CREATE USER ID: ${user.id}`)
let ctf = `Hai ${pushname} ${ucapanWaktu} Berikut Data Admin Panel Anda, *Terimakasih Sudah Melakukan Transaksi Di ${global.namaStore} Dan Ditunggu Orderan Selanjutnya Ya😊*

👤 *USERNAME* : ${user.username}
🔒 *PASSWORD* : ${password}
🌐 *LOGIN* : ${domain}

👥 *JOIN GROUP* : ${global.linkgroup}

*Rules Admin Panel*
1. Dilarang Buka Server Orang
2. Dilarang Nyolong Sc
3. Dilarang Add Admin Lagi (Kecuali Pt Panel)
4. Gausah Nyebar Link Kalo Gaada Yang Beli

📒 *Harap Dibaca*
_Data Panel Hanya Dikirim Sekali Saja, Jadi Tolong Untuk Menyimpan Baik Baik Data Panel Anda, Karena Admin Tidak Bertanggung Jawab Jika Anda Lupa Dengan Data Panel Anda, Dan Jika Perlu Anda Harus Mengganti Password Anda Dan Selalu Menggingatnya_

📢 *Informasi Yang Sangat Penting*
_Tolong Jaga Baik Baik Link Login Yang Kami Berikan Dikarenakan Sekarang Banyak Banget Manusia Yang Sifat Nya Kaya Hewan, Jadi Saya Harap Anda Dapat Menjaga Nya Demi Ke Amanan Website Dan Juga dari Hal" Buruk Lainya_
`
NaF.sendMessage(from, { image: fs.readFileSync(`./gambar/thumb.jpg`),
 caption: ctf, 
footer: `${global.ownerName} © 2024`},
{quoted: msg})
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await reply(`
*User Dan Panel Berhasil Terinstall*

📁 Type : user + server
☣️ Id Server : ${user.id}
👤 Nama User : ${user.first_name} ${user.last_name}
🗄️ Ram : ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
🛋️ Penyimpanan : ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
💻 Cpu : ${server.limits.cpu}%

_Tunggu Beberapa Detik Dan Bot Akan Otomatis Mengirim Data Login Anda_

`)

}
minSaldo(sender, 20000, db_saldo)
break

case 'jasatambahfitur':{
	if (isGroup) return reply(mess.OnlyPM)
const sections = [
{title: "🛍️ Produk Populer",
rows: [
{title: "Beli Jasa Tambah Fitur Biasa", rowId: prefix+"jasatambahfiturbiasa", description: "Harga Rp7.000 | Status ✅"},
{title: "Beli Jasa Tambah Fitur Premium", rowId: prefix+"jasapasangprem", description: "Harga Rp13.000 | Status ✅"},
]},
]
let isian = `List Layanan Produk Yang Tersedia, Isi Saldo bisa ketik #deposit\nPerbedaan biasa dengan premium adalah\n\nBiasa: tampilan fitur biasa\n\nPremium: tampilan fitur premium dan menggunakan function payment yang membuat fitur lebih keren`
const listMessage = {
text: isian,
buttonText: 'Tekan Disini',
sections
}
NaF.sendMessage(from, listMessage)
}
break

case "jasatambahfiturbiasa": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}
 
Kirim Script Yang Ingin Ditambah Fiturnya, Kirim Ke Nomor +6285607806470 Dan Silahkan Request Fitur Yang Ingin Ditambah
*Jangan Spam!!*

Setelah Anda Mengirim Script Nya Silahkan Tunggu Sampai Owner Melakukan Chat

Jika Owner Sudah Chat Proses Maka Script Mu Sudah Di Proses Dan Tunggu Sampai Selesai`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
 NaF.sendMessage('6285607806470@s.whatsapp.net', { 
  text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

 // Mengurangi saldo pengguna
 minSaldo(sender, 7000, db_saldo);
 
 break;
}

case "jasatambahfiturpremium": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}
 
Kirim Script Yang Ingin Ditambah Fiturnya, Kirim Ke Nomor +6285607806470 Dan Silahkan Request Fitur Yang Ingin Ditambah
*Jangan Spam!!*

Setelah Anda Mengirim Script Nya Silahkan Tunggu Sampai Owner Melakukan Chat

Jika Owner Sudah Chat Proses Maka Script Mu Sudah Di Proses Dan Tunggu Sampai Selesai`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
 NaF.sendMessage('6285607806470@s.whatsapp.net', { 
  text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

 // Mengurangi saldo pengguna
 minSaldo(sender, 13000, db_saldo);
 
 break;
}

case 'jasapasang':{
	if (isGroup) return reply(mess.OnlyPM)
const sections = [
{title: "🛍️ Produk Populer",
rows: [
{title: "Beli Jasa Pasang Biasa", rowId: prefix+"jasapasangbiasa", description: "Harga Rp5.000 | Status ✅"},
{title: "Beli Jasa Pasang Premium", rowId: prefix+"jasapasangprem", description: "Harga Rp7.000 | Status ✅"},
]},
]
let isian = `List Layanan Produk Yang Tersedia, Isi Saldo bisa ketik #deposit\nPerbedaan biasa dengan premium adalah\n\nBiasa: anda perlu melakukan start, memasukkan nomor, memasukan kode pada panel yang membuat agak ribet\n\nPremium: anda hanya perlu memasukkan kode dan semuanya sudah diurus oleh owner`
const listMessage = {
text: isian,
buttonText: 'Tekan Disini',
sections
}
NaF.sendMessage(from, listMessage)
}
break

case "jasapasangbiasa": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Kirim Data Panel Dan Script Yang Ingin Dipasang, Kirim Ke Nomor +6285607806470
*Jangan Spam!!*

Gunakan Panel Jika Owner Belum Chat Kamu Untuk Memproses Orderan Mu

Jangan Menggunakan Panel Jika Owner Sudah Chat Memproses Orderan Mu

Jika Kamu Menggunakan Panel Saat Owner Memproses Orderan Mu, Maka Orderan Akan Di Anggap Selesai

Gunakan Panel Saat Owner Sudah Chat Selesai`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
 NaF.sendMessage('6285607806470@s.whatsapp.net', { 
  text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

 // Mengurangi saldo pengguna
 minSaldo(sender, 5000, db_saldo);
 
 break;
}
case "jasapasangprem": {
 if (cekSaldo(sender, db_saldo) < 2000) {
  return reply(`Maaf *${pushname}*, sepertinya saldo kamu Rp${toRupiah(cekSaldo(sender, db_saldo))}, silahkan melakukan deposit terlebih dahulu sebelum melakukan pembelian`);
 }

 let ctf = `Hai ${pushname} ${ucapanWaktu}

Silahkan Kirim Data Panel, Script ,Dan Nomor Yang Ingin Dipasang, Kirim Ke Nomor +6285607806470
*Jangan Spam!!*

Gunakan Panel Jika Owner Belum Chat Kamu Untuk Memproses Orderan Mu

Jangan Menggunakan Panel Jika Owner Sudah Chat Memproses Orderan Mu

Jika Kamu Menggunakan Panel Saat Owner Memproses Orderan Mu, Maka Orderan Akan Di Anggap Selesai

Gunakan Panel Saat Owner Sudah Chat Selesai`;

 NaF.sendMessage(from, { 
  image: fs.readFileSync(`./gambar/thumb.jpg`),
  caption: ctf,
  footer: `${global.ownerName} © 2024`
 }, { quoted: msg });

 // Kirim pesan otomatis ke nomor 6285607806470 dengan menyertakan nomor pengguna yang melakukan tindakan
 NaF.sendMessage('6285607806470@s.whatsapp.net', { 
  text: `*Halo Owner, Ada Orderan Nih*
Order: *${command}*
Nomor: ${sender.replace('@s.whatsapp.net', '')}
*Silahkan Hubungi Nomor Diatas Jika Ingin Memproses Orderan Tersebut*`
 });

 // Mengurangi saldo pengguna
 minSaldo(sender, 5000, db_saldo);
 
 break;
}
case 'cekip':{
if (!isOwner) return reply(mess.OnlyOwner)
let key = new URLSearchParams()
key.append("api_key", apikeyAtlantic)
fetch("https://atlantich2h.com/get_profile", {
method: "POST",
body: key,
redirect: 'follow'
})
.then(response => response.json())
.then(res => {
if (!res.status) return reply('Silahkan sambungkan ip ('+res.message.replace(/[^0-9.]+/g, '')+') tersebut ke provider')
reply('IP sudah tersambung ke server.')
})
}
break
case "jpm": case "post": case "jasher": {
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Penggunaan Salah Silahkan Gunakan Seperti Ini*\n${prefix+command} teks|jeda\n\nReply Gambar Untuk Mengirim Gambar Ke Semua Group\nUntuk Jeda Itu Delay Jadi Nominal Jeda Itu 1000 = 1 detik`)
await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_")
let getGroups = await NaF.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
let metadat72 = await NaF.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await NaF.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
await NaF.sendMessage(xnxx, {
image: {
url: mem
}, caption: q.split('|')[0], mentions: participanh.map(a => a.id)
})
await sleep(q.split('|')[1])
} else {
await NaF.sendMessage(xnxx, {
text: q.split('|')[0], mentions: participanh.map(a => a.id)
})
await sleep(q.split('|')[1])
}}
reply("*SUCCESFUL ✅*")
}
break
case "cekidgc": {
if (!isOwner) return reply(mess.OnlyOwner)
let getGroups = await NaF.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`
for (let x of anu) {
let metadata2 = await NaF.groupMetadata(x)
teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`
}
reply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}
break
case "pushkontakv1":{
if (!isOwner) return reply(mess.OnlyOwner)
if (isGroup) return reply(mess.private)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|tekspushkontak\nUntuk Liat Id Group Silahkan Ketik .cekidgc`)
reply(mess.wait)
const groupMetadataa = !isGroup? await NaF.groupMetadata(`${q.split("|")[0]}`).catch(e => {}) : ""
const participants = !isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkon = q.split("|")[1]
if (isContacts) return
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await NaF.downloadAndSaveMediaMessage(quoted)
memk = await TelegraPh(media)
await NaF.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkon })
await sleep(1000)
} else {
await NaF.sendMessage(mem, { text: global.tekspushkon })
await sleep(1000)
}
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(1)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await NaF.sendMessage(from, { document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
}
break
case "pushkontakv2": {
if (!isOwner) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.only.group)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} teks`)
reply(mess.wait)
const groupMetadata = isGroup? await NaF.groupMetadata(from).catch(e => {}): ""
const groupOwner = isGroup? groupMetadata.owner: ""
const participantts = isGroup? await groupMetadata.participants: ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv2 = text
if (isContacts) return
for (let men of halsss) {
contacts.push(men)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await NaF.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
await NaF.sendMessage(men, {
image: {
url: mem
}, caption: global.tekspushkonv2
})
await sleep(1000)
} else {
await NaF.sendMessage(men, {
text: global.tekspushkonv2
})
await sleep(1000)
}
}
reply("File Kontak Sudah Di Kirim Lewat Chat Pribadi")
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(1)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"",].join("\n");
return vcard;
}).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await NaF.sendMessage(sender, {
document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", caption: "Nih Kak Tinggal Pencet File Di Atas Terus Save", mimetype: "text/vcard",
}, {
quoted: m
})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
}
break
case "pushkontakv3":
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup|jeda|teks\nUntuk Liat Id Group Silahkan Ketik .idgroup`)
await reply("Otw Boskuuu")
const groupMetadataa = !isGroup? await NaF.groupMetadata(`${q.split("|")[0]}`).catch(e => {}): ""
const participantss = !isGroup? await groupMetadataa.participants: ""
const halls = await participantss.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv3 = q.split("|")[2]
for (let mem of halls) {
if (/image/.test(mime)) {
media = await NaF.downloadAndSaveMediaMessage(quoted)
memk = await TelegraPh(media)
await NaF.sendMessage(men, {
image: {
url: mem
}, caption: global.tekspushkonv3
})
await sleep(q.split("|")[1])
} else {
await NaF.sendMessage(mem, {
text: global.tekspushkonv3
})
await sleep(q.split("|")[1])
}
}
reply("Succes Boss!")
break
case "pushkontakv4": case "sharemember":
if (!isOwner) return reply(mess.OnlyOwner)
if (isGroup) return reply(mess.private)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} jeda|teks`)
await reply("Otw Boskuuu")
const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
global.tekspushkonv4 = q.split("|")[1]
for (let men of halsss) {
if (/image/.test(mime)) {
media = await NaF.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
await NaF.sendMessage(men, {
image: {
url: mem
}, caption: global.tekspushkonv4
})
await sleep(q.split("|")[0])
} else {
await NaF.sendMessage(men, {
text: global.tekspushkonv4
})
await sleep(q.split("|")[0])
}
}
reply("Succes Boss!")
break
case "savekontak": {
if (!isOwner) return reply(mess.OnlyOwner)
if (!isGroup) return reply(`Maaf Kak Fitur ${prefix+command} Hanya Bisa Di Gunakan Di Dalam Group\nUntuk Memasukan Bot Ke Dalam Group Yang Di Ingin Kan\nSilahkan Ketik Command .join linkgroup`)
await m.reply("_in progress_")
const groupMetadata = isGroup? await NaF.groupMetadata(from).catch(e => {}): ""
const groupOwner = isGroup? groupMetadata.owner: ""
const participantts = isGroup? await groupMetadata.participants: ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
if (isContacts) return
contacts.push(men)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
}
reply("Sukses File Sudah Di Kirim Lewat Chat Private")
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"",].join("\n");
return vcard;
}).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await NaF.sendMessage(sender, {
document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", caption: "Sukses Tinggal Save Ya Kakak", mimetype: "text/vcard",
}, {
quoted: m
})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
}
break
case 'cekmember':
if (!isOwner) return reply(mess.OnlyOwner)
if (!isGroup) return reply(`Khusus Group Kontol`)
huhuhs = await NaF.sendMessage(m.chat, {
text: `Grup; *${groupMetadata.subject}*\nTotal peserta; *${participants.length}*`
}, {
quoted: m, ephemeralExpiration: 86400
})
await sleep(1000) // (?); mengirim kontak seluruh member
NaF.sendContact(m.chat, participants.map(a => a.id), huhuhs)
break
case 'savekontak': case 'svkontak':
if (!isOwner) return reply(mess.OnlyOwner)
if (!isGroup) return reply(`Khusus Group Kontol`)
let cmiggc = await NaF.groupMetadata(m.chat)
let orgiggc = participants.map(a => a.id)
vcard = ''
noPort = 0
for (let a of cmiggc.participants) {
vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`
} // (?); mengimpor kontak seluruh member - save
let nmfilect = './contacts.vcf'
reply('*Mengimpor '+cmiggc.participants.length+' kontak..*')
fs.writeFileSync(nmfilect, vcard.trim())
await sleep(2000)
NaF.sendMessage(m.chat, {
document: fs.readFileSync(nmfilect), mimetype: 'text/vcard', fileName: 'Contact.vcf', caption: 'GROUP: *'+cmiggc.subject+'*\nMEMBER: *'+cmiggc.participants.length+'*'
}, {
ephemeralExpiration: 86400, quoted: m
})
fs.unlinkSync(nmfilect)
break
case 'sendkontak': case 'kontak':
if (!isOwner) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.OnlyGrup)
if (!m.mentionedJid[0]) return reply('Ex; .kontak @tag|nama')
let snTak = dq.split(' ')[1] ? dq.split(' ')[1]: 'Contact'
let snContact = {
displayName: "Contact",
contacts: [{
displayName: snTak,
vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+snTak+";;;\nFN:"+snTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
}]
} // (?); send kontak
NaF.sendMessage(m.chat, {
contacts: snContact
}, {
ephemeralExpiration: 86400
})
break
case "savekontak2": {
if (!isOwner) return reply(mess.OnlyOwner)
if (isGroup) return reply(mess.private)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${prefix+command} idgroup\nUntuk Liat Id Group Silahkan Ketik .cekidgc`)
await reply("_Wᴀɪᴛɪɴɢ ɪɴ ᴘʀᴏɢʀᴇss !!_")
const groupMetadataa = !isGroup? await NaF.groupMetadata(`${text}`).catch(e => {}): ""
const participants = !isGroup? await groupMetadataa.participants: ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA[${createSerial(2)}] ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"",].join("\n");
return vcard;
}).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
reply(util.format(err))
} finally {
await NaF.sendMessage(from, {
document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", caption: "Sukses Tinggal Save Ya Kakak", mimetype: "text/vcard",
}, {
quoted: m
})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
}
break
// Fungsi untuk menghilangkan nol yang tidak berguna dari angka
function removeUnwantedZeros(num) {
// Konversi angka ke string dan hapus nol di depan
let str = num.toString().replace(/^0+/, '');

// Jika ada desimal, hilangkan nol di belakang
if (str.includes('.')) {
str = str.replace(/\.?0+$/, ''); // Menghilangkan nol di belakang desimal
}

return str;
}

case "win": {
    // Cek apakah format input benar
    const input = q.split('|');
    if (input.length !== 3) {
        return reply(`Penggunaan Salah! Silahkan Gunakan Command Seperti Ini:\n.win teks|perkalian|persentase\nContoh: .win teks|2|10`);
    }

    const perkalian = parseFloat(input[1].trim());
    const persentase = parseFloat(input[2].trim());

    // Memastikan ada pesan yang di-reply
    if (!quotedMsg) {
        return reply('Silakan balas pesan yang berisi angka untuk melakukan perhitungan.');
    }

    // Ambil isi pesan yang di-reply
    const messageContent = quotedMsg.body || ""; // Ambil isi pesan
    const numbers = messageContent.match(/\b\d+\b/g); // Mengambil semua angka dari pesan

    if (!numbers || numbers.length === 0) {
        return reply('Tidak ada angka yang ditemukan dalam pesan.');
    }

    // Fungsi untuk menghitung hasil berdasarkan input
    function calculateResults(inputList, perkalian, persentase) {
        const results = [];

        inputList.forEach(item => {
            const angka = parseInt(item);
            const hasilPerkalian = angka * perkalian; // Hasil dari perkalian
            const hasil = hasilPerkalian - (hasilPerkalian * (persentase / 100)); // Kurangi dengan persentase dari hasil perkalian
            results.push(`${item} // ${formatNumber(hasil)}`); // Format angka asli dan hasil perhitungan
        });

        return results;
    }

    // Fungsi untuk format angka dengan titik sebagai pemisah ribuan
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.0+$/, "");
    }

    const results = calculateResults(numbers, perkalian, persentase);

    // Kirim hasil kembali
    if (results.length > 0) {
        await reply(results.join('\n'));
    } else {
        await reply('Tidak ada angka yang valid untuk dihitung.');
    }
    break;
}

case "win2": {
    // Cek apakah format input benar
    const input = q.split('|');
    if (input.length !== 2) {
        return reply(`Penggunaan Salah! Silahkan Gunakan Command Seperti Ini:\n.win2 perkalian|persentase balas pesan\nContoh: .win2 2|10`);
    }

    const perkalian = parseFloat(input[0].trim());
    const persentase = parseFloat(input[1].trim());

    // Memastikan ada pesan yang di-reply
    const isReply = quotedMsg;
    if (!isReply) {
        return reply('Silakan balas pesan yang berisi angka untuk melakukan perhitungan.');
    }

    // Ambil isi pesan yang di-reply
    const messageContent = quotedMsg.body || ""; // Ambil isi pesan
    const numbers = messageContent.match(/\b\d+\b/g); // Mengambil semua angka dari pesan

    if (!numbers || numbers.length === 0) {
        return reply('Tidak ada angka yang ditemukan dalam pesan.');
    }

    // Fungsi untuk menghitung hasil berdasarkan input
    function calculateResults(inputList, perkalian, persentase) {
        const results = [];

        inputList.forEach(item => {
            const angka = parseInt(item);
            const hasilPerkalian = angka * perkalian; // Hasil dari perkalian
            const hasil = hasilPerkalian - (hasilPerkalian * (persentase / 100)); // Kurangi dengan persentase dari hasil perkalian
            results.push(`${item} // ${formatNumber(hasil)}`); // Format angka asli dan hasil perhitungan
        });

        return results;
    }

    // Fungsi untuk format angka dengan titik sebagai pemisah ribuan
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.0+$/, "");
    }

    const results = calculateResults(numbers, perkalian, persentase);

    // Kirim hasil kembali
    if (results.length > 0) {
        await reply(results.join('\n'));
    } else {
        await reply('Tidak ada angka yang valid untuk dihitung.');
    }
    break;
}

case "win3": {
// Cek apakah format input benar
const input = q.split('|');
if (input.length !== 1) {
return reply(`Penggunaan Salah! Silahkan Gunakan Command Seperti Ini:\n.win3 persentase dan reply pesan\nContoh: .win3 10`);
}

const persentase = parseFloat(input[0].trim());

// Memastikan ada pesan yang di-reply
const isReply = quotedMsg;
if (!isReply) {
return reply('Silakan balas pesan yang berisi angka untuk melakukan perhitungan.');
}

// Ambil isi pesan yang di-reply
const messageContent = quotedMsg.body || ""; // Ambil isi pesan
const numbers = messageContent.match(/\b\d+\b/g); // Mengambil semua angka dari pesan

if (!numbers || numbers.length === 0) {
return reply('Tidak ada angka yang ditemukan dalam pesan.');
}

// Fungsi untuk menghitung hasil berdasarkan input
function calculateResults(inputList, persentase) {
const results = [];

inputList.forEach(item => {
const angka = parseInt(item);
const hasilPerkalian = angka * 2; // Hasil dari perkalian otomatis dengan 2
const hasil = hasilPerkalian - (hasilPerkalian * (persentase / 100)); // Kurangi dengan persentase dari hasil perkalian
results.push(`${item} // ${formatNumber(hasil)}`); // Format angka asli dan hasil perhitungan
});

return results;
}

// Fungsi untuk format angka dengan titik sebagai pemisah ribuan
function formatNumber(num) {
return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.0+$/, "");
}

const results = calculateResults(numbers, persentase);

// Kirim hasil kembali
if (results.length > 0) {
await reply(results.join('\n'));
} else {
await reply('Tidak ada angka yang valid untuk dihitung.');
}
break;
}

case "reffall": {
// Cek apakah format input benar
const input = q.split('|');
if (input.length !== 2) {
return reply(`Penggunaan Salah! Silahkan Gunakan Command Seperti Ini:\n.reffal angka|persentase\nContoh: .reffal 100|10`);
}

const angka = parseFloat(input[0].trim());
const persentase = parseFloat(input[1].trim());

if (isNaN(angka) || isNaN(persentase)) {
return reply('Angka atau persentase yang diberikan tidak valid. Pastikan keduanya adalah angka.');
}

// Hitung hasil
const hasil = angka - (angka * (persentase / 100)); // Operasi angka - persentase

// Format hasil dengan menghilangkan nol yang tidak berguna
const formattedResult = removeUnwantedZeros(hasil);

// Kirim hasil kembali
await reply(`Hasil: ${formattedResult}`);
break;
}

default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
NaF.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
NaF.sendMessage(from, { text: `${runtime(process.uptime())}*⏰`})
}

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
NaF.sendMessage(`${global.ownerNumber}`, {text:errny, mentions:[sender]})
}}