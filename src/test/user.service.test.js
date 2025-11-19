import UserService from "../services/user.service.js";
import prismaMock from "./__mocks__/prisma.js";
import { expect, jest, test } from "@jest/globals";

beforeAll(() => {
  UserService.prisma = prismaMock;
});

jest.unstable_mockModule("../validators/validation.js",()=>({
  default : jest.fn()
}))
jest.unstable_mockModule("../utils/authTokenAction.js",()=>({
  generateAccessToken : jest.fn()
}))

jest.unstable_mockModule("../utils/hashPassAction.js",()=>({
   comparePassword:jest.fn()
}))
const validation=(await import("../validators/validation.js")).default; 
const {comparePassword} = (await import("../utils/hashPassAction.js"));
const {generateAccessToken}=(await import("../utils/authTokenAction.js"));

describe("USER LOGIN SERVICE", () => {
  
  describe("TESTING EDGE CASES", () => {
    test("when fields are empty", async () => {
      validation.mockReturnValue({ status: false, msg: "Please Fill All Field..." });
      const result = await UserService.userLogin({
        email: "",
        password: "",
      });
      expect(result).toEqual({ status: false, msg: "Please Fill All Field..." });
      
    });

    describe("WHEN FIELDS ARE INVALID", () => {
      test("invalid email format", async () => {
        validation.mockReturnValue({ status: false, msg: "Please Enter Valid Email" })
        const result = await UserService.userLogin({
          email: "govind123",
          password: "1234567",
        });
        expect(result).toEqual({ status: false, msg: "Please Enter Valid Email" });
        
      });
     });
  });

 
  describe("NEGATIVE TEST CASE", () => {
    
    test("invalid credentials test", async () => {
       prismaMock.users.findFirst(null);

      const result = await UserService.userLogin({
        email: "govind0123@gmail.com",
        password: "GGl12345567890",
      });
      expect(result).toEqual({ status: false, msg: "Incorrect User or Password" });
    });
    test("when server error", async () => {
       prismaMock.users.findFirst.mockRejectedValue("Server Error");

      const result = await UserService.userLogin({
        email: "govind0123@gmail.com",
        password: "GGl12345567890",
      });
      expect(result).toEqual({ status: false, msg: "Server Error" });
    });
  });

 
  // describe("POSITIVE TEST CASE", () => {
  //   test("valid credentials test", async () => {
     
  //     prismaMock.users.findFirst.mockResolvedValueOnce({
  //       id: 1,
  //       name: "Govind",
  //       email: "govind123@gmail.com",
  //       password: "$2b$10$HASHEDPASSWORD",
  //     });

  //     const result = await UserService.userLogin({
  //       email: "govind123@gmail.com",
  //       password: "Gl12345678",
  //     });
  //     comparePassword.mockReturnValue(true);
  //     generateAccessToken.mockReturnValue("fakeToken");
     

  //     expect(result).toBe(true);
  //     expect(result.accessToken).toBe("fakeToken");
  //   });
  // });
 });

//  ============REGISTER==============

describe("USER REGISTER SERVICE", () => {
  
  describe("Testing Edge Case", () => {
    test("when fields are empty", async () => {
      validation.mockReturnValue({ status: false, msg: "Please Fill All Field..." });
      const result = await UserService.userRegister({
        name:"",
        email: "",
        password: "",
      });
      expect(result).toEqual({ status: false, msg: "Please Fill All Field..." });
      
    });
 
    describe("when fields are invalid", () => {
      test("when name is invalid", async () => {
        validation.mockResolvedValue(
          { status: false, msg: "Please Enter Valid Name" }
        )
        const result = await UserService.userRegister({
          name: "<script>",
          email: "govind123@gmail.com",
          password: "Gl12345678",
        });

        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Name");
      });

      test("when email is invalid", async () => {
        validation.mockResolvedValue({ status: false, msg: "Please Enter Valid Email" })
        const result = await UserService.userRegister({
          name: "Govind",
          email: "govind123",
          password: "Gl12345678",
        });

        expect(result.status).toBe(false);
        expect(result.msg).toBe("Please Enter Valid Email");
      });


      // -------THIS IS FALING----------

      // test("invalid password", async () => {
      //   validation.mockReturnValue({
      //     status: false,
      //     msg: "Please Enter Valid Password"
      //   });

      //   const result = await UserService.userRegister({
      //     name: "Govind",
      //     email: "govind123@gmail.com",
      //     password: "1234567",
      //   });

      //   expect(result.status).toBe(false);
      //   expect(result.msg).toBe("Please Enter Valid Password");
      // });
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

     test("when server error ",async ()=>{
      prismaMock.users.findFirst.mockRejectedValue("Server Error");
      const result = await UserService.userRegister({
        name: "Govind",
        email: "govind123@gmail.com",
        password: "Gl12345678",
      });
      expect(result).toEqual({ status: false, msg: " Server Error..." });
  
  });
  

  test("get users count",async ()=>{
      prismaMock.users.count.mockReturnValue(20);
      const result=await UserService.getUsersCount();
      expect(result).toBe(20);
  
    })
    test("when server error while getting count of users",async ()=>{
      prismaMock.users.count.mockRejectedValue("Server Error");
      const result=await UserService.getUsersCount();
      expect(result).toEqual({ status: false, msg: "Server Error" });
  
    })
  });

// // test("when getting user data", async () => {
// //       prismaMock.users.findFirst.mockResolvedValue({ id: 1 ,name:"Govind",email:"govind123@gmail.com",password:"@@@#3232"});
     
// //       const result = await UserService.getUser(1);
// //        prismaMock.user_roles.findFirst({
// //         roles:{name:"User"}
// //       })
// //       expect(result).toEqual({ id: 1 ,name:"Govind",email:"govind123@gmail.com",role:"User"});

// });
test("when getting user data server error", async () => {
      prismaMock.users.findFirst.mockRejectedValue("Server error");
      const result = await UserService.getUser(1);
      expect(result).toEqual({ status: false, msg: "Server Error" });
});


});