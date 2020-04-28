$("#create-stats-button").click(createStats);

function createStats() {
    var stats = computeStats();
    createStatsTable(stats);
    drawHistogram(stats);
    drawCumCurve(stats);
}

function computeStats() {
    var n = d3.min([freqs.length, xVals.length - 1]);
    var rows = [];
    var totalCount = d3.sum(freqs.slice(0, n));
    var fCum = 0;
    var hMax = 0;
    var widths = []
    for (var i=0; i<n; i++) {
        var row = {};
        row.x1 = xVals[i];
        row.x2 = xVals[i + 1];
        row.xmid = (row.x1 + row.x2) / 2;
        row.width = row.x2 - row.x1;
        row.count = freqs[i];
        row.f = row.count / totalCount * 100;
        fCum += row.f;
        row.cum = fCum;
        row.h = row.f / row.width;
        rows.push(row);
        if (row.h > hMax) {
            hMax = row.h;
        }
        widths.push(row.width);
    }
    var stats = {
        rows: rows,
        totalCount: totalCount,
        xMin: xVals[0],
        xMax: xVals[n],
        hMax: hMax,
        minWidth: d3.min(widths)
    }
    return stats;
}