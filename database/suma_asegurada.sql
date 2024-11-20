CREATE TABLE sumaAsegurada (
    id_suma INT AUTO_INCREMENT PRIMARY KEY,
    id_anio INT NOT NULL,                    
    suma DECIMAL(10, 2) NOT NULL,                   
    FOREIGN KEY (id_anio) REFERENCES modelos_anios(id_anio) 
);

INSERT INTO sumaasegurada (id_anio,suma) VALUES (17,200000),(12,230000);
delete from sumaasegurada where id_suma = 4;


SET SQL_SAFE_UPDATES = 0;

select * from sumaasegurada;
