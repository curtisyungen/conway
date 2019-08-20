module.exports = {

    getPattern1() {
        let pattern = [];

        for (var i=0; i<25; i++) {
            let row = [];

            for (var j=0; j<25; j++) {
                let cell = {
                    row: i,
                    col: j,
                    val: false,
                }

                row.push(cell);
            }

            pattern.push(row);
        }

        return pattern;
    },

    getPattern2() {
        let pattern = this.getPattern1();

        pattern[9][10].val = true;
        pattern[9][11].val = true;
        pattern[9][15].val = true;
        pattern[9][16].val = true;
        pattern[10][10].val = true;
        pattern[10][11].val = true;
        pattern[10][15].val = true;
        pattern[10][16].val = true;
        pattern[11][11].val = true;
        pattern[11][15].val = true;
        pattern[12][11].val = true;
        pattern[12][15].val = true;
        pattern[13][11].val = true;
        pattern[13][15].val = true;

        return pattern;
    },

    getPattern3() {
        let pattern = this.getPattern1();

        for (var i=7; i<17; i++) {
            pattern[i][12].val = true;
        }
        
        return pattern;
    },

    getPattern4() {
        let pattern = this.getPattern1();

        pattern[10][11].val = true;
        pattern[10][12].val = true;
        pattern[10][13].val = true;
        pattern[11][10].val = true;
        pattern[11][11].val = true;
        pattern[11][12].val = true;

        return pattern;
    },

    getPattern5() {
        let pattern = this.getPattern1();

        pattern[9][18].val = true;
        pattern[9][19].val = true;
        pattern[10][18].val = true;
        pattern[10][19].val = true;
        pattern[11][19].val = true;
        pattern[12][18].val = true;
        pattern[12][19].val = true;
        pattern[13][19].val = true;
        pattern[14][18].val = true;
        pattern[14][19].val = true;
        pattern[15][18].val = true;
        pattern[15][19].val = true;

        return pattern;
    },

    getPattern6() {
        
    },

    getPattern7() {

    },

    getPattern8() {
        let pattern = this.getPattern1();

        pattern[14][0].val = true;
        pattern[14][24].val = true;

        for (var i=1; i<24; i++) {
            pattern[13][i].val = true;
        }

        return pattern;
    },

    getPattern9() {

    }
}