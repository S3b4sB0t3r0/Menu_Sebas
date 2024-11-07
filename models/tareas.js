const Tarea = require('../models/tarea');

class Tareas {

    _listadoTareas = {};


    get lisTareas() {

        const _listadoTareas = [];
        Object.keys(this._listadoTareas).forEach( key => {
            const tarea = this._listadoTareas[key];
         _listadoTareas.push(tarea); 
        } )
        return _listadoTareas;
    }

    constructor() {
        this._listadoTareas = {};
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listadoTareas[tarea.id] = tarea;
    }



}


module.exports = Tareas;
