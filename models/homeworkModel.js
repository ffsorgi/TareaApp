const { v4: uuidv4 } = require('uuid');

class Homework {
    id='';
    description='';
    completedIn= null;

    constructor(description){
        this.id=uuidv4();
        this.description= description;
    }
}

module.exports = Homework;