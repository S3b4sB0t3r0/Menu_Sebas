const {menu,pause,Alert} = require('./models/menu');
const Tareas = require('./models/tareas');

const principal = async () => {

    let opt = '';
    const tareas = new Tareas();

    do {
        opt = await menu();

        switch (opt) {

            case '1':
                const descripcion = await Alert('Descripcion: ');
                tareas.crearTarea(descripcion);
                
                break;

            case '2':
                console.log(tareas.lisTareas);

                break;
            default:
                break;
        }

        await pause();
    } while (opt !== '0');

}

principal();