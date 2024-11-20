CREATE TABLE coberturas (
    id_cobertura INT AUTO_INCREMENT PRIMARY KEY,
    id_suma INT,
    tipo_plan ENUM('Básico', 'Intermedio', 'Premium', 'Master') NOT NULL,
    prima DECIMAL(10, 2) NOT NULL,
    premio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_suma) REFERENCES sumaAsegurada(id_suma)
);

INSERT INTO coberturas(id_suma,tipo_plan,prima,premio) VALUE('1','Intermedio','10000','18000');