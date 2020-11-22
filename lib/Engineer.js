class Engineer extends Employee {
    constructor(github) {
        this.github = github;
    }

    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}
module.exports = Engineer;