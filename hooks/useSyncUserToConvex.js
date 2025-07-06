"use client";

import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const useSyncUserToConvex = () => {
  const user = useUser();
  const createUser = useMutation(api.users.CreateUser);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const sync = async () => {
      if (user?.email && user?.displayName) {
        const result = await createUser({
          name: user.displayName,
          email: user.email,
        });
        setUserData(result);
      }
    };

    sync();
  }, [user, createUser]);

  return { userData, isLoading: !userData };
};
