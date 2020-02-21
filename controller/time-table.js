const neatCsv = require('neat-csv');
const fs = require('fs');
const createCsvFile = require('../services/write-csv');

const subjects = {
    'English': 'data/English.csv',
    'Hindi': 'data/Hindi.csv',
    'Kannada': 'data/Kannada.csv',
    'Maths': 'data/Maths.csv',
    'Science': 'data/Science.csv',
}


const processTimetable = function (req, res) {
    let response = [];
    for (const subject in subjects) {
        fs.readFile(subjects[subject], async (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            var result = await neatCsv(data);
            response = processSujectWiseTimeTable(result, req.params.class, subject, response);
            createCsvFile.createCsvFile(response);
        });
    }
    res.send("Time - table created successfully for class " + req.params.class);
};

const processSujectWiseTimeTable = function (data, classId, subject, finalData) {
    data.forEach((element, index) => {
        let timeData = finalData[index] ? finalData[index] : {};
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

const coTeacherTimetable = function (req, res) {
    fs.readFile('result/class-time-table.csv', async (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        var result = await neatCsv(data);
        var response = prepareCoTeacherTableData(result);
        createCsvFile.createCsvFile(response);
    });
    res.send('Co Teacher Time table created successfully');
}

const prepareCoTeacherTableData = function (data) {
    var finalData = [];
    data.forEach(element => {
        var timeData = {};
        for (const property in element) {
            if (property == "--") {
                timeData[property] = element[property];
            }
            timeData[property] = getTeachers(element[property]);
        }
        finalData.push(timeData);
    })
    return finalData;
}

const getTeachers = function(data){
    if(data == "Hindi"){
        data = data + " " + "English";
    }else if(data == "English"){
        data = data + "Maths";
    }else if(data == "Maths"){
        data = data + "Kannada";
    }else if(data == "Kannada"){
        data = data + "Science";
    }else if(data == "Science"){
        data = data + "Hindi";
    }else {
        data = "Hindi Math";
    }
    return data;
}


module.exports.processTimetable = processTimetable
module.exports.coTeacherTimetable = coTeacherTimetable
