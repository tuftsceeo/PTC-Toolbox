const fetch = require("node-fetch");

var arr = [8, -36, -22, 41, 1, -45, 7, -15, 26, -12, 38, -8, -7, 35, -25, 21, 22, -5, 26, 38, 15, -10, 18, -25, 10, -5, 6, -7, 11, 16, -9, 3, -35, -1, -15, 52, 1, 11, -4, -19, 5, 15, -12, 0, 7, 39, 13, -8, -4, 45, -19, 47, -1, 2, 12, -19, 10, 10, 18, -53, 22, 17, 48, -27, 26, -3, 17, -2, -23, 40, 21, 7, 1, 2, 18, 1, 58, 15, -22, 15, -4, 29, 32, 32, -5, -12, 19, 6, 19, 7, 27, 53, -26, -11, 8, 22, 36, -2, -9, -40, 25, 18, -12, 39, 53, 2, 0, 0, 39, 4, 7, 21, 31, 64, 15, -11, 39, -77, 8, -13, 15, 30, 0, 11, 26, 0, 27, -14]
var fs = 10

console.log(typeof(arr))
console.log(typeof(fs))

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
const body = JSON.stringify({
    "amplitude": arr, 
    "sampling_rate": fs
})

fetch("https://ptc-fft-server.herokuapp.com/fft/simple_fft", {headers, method: "POST", body})
    .then(res => res.json())
    .then(res => {
        console.log("Magnitudes: " + res.magnitude)
        console.log(res.frequencies)
    })
    .catch(res => { console.log("error " + res)})