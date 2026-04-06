import { useState } from 'react'

const API_URL = 'http://localhost:3000/characters'

export function useCharacters() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const clearError = () => setError('')

  const fetchAllCharacters = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('No se pudieron traer los personajes')
      }

      let data = await response.json()

      if (Array.isArray(data) && data.length === 0) {
        const importResponse = await fetch(`${API_URL}/import`, {
          method: 'POST',
        })

        if (!importResponse.ok) {
          throw new Error('No se pudo importar la lista inicial de personajes')
        }

        const secondResponse = await fetch(API_URL)
        if (!secondResponse.ok) {
          throw new Error('No se pudo recargar la lista de personajes')
        }

        data = await secondResponse.json()
      }

      setCharacters(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Error al traer personajes')
    } finally {
      setLoading(false)
    }
  }

  const findCharacter = async (searchText) => {
    const value = searchText.trim()
    if (!value) {
      setError('Escribe algo en la búsqueda')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (/^\d+$/.test(value)) {
        const response = await fetch(`${API_URL}/${value}`)
        if (!response.ok) {
          throw new Error('No se encontró un personaje con ese id')
        }

        const data = await response.json()
        setCharacters(data ? [data] : [])
      } else {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('No se pudieron traer los personajes para buscar por nombre')
        }

        const data = await response.json()
        const filtered = (Array.isArray(data) ? data : []).filter((character) =>
          character.name.toLowerCase().includes(value.toLowerCase()),
        )

        setCharacters(filtered)
      }
    } catch (err) {
      setError(err.message || 'Error al buscar personaje')
    } finally {
      setLoading(false)
    }
  }

  const updateCharacter = async (id, payload) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('No se pudo actualizar el personaje')
      }

      await fetchAllCharacters()
      return true
    } catch (err) {
      setError(err.message || 'Error al actualizar')
      setLoading(false)
      return false
    }
  }

  const createCharacter = async (payload) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('No se pudo crear el personaje')
      }

      await fetchAllCharacters()
      return true
    } catch (err) {
      setError(err.message || 'Error al crear personaje')
      setLoading(false)
      return false
    }
  }

  const removeCharacter = async (id) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar el personaje')
      }

      setCharacters((prev) => prev.filter((character) => character.id !== id))
      setLoading(false)
      return true
    } catch (err) {
      setError(err.message || 'Error al eliminar')
      setLoading(false)
      return false
    }
  }

  return {
    characters,
    loading,
    error,
    clearError,
    fetchAllCharacters,
    findCharacter,
    createCharacter,
    updateCharacter,
    removeCharacter,
  }
}
