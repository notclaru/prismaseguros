CREATE TABLE datosVehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    tipo_vehiculo VARCHAR(100),
    patente VARCHAR(10),
    uso_vehiculo VARCHAR(100),
    foto VARCHAR(255),
    vigencia_desde DATE,
    vigencia_hasta DATE,
    id_marcas INT, 
    id_modelos INT,
    id_modeloanio INT,
    id_suma_asegurada INT, 
    id_cobertura INT, 
    FOREIGN KEY (id_cliente) REFERENCES datosPersonales(id_cliente),
    FOREIGN KEY (id_marcas) REFERENCES marcas(id_marcas),
    FOREIGN KEY (id_modelos) REFERENCES modelos(id_modelos),
    FOREIGN KEY (id_modeloanio) REFERENCES modelos_anios(id_modelo_anio),
    FOREIGN KEY (id_suma_asegurada) REFERENCES sumaAsegurada(id_suma),
    FOREIGN KEY (id_cobertura) REFERENCES coberturas(id_cobertura)
);
-- para borrar las claves foraneas de la tabla
ALTER TABLE datosvehiculo
DROP FOREIGN KEY datosvehiculo_ibfk_2,
DROP FOREIGN KEY datosvehiculo_ibfk_3,
DROP FOREIGN KEY datosvehiculo_ibfk_4,
DROP FOREIGN KEY datosvehiculo_ibfk_5,
DROP FOREIGN KEY datosvehiculo_ibfk_6;

-- renombrar un campo de la tabla
ALTER TABLE datosvehiculo
RENAME COLUMN id_marcas TO marcas,
RENAME COLUMN id_modelos TO modelos,
RENAME COLUMN id_modeloanio TO modeloanio,
RENAME COLUMN id_suma_asegurada TO suma_asegurada,
RENAME COLUMN id_cobertura TO cobertura;

-- para cambiar el tipo de dato, en este caso para pasar de int a varchar ya que no se maneja con id
ALTER TABLE datosvehiculo
MODIFY COLUMN marcas VARCHAR(100),
MODIFY COLUMN modelos VARCHAR(100),
MODIFY COLUMN cobertura VARCHAR(100);



INSERT INTO datosVehiculo (id_cliente, tipo_vehiculo, patente, uso_vehiculo, foto, vigencia_desde, vigencia_hasta, 
marcas, modelos, modeloanio, suma_asegurada, cobertura) VALUES (122,'Auto','ABC123','Particular','foto.jpg','2024-01-01','2025-01-01', 'bmw', '40gj', 2020, 200000, 'plan intermedio');


SELECT * FROM datosVehiculo;
-- SI NO LOS DEJA CAMBIEN EL MODO SAFE : SET SQL_SAFE_UPDATES = 0;
-- PARA VOLVER AL MODO SAFE : SET SQL_SAFE_UPDATES = 1;*/