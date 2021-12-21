module.exports = {
  answer: {
    wirte: require("./answer/write"),
    modify: require("./answer/modify"),
    delete: require("./answer/delete"),
    bestAnswer: require("./answer/bestAnswer"),
  },
  board: {
    allQuestions: require("./board/allQuestions"),
    questions: require("./board/questions"),
    answers: require("./board/answers"),
    write: require("./board/write"),
    modify: require("./board/modify"),
    delete: require("./board/delete"),
  },
  category: {
    allCategory: require("./category/allCategory"),
  },
  session: {
    logIn: require("./session/logIn"),
    logOut: require("./session/logOut"),
    signUp: require("./session/signUp"),
    userInfo: require("./session/userInfo"),
    auth: require("./session/auth"),
  },
  user: {
    delete: require("./user/delete"),
    modify: require("./user/modify"),
  },
};
