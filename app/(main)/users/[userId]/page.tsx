"use client";

import ProjectCard from "@/components/projects/ProjectCard";
import { apiService } from "@/lib/services/apiService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProjectType } from "../../projects/page";

type UserDetailsType = {
  id: string;
  email: string;
  projects: ProjectType[];
};

interface SharedUsers {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
}
const UserDetailsPage = () => {
  const params = useParams();
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`api/users/${userId}/`);
      setUserData(response);
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-6">
      <div className="flex text-2xl gap-2 font-semibold">
        <p className="">{userData?.email}</p>
        <p className="">Public Projects</p>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {userData?.projects?.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default UserDetailsPage;
