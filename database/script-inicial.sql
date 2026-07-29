-- ==========================================
-- BASE DE DATOS UPDSJudge
-- PostgreSQL + EF Core 10 + Npgsql
-- Migración inicial m1
-- ==========================================


-- =========================
-- TABLA USUARIOS
-- =========================

CREATE TABLE "Usuarios" (
    "idUsuario" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL UNIQUE,
    "contrasena" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP WITH TIME ZONE NOT NULL,
    "estado" TEXT NOT NULL
);


-- =========================
-- TABLA ROLES
-- =========================

CREATE TABLE "Roles" (
    "idRol" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL
);


-- =========================
-- TABLA LENGUAJES
-- =========================

CREATE TABLE "Lenguajes" (
    "idLenguaje" SERIAL PRIMARY KEY,
    "idJudge0" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);


-- =========================
-- TABLA CONCURSOS
-- =========================

CREATE TABLE "Concursos" (
    "idConcurso" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP WITH TIME ZONE NOT NULL,
    "duracionMinutos" INTEGER NOT NULL,
    "contrasena" TEXT NULL,
    "urlSetProblemas" TEXT NOT NULL,
    "minutosCongelamiento" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "idUsuarioCreador" INTEGER NOT NULL,

    CONSTRAINT "FK_Concursos_Usuarios"
        FOREIGN KEY ("idUsuarioCreador")
        REFERENCES "Usuarios"("idUsuario")
        ON DELETE CASCADE
);


CREATE INDEX "IX_Concursos_idUsuarioCreador"
ON "Concursos"("idUsuarioCreador");



-- =========================
-- TABLA USUARIO ROLES
-- =========================

CREATE TABLE "UsuarioRoles" (
    "idUsuarioRol" SERIAL PRIMARY KEY,
    "idUsuario" INTEGER NOT NULL,
    "idRol" INTEGER NOT NULL,

    CONSTRAINT "FK_UsuarioRoles_Usuarios"
        FOREIGN KEY ("idUsuario")
        REFERENCES "Usuarios"("idUsuario")
        ON DELETE CASCADE,

    CONSTRAINT "FK_UsuarioRoles_Roles"
        FOREIGN KEY ("idRol")
        REFERENCES "Roles"("idRol")
        ON DELETE CASCADE
);


CREATE INDEX "IX_UsuarioRoles_idUsuario"
ON "UsuarioRoles"("idUsuario");


CREATE INDEX "IX_UsuarioRoles_idRol"
ON "UsuarioRoles"("idRol");



-- =========================
-- TABLA PARTICIPANTES CONCURSOS
-- =========================

CREATE TABLE "ParticipantesConcursos" (
    "idParticipanteConcurso" SERIAL PRIMARY KEY,
    "fechaIngreso" TIMESTAMP WITH TIME ZONE NOT NULL,
    "estado" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idConcurso" INTEGER NOT NULL,


    CONSTRAINT "FK_ParticipantesConcursos_Usuarios"
        FOREIGN KEY ("idUsuario")
        REFERENCES "Usuarios"("idUsuario")
        ON DELETE CASCADE,


    CONSTRAINT "FK_ParticipantesConcursos_Concursos"
        FOREIGN KEY ("idConcurso")
        REFERENCES "Concursos"("idConcurso")
        ON DELETE CASCADE
);


CREATE INDEX "IX_ParticipantesConcursos_idUsuario_idConcurso"
ON "ParticipantesConcursos"("idUsuario","idConcurso")
UNIQUE;


CREATE INDEX "IX_ParticipantesConcursos_idUsuario"
ON "ParticipantesConcursos"("idUsuario");


CREATE INDEX "IX_ParticipantesConcursos_idConcurso"
ON "ParticipantesConcursos"("idConcurso");



-- =========================
-- TABLA PROBLEMAS
-- =========================

CREATE TABLE "Problemas" (
    "idProblema" SERIAL PRIMARY KEY,
    "inciso" CHAR(1) NOT NULL,
    "titulo" TEXT NOT NULL,
    "tiempo" REAL NOT NULL,
    "memoria" INTEGER NOT NULL,
    "colorGlobo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "idConcurso" INTEGER NOT NULL,


    CONSTRAINT "FK_Problemas_Concursos"
        FOREIGN KEY ("idConcurso")
        REFERENCES "Concursos"("idConcurso")
        ON DELETE CASCADE
);


