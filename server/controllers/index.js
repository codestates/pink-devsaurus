module.exports = {
  answer: {
    write: require("./answers/write"),
    modify: require("./answers/modify"),
    delete: require("./answers/delete"),
    bestAnswer: require("./answers/bestAnswer"),
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
  like: {
    questionsLikeUp: require("./like/questionsLikeUp"),
    questionsLikeDown: require("./like/questionsLikeDown"),
    answersLikeUp: require("./like/answersLikeUp"),
    answersLikeDown: require("./like/answersLikeDown"),
  },
};
