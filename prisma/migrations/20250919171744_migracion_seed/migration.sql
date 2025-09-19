-- CreateTable
CREATE TABLE "Departamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Tipo_Activo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Activo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "activo" TEXT NOT NULL,
    "id_tipo_activo" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "valoracion" TEXT NOT NULL,
    "autenticidad" INTEGER NOT NULL,
    "confidencialidad" INTEGER NOT NULL,
    "integridad" INTEGER NOT NULL,
    "disponibilidad" INTEGER NOT NULL,
    "trazabiliad" INTEGER NOT NULL,
    "id_propietario" INTEGER NOT NULL,
    CONSTRAINT "Activo_id_tipo_activo_fkey" FOREIGN KEY ("id_tipo_activo") REFERENCES "Tipo_Activo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Activo_id_propietario_fkey" FOREIGN KEY ("id_propietario") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nombre_key" ON "Departamento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_Activo_nombre_key" ON "Tipo_Activo"("nombre");
