function Casilla({ letra, estado = '', activa, fila, columna, onCambio, onTecla }) {
  const nombreEstado = {
    correcta: 'correcta',
    presente: 'presente',
    ausente: 'ausente',
  }[estado]

  const descripcion = `Fila ${fila + 1}, columna ${columna + 1}${letra ? `, letra ${letra}` : ''}${nombreEstado ? `, ${nombreEstado}` : ''}`

  return (
    <input
      className={`casilla ${estado}`}
      aria-label={descripcion}
      autoComplete="off"
      autoCapitalize="characters"
      spellCheck="false"
      inputMode="text"
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
      onKeyDown={onTecla}
    />
  )
}

export default Casilla
