const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type:'list',
        name:'option',
        message:'¿Qué desea hacer?.',
        choices:[
            {
                value: '1',
                name:`${'1'.green}. Crear tarea`
            },
            {
                value:'2',
                name:`${'2'.green}. Listar tareas`
            },
            {
                value:'3',
                name:`${'3'.green}. Listar tareas completadas`
            },
            {
                value:'4',
                name:`${'4'.green}. Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${'5'.green}. Completar tarea(s)`
            },
            {
                value:'6',
                name:`${'6'.green}. Borrar tarea`
            },
            {
                value:'0',
                name:`${'0'.green}. Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  ');
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
}

const readInput = async(message) => {

    const question =[
        {
            type:'input',
            name:'description',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor.';
                }
                return true;
            }
        }
    ];

    const { description} = await inquirer.prompt(question);
    return description;
}

const deleteHomework = async(homeworks) => {

    const choices = homeworks.map((homework, i) =>{

        const { id, description } = homework;

        i = `${i+1}. `.green;

        return {
            value:id,
            name:`${i} ${ description }`
        }
    });

    choices.unshift({
        value:'0',
        name: '0. '.green + 'Cancelar'
    });

    const questions = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {

    const question =[
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const pause = async() => {
    await inquirer.prompt({
        type: 'input',
        name: 'pause',
        message: `\nPrecione${' ENTER '.green}para continuar...\n`,
    })
}

const showListChecklist = async(homeworks) => {

    const choices = homeworks.map((homework, i) =>{

        const { id, description } = homework;

        i = `${i+1}. `.green;

        return {
            value:id,
            name:`${i} ${ description }`,
            checked: ( homework.completedIn) ? true : false
        }
    });

    const question = [
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione tarea(s) a completar:',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    confirm,
    inquirerMenu,
    readInput,
    pause,
    showListChecklist,
    deleteHomework
}