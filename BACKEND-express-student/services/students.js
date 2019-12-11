const express = require("express")
const fs = require("fs");
const path = require("path");
const axios = require('axios');


const router = express.Router(); // will be the middleware that will take care for this route

const studentsFilePath = path.join(__dirname, "students.json");
/***
 * read a file and decode the content
 * @returns {any}
 */
const readFile = () => {
    const buffer = fs.readFileSync(studentsFilePath);
    const content = buffer.toString();
    return JSON.parse(content);
};
/***
 * fetch image for local storage
 * @param url of image to download
 * @returns {Promise<string>} data URL
 */
const fetchImage = async (url) => {
    // download image and retrieve the binary conteint in arraybuffer
    const response = await axios.get(url, {responseType: 'arraybuffer'} );
    // retrieve the image type from the HTTP response
    const type = response.headers["content-type"];
    // trasform the image data in a Buffer
    const payload = Buffer.from(response.data);
    // return the data: url for the image and trasform the image in base64
    return "data:" + type + ";base64," + payload.toString("base64");
};

router.get("/", (req, res) => { //this will respond to each get on the /students
    res.send(readFile()) //and will return in the response the list of students
});

router.get("/:id", (req, res) => { //this wil get /students/:id
    let students = readFile(); //reads all the students
    res.set('Access-Control-Allow-Origin', '*');
    let student = students.find(x => x._id === parseInt(req.params.id)); //search for the students with the given id
    if (student) //if not undefined!
        res.send(student) //return if found
    else
        res.status(404).send("Not found") //or error
});

router.options("/", (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
    });
    res.send();

});


router.post("/", async (req, res) => { //this will handle POST /students
    var previousStudents = readFile(); //reads the students from the disk
    if (previousStudents.find(student => student.email == req.body.email)) //check if a previously created student has the same email
    {
        res.status(500).send("Cannot create: email already in use")
    } //if so, throws an error

    // create an id from the timestamp
    req.body._id = Date.now(); //create a new id
    req.body.creationTime = new Date(); //add the creationTime
    if (req.body.picture && req.body.picture.indexOf("http") >= 0) {
        req.body.picture = await fetchImage(req.body.picture);
    }

    previousStudents.push(req.body); //push the item into the students array
    fs.writeFileSync(studentsFilePath, JSON.stringify(previousStudents)); //override the previous array on the harddrive
    res.send({_id: req.body._id}) //return the newly generated ID
});

router.put("/:id", async (req, res) => { //handle PUT /students/:id
    //console.log(req.body);
    let students = readFile(); //get all the students
    let student = students.find(x => x._id == req.params.id) //search for the student with the given ID
    if (student) //if not undefined!
    {
        if (req.body.picture && req.body.picture.indexOf("http") >= 0) {
            req.body.picture = await fetchImage(req.body.picture);
        }
        let mergedStudent = Object.assign(student, req.body) //copy the properties in req.body on student
        let position = students.indexOf(student) //students[req.params.id - 1] = mergedStudent
        students[position] = mergedStudent; //assign the student
        fs.writeFileSync(studentsFilePath, JSON.stringify(students)); //override the students on disk
        res.send(mergedStudent) //return the student
    } else
        res.status(404).send("Not found")
});


router.delete("/:id", (req, res) => { //handle DELETE on /students/:id
    let students = readFile();
    let studentsToRemain = students.filter(x => x._id !== parseInt(req.params.id)); //keeps only the elements with a different id
    console.log(studentsToRemain);
    if (studentsToRemain.length < students.length) { //if the size of the arrays are different
        fs.writeFileSync(studentsFilePath, JSON.stringify(studentsToRemain)); //write it down
        res.send("Removed")
    } else
        res.status(404).send("Not found")
});

router.post("/checkEmail/:email", (req, res) => {  //handles POST /students/checkemail/{email}
    let students = readFile(); //reads all the students
    res.send(students.find(student => student.email == req.params.email)  //if there is a student with the given email
        ? "Email in use"  //<= returns Email in use
        : "Email not in use")  //returns email not in use
});

module.exports = router;