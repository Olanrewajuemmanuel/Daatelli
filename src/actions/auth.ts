export const loginUser = async (
  password: string,
  email?: string
  // userId?: string,
  // username?: string
) => {
  let accessToken = null;
  let refreshToken = null;
  if (email) {
    // mimic server failure response
    if (password !== "olanrewaju") {
      return Promise.reject(Error("Incorrect credentials"));
    }
    accessToken =
      "zE5MaDwzZyrcN7jVTiLSXJkC7R62q1gaVxIN2bZKFq2WObuBzWyPyGEYFMW2yJGu";
    refreshToken =
      "E5MaDwzZyrcN7jVTiLSXJkC7R62q1gaVxIN2bZObuBzWycdcszvACAPyGEYFMW2yJGu";
  } else {
    // logic for other login types
  }

  return Promise.resolve({
    accessToken,
    refreshToken,
  });
};

export const logoutUser = (accessToken: string) => {
  // mimic server logout logic
  if (!accessToken) return false;
  return true;
};

export const sendResetPasswordRequest = async (uid: string) => {
  setTimeout(() => uid, 3000); // mimic async server fn
  return Promise.resolve({
    message:
      "Instructions to reset your password has been sent to the provided email",
  });
};

export const sendResetPasswordConfirmation = async (
  token: string,
  oldPassword: string,
  newPassword: string
) => {
  setTimeout(() => ({ token, oldPassword, newPassword }), 3000); // mimic async server fn
  return Promise.resolve({
    message: "Your password has been successfully changed",
  });
};
