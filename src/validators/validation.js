import { isValidEmail, isValidPassword, isValidText } from "./regular-exp.js";

export default function validation(user, isLogin) {
  for (var key in user) {
    if (user[key] == "")
      return { status: false, msg: "Please Fill All Field..." };
  }
  if (!isLogin && !isValidText(user?.name))
    return { status: false, msg: "Please Enter Valid Name" };
  else if (!isValidEmail(user?.email))
    return { status: false, msg: "Please Enter Valid Email" };
  else if (isLogin == false && !isValidPassword(user?.password)) {
    if (!isLogin) return { status: false, msg: passwordMsg };
    else return { status: false, msg: "Please Enter Valid Password" };
  } else return { status: true, msg: "All Fields Are Valid" };
}
