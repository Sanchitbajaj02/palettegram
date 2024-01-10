import Post from '@/components/core/post'


type Prop = {
  params: {
    id: string;
  };
};

const PostDisplay = ({ params: { id } }: Prop) => {
  return (
    <>
      <Post id={id} />
    </>
  )
}

export default PostDisplay
