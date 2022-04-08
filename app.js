require('colors');

const { confirm, inquirerMenu, pause, readInput, deleteHomework, showListChecklist } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Homeworks = require('./models/homeworksModel');

const main = async() => {
    let option = '';
    const homeworks =new Homeworks();
    const homeworksDB = readDB();

    if(homeworksDB){
        homeworks.uploadHomeworksFromArray(homeworksDB);
    }

    do {
        
        option = await inquirerMenu();

        switch (option) {
            case '1':
                //Create option
                const description = await readInput('Descripción:');
                homeworks.createHomeworks(description);
                saveDB( homeworks.listArray );
            break;
            case '2':
                //List homeworks
                homeworks.fullListing();
            break;
            case '3':
                //List  completed homeworks
                homeworks.listPendingCompleted();
            break;
            case '4':
                //List pending homeworks 
                homeworks.listPendingCompleted(false);
            break;
            case '5':
                //Complete homework(s)
                const ids = await showListChecklist(homeworks.listArray);
                homeworks.toggleCompleted(ids);
                saveDB( homeworks.listArray );
            break;
            case '6':
                //Delete homeworks
                const id = await deleteHomework(homeworks.listArray);
                if(id !== '0'){
                    const confirmation = await confirm('¿Desea continuar con esta acción?');
                    if(confirmation){
                        homeworks.deleteHomework(id);
                        saveDB( homeworks.listArray );
                        console.log('Tarea borrada correctamente...');
                    }
                }
            break;
        }

        await pause();
        
    } while (option !== '0');

}

main();