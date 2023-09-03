type UserPageProps = {
  params: {
    userId: string;
  };
};

export default function UserPage({ params: { userId } }: UserPageProps) {
  return <div>page {userId}</div>;
}
