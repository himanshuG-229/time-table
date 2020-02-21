const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'result/class-time-table.csv',
    header: [
        { id: '--', title: 'Time' },
        { id: 'Monday', title: 'Monday' },
        { id: 'Tuesday', title: 'Tuesday' },
        { id: 'Wednesday', title: 'Wednesday' },
        { id: 'Thursday', title: 'Thursday' },
        { id: 'Friday', title: 'Friday' },
        { id: 'Saturday', title: 'Saturday' },
    ]
});


const createCsvFile = function (data) {
    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

module.exports.createCsvFile = createCsvFile;