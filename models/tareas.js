
const fs = require('fs');
const path = require('path');
const Tarea = require('../models/tarea');
const { guardarDB } = require('./Guardar.js'); 
const colors = require('colors');

class Tareas {
    _listadoTareas = {};
    static idCounter = 0; 

    get lisTareas() {
        const _listadoTareas = [];
        Object.keys(this._listadoTareas).forEach(key => {
            const tarea = this._listadoTareas[key];
            _listadoTareas.push(tarea);
        });
        return _listadoTareas;
    }

    constructor() {
        this._listadoTareas = {};
        this.cargarDB(); 
    }

    crearTarea(descripcion = '') {
        const tarea = new Tarea(descripcion);
        this._listadoTareas[tarea.id] = tarea;

        // Guardar las tareas en el archivo JSON
        guardarDB(this.lisTareas);
    }

    mostrarTareas() {
        console.log();
        if (this.lisTareas.length === 0) {
            console.log('No hay tareas disponibles.'.red);
            return;
        }

        console.log('┌──────────────────────────────────────────────────────┐'.cyan);
        console.log('│                    Lista de Tareas                   │'.cyan);
        console.log('├────────────┬───────────────────────────┬─────────────┤'.cyan);
        console.log('│ ID         │ Tarea                     │ Estado      │'.cyan);
        console.log('├────────────┼───────────────────────────┼─────────────┤'.cyan);

        this.lisTareas.forEach((tarea) => {
            const estado = tarea.Estado === null ? 'Incompleta'.red : 'Completada'.green;
            const descripcion = tarea.descripcion.length > 35 ? tarea.descripcion.substring(0, 32) + '...' : tarea.descripcion;
            console.log(`│ ${tarea.id.toString().padEnd(10)} │ ${descripcion.padEnd(25)} │ ${estado.padEnd(12)} │`.cyan);
        });

        console.log('└────────────┴───────────────────────────┴─────────────┘'.cyan);
        console.log();
    }

    completarTarea(id) {
        if (this._listadoTareas[id]) {
            this._listadoTareas[id].Estado = true; 
            guardarDB(this.lisTareas); 
            return true;
        }
        return false; 
    }

    borrarTarea(id) {
        if (this._listadoTareas[id]) {
            delete this._listadoTareas[id]; 
            guardarDB(this.lisTareas); 
            return true;
        }
        return false; 
    }

    cargarDB() {
        const archivo = path.join(__dirname, '../db/data.json'); 

        if (fs.existsSync(archivo)) {
            const data = fs.readFileSync(archivo, { encoding: 'utf-8' });
            this._listadoTareas = JSON.parse(data);

            
            if (this.lisTareas.length > 0) {
                Tareas.idCounter = Math.max(...this.lisTareas.map(t => t.id)); 
            }
        }
    }
}

module.exports = Tareas;