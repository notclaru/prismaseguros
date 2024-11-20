use sistema_prismaseguros;
create table datospersonales(
id_cliente int auto_increment primary key,
nombre varchar(100),
apellido varchar(100),
dni varchar(9),
email varchar(200),
celular varchar(10),
direccion varchar(100),
ciudad varchar(100),
provincia varchar(100)
);

ALTER TABLE datospersonales ADD COLUMN archivado BOOLEAN DEFAULT FALSE;

insert into datospersonales(nombre,apellido,dni,email,celular,direccion,ciudad,provincia)
values('Clara', 'Martínez', '77777777', 'clara@gmail.com', '0303456000', 'Pellegrini 7', 'Chivilcoy', 'Buenos Aires');
insert into datospersonales(nombre,apellido,dni,email,celular,direccion,ciudad,provincia)
values('Clarita', 'Martínez', '43013013', 'clarita@gmail.com', '0345676000', 'Pellegrini 77', 'Cordoba', 'Cordoba'),
('Clari', 'Martínez', '43000000', 'clari@gmail.com', '2345456000', 'Pellegrini 107', 'Riestra', 'Buenos Aires');

UPDATE datospersonales
SET email = 'claritamartinez@gmail.com', dni = '77013013'
WHERE dni = '77777777';

select * from datospersonales;
SELECT * FROM datospersonales WHERE id_cliente = 1;
