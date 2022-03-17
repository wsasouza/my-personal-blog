import { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result)
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result)
      });
    }
  }, [slug]);  

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
    <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-gray-700">
      {slug ? 'Posts Relacionados' : 'Últimos Posts'}
    </h3>
    {relatedPosts.map((post, index) => (
      <div key={index} className="flex items-center w-full mb-4">
        <div className="w-16 flex-none">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            height="60px"
            width="60px"            
            className="align-middle rounded-full"            
          />
        </div>
        <div className="flex-grow ml-4">
          <p className="text-gray-400 font-xs">
            {moment(post.createdAt).format('DD MMM, YYYY')}
          </p>
          <Link 
            key={index}
            href={`/post/${post.slug}`} 
            className="text-md"            
          >
            <span className="text-gray-700 cursor-pointer">
              {post.title}
            </span>
          </Link>
        </div>
      </div>
    ))}
  </div>
  )
}

export default PostWidget;
