var colors = require('colors');
const inquirer = require('inquirer');

const questions = {
    type: 'list',
    name: 'options',
    message: 'Escoger la opcion de tu preferencia',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea',
        },
        {
            value: '2',
            name: '2. Lista de tareas',
        },
        {
            value: '3',
            name: '3. Mostrar todas las tareas completadas',
        },
        {
            value: '4',
            name: '4. Mostrar lista de tareas incompletas',
        },
        {
            value: '5',
            name: '5. Completar tarea (s)',
        },
        {
            value: '6',
            name: '6. Borrar tarea (s)',
        },
        {
            value: '0',
            name: '0. Salir',
        }
    ]
}

const menu = async() => {
    console.clear();
    console.log(`${'ººººººººººººººººººººººººººººººººººººººººººº'.blue}`);
    console.log(`${'º            Bienvenido al Menu           º'.blue}`);
    console.log(`${'ººººººººººººººººººººººººººººººººººººººººººº'.blue}`);

    const { options } = await inquirer.default.prompt(questions);

    return options;
}

const pause = async() => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'enter'.green}`
        }
    ]

    await inquirer.default.prompt(questions);
}

const Alert = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor seleccione una opcion'
                }
                return true;
            }
        }
    ];


    const { descripcion } = await inquirer.default.prompt(question);
    return descripcion;
}

module.exports = {
    menu,
    pause,
    Alert,
}