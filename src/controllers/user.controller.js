import UserService from '../../services/user.service.js';
export default class UserController {
<<<<<<< Updated upstream
  static async userLogin(req, res) {
    try {
      var data = req.body;
      var result = await UserService.userLogin(data);
      res.send(result);
    } catch (err) {
      throw new Error(`Login Failed: ${err.message}`);
    }
  }
  static async userRegister(req, res) {
    try {
      var data = req.body;
      var result = await UserService.userRegister(data);
      res.send(result);
    } catch (err) {
      throw new Error(`Register Failed: ${err.message}`);
=======
    static async userLogin(req, res) {
        var data = req.body;
        var result = await UserService.userLogin(data);
        
        if(!result.status)return res.send(result);
        res.cookie("accessToken", result.accessToken)
        
    
        return res.status(200).send({status:true,msg:result.msg,role:result.role});
    }
    static  async userRegister(req, res) {
       
        var data = req.body;
        var result =  await UserService.userRegister(data);
       
        if(!result.status)return res.send(result);
        res.cookie("accessToken", result.accessToken);
       
       
        return res.status(200).send({status:true,msg:result.msg,role:result.role});

>>>>>>> Stashed changes
    }
  }
  static async getUsersCount(req, res) {
    try {
      return res.send(await UserService.getUsersCount());
    } catch (err) {
      return new Error('Failed to get User Count');
    }
<<<<<<< Updated upstream
  }
}
=======
    static async getUsersCount(_, res) {
         res.send( await UserService.getUsersCount());
    }
    static async userLogout(req,res){
       
        res.clearCookie("accessToken");
       
      
        res.status(200).json({status:true,msg:"Logout"})

    }
}
>>>>>>> Stashed changes
