
const { menu, pause, Alert } = require('./models/menu');
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
                tareas.mostrarTareas(); 
                break;

            case '3':
                const completadas = tareas.lisTareas.filter(t => t.Estado === true);
                if (completadas.length === 0) {
                    console.log('No hay tareas completadas.'.red);
                } else {
                    console.log('┌────────────────────────────┐'.cyan);
                    console.log('│      Tareas Completadas   │'.cyan);
                    console.log('├────────────────────────────┤'.cyan);
                    completadas.forEach(t => console.log(`│ ${t.descripcion} │`.cyan));
                    console.log('└────────────────────────────┘'.cyan);
                }
                break;

            case '4':
                const incompletasParaMostrar = tareas.lisTareas.filter(t => t.Estado === null);
                if (incompletasParaMostrar.length === 0) {
                    console.log('No hay tareas incompletas.'.red);
                } else {
                    console.log('┌─────────────────────────────┐'.cyan);
                    console.log('│     Tareas Incompletas      │'.cyan);
                    console.log('├─────────────────────────────┤'.cyan);
                    incompletasParaMostrar.forEach(t => console.log(`│ ${t.id.toString().padEnd(5)} │ ${t.descripcion.padEnd(25)} │`.cyan));
                    console.log('└─────────────────────────────┘'.cyan);

                    const idCompletar = await Alert('Ingrese el ID de la tarea a completar: ');
                    if (tareas.completarTarea(idCompletar)) {
                        console.log(`La tarea con ID ${idCompletar} ha sido completada.`.green);
                    } else {
                        console.log(`No se encontró la tarea con ID ${idCompletar}.`.red);
                    }
                }
                break;

            case '5':
                const incompletasParaBorrar = tareas.lisTareas.filter(t => t.Estado === null);
                if (incompletasParaBorrar.length === 0) {
                    console.log('No hay tareas para eliminar.'.red);
                } else {
                    console.log('┌─────────────────────────────┐'.cyan);
                    console.log('│     Tareas Incompletas      │'.cyan);
                    console.log('├─────────────────────────────┤'.cyan);
                    incompletasParaBorrar.forEach(t => console.log(`│ ${t.id.toString().padEnd(5)} │ ${t.descripcion.padEnd(25)} │`.cyan));
                    console.log('└─────────────────────────────┘'.cyan);

                    const idBorrar = await Alert('Ingrese el ID de la tarea a borrar: ');
                    if (tareas.borrarTarea(idBorrar)) {
                        console.log(`La tarea con ID ${idBorrar} ha sido borrada.`.green);
                    } else {
                        console.log(`No se encontró la tarea con ID ${idBorrar}.`.red);
                    }
                }
                break;

            case '6':
                const incompletasParaEliminar = tareas.lisTareas.filter(t => t.Estado === null);
                if (incompletasParaEliminar.length === 0) {
                    console.log('No hay tareas para eliminar.'.red);
                } else {
                    console.log('┌─────────────────────────────┐'.cyan);
                    console.log('│     Tareas Incompletas      │'.cyan);
                    console.log('├─────────────────────────────┤'.cyan);
                    incompletasParaEliminar.forEach(t => console.log(`│ ${t.id.toString().padEnd(5)} │ ${t.descripcion.padEnd(25)} │`.cyan));
                    console.log('└─────────────────────────────┘'.cyan);

                    const idEliminar = await Alert('Ingrese el ID de la tarea a eliminar: ');
                    if (tareas.borrarTarea(idEliminar)) {
                        console.log(`La tarea con ID ${idEliminar} ha sido eliminada.`.green);
                    } else {
                        console.log(`No se encontró la tarea con ID ${idEliminar}.`.red);
                    }
                }
                break;

            default:
                break;
        }

        await pause();
    } while (opt !== '0');

}

principal();