let resultArray = [];

//教師データ
//ドを0として順に
const input1 = [
    0, 1, 2, 3, 4, 5
];

//正解データ
const data = [
    1, 2, 3, 4, 5, 6
];

/*正規化
const input1_norm = input1.map(num => num / 7);
const input2_norm = input2.map(num => num / 7);
const data_norm = data.map(num => num / 7);*/

//保存用配列
let outputArray = [];
let errorsArray = [];

//重み・バイアス
let w1 = Math.random() * 0.5 - 0.25;
//let w2 = Math.random() * 0.5 - 0.25;
let bias = Math.random() * 0.5 - 0.25;

//出力層
function output() {
    for (let i = 0; i < input1.length; i++) {
        outputArray.push(input1[i] * w1 + bias);
    }
}

//誤差
function errors() {
    for (let j = 0; j < outputArray.length; j++) {
        errorsArray.push(data[j] - outputArray[j]);
    }
}

//学習率
const lr = 0.01;

//重み・バイアスの更新
function update() {
    for (let k = 0; k < errorsArray.length; k++) {
        w1 = w1 + lr * errorsArray[k] * input1[k];
        //w2 = w2 + lr * errorsArray[k] * input2[k];
        bias = bias + lr * errorsArray[k];
    }
}

//epochループカウンター
let count = 0;

//epochループ
function epoch() {
    count++;
    
    outputArray = [];
    errorsArray = [];

    output();
    errors();
    update();

    if (count % 100 === 0) {
        console.log(outputArray, errorsArray);
    }

    if (count === 1500) {
        console.log(w1, bias);
        let fullSong = [];
        for (let c = 0; c < 50; c++) {
            const part = generate(Math.floor(Math.random() * 7), 7);
            fullSong.push(...part);
        }

        for (let b = 0; b < fullSong.length; b++) {
            setTimeout(() => {
                beep(fullSong[b]);
            }, b * 300);
        }
    }

    if (count <= 1500) {
        requestAnimationFrame(epoch);
    }
}
epoch();

//生成エリア
function generate(value1, loopTime) {
    let v = value1;
    resultArray = [value1];
    for (let a = 0; a < loopTime; a++) {
        const result = Math.round(v * w1 + bias);
        resultArray.push(result);
        v = result;
    }
    return resultArray;
}

const ctx = new AudioContext();

//鳴動関数
function beep(n) {
    const osc = ctx.createOscillator();

    osc.frequency.value = 220 + n * 50;
    osc.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
}
