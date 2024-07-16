let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let angle = 0;
let flip = false;
let brightness = 100;
let contrast = 100;
let blur = 0;
let isBlackAndWhite = false;

document.getElementById('picture').addEventListener('change', function (event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            drawImage();
        };
    };
    reader.readAsDataURL(file);
});

function rotateImage() {
    angle = (angle + 90) % 360;
    drawImage();
}

function flipImage() {
    flip = !flip;
    drawImage();
}

function adjustBrightness(value) {
    brightness = value;
    drawImage();
}

function adjustContrast(value) {
    contrast = value;
    drawImage();
}

function toggleBlackAndWhite() {
    isBlackAndWhite = !isBlackAndWhite;
    drawImage();
}

function adjustBlur(value) {
    blur = value;
    drawImage();
}

function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(flip ? -1 : 1, 1);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px)` + (isBlackAndWhite ? " grayscale(100%)" : "");
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}