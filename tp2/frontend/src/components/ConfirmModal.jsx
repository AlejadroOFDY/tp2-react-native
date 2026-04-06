function ConfirmModal({ isOpen, title, message, onCancel, onConfirm }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onCancel()
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onConfirm()
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
