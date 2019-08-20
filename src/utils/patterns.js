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

        pattern[9][11].val = true;
        pattern[9][12].val = true;
        pattern[10][11].val = true;
        pattern[10][12].val = true;
        pattern[11][12].val = true;
        pattern[12][12].val = true;
        pattern[13][12].val = true;

        return pattern;
    }

}