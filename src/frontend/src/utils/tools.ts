export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export const getValoracion = (valor: number) => {
  if (valor >= 20000000) return "Muy alto;MA";
  if (valor >= 10000000 && valor < 20000000) return "Alto;A";
  if (valor >= 5000000 && valor < 10000000) return "Medio;M";
  if (valor >= 1000000 && valor < 5000000) return "Bajo;B";
  if (valor < 1000000) return "Muy bajo;MB";
  return "Muy bajo;MB";
};