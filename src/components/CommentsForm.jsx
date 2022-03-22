import { useState } from 'react'
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg"
    >
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Deixe um comentário
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          {...register('comment', { required: true })}
          error={errors.comment}
          placeholder="Comentário"
          rows={2}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
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
            className="w-full rounded-lg bg-gray-100 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
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
            className="w-full rounded-lg bg-gray-100 p-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
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
          className="ease inline-block cursor-pointer rounded-full bg-red-500 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:bg-indigo-900"
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
