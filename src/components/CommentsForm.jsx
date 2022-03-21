import { useRef, useState, useEffect } from 'react'

import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('@blog_wsasouza-name')
    emailEl.current.value = window.localStorage.getItem('@blog_wsasouza-email')
  }, [])

  const handlePostSubmission = () => {
    setError(false)

    const { value: comment } = commentEl.current
    const { value: name } = nameEl.current
    const { value: email } = emailEl.current
    const { checked: storeData } = storeDataEl.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('@blog_wsasouza-name', name)
      window.localStorage.setItem('@blog_wsasouza-email', email)
    } else {
      window.localStorage.removeItem('@blog_wsasouza-name', name)
      window.localStorage.removeItem('@blog_wsasouza-email', email)
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)

      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Deixe um comentário
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          name="comment"
          ref={commentEl}
          placeholder="Comentário"
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          name="name"
          type="text"
          ref={nameEl}
          placeholder="Nome"
          className="w-full rounded-lg bg-gray-100 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          name="email"
          type="email"
          ref={emailEl}
          placeholder="E-mail"
          className="w-full rounded-lg bg-gray-100 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeData"
            className="ml-2 cursor-pointer text-gray-500"
          >
            Salvar meu nome e e-mail para os próximos comentários
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs font-semibold text-red-500">
          Todos os campos são obrigatórios.
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="ease inline-block cursor-pointer rounded-full bg-red-500 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:bg-indigo-900"
        >
          Enviar
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comentário enviado para revisão.
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
