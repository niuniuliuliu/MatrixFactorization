/**
 * Created by ck on 24/04/2017.
 * MF with regulation
 */
let MF = require('./mf');
class MFR extends MF {
    constructor(matrix, steps = 5000, alpha = 0.0002, beta = 0.02, k = 2) {
        super(matrix);
        this.beta = beta;
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
}
module.exports = MFR;