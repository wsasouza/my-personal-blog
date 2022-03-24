import React from 'react'
import moment from 'moment'

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-two':
        return (
          <h2 key={index} className="mb-4 text-xl font-semibold text-lightGray">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        )

      case 'heading-three':
        return (
          <h3 key={index} className="mb-4 text-xl font-semibold text-lightGray">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )

      case 'heading-four':
        return (
          <h4 key={index} className="text-md mb-4 font-semibold text-lightGray">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )

      case 'paragraph':
        return (
          <p key={index} className="mb-8 text-lightGray">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )

      case 'code-block':
        return (
          <code_block
            key={index}
            className="m-4 w-full rounded-lg bg-mainColor p-8 text-xl text-green-500"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </code_block>
        )

      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="w-full object-cover"
          />
        )
      default:
        return modifiedText
    }
  }

  return (
    <>
      <div className="mb-8 rounded-lg bg-secondary pb-12 shadow-lg lg:p-8">
        <div className="relative mb-6 overflow-hidden shadow-md">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="h-auto w-full rounded-t-lg object-cover object-top"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="mb-8 flex w-full flex-col items-start lg:flex-row lg:items-center">
            <div className="mb-4 mr-8 flex w-full items-center lg:mb-0 lg:w-auto">
              <img
                src={post.author.photo.url}
                alt={post.author.name}
                height="30px"
                width="30px"
                className="rounded-full align-middle"
              />
              <p className="ml-2 inline align-middle text-lg text-secondary">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 inline h-6 w-6 text-accentColor"
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
              <span>{moment(post.createdAt).format('DD MMM, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold text-primary">
            {post.title}
          </h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) =>
              getContentFragment(itemIndex, item.text, item)
            )
            return getContentFragment(index, children, typeObj, typeObj.type)
          })}
        </div>
      </div>
    </>
  )
}

export default PostDetail
