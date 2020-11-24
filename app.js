const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { default: build } = require("jest-leak-detector");

const teamMembers = [];
const idArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createManager() {

    console.log("Please build your team");

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your manager\'s name?',
            name: 'managerName'
        },
        {
            type: 'input',
            message: 'What is your manager\'s id?',
            name: 'managerId'
        },
        {
            type: 'input',
            message: 'What is your manager\'s email?',
            name: 'managerEmail'
        },
        {
            type: 'input',
            message: 'What is your manager\'s office number?',
            name: 'managerOfficeNumber'
        }  
    ]).then(answer => {
        const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNumber);
        teamMembers.push(manager);
        idArray.push(answer.managerId);
        createTeam();
    });
}

const createTeam = () => 
    inquirer.prompt([
        {
            type: 'list',
            name: 'memberType',
            message: 'Which type of team member would you like to add?',
            choices: [
                'Engineer', 
                'Intern', 
                'I don\'t want to add any more team members'
            ]
        }
    ]).then(userChoice => {
        switch(userChoice.memberType) {
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            default:
                buildTeam();
        }
    });

const addEngineer = () =>
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your engineer\'s name?',
            name: 'engineerName'
        },
        {
            type: 'input',
            message: 'What is your engineer\'s id?',
            name: 'engineerId'
        },
        {
            type: 'input',
            message: 'What is your engineer\'s email?',
            name: 'engineerEmail'
        },
        {
            type: 'input',
            message: 'What is your engineer\'s github username?',
            name: 'engineerGithub'
        } 
    ]).then(answer => {
        const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub);
        teamMembers.push(engineer);
        idArray.push(answer.engineerId);
        createTeam();
    });

const addIntern = () =>
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is your intern\'s name?',
            name: 'internName'
        },
        {
            type: 'input',
            message: 'What is your intern\'s id?',
            name: 'internId'
        },
        {
            type: 'input',
            message: 'What is your intern\'s email?',
            name: 'internEmail'
        },
        {
            type: 'input',
            message: 'What is your intern\'s school name?',
            name: 'internSchoolName'
        }   
    ]).then(answer => {
        const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchoolName);
        teamMembers.push(intern);
        idArray.push(answer.internId);
        createTeam();
    });

function buildTeam() {
    console.log(teamMembers);

    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

createManager();
