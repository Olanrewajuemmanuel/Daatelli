export const loginUser = async (
  password: string,
  email?: string
  // userId?: string,
  // username?: string
) => {
  let accessToken = null;
  let refreshToken = null;
  if (email) {
    if (password !== "olanrewaju") {
      throw new Error("Incorrect credentials");
    }
    setTimeout(() => null, 3000); // mimic async server fn
    accessToken =
      "zE5MaDwzZyrcN7jVTiLSXJkC7R62q1gaVxIN2bZKFq2WObuBzWyPyGEYFMW2yJGu";
    refreshToken =
      "E5MaDwzZyrcN7jVTiLSXJkC7R62q1gaVxIN2bZObuBzWycdcszvACAPyGEYFMW2yJGu";
  } else {
    // logic for other login types
  }

  return {
    accessToken,
    refreshToken,
  };
};

export const logoutUser = (accessToken: string) => {
  // mimic server logout logic
  if (!accessToken) return false;
  return true;
};
