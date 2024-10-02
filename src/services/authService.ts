export async function login(username: string, password: string) {
  // Fake API call
  if (username === "admin" && password === "admin123") {
    return { token: "fake-jwt-token", role: "admin" };
  } else if (username === "user" && password === "user123") {
    return { token: "fake-jwt-token", role: "user" };
  } else {
    throw new Error("Invalid credentialss");
  }
}
