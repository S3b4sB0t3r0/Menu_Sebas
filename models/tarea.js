const { v4: uuidv4 } = require('uuid');


class Tarea {

    id = '';
    descripcion = '';
    Estado = null;

    constructor(descripcion) {

        this.id = uuidv4();
        this.descripcion = descripcion;
        this.Estado = null;
    }
}

module.exports = Tarea;


