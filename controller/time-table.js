const neatCsv = require('neat-csv');
const fs = require('fs');
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


const subjects = {
    'English': 'data/English.csv',
    'Hindi': 'data/Hindi.csv',
    'Kannada': 'data/Kannada.csv',
    'Maths': 'data/Maths.csv',
    'Science': 'data/Science.csv',
}


const processTimetable = function (req, res) {
    var response = [];
    for (const subject in subjects) {
        fs.readFile(subjects[subject], async (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            var result = await neatCsv(data);
            response = processSujectWiseTimeTable(result, req.params.class, subject, response);
            createCsvFile(response);
        });
    }
    res.send("Time - table create successfully for class " + req.params.class);
};

createCsvFile = function (data) {
    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

processSujectWiseTimeTable = function (data, classId, subject, finalData) {
    data.forEach((element, index) => {
        var timeData = finalData[index] ? finalData[index] : {};
        for (const property in element) {
            if (property == "--") {
                timeData[property] = element[property];
            } else if (element[property] == classId) {
                timeData[property] = subject;
            } else if (!timeData.hasOwnProperty(property)) {
                timeData[property] = "";
            } else if (timeData[property] == "") {
                timeData[property] = "";
            }
        }
        finalData[index] = timeData;
    });
    return finalData;
}



exports.processTimetable = processTimetable
