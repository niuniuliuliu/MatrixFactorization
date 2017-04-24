/**
 * Created by ck on 24/04/2017.
 */
let MF = require('./mf');
let MFR = require('./mfr');
let matrix = [
    [0.442318, 0.123456, -1, 0.876521],
    [0.442318, -1, 0.365213, 0.876521],
    [0.112342, 0.234582, 0.542189, 0.452321],
    [0.412988, -1, -1, 0.821362],
    [0.984321, -1, -1, -1],
];
console.log('**********MF***********');
let mf = new MF(matrix);
mf.run();
for (let i = 0; i < mf.m; i++) {
    let s = '';
    for (let j = 0; j < mf.n; j++) {
        let t = 0;
        for (let k = 0; k < mf.k; k++) {
            t += mf.p[i][k] * mf.q[j][k];
        }
        t = mf.roundNumber(t);
        s += t + ','
    }
    console.log(s);
}
console.log('MF error is:' + mf.error);
console.log('**********MFR***********');

let mfr = new MFR(matrix);
mfr.run();
for (let i = 0; i < mfr.m; i++) {
    let s = '';
    for (let j = 0; j < mfr.n; j++) {
        let t = 0;
        for (let k = 0; k < mfr.k; k++) {
            t += mfr.p[i][k] * mfr.q[j][k];
        }
        t = mfr.roundNumber(t);
        s += t + ','
    }
    console.log(s);
}
console.log('MFR error is:' + mfr.error);
