import { useEffect, useState } from 'react'

const initialForm = {
  name: '',
  ki: '',
  maxKi: '',
  race: '',
  affiliation: '',
  image: '',
  description: '',
}

function CharacterCard({
  character,
  mode,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onAskDelete,
}) {
  const [formData, setFormData] = useState(initialForm)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: character.name || '',
        ki: character.ki || '',
        maxKi: character.maxKi || '',
        race: character.race || '',
        affiliation: character.affiliation || '',
        image: character.image || '',
        description: character.description || '',
      })
    }
  }, [character, isEditing])

  useEffect(() => {
    setImageError(false)
  }, [character.image])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSaveEdit(character.id, formData)
  }

  const handleStartEdit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onStartEdit(character.id)
  }

  const handleAskDelete = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onAskDelete(character.id, character.name)
  }

  return (
    <article className="character-card">
      <div className="character-image-frame">
        {!imageError ? (
          <img
            src={character.image}
            alt={character.name}
            className="character-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="character-image-fallback">Imagen no disponible</div>
        )}
      </div>
      <div className="character-info">
        <h4>{character.name}</h4>
        <p><strong>Raza:</strong> {character.race}</p>
        <p><strong>Afiliación:</strong> {character.affiliation}</p>
        <p><strong>Ki:</strong> {character.ki}</p>
        <p><strong>Max Ki:</strong> {character.maxKi}</p>
        <p>{character.description}</p>
      </div>

      {mode === 'edit' && !isEditing && (
        <button type="button" className="btn btn-primary" onClick={handleStartEdit}>
          Editar
        </button>
      )}

      {mode === 'edit' && isEditing && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" />
          <input name="race" value={formData.race} onChange={handleChange} placeholder="Raza" />
          <input name="affiliation" value={formData.affiliation} onChange={handleChange} placeholder="Afiliación" />
          <input name="ki" value={formData.ki} onChange={handleChange} placeholder="Ki" />
          <input name="maxKi" value={formData.maxKi} onChange={handleChange} placeholder="Max Ki" />
          <input name="image" value={formData.image} onChange={handleChange} placeholder="URL de imagen" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            rows="3"
          />
          <div className="edit-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
        </form>
      )}

      {mode === 'delete' && (
        <button type="button" className="btn btn-danger" onClick={handleAskDelete}>
          Eliminar
        </button>
      )}
    </article>
  )
}

export default CharacterCard
