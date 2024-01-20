import React from "react";

export default function Template({ email, message }: { email: string; message: string }) {
  return (
    <>
      <div className="bg-pink-100 p-4">
        <h1 className="text-3xl font-bold">You have received an Email for support</h1>
        <h3 className="text-2xl font-medium">Sender Email Address: {email}</h3>
        <h3 className="text-2xl font-medium">User Query:-</h3>
        <p className="text-2xl font-medium">{message}</p>
      </div>
    </>
  );
}
