import {jest} from "@jest/globals"
import UserController from "../controllers/user.controller.js";

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.unstable_mockModule("../services/user.service.js",()=>({
   default:{userLogin:jest.fn()},
}));

const {default:mockUserService}=await import("../services/user.service.js");

describe("USER LOGIN SERVICE", () => {
    test("when login fails", async () => {
      const req = { body: { email: "test@gmail.com", password: "123" } };
      const res = mockResponse();

      mockUserService.userLogin.mockResolvedValueOnce({
        status: false,
        msg: "Incorrect User or Password",
      });

      await UserController.userLogin(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        msg: "Incorrect User or Password",
      });
    });

   
});

