import { describe, expect, test } from 'vitest'
import { estadosDeIntento } from './juego.js'

describe('estadosDeIntento', () => {
  test('marca correcta una letra en su posición', () => {
    expect(estadosDeIntento('PERRO', 'PERRO')).toEqual([
      'correcta', 'correcta', 'correcta', 'correcta', 'correcta',
    ])
  })

  test('marca presente una letra que aparece en otra posición', () => {
    expect(estadosDeIntento('ORXXX', 'PERRO')[0]).toBe('presente')
  })

  test('marca ausente una letra que no está en la solución', () => {
    expect(estadosDeIntento('GATOS', 'PERRO')[0]).toBe('ausente')
  })

  test('respeta las letras repetidas', () => {
    expect(estadosDeIntento('RRRRR', 'PERRO')).toEqual([
      'ausente', 'correcta', 'correcta', 'correcta', 'ausente',
    ])
  })
})
