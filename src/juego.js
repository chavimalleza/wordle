// Devuelve el estado de cada letra respetando las letras repetidas.
// Primero se reservan las coincidencias exactas y después las letras presentes.
export function estadosDeIntento(intento, solucion) {
  const resultado = Array(intento.length).fill('ausente')
  const restantes = solucion.split('')

  for (let i = 0; i < intento.length; i++) {
    if (intento[i] === solucion[i]) {
      resultado[i] = 'correcta'
      restantes[i] = null
    }
  }

  for (let i = 0; i < intento.length; i++) {
    if (resultado[i] === 'correcta') continue
    const posicion = restantes.indexOf(intento[i])
    if (posicion !== -1) {
      resultado[i] = 'presente'
      restantes[posicion] = null
    }
  }

  return resultado
}

export function tableroVacio(filas = 6, columnas = 5) {
  return Array.from({ length: filas }, () => Array(columnas).fill(''))
}
