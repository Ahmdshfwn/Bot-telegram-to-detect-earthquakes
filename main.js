require('dotenv').config();

const TelegramBot = require("node-telegram-bot-api")
const token = process.env.TOKEN_BOT //setting your token BOT in file .env
const options = {
    polling: true
}
const your_bot = new TelegramBot(token, options)

const prefix = "-"
const kodam = [`tuyul`, `monyet`, `anjay`, `hahay`, `kucing`];
const info = new RegExp(`^${prefix}info$`)
const bencana = /info/
const say = new RegExp(`^${prefix}hai$`)
const hallo = /^hallo$/
const instagram = /instagram/
const thankyou = /terima kasih/
const hi = /hi/

your_bot.onText(info, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
    const API = await fetch(BMKG_ENDPOINT)
    const {
        Infogempa: { 
            gempa: {
                Jam, Coordinates, Wilayah, Potensi, Kedalaman, Magnitude, Tanggal 
            }
        } 
    } = await API.json()
    const resultText =  `
Waktu: ${Tanggal} | ${Jam}
Koordinat: ${Coordinates}
Wilayah: ${Wilayah}
Potensi nya: ${Potensi}
Kedalaman: ${Kedalaman}
Kekuatan: ${Magnitude} SR
Source : BMKG (https://data.bmkg.go.id/gempabumi/)
Developer : Afwan.
`
    your_bot.sendMessage(callback.from.id, resultText)
})
//=========================================================================================//

// Ini hanya gabut aja yaks

const animals = ['Kucing Boker', 'Anjing Malas', 'Gajah Pea', 'Singa Njuk', 'Harimau Sigma', 'Kelinci Suki', 'Rusa icikiwir', 'Kuda ngangkang', 'Monyet kejepit', 'Babi mulet'];

// Fungsi untuk memilih hewan secara acak gabut aja ini mahhh
function getRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
}

your_bot.onText(/\/cek/, (msg) => {
    your_bot.sendMessage(msg.chat.id, "Selamat datang! Kirim pesan 'acak' untuk mendapatkan nama kodam acak.");
});

// Tanggapi pesan 'acak' dengan nama hewan acak
your_bot.onText(/cekkodam/, (msg) => {
    const randomAnimal = getRandomAnimal();
    your_bot.sendMessage(msg.chat.id, `Kodam acak: ${randomAnimal}`);
});

your_bot.onText(instagram, (callback) => {
    your_bot.sendMessage(callback.from.id, "Ya saya mempunyai instagram, https://www.instagram.com/eugafwan/")
})

your_bot.onText(say, (callback) => {
    your_bot.sendMessage(callback.from.id, "Hai gimana kabar kamu??")
})

your_bot.onText(thankyou, (callback) => {
    your_bot.sendMessage(callback.from.id, "Baik sama sama, senang sudah membantu anda❤️❤️.")
})

your_bot.onText(hallo, (callback) => {
    your_bot.sendMessage(callback.from.id, "Halo juga sayang kuhhh")
})

your_bot.onText(bencana, (callback) => {
    your_bot.sendMessage(callback.from.id, "ketik -info untuk mengetahui detail")
})

