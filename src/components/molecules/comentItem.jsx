import React from 'react'

const CommentItem = ({ comment }) => {
  return (
    <div className="mx-4 my-10 rounded-lg shadow-lg">
      <div className="px-4 py-6">
        <div className="">
          <div className="">
            <h2 className="-mt-1 text-lg">{comment.creator.email}</h2>
          </div>
          <p className="text-sm">{comment.createdAt}</p>
          <p className="mt-3 text-m">{comment.comment}</p>
          <div className="flex items-end justify-end mt-4">
            <div className="flex mr-2 mr-3 text-sm">
              <div>❤️</div>
              <span>{comment.like}</span>
            </div>
            <div className="flex mr-2 mr-3 text-sm">
              <div>💔</div>
              <span>{comment.dislike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
