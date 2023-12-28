import User from "@/components/pages/user";

type UserPageProps = {
  params: {
    userId: string;
  };
};

export default function UserPage({ params: { userId } }: UserPageProps) {
  return (
    <>
      <User userId={userId} />
    </>
  );
}
