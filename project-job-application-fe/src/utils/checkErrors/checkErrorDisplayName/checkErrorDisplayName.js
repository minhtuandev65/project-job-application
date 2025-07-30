import { containsNumberRegex, displayNameRegex } from "@/constants";

function checkErrorFullName(fullName) {
  if (!fullName) {
    return "Please enter account name!";
  } else if (containsNumberRegex.test(fullName)) {
    return "Account name cannot contain numbers!";
  } else if (!displayNameRegex.test(fullName)) {
    return "Account name must be 4 ~ 50 characters, letters only, and include at least 2 letters!";
  }

  return undefined;
}

export default checkErrorFullName;
