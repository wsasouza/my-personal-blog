import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [submitted, setSubmitted] = useState(false)

  const schema = yup.object().shape({
    comment: yup
      .string()
      .required('Digite a sua mensagem.')
      .min(3, 'No mínimo 3 caracteres.'),
    name: yup
      .string()
      .required('Informe seu nome.')
      .min(3, 'No mínimo 3 caracteres.'),
    email: yup
      .string()
      .required('Informe seu e-mail.')
      .email('Digite um e-mail válido.'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    reset()
  }, [slug])

  const onSubmit = ({ name, email, comment }) => {
    const post = {
      name,
      email,
      comment,
      slug,
    }
    submitComment(post).then((res) => {
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    })

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 rounded-lg bg-secondary p-8 pb-12 shadow-lg"
    >
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold text-primary">
        Deixe um comentário
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          {...register('comment', { required: true })}
          error={errors.comment}
          placeholder="Comentário"
          rows={2}
          className="focus:ring- w-full rounded-lg bg-panel p-4 text-lightGray outline-none focus:ring-1 focus:ring-yellow-500 focus:ring-opacity-50"
        />
        {errors.comment && (
          <span className="text-red-600">{errors.comment.message}</span>
        )}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <input
            {...register('name', { required: true })}
            type="text"
            error={errors.name}
            placeholder="Nome"
            className="w-full rounded-lg bg-panel p-2 text-lightGray outline-none focus:ring-1 focus:ring-yellow-500 focus:ring-opacity-50"
          />
          {errors.name && (
            <span className="mt-2 text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            {...register('email', { required: true })}
            type="email"
            error={errors.email}
            placeholder="E-mail"
            className="w-full rounded-lg bg-panel p-2 text-lightGray outline-none focus:ring-1 focus:ring-yellow-500 focus:ring-opacity-50"
          />
          {errors.email && (
            <span className="mt-2 text-red-600">{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <input
          type="submit"
          value="Enviar"
          className="ease inline-block cursor-pointer rounded-full bg-accentColor px-8 py-3 text-lg font-medium text-black transition duration-500 hover:bg-opacity-70 hover:text-white"
        />

        {submitted && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comentário enviado para revisão.
          </span>
        )}
      </div>
    </form>
  )
}

export default CommentsForm