CREATE INDEX "IX_Problemas_idConcurso"
ON "Problemas"("idConcurso");



-- =========================
-- TABLA CASOS DE PRUEBA
-- =========================

CREATE TABLE "CasosPrueba" (
    "idCasoPrueba" SERIAL PRIMARY KEY,
    "entrada" TEXT NOT NULL,
    "salida" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "idProblema" INTEGER NOT NULL,


    CONSTRAINT "FK_CasosPrueba_Problemas"
        FOREIGN KEY ("idProblema")
        REFERENCES "Problemas"("idProblema")
        ON DELETE CASCADE
);


CREATE INDEX "IX_CasosPrueba_idProblema"
ON "CasosPrueba"("idProblema");



-- =========================
-- TABLA ENVIOS
-- =========================

CREATE TABLE "Envios" (
    "idEnvio" SERIAL PRIMARY KEY,
    "codigo" TEXT NOT NULL,
    "resultado" TEXT NOT NULL,
    "tiempo" REAL NOT NULL,
    "memoria" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "upsolving" TEXT NOT NULL,
    "fechaEnvio" TIMESTAMP WITH TIME ZONE NOT NULL,

    "idUsuario" INTEGER NOT NULL,
    "idProblema" INTEGER NOT NULL,
    "idLenguaje" INTEGER NOT NULL,


    CONSTRAINT "FK_Envios_Usuarios"
        FOREIGN KEY ("idUsuario")
        REFERENCES "Usuarios"("idUsuario")
        ON DELETE CASCADE,


    CONSTRAINT "FK_Envios_Problemas"
        FOREIGN KEY ("idProblema")
        REFERENCES "Problemas"("idProblema")
        ON DELETE CASCADE,


    CONSTRAINT "FK_Envios_Lenguajes"
        FOREIGN KEY ("idLenguaje")
        REFERENCES "Lenguajes"("idLenguaje")
        ON DELETE CASCADE
);


CREATE INDEX "IX_Envios_idUsuario"
ON "Envios"("idUsuario");


CREATE INDEX "IX_Envios_idProblema"
ON "Envios"("idProblema");


CREATE INDEX "IX_Envios_idLenguaje"
ON "Envios"("idLenguaje");



-- =====================================
-- DATOS INICIALES (SEED EF CORE)
-- =====================================


INSERT INTO "Lenguajes"
(
"idLenguaje",
"idJudge0",
"nombre",
"extension",
"estado"
)
VALUES
(1,54,'C++ (GCC 9.2.0)','cpp','Activo'),
(2,71,'Python (3.8.1)','py','Activo'),
(3,51,'C# (Mono 6.6.0.161)','cs','Activo');



INSERT INTO "Roles"
(
"idRol",
"nombre"
)
VALUES
(1,'AdministradorRoles'),
(2,'AdministradorConcursos'),
(3,'Usuario');



INSERT INTO "Usuarios"
(
"idUsuario",
"nombre",
"correo",
"contrasena",
"fechaRegistro",
"estado"
)
VALUES
(
1,
'Wilson',
'wilsonyucra413@gmail.com',
'$2a$11$lHroH6rOVBeO6wtdG9F0ouo3.7i3HNXiuNXtTcykjDO2tKsGtc7kS',
'2026-01-01 00:00:00+00',
'Activo'
);



INSERT INTO "UsuarioRoles"
(
"idUsuarioRol",
"idUsuario",
"idRol"
)
VALUES
(1,1,1),
(2,1,2),
(3,1,3);



-- =====================================
-- AJUSTE DE SECUENCIAS SERIAL
-- necesario porque insertamos IDs manualmente
-- =====================================

SELECT setval(
    pg_get_serial_sequence('"Usuarios"','idUsuario'),
    (SELECT MAX("idUsuario") FROM "Usuarios")
);


SELECT setval(
    pg_get_serial_sequence('"Roles"','idRol'),
    (SELECT MAX("idRol") FROM "Roles")
);


SELECT setval(
    pg_get_serial_sequence('"Lenguajes"','idLenguaje'),
    (SELECT MAX("idLenguaje") FROM "Lenguajes")
);


SELECT setval(
    pg_get_serial_sequence('"UsuarioRoles"','idUsuarioRol'),
    (SELECT MAX("idUsuarioRol") FROM "UsuarioRoles")
);