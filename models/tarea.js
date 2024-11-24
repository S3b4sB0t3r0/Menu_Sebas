
let idCounter = 0; 

class Tarea {
    constructor(descripcion) {
        idCounter++; 
        this.id = idCounter; 
        this.descripcion = descripcion;
        this.Estado = null; 
    }
}

module.exports = Tarea;