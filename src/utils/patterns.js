module.exports = {

    getPattern2() {
        let pattern2 = [];

        for (var i=0; i<10; i++) {
            let row = [];

            for (var j=0; j<10; j++) {
                let cell = {
                    row: i,
                    col: j,
                    val: false,
                }

                row.push(cell);
            }

            pattern2.push(row);
        }

        pattern2[3][2].val = true;
        pattern2[3][3].val = true;
        pattern2[4][2].val = true;
        pattern2[4][3].val = true;
        pattern2[5][3].val = true;
        pattern2[6][3].val = true;
        pattern2[7][3].val = true;

        return pattern2;
    }

}