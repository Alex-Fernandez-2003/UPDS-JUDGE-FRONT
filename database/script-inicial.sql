-- UPDS JUDGE - Script inicial de dominio para PostgreSQL
-- La autenticación y las tablas AspNetUsers/AspNetRoles/AspNetUserRoles deben
-- generarse mediante migraciones de ASP.NET Core Identity y Entity Framework Core.
-- Este script no almacena contraseñas en texto plano.

BEGIN;

CREATE TYPE estado_concurso AS ENUM ('BORRADOR','PROGRAMADO','EN_CURSO','FINALIZADO','CANCELADO');
CREATE TYPE estado_problema AS ENUM ('BORRADOR','PUBLICADO','DESHABILITADO');
CREATE TYPE estado_participacion AS ENUM ('ACTIVA','CANCELADA','DESCALIFICADA');
CREATE TYPE estado_envio AS ENUM ('EN_COLA','COMPILANDO','EVALUANDO','FINALIZADO','ERROR_INTERNO','CANCELADO');
CREATE TYPE veredicto_envio AS ENUM ('ACCEPTED','WRONG_ANSWER','TIME_LIMIT_EXCEEDED','MEMORY_LIMIT_EXCEEDED','COMPILATION_ERROR','RUNTIME_ERROR','INTERNAL_ERROR');

CREATE TABLE concursos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(160) NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMPTZ NOT NULL,
    duracion_minutos INTEGER NOT NULL CHECK (duracion_minutos > 0),
    contrasena_hash TEXT,
    url_set_problemas TEXT,
    minutos_congelamiento INTEGER NOT NULL DEFAULT 0 CHECK (minutos_congelamiento >= 0),
    estado estado_concurso NOT NULL DEFAULT 'BORRADOR',
    usuario_creador_id TEXT NOT NULL,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_congelamiento_duracion CHECK (minutos_congelamiento <= duracion_minutos)
    -- FK a AspNetUsers se agrega desde la migración EF Core del backend.
);

CREATE TABLE participantes_concursos (
    id BIGSERIAL PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    concurso_id BIGINT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
    fecha_ingreso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    estado estado_participacion NOT NULL DEFAULT 'ACTIVA',
    UNIQUE (usuario_id, concurso_id)
);

CREATE TABLE problemas (
    id BIGSERIAL PRIMARY KEY,
    concurso_id BIGINT NOT NULL REFERENCES concursos(id) ON DELETE CASCADE,
    inciso VARCHAR(4) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    tiempo_limite_ms INTEGER NOT NULL CHECK (tiempo_limite_ms > 0),
    memoria_limite_kb INTEGER NOT NULL CHECK (memoria_limite_kb > 0),
    estado estado_problema NOT NULL DEFAULT 'BORRADOR',
    orden INTEGER NOT NULL DEFAULT 0 CHECK (orden >= 0),
    UNIQUE (concurso_id, inciso),
    UNIQUE (concurso_id, orden)
);

CREATE TABLE casos_prueba (
    id BIGSERIAL PRIMARY KEY,
    problema_id BIGINT NOT NULL REFERENCES problemas(id) ON DELETE CASCADE,
    entrada_path TEXT NOT NULL,
    salida_esperada_path TEXT NOT NULL,
    orden INTEGER NOT NULL CHECK (orden > 0),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (problema_id, orden)
);

CREATE TABLE lenguajes (
    id BIGSERIAL PRIMARY KEY,
    judge0_language_id INTEGER NOT NULL UNIQUE,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    extension VARCHAR(16) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE envios (
    id BIGSERIAL PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    problema_id BIGINT NOT NULL REFERENCES problemas(id) ON DELETE RESTRICT,
    lenguaje_id BIGINT NOT NULL REFERENCES lenguajes(id) ON DELETE RESTRICT,
    codigo_path TEXT NOT NULL,
    estado estado_envio NOT NULL DEFAULT 'EN_COLA',
    veredicto veredicto_envio,
    tiempo_ms INTEGER CHECK (tiempo_ms IS NULL OR tiempo_ms >= 0),
    memoria_kb INTEGER CHECK (memoria_kb IS NULL OR memoria_kb >= 0),
    judge0_token TEXT,
    es_upsolving BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_envio TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    finalizado_en TIMESTAMPTZ
);

CREATE TABLE resultados_casos (
    id BIGSERIAL PRIMARY KEY,
    envio_id BIGINT NOT NULL REFERENCES envios(id) ON DELETE CASCADE,
    caso_prueba_id BIGINT NOT NULL REFERENCES casos_prueba(id) ON DELETE RESTRICT,
    veredicto veredicto_envio NOT NULL,
    tiempo_ms INTEGER CHECK (tiempo_ms IS NULL OR tiempo_ms >= 0),
    memoria_kb INTEGER CHECK (memoria_kb IS NULL OR memoria_kb >= 0),
    detalle_interno TEXT,
    UNIQUE (envio_id, caso_prueba_id)
);

CREATE TABLE auditoria_roles (
    id BIGSERIAL PRIMARY KEY,
    actor_usuario_id TEXT NOT NULL,
    usuario_afectado_id TEXT NOT NULL,
    rol VARCHAR(120) NOT NULL,
    accion VARCHAR(16) NOT NULL CHECK (accion IN ('ASIGNAR','REVOCAR')),
    fecha TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ix_concursos_estado_fecha ON concursos (estado, fecha_inicio);
CREATE INDEX ix_participantes_concurso ON participantes_concursos (concurso_id, estado);
CREATE INDEX ix_envios_usuario_fecha ON envios (usuario_id, fecha_envio DESC);
CREATE INDEX ix_envios_problema_veredicto ON envios (problema_id, veredicto);
CREATE INDEX ix_envios_estado_fecha ON envios (estado, fecha_envio);

INSERT INTO lenguajes (judge0_language_id, nombre, extension) VALUES
    (54, 'C++', '.cpp'),
    (71, 'Python', '.py'),
    (51, 'C#', '.cs')
ON CONFLICT DO NOTHING;

COMMIT;
