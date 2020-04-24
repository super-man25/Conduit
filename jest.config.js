module.exports = {
  moduleNameMapper: {
    '\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileMock.js',
    '^_components(.*)$': '<rootDir>/src/_components$1',
    '^_constants(.*)$': '<rootDir>/src/_constants$1',
    '^_fonts(.*)$': '<rootDir>/src/_fonts$1',
    '^_helpers(.*)$': '<rootDir>/src/_helpers$1',
    '^_hoc(.*)$': '<rootDir>/src/_hoc$1',
    '^_hooks(.*)$': '<rootDir>/src/_hooks$1',
    '^_images(.*)$': '<rootDir>/src/_images$1',
    '^_models(.*)$': '<rootDir>/src/_models$1',
    '^_scenes(.*)$': '<rootDir>/src/_scenes$1',
    '^_services(.*)$': '<rootDir>/src/_services$1',
    '^_state(.*)$': '<rootDir>/src/_state$1',
  },
  'setupFilesAfterEnv': [
    '<rootDir>/src/setupTests.js',
  ],
};
