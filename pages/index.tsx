import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
type ProfileProps = { user: UserProfile };
export default function index({ user }: ProfileProps) {
  return <div>test {user.name}</div>;
}
index.title = "Home";
index.auth = true;
export const getServerSideProps = withPageAuthRequired();
