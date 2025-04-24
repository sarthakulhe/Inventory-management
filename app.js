function openScanner() {
  document.getElementById("scanner-overlay").style.display = "flex";
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#scanner-preview"),
      constraints: {
        facingMode: "environment"
      }
    },
    decoder: {
      readers: ["ean_reader"]
    }
  }, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function (result) {
    const code = result.codeResult.code;
    document.getElementById("code").value = code;
    closeScanner();
  });
}

function closeScanner() {
  Quagga.stop();
  document.getElementById("scanner-overlay").style.display = "none";
}
