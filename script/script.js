const recordBtn = document.querySelector(".record-btn button");
const recordValue = document.querySelector(".record-value textarea");
const convertBtn = document.querySelector(".convert-btn button");
const voiceList = document.querySelector("#voice-list");

let speech = false;
let result = []
window.SpeechRecognition = window.webkitSpeechRecognition;
const tss = window.speechSynthesis;
let voices = [];
const recognition = new SpeechRecognition();
recordBtn.addEventListener("click", e => {
    e.preventDefault();
    speech = true;
    recognition.interimResults = true;
    
    recognition.addEventListener("result", e => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result =>  result.transcript);

        result = transcript;
        recordValue.value = result;
        speech= false;
    });

    if (speech) {
        recognition.start();
    }
});

recordValue.oninput = () => result = [recordValue.value];

function GetVoices() {
    voices = tss.getVoices();
    voiceList.innerHTML = "";

    voices.forEach(voice => {
        let option = `<option data-name="${voice.name}" data-lang="${voice.lang}">${voice.name}</option>`;
        voiceList.innerHTML += option;
    });

    voiceList.selectedIndex = 0;
}

if (speechSynthesis != undefined) {
    speechSynthesis.onvoiceschanged = GetVoices();
}

convertBtn.addEventListener("click", e => {
    if (result == [] || result == [""]) return;
    e.preventDefault();
    let toSpeak = new SpeechSynthesisUtterance(result[0]);
    let selectedVoiceName = voiceList.selectedOptions[0].dataset.name;
    
    voices.forEach(voice => {
        if (voice.name == selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });

    tss.speak(toSpeak);
});


window.onload = () => GetVoices();