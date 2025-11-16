
import { isValidEmail,isValidPassword,isValidText } from "./regular-exp.js";
var passwordMsg = `<div><p><strong>Password must contain:</strong></p>
    <ul>
        <li>At least one uppercase letter (A–Z)</li>
        <li>At least one lowercase letter (a–z)</li>
        <li>At least one number (0–9)</li>
        <li>Minimum 8 characters in length</li>
</ul></div>`;

export default  function validation(user,isLogin) {
    for (var key in user) {
        if (user[key] == "")return { status: false, msg: "Please Fill All Field..." };
    }
    if(!isLogin && !isValidText(user?.name))return {status:false,msg:"Please Enter Valid Name"};
    else if (!isValidEmail(user?.email))return { status: true, msg: "Please Enter Valid Email " };
    else if (!isValidPassword(user?.password)) {if(!isLogin)return { status: true, msg: passwordMsg };
        else return {status:true,ms}
    }
    else return {status:true}
}