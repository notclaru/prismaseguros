use sistema_prismaseguros;
CREATE TABLE usuarios (
    id_usuarios INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    clave VARCHAR(100) NOT NULL,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id_roles)
);

insert into usuarios (nombre, apellido, dni, email, clave, rol_id)values('Clara', 'Martínez', '77777777', 'clarrmartinez@gmail.com', '1', 1);
insert into usuarios (nombre, apellido, dni, email, clave, rol_id)values('Clarita', 'Martínez', '77013013', 'claritamartinez@gmail.com', '1', 2);

select * from usuarios;