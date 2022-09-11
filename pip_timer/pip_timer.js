var timer = 0;
var startTime = 0;
var paused = true;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const video = document.querySelector('#video');
function draw() {

    // キャンバスをクリアする
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景を白色にする
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 現在時刻を描画
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = getSize() + "px system-ui";
    ctx.get
    ctx.fillText(getCurrentTimeStr(), (getWidth() - ctx.measureText(getCurrentTimeStr()).width) / 2, (getSize())*1.5 - 5);
    window.requestAnimationFrame(draw);
}

function getCurrentTimeStr() {
    if(paused) {
        startTime = getUnix();
    }
    var time = Math.floor(((startTime + timer * 1000) - getUnix()) / 1000);
    if(time < 0) time = 0;
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    const min = String(minutes).padStart(2, '0');
    const sec = String(seconds).padStart(2, '0');
    return `${min}:${sec}`;
}

// <body>が読み込まれたら呼び出される。
function init() {
    draw();
    // 1秒以内のズレが生じるが1000ミリ秒ごとに描画
    window.requestAnimationFrame(draw);
    // <canvas>要素の内容を<video>要素のメディアソースに設定する。
    video.srcObject = canvas.captureStream();
    // <video>要素を自動再生するためにmuteにする
    video.muted = true;
    resize();
    video.play();
    video.pause();
    video.addEventListener('pause', function() {
        timer -= Math.ceil((getUnix() - startTime) / 1000);
        paused = true;
    });
    video.addEventListener('play', function() {
        startTime = getUnix();
        paused = false;
    });
}

function pip() {
    video.requestPictureInPicture();
}
function resize() {
    video.pause();
    video.width = getWidth();
    video.height = getSize() * 2;
    canvas.width = getWidth();
    canvas.height = getSize() * 2;
    video.srcObject = canvas.captureStream();
}
function getWidth() {
    ctx.font = getSize() + "px system-ui";
    return ctx.measureText('999:99').width;
}
function getSize() {
    return 100;
}
function set() {
    timer = document.querySelector('#minutes').value * 60;
}
function start() {
    video.play();
}
function pause() {
    video.pause();
}
function getUnix() {
    return new Date().getTime();
}
init();