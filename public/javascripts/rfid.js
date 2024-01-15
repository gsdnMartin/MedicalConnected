function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function recibirInformacion() {
    while(true){
        try{
            const response = await fetch("http://localhost:3000/rfid/alert");
            if(response.status === 200){
                const dato = await response.json();
                document.getElementById('medicamentos').value = dato.Medicamentos
                document.getElementById('nombre').value = dato.Nombre
                document.getElementById('apellido').value = dato.Apellido
                document.getElementById('edad').value = dato.Edad
                document.getElementById('fechaNacimiento').value = dato.FechaNacimiento
                document.getElementById('direccion').value = dato.Direccion
                document.getElementById('ocupacion').value = dato.Ocupacion
                document.getElementById('telefono').value = dato.NumeroContacto
                document.getElementById('medico').value = dato.MedicoResponsable
                document.getElementById('sangre').value = dato.GrupoSanguineo
                document.getElementById('sexo').value = dato.Sexo
                document.getElementById('habitacion').value = dato.Habitacion
                document.getElementById('alergias').value = dato.Alergias
                document.getElementById('cronicas').value = dato.EnfermedadesCronicas
                document.getElementById('motivo').value = dato.MotivoIngreso
                await sleep(2000)
            }
        }catch(e){
            console.log(e)
        }   
        await sleep(1000)
    }
}

recibirInformacion()

