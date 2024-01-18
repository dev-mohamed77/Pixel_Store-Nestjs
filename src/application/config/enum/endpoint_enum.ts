export enum EndPointApp {
  // Global
  id = ':id',
  slug = ':slug',

  // user
  users = 'users',
  getMe = 'getMe',
  changePassword = 'changePassword',
  updateLoggedUser = 'updateLoggedUser',

  // auth
  auth = 'auth',
  signUp = 'signUp',
  signUpOrSignInByGoogle = 'signUpOrSignInByGoogle',
  signIn = 'signIn',
  forgetPassword = 'forgetPassword',
  verifyPassResetCode = 'verifyPassResetCode',
  resetPassword = 'resetPassword',

  // categories
  categories = 'categories',

  // SubCategories
  subCategories = 'sub-categories',
}
