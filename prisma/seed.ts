const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.tipo_Activo.createMany({
    data: [
      { nombre: 'Servicio' },
      { nombre: 'Hardware'},
      { nombre: 'Informacion'},
      { nombre: 'Software'},
      { nombre: 'Instalacion'},
      { nombre: 'Personal'},
    ],
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());