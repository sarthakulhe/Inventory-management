const codeReader = new ZXing.BrowserMultiFormatReader();
let isScanning = false;

function startScanner() {
    if (isScanning) return; // Prevent multiple starts
    isScanning = true;

    document.querySelector('.scanner-container').style.display = 'block'; // Show scanner div

    codeReader
        .listVideoInputDevices()
        .then(videoInputDevices => {
            const deviceId = videoInputDevices.length > 1 ? videoInputDevices[1].deviceId : videoInputDevices[0].deviceId;
            codeReader.decodeFromVideoDevice(deviceId, 'video', (result, err) => {
                if (result && isScanning) {
                    console.log(result.text);
                    isScanning = false;
                    handleScanSuccess(result.text);
                    codeReader.reset();
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err);
                }
            });
        })
        .catch(err => {
            console.error(err);
        });
}

function handleScanSuccess(text) {
    playBeep();
    vibrateDevice();
    document.getElementById('code').value = text; // Fill input field with scanned barcode
    closeScanner();
}

function closeScanner() {
    document.querySelector('.scanner-container').style.display = 'none'; // Hide scanner div
}

function playBeep() {
    const beep = new Audio('audio/beep.mp3');
    beep.play();
}

function vibrateDevice() {
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

window.onload = () => {
    document.querySelector('.scanner-container').style.display = 'none'; // Hide scanner on page load
};
