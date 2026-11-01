// utils/sendToken.js
const sendtoken = (user, statusCode, res) => {
  const token = user.getjwttoken();

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days — keep in sync with JWT_EXPIRE
    httpOnly: true,
    secure: false,      // true ONLY in production (https)
    sameSite: "lax",
    path: "/",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token, // sent in body too so frontend can store in localStorage & attach Bearer header
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = { sendtoken };