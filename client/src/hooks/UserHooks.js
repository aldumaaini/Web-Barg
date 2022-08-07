import { useState, useEffect } from "react";

import { getLoggedInUser } from "helpers/backend_helper";
const useProfile = () => {
  // global store
  const userProfileSession = getLoggedInUser();

  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? { ...userProfileSession } : null
  );

  useEffect(() => {
    const userProfileSession = getLoggedInUser();

    setUserProfile(userProfileSession ? { ...userProfileSession } : null);
  }, []);

  return { userProfile, loading };
};

export { useProfile };
