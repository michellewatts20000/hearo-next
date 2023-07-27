import ReviewCard from "./ReviewCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className="font-display font-medium tracking-tight text-slate-900 sm:text-5xl mb-10">
        {name} <span className="relative whitespace-nowrap text-primary-500">Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 review_layout'>
        {data.map((post) => (
          <ReviewCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;