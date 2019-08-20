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

        pattern[9][11].val = true;
        pattern[9][12].val = true;
        pattern[10][11].val = true;
        pattern[10][12].val = true;
        pattern[11][12].val = true;
        pattern[12][12].val = true;
        pattern[13][12].val = true;

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

        pattern[15][0].val = true;
        pattern[15][24].val = true;

        for (var i=1; i<24; i++) {
            pattern[14][i].val = true;
        }

        return pattern;
    },

    getPattern9() {
        let pattern = this.getPattern1();

        pattern[0][1].val = true;
        pattern[0][2].val = true;
        pattern[0][3].val = true;
        pattern[1][0].val = true;
        pattern[1][5].val = true;
        pattern[2][0].val = true;
        pattern[2][5].val = true;
        pattern[3][0].val = true;
        pattern[3][5].val = true;
        pattern[5][1].val = true;
        pattern[5][2].val = true;
        pattern[5][3].val = true;

        return pattern;
    }
}