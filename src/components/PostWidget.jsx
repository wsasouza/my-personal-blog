import { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result)
      })
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result)
      })
    }
  }, [slug])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold text-gray-700">
        {slug ? 'Posts Relacionados' : 'Últimos Posts'}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="mb-4 flex w-full items-center">
          <div className="w-16 flex-none">
            <img
              src={post.featuredImage.url}
              alt={post.title}
              height="60px"
              width="60px"
              className="rounded-full align-middle"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-400">
              {moment(post.createdAt).format('DD MMM, YYYY')}
            </p>
            <Link key={index} href={`/post/${post.slug}`} className="text-md">
              <span className="cursor-pointer text-gray-700">{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
