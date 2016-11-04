module.exports = {
 "extends": "airbnb",
 "parser": "babel-eslint",
 "env": {
   "browser": true,
   "node": true,
   "es6": true,
   "mocha": true,
 },
 "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
 "rules": {
    "spaced-comment": [1],
    "no-unused-vars": [1],
    "no-empty": [1],
    "react/wrap-multilines": [1],
    "react/no-multi-comp": [1],
    "no-constant-condition": [1],
    "react/jsx-no-bind": [1],
    "react/prop-types": [1],
    "arrow-body-style": [0],
    "react/prefer-stateless-function": [1],
    "semi": [1],
    "no-param-reassign": 0,
    "jsx-closing-bracket-location": ['<enabled>', {
      "nonEmpty": "<location>" || false,
      "selfClosing": "<location>" || false
    }],

   "valid-jsdoc": ["error", {
     "requireReturn": true,
     "requireReturnType": true,
     "requireParamDescription": true,
     "requireReturnDescription": true
   }],
   "func-names": ["error", "never"],
   "require-jsdoc": ["error", {
       "require": {
           "FunctionDeclaration": true,
           "MethodDefinition": true,
           "ClassDeclaration": true
       }
   }]
 },
 "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "ecmaFeatures": {
    "experimentalObjectRestSpread": true
  },
};

// {
//     "extends": "airbnb",
//     "installedESLint": true,
    // "plugins": [
    //     "react",
    //     "jsx-a11y",
    //     "import"
    // ]
// };
