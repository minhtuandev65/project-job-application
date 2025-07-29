
export default {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // trỏ đến file setupTests.js bạn vừa tạo
};
