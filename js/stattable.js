var tableHeader = `
<tr>
    <th>Interval</th>
    <th>Count</th>
    <th>Frequency</th>
    <th>Cumulative</th>
</tr>
`;

function createStatsTable(stats) {
    var content = tableHeader;
    stats.rows.forEach(row => {
        content += createRow(row);
    });
    $("#table").html(`
    <table class="tableStyles">
        <tbody>
            ${content}
        </tbody>
    </table>
    `);
}

function createRow(row) {
    return `
    <tr>
        <td>]${row.x1};${row.x2}]</td>
        <td>${row.count}</td>
        <td>${row.f.toFixed(1)}%</td>
        <td>${row.cum.toFixed(1)}%</td>
    </tr>
    `;
}