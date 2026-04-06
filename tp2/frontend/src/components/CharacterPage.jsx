import { useState } from 'react'
import CharacterCard from './CharacterCard'
import ConfirmModal from './ConfirmModal'
import { useCharacters } from '../hooks/useCharacters'

const initialCreateForm = {
  name: '',
  ki: '',
  maxKi: '',
  race: '',
  affiliation: '',
  image: '',
  description: '',
}

function CharacterPage() {
  const [searchText, setSearchText] = useState('')
  const [mode, setMode] = useState('view')
  const [editingId, setEditingId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [createForm, setCreateForm] = useState(initialCreateForm)

  const {
    characters,
    loading,
    error,
    clearError,
    fetchAllCharacters,
    findCharacter,
    createCharacter,
    updateCharacter,
    removeCharacter,
  } = useCharacters()

  const handleBringAll = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    clearError()
    setSuccessMessage('')
    setMode('view')
    setEditingId(null)
    await fetchAllCharacters()
  }

  const handleSearch = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setSuccessMessage('')
    setMode('view')
    setEditingId(null)
    await findCharacter(searchText)
  }

  const handleEditMode = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    clearError()
    setSuccessMessage('')
    setMode('edit')
    setEditingId(null)
    await fetchAllCharacters()
  }

  const handleDeleteMode = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    clearError()
    setSuccessMessage('')
    setMode('delete')
    setEditingId(null)
    await fetchAllCharacters()
  }

  const handleCreateMode = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    clearError()
    setSuccessMessage('')
    setMode('create')
    setEditingId(null)
    await fetchAllCharacters()
  }

  const handleCreateInputChange = (event) => {
    const { name, value } = event.target
    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateSubmit = async (event) => {
    event.preventDefault()

    const success = await createCharacter(createForm)
    if (success) {
      setCreateForm(initialCreateForm)
      setSuccessMessage('Personaje creado correctamente')
      setMode('view')
    }
  }

  const handleSaveEdit = async (id, payload) => {
    const success = await updateCharacter(id, payload)

    if (success) {
      setEditingId(null)
      setSuccessMessage('Personaje actualizado correctamente')
    }
  }

  const handleOpenDeleteModal = (id, name) => {
    setDeleteTarget({ id, name })
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return
    }

    const success = await removeCharacter(deleteTarget.id)
    if (success) {
      setSuccessMessage('Personaje eliminado correctamente')
      setDeleteTarget(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
  }

  return (
    <main className="caja0">
      <section className="caja1">
        <h1>Dragon Ball Page</h1>
      </section>

      <section className="caja2">
        <button type="button" className="control-btn" onClick={handleSearch}>Buscar</button>
        <button type="button" className="control-btn" onClick={handleBringAll}>Traer todos</button>
        <button type="button" className="control-btn" onClick={handleEditMode}>Editar</button>
        <button type="button" className="control-btn" onClick={handleDeleteMode}>Eliminar</button>
        <button type="button" className="control-btn" onClick={handleCreateMode}>Crear</button>
        <input
          className="search-input"
          type="text"
          value={searchText}
          placeholder="Buscar por id o nombre"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      <section className="caja3">
        {loading && <p className="status-message">Cargando personajes...</p>}
        {!loading && error && <p className="status-message status-error">{error}</p>}
        {!loading && !error && successMessage && (
          <p className="status-message status-success">{successMessage}</p>
        )}

        {!loading && !error && characters.length === 0 && (
          <p className="status-message">No hay personajes para mostrar.</p>
        )}

        {mode === 'create' && (
          <form className="create-form" onSubmit={handleCreateSubmit}>
            <input name="name" value={createForm.name} onChange={handleCreateInputChange} placeholder="Nombre" required />
            <input name="race" value={createForm.race} onChange={handleCreateInputChange} placeholder="Raza" required />
            <input name="affiliation" value={createForm.affiliation} onChange={handleCreateInputChange} placeholder="Afiliación" required />
            <input name="ki" value={createForm.ki} onChange={handleCreateInputChange} placeholder="Ki" required />
            <input name="maxKi" value={createForm.maxKi} onChange={handleCreateInputChange} placeholder="Max Ki" required />
            <input name="image" value={createForm.image} onChange={handleCreateInputChange} placeholder="URL de imagen" required />
            <textarea
              name="description"
              value={createForm.description}
              onChange={handleCreateInputChange}
              placeholder="Descripción"
              rows="3"
            />
            <button type="submit" className="btn btn-primary">
              Guardar personaje
            </button>
          </form>
        )}

        <div className="character-grid">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              mode={mode}
              isEditing={editingId === character.id}
              onStartEdit={setEditingId}
              onCancelEdit={() => setEditingId(null)}
              onSaveEdit={handleSaveEdit}
              onAskDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      </section>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Confirmar eliminación"
        message={deleteTarget ? `¿Seguro que deseas eliminar a ${deleteTarget.name}?` : ''}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </main>
  )
}

export default CharacterPage
