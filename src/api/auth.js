export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@email.com" && password === "1234") {
        resolve({
          success: true,
          token: "abc123",
          user: { name: "유진" },
        });
      } else {
        reject({ success: false, message: "retry" });
      }
    }, 1000);
  });
};
