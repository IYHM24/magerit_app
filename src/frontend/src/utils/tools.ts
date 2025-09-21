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

export const getValoracionVulnerabilidad = (valor: string) => {
  if (valor === "FMA") return 365/365;
  if (valor === "FA") return 26/365;
  if (valor === "FM") return 6/365;
  if (valor === "FB") return 2/365;
  if (valor === "FMB") return 1/365;
};

export const getValoracionImpacto = (valor: string) => {
  valor = capitalizeFirstLetter(valor.toLocaleLowerCase());
  if (valor === "Critico" || valor === "C") return 100;
  if (valor === "Alto" || valor === "A") return 75;
  if (valor === "Medio" || valor === "M") return 50;
  if (valor === "Bajo" || valor === "B") return 25;
}

export const calcularRiesgoIntrinseco = (
  valor_vulnerabilidad: number,
  valor_impacto: number,
  valor_activo: number
) => {
  const porcentaje = valor_impacto / 100; // riesgo ya está en base 100
  const riesgo = valor_activo * valor_vulnerabilidad * porcentaje;
  return riesgo;  
}