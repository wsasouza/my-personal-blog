import { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'

import { getComments } from '../services'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then((result) => setComments(result))
  }, [slug])

  return (
    <>
      {comments.length > 0 && (
        <div className="mb-8 rounded-lg bg-secondary p-8 pb-12 shadow-lg">
          <h3 className="mb-8 border-b pb-4 text-xl font-semibold text-primary">
            {comments.length === 1
              ? '1 comentário'
              : `${comments.length} comentários`}
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="mb-4 border-b border-gray-100 pb-4"
            >
              <p className="mb-4 text-lightGray">
                <span className="font-semibold text-accentColor">
                  {comment.name}
                </span>{' '}
                em {moment(comment.createdAt).format('DD MMM, YYYY')}
              </p>
              <p className="w-full whitespace-pre-line text-secondary">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
