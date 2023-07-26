import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col mx-auto'>
      <h1 className="font-display font-medium tracking-tight text-slate-900 sm:text-5xl mb-10">
        {type} <span className="relative whitespace-nowrap text-primary-500">Review</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your reviews with the world.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Comment
          </span>

          <textarea
            value={post.comment}
            onChange={(e) => setPost({ ...post, comment: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your rating{" "}
            <span className='font-normal'>
              (how loud was it?)
            </span>
          </span>
          <input
            value={post.rating}
            onChange={(e) => setPost({ ...post, rating: e.target.value })}
            type='text'
            placeholder='Rating'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-black'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;