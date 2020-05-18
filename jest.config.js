module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/test'
  ],
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
  ]
};
