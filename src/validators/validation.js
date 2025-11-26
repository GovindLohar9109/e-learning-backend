
import { isValidEmail,isValidPassword,isValidText } from "./regular-exp.js";

export default  function validation(user,isLogin) {
    for (var key in user) {
        if (user[key] == "")return { status: false, msg: "Please Fill All Field..." };
    }
    if(!isLogin && !isValidText(user?.name))return {status:false,msg:"Please Enter Valid Name"};
    else if (!isValidEmail(user?.email))return { status: true, msg: "Please Enter Valid Email " };
    else if (!isValidPassword(user?.password)) {if(!isLogin)return { status: true, msg:"Please Enter Valid Password" }}; // why (!isLogin) -> becuase i do want allow user to about that my password is not valid 
    return {status:true};
}