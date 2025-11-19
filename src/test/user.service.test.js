import UserService from "../services/user.service.js";
import prismaMock from "./__mocks__/prisma.js";


beforeAll(() => {
  UserService.prisma = prismaMock;
});

describe("USER LOGIN SERVICE", () => {
  
  describe("TESTING EDGE CASES", () => {
    test("when fields are empty", async () => {
      const result = await UserService.userLogin({
        email: "",
        password: "",
      });
      expect(result.status).toBe(false);
      expect(result.msg).toBe("Please Fill All Field...");
    });

    describe("WHEN FIELDS ARE INVALID", () => {
      test("invalid email format", async () => {
        const result = await UserService.userLogin({
          email: "govind123",
          password: "1234567",
        });
        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Email");
      });

      test("invalid password format", async () => {
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
      prismaMock.users.findFirst.mockResolvedValue(null);

      const result = await UserService.userLogin({
        email: "govind0123@gmail.com",
        password: "GGl12345567890",
      });

      expect(result.status).toBe(false);
      expect(result.msg).toBe("Incorrect User or Password");
    });
  });

 
  describe("POSITIVE TEST CASE", () => {
    // test("valid credentials test", async () => {
     
    //   prismaMock.users.findFirst.mockResolvedValueOnce({
    //     id: 1,
    //     name: "Govind",
    //     email: "govind123@gmail.com",
    //     password: "$2b$10$HASHEDPASSWORD",
    //   });

      
    //   comparePassword.mockResolvedValue(true);

    //   prismaMock.users.findFirst.mockResolvedValueOnce({
    //     id: 1,
    //     user_roles: [{ roles: { name: "User" } }],
    //   });

    //   generateAccessToken.mockReturnValue("fakeToken");

    //   const result = await UserService.userLogin({
    //     email: "govind123@gmail.com",
    //     password: "Gl12345678",
    //   });

    //   expect(prismaMock.users.findFirst).toHaveBeenCalledWith({
    //     where: { email: "govind123@gmail.com" },
    //   });

    //   expect(result.status).toBe(true);
    //   expect(result.accessToken).toBe("fakeToken");
    // });
  });
});


describe("USER REGISTER SERVICE", () => {
  
  describe("Testing Edge Case", () => {
    test("when fields are empty", async () => {
      const result = await UserService.userRegister({
        name: "",
        email: "",
        password: "",
      });

      expect(result.status).toBe(false);
      expect(result.msg).toBe("Please Fill All Field...");
    });

    describe("when fields are invalid", () => {
      test("when name is invalid", async () => {
        const result = await UserService.userRegister({
          name: "<script>",
          email: "govind123@gmail.com",
          password: "Gl12345678",
        });

        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Name");
      });

      test("when email is invalid", async () => {
        const result = await UserService.userRegister({
          name: "Govind",
          email: "govind123",
          password: "Gl12345678",
        });

        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Email");
      });

      test("when password is invalid", async () => {
        const result = await UserService.userRegister({
          name: "Govind",
          email: "govind123@gmail.com",
          password: "1234567",
        });

        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Password");
      });
    });
  });

  
  describe("NEGATIVE TEST CASE", () => {
    test("when user already exists", async () => {
      prismaMock.users.findFirst.mockResolvedValue({ id: 1 });

      const result = await UserService.userRegister({
        name: "Govind",
        email: "govind123@gmail.com",
        password: "Gl12345678",
      });

      expect(result.status).toBe(false);
      expect(result.msg).toBe("User Already Registered...");
    });
  });

  });
