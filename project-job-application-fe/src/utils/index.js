/* Nơi chứa các hàm tiện ích như handle */
/* Handle */
export { handleLogout } from "./handle/handleLogout/handleLogout";
export { handleSearch } from "./handle/handleSearch/handleSearch";
export { handleNavigateAndNotifycation } from "./handle/handleNavigateAndNotifycation/handleNavigateAndNotifycation";
export { handleAcceptedCandidateProfileAdmin } from "./handle/handleAcceptedCandidateProfileAdmin/handleAcceptedCandidateProfileAdmin";
export { handleRejectedCandidateProfileAdmin } from "./handle/handleRejectedCandidateProfileAdmin/handleRejectedCandidateProfileAdmin";

/* Check role */
export { default as checkConfirmPassword } from "./checkErrors/checkConfirmPassword/checkConfirmPassword";
export { default as checkErrorEmail } from "./checkErrors/checkErrorEmail/checkErrorEmail";
export { default as checkErrorFullName } from "./checkErrors/checkErrorDisplayName/checkErrorDisplayName";
export { default as checkErrorPassword } from "./checkErrors/checkErrorPassword/checkErrorPassword";
/* Other */
export { saveSearchHistory } from "./saveSearchHistory/saveSearchHistory";
