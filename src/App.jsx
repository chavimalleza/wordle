import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'
import { estadosDeIntento, tableroVacio } from './juego.js'

const FILAS = 6
const COLUMNAS = 5
const PALABRAS = [
  'PERRO', 'GATOS', 'CASAS', 'LIBRO', 'NUBES',
  'PLATO', 'FRESA', 'QUESO', 'BARCO', 'CAMPO',
  'VERDE', 'NOCHE', 'RELOJ', 'PARED', 'FUEGO',
  'CIELO', 'PUNTO', 'DULCE', 'MUNDO', 'CARTA',
]

function elegirSolucion() {
  return PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
}

function App() {
  const [intentos, setIntentos] = useState(() => tableroVacio(FILAS, COLUMNAS))
  const [filaActual, setFilaActual] = useState(0)
  const [solucion, setSolucion] = useState(elegirSolucion)
  const [aviso, setAviso] = useState('')

  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS

  useEffect(() => {
    if (!terminada) {
      document.querySelector('.casilla:enabled')?.focus()
    }
  }, [filaActual, terminada])

  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toLocaleUpperCase('es-ES')
    if (!/^[A-ZÑ]?$/.test(letra)) return

    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)
    setAviso('')

    if (letra !== '') evento.target.nextElementSibling?.focus()
  }

  function manejarTecla(f, c, evento) {
    if (evento.key === 'Backspace' && intentos[f][c] === '' && c > 0) {
      evento.preventDefault()
      evento.target.previousElementSibling?.focus()
    }
  }

  function comprobar(evento) {
    evento.preventDefault()
    if (terminada) return

    if (intentos[filaActual].includes('')) {
      setAviso('Faltan letras.')
      return
    }

    setAviso('')
    setFilaActual((fila) => fila + 1)
  }

  function nuevaPartida() {
    setIntentos(tableroVacio(FILAS, COLUMNAS))
    setFilaActual(0)
    setSolucion(elegirSolucion())
    setAviso('')
  }

  const estadosFilas = intentos.map((fila, f) =>
    f < filaActual ? estadosDeIntento(fila.join(''), solucion) : Array(COLUMNAS).fill(''),
  )

  const letrasUsadas = {}
  for (let f = 0; f < filaActual; f++) {
    for (let c = 0; c < COLUMNAS; c++) {
      const letra = intentos[f][c]
      const estado = estadosFilas[f][c]
      const prioridad = { ausente: 1, presente: 2, correcta: 3 }
      if (letra && (!letrasUsadas[letra] || prioridad[estado] > prioridad[letrasUsadas[letra]])) {
        letrasUsadas[letra] = estado
      }
    }
  }

  function pulsarLetra(letra) {
    if (terminada) return
    const fila = intentos[filaActual]
    let columna = fila.findIndex((valor) => valor === '')
    if (columna === -1) return

    const copia = intentos.map((r) => [...r])
    copia[filaActual][columna] = letra
    setIntentos(copia)
    setAviso('')
    requestAnimationFrame(() => {
      const casillas = document.querySelectorAll('.casilla:enabled')
      casillas[columna + 1]?.focus()
    })
  }

  function borrarLetra() {
    if (terminada) return
    const fila = intentos[filaActual]
    let columna = fila.findIndex((valor) => valor === '')
    if (columna === -1) columna = COLUMNAS
    const destino = Math.max(0, columna - 1)
    const copia = intentos.map((r) => [...r])
    copia[filaActual][destino] = ''
    setIntentos(copia)
    requestAnimationFrame(() => document.querySelectorAll('.casilla:enabled')[destino]?.focus())
  }

  return (
    <main className="juego">
      <header className="cabecera">
        <h1>WORDLE</h1>
        <p>Adivina la palabra de cinco letras</p>
      </header>

      <form onSubmit={comprobar}>
        <div className="tablero" aria-label="Tablero de juego">
          {intentos.map((fila, f) => (
            <div className="fila" key={f}>
              {fila.map((letra, c) => (
                <Casilla
                  key={c}
                  letra={letra}
                  estado={estadosFilas[f][c]}
                  activa={f === filaActual && !terminada}
                  fila={f}
                  columna={c}
                  onCambio={(evento) => cambiarLetra(f, c, evento)}
                  onTecla={(evento) => manejarTecla(f, c, evento)}
                />
              ))}
            </div>
          ))}
        </div>

        {aviso && <p className="aviso" role="alert">{aviso}</p>}

        {!terminada ? (
          <button className="boton principal" type="submit">Comprobar</button>
        ) : (
          <section className="resultado" role="status">
            <p>{ganada ? '¡Enhorabuena, has acertado!' : `Se acabaron los intentos. La palabra era ${solucion}.`}</p>
            <button className="boton principal" type="button" onClick={nuevaPartida}>Nueva partida</button>
          </section>
        )}
      </form>

      <section className="teclado" aria-label="Teclado en pantalla">
        {'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('').map((letra) => (
          <button
            type="button"
            key={letra}
            className={`tecla ${letrasUsadas[letra] || ''}`}
            onClick={() => pulsarLetra(letra)}
            disabled={terminada || filaActual >= FILAS}
            aria-label={`Letra ${letra}`}
          >
            {letra}
          </button>
        ))}
        <button type="button" className="tecla tecla-extra" onClick={borrarLetra} disabled={terminada}>⌫</button>
        <button type="button" className="tecla tecla-extra" onClick={() => document.querySelector('form')?.requestSubmit()} disabled={terminada}>↵</button>
      </section>

      <p className="ayuda">Las letras verdes están en su sitio, las amarillas están en otra posición y las grises no aparecen en la palabra.</p>
    </main>
  )
}

export default App
