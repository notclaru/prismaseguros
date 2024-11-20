const Vehiculo = require('../models/ver_vehiculos_modelo');

class VehiculoControlador {
    async obtenerVehiculosCliente(req, res) {
        try {
            const id_cliente = parseInt(req.params.id_cliente);
            console.log('ID Cliente recibido:', id_cliente);
            const cliente = await Vehiculo.getClienteById(id_cliente);

            if (!cliente) {
                return res.status(404).send('Cliente no encontrado');
            }

            const vehiculos = await Vehiculo.obtenerVehiculosXCliente(id_cliente) || [];
            const imagenPath = cliente.imagen; 
            vehiculos.forEach(vehiculo => {
                console.log('Fecha original vigencia_desde:', vehiculo.vigencia_desde);
                vehiculo.vigencia_desde = formatDate(vehiculo.vigencia_desde);
                console.log('Fecha formateada vigencia_desde:', vehiculo.vigencia_desde);

                console.log('Fecha original vigencia_hasta:', vehiculo.vigencia_hasta);
                vehiculo.vigencia_hasta = formatDate(vehiculo.vigencia_hasta);
                console.log('Fecha formateada vigencia_hasta:', vehiculo.vigencia_hasta);
            });

            res.render('vehiculos', {
                imagenPath: imagenPath,  
                vehiculos: vehiculos,
                usuario: cliente
            });
        } catch (error) {
            console.error('Error al obtener los vehículos:', error);
            res.status(500).send('Error interno del servidor');
        }
    }

    async editarVehiculo(req, res) {
        try {
            const { id_vehiculo, patente, tipo_vehiculo, uso_vehiculo, anio, vigencia_desde, vigencia_hasta, id_marcas, id_modelos, suma_asegurada, premio_total } = req.body;

            await Vehiculo.actualizarVehiculo({
                id_vehiculo,
                patente,
                tipo_vehiculo,
                uso_vehiculo,
                anio,
                vigencia_desde,
                vigencia_hasta,
                id_marcas,
                id_modelos,
                suma_asegurada,
                premio_total
            });

            res.json({ success: true, message: 'Vehículo actualizado correctamente' });
        } catch (error) {
            console.error('Error al actualizar el vehículo:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.log(`Fecha inválida: ${dateString}`);
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

module.exports = new VehiculoControlador();
