const x = "WORLD"
const maxGuess = 5
let currentGuess = 0
const tebakan = ["BROKE", "PENCE", "HELLO", "BOWED", "KONTL", "WORLD"]

function wordle(){
    for (const tebak of tebakan){
        currentGuess++
        if(currentGuess>maxGuess){
            console.log("Kesempatan sudah habis")
            break;
        }
        console.log(`\nKesempatan ke-${currentGuess}. Tebakanmu: ${tebak}`)
        const result = cekTebakan(tebak, x)
        console.log(`Hasil: ${result.join(' ')}`)

        if(tebak===x){
            console.log(`\n Selamat Tebakanmu Benar!: ${x} dalam ${currentGuess} tebakan`)
            return
        }
    }
    if(tebakan.indexOf(x)===-1){
        console.log(`\n Maaf, Anda gagal. Kata yang benar: ${x}`)
    }
}

function cekTebakan(tebak, kata){
    const result = new Array(kata.length).fill('F')
    const targetKata = kata.split('')
    const tebakKata = tebak.split('')

    for(let i = 0; i<kata.length ; i++){
        if (tebakKata[i] === targetKata[i]) {
            result[i] = 'T';
            targetKata[i] = null;
        }
    }

    for(let i = 0 ; i<kata.length ; i++){
        if(result[i] != 'T'){
            const kata = tebakKata[i]
            const indexKata = targetKata.indexOf(kata)
            if (indexKata > -1) {
                result[i] = 'P';
                targetKata[indexKata] = null;
            }
        }
    }
    return result
}

wordle()


// input max 5 letter
// max try 6x
// input = "HELLO" => FFPTP
