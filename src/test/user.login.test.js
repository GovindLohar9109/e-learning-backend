import UserService from "../services/user.service.js";

describe("User Login Service", () => {
  describe("Testing Edge Case", () => {
    test("when fields are empty", async () => {
      const result = await UserService.userLogin({
        email: "",
        password: "",
      });
      expect(result.status).toBe(false);
      expect(result.msg).toBe("Please Fill All Field...");
    });
    describe("when fields are invalid", () => {
      test("when email is invalid", async () => {
        const result = await UserService.userLogin({
          email: "govind123",
          password: "1234567",
        });
        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Email");
      });
      test("when password is invalid", async () => {
        const result = await UserService.userLogin({
          email: "govind123@gmail.com",
          password: "1234567",
        });
        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Password");
      });
    });
  });

  describe("NEGATIVE TEST CASE", () => {
    test("invalid credentials test", async () => {
      const result = await UserService.userLogin({
        email: "govind0123@gmail.com",
        password: "GGl12345567890",
      });
      expect(result.status).toBe(false);
      expect(result.msg).toBe("Incorrect User or Password");
    });
  });
  describe("POSITIVE TEST CASE", () => {
    test("valid credentials test", async () => {
      const result = await UserService.userLogin({
        email: "govind123@gmail.com",
        password: "Gl12345678",
      });
      expect(result.status).toBe(true);
      expect(result.msg).toBe("User Logged In");
    });
  });
});
