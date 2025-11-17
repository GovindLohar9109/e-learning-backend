import UserService from "../services/user.service.js";

describe("User Register Service", () => {
  describe("Testing Edge Case", () => {
    test("when fields are empty", async () => {
      const result = await UserService.userRegister({
        name:"",
        email: "",
        password: "",
      });
      expect(result.status).toBe(false);
      expect(result.msg).toBe("Please Fill All Field...");
    });

    describe("when fields are invalid", () => {
      test("when name is invalid", async () => {
        const result = await UserService.userLogin({
          name:"<scripe>12@#",
          email: "govind123",
          password: "1234567",
        });
        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Email");
      });
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
    test("when user is already present", async () => {
      const result = await UserService.userRegister({
        name:"Govind Lohar",
        email: "govind123@gmail.com",
        password: "Gl12345678",
      });
      
      
      expect(result.status).toBe(false);
      expect(result.msg).toBe("User Already Registered...");
    });
  });
  describe("POSITIVE TEST CASE", () => {
    test("when user is not present", async () => {
      const result = await UserService.userRegister({
        name:"Rakesh",
        email: "govind0123@gmail.com",
        password: "Gl12345678",
      });
      expect(result.status).toBe(true);
      expect(result.msg).toBe("User Registered");
    });
  });
});
