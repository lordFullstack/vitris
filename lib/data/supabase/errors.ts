// Un id que no tiene forma de UUID (por ejemplo, un link viejo tipo
// "p1" del mock, o cualquier cosa que alguien escriba en la URL) hace que
// Postgres tire un error de tipo (22P02), no "sin resultados". Sin este
// chequeo, esas rutas caen en la pantalla de error genérica en vez de
// mostrar "no encontrado" — que es lo correcto para un id con forma inválida.
export function isInvalidIdError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "22P02"
  );
}
