require('colors');
const Homework = require("./homeworkModel");

class Homeworks {
    _list = {};

    get listArray() {
        const list = [];
        Object.keys(this._list).forEach(key => {
            const homework = this._list[key];
            list.push(homework);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteHomework(id) {
        if(this._list[id]){
            delete this._list[id];
        }
    }

    uploadHomeworksFromArray( homeworks ){
        homeworks.forEach(homework => {
            this._list[homework.id] = homework;
        });
    }

    createHomeworks(description){
        const homework = new Homework(description);
        this._list[homework.id] = homework;
    }

    fullListing(){
        this.listArray.forEach((homework, i) =>{
            const index = `${i+1}.`.green;
            const { description, completedIn } = homework;
            const state = ( completedIn )
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${index} ${description} :: ${state}`);
        })
    }

    listPendingCompleted(completed = true){
        let index = 0;
        this.listArray.forEach((homework) =>{
            const {description, completedIn} = homework;
            const state = (completedIn)
                            ? 'Completada'.green
                            : 'Pendiente'.red
            if(completed){
                if(completedIn){
                    index +=1;
                    console.log(`${(index + '.').green} ${description} :: ${completedIn.green}`);
                }
            }else{
                if(!completedIn){
                    index +=1;
                    console.log(`${(index + '.').green} ${description} :: ${state}`);
                }
            }
        });

    }

    toggleCompleted(ids){
        
        ids.forEach((id) =>{
            const homework = this._list[id];
            if(!homework.completedIn){
                homework.completedIn = new Date().toISOString();
            }
        });

        this.listArray.forEach(homework=> {
            if(!ids.includes(homework.id)){
                homework.completedIn = null;
            }

        });

    }

}

module.exports = Homeworks;