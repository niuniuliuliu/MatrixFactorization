/**
 * Created by ck on 24/04/2017.
 * MF with regulation
 */
class MFR {
    constructor(matrix, steps = 5000, alpha = 0.0002, beta = 0.02, k = 2) {
        this.m = 0;
        this.n = 0;
        this.p = [];
        this.q = [];
        this.error = 0;
        if (Object.prototype.toString.call(matrix) !== '[object Array]')
            throw 'matrix should be an array';
        if (matrix.length === 0) {
            throw 'invalid matrix length';
        } else {
            this.m = matrix.length;
            if (Object.prototype.toString.call(matrix[0]) !== '[object Array]')
                throw 'matrix should be an array';
            this.n = matrix[0].length;
            if (this.n === 0) throw  'invalid matrix length';
        }
        this.matrix = matrix;
        this.steps = steps;
        this.alpha = alpha;
        this.beta = beta;
        this.k = k;
        //initialize p,q
        this.p = this.initializeMatrix(this.m, this.k);
        this.q = this.initializeMatrix(this.n, this.k);
    }

    run() {
        while (this.steps > 0) {
            let error = 0;
            for (let i = 0; i < this.m; i++) {
                for (let j = 0; j < this.n; j++) {
                    let o = this.matrix[i][j];
                    if (o === -1) continue;
                    let t = 0;
                    for (let k = 0; k < this.k; k++) {
                        t += this.p[i][k] * this.q[j][k];
                    }
                    t = this.roundNumber(t);
                    let e = o - t;
                    error += Math.pow(e, 2);
                    for (let k = 0; k < this.k; k++) {
                        this.p[i][k] += this.alpha * (2 * e * this.q[j][k] - this.beta * this.p[i][k]);
                        this.q[j][k] += this.alpha * (2 * e * this.p[i][k] - this.beta * this.q[j][k]);
                    }
                }
            }
            this.error = error;
            this.steps--;
        }
    }

    initializeMatrix(m, n) {
        let matrix = [];
        for (let i = 0; i < m; i++) {
            let arr = [];
            for (let j = 0; j < n; j++) {
                let rd = this.roundNumber(Math.random());
                arr.push(rd);
            }
            matrix.push(arr);
        }
        return matrix;
    }

    roundNumber(num) {
        let r = Math.pow(10, 6);
        return Math.round(num * r) / r;
    }
}
module.exports = MFR;