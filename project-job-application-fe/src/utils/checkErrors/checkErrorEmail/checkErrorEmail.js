import { emailRegex } from "@/constants";

function checkErrorEmail(email) {
  if (!email) {
    return "Please enter email!";
  } else if (email.length < 5 || email.length > 70) {
    return "Email must be between 5 and 70 characters!";
  } else if (!emailRegex.test(email)) {
    return "Invalid email format, Please enter your email useremail@example.com!";
  }
  return undefined;
}

export default checkErrorEmail;
