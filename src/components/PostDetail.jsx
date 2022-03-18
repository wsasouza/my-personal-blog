import moment from 'moment';

const PostDetail = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">     
        <img 
          src={post.featuredImage.url} 
          alt={post.title} 
          className="w-full h-auto object-top object-cover rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img 
              src={post.author.photo.url} 
              alt={post.author.name}
              height="30px"
              width="30px"
              className="align-middle rounded-full"
            />
            <p className="inline align-middle text-gray-500 ml-2 text-lg">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 inline mr-2 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>
              {moment(post.createdAt).format('DD MMM, YYYY')}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
      </div>
    </div>
  );
};

export default PostDetail;