import { passwordRegex } from "@/constants";


function checkErrorPassword(password) {
  if (!password) {
    return "Please enter password!";
  } else if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters, include 1 uppercase letter and 1 special character!";
  }
  return undefined;
}

export default checkErrorPassword;
