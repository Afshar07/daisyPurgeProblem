import CreateProRepository from "~/api/pro-repository.js";
import CreateCategoryRepository from "~/api/categories-repository.js";
import CreateCityRepository from "~/api/cities-repository.js";
import CreateLandingRepository from "~/api/landing-repository.js";
import CreateCustomerRepository from "~/api/customer-repository.js";
import CreateOrdersRepository from "~/api/orders-repository.js";
import CreatePostsRepository from "~/api/posts-repository.js";
export default (context, inject) => {
  const repositories = {
    // Pro Resource
    getProvince: CreateProRepository(context, "/api/provinces"),
    getCity: CreateProRepository(context, "/api/cities"),
    profileUpdate: CreateProRepository(context, "/api/pro/me/profile"),
    cityNewPage: CreateProRepository(context),
    getAcceptableLangs: CreateProRepository(
      context,
      "/api/acceptable-categories"
    ),
    submitTimesheet: CreateProRepository(context, "/api/user/me/schedule"),
    getTimesheet: CreateProRepository(context, "/api/users"),
    getSubCats: CreateProRepository(context, "/api/acceptable-categories"),
    getProProfile: CreateProRepository(context, "/api/pros"),
    // Customer Resource
    getCustomerMe: CreateCustomerRepository(context, "/api/customer/me"),
    setCustomerDetails: CreateCustomerRepository(
      context,
      "/api/customer/me/profile"
    ),
    uploadAvatar: CreateCustomerRepository(
      context,
      `${process.env.NODEJS}/avatars`
    ),
    getUserOtp: CreateCustomerRepository(context, "/api/auth/otp"),
    chargeWallet: CreateCustomerRepository(context, "/api/user/wallet/payment"),
    getSessions: CreateCustomerRepository(context, "/api/customer/sessions"),
    endSession: CreateCustomerRepository(
      context,
      "/api/customer/sessions/done"
    ),
    getPendingOrders: CreateCustomerRepository(
      context,
      "/api/customer/orders/pending"
    ),
    changePage: CreateCustomerRepository(context),
    setSessionTime: CreateCustomerRepository(
      context,
      "/api/customer/sessions/set-time"
    ),
    reportSessionProblem: CreateCustomerRepository(
      context,
      "/api/customer/sessions/report-problem"
    ),
    getTransactions: CreateCustomerRepository(
      context,
      "/api/user/wallet/transactions"
    ),
    getFavorites: CreateCustomerRepository(context, "/api/user/favorite-users"),
    addToFavroite: CreateCustomerRepository(
      context,
      "/api/user/favorite-users"
    ),
    deleteFromFavorite: CreateCustomerRepository(
      context,
      "/api/user/favorite-users"
    ),
    // Category Resource
    getCategories: CreateCategoryRepository(
      context.$axios,
      "/api/top-categories"
    ),
    getInternationalTests: CreateCategoryRepository(
      context.$axios,
      "/api/acceptable-categories"
    ),
    // City Resource

    getCities: CreateCityRepository(context.$axios, "/api/active-cities"),
    newPage: CreateCityRepository(context.$axios),

    // Landing Resource
    getLanding: CreateLandingRepository(context, "/api/landing-pages"),
    getPros: CreateLandingRepository(context, "/api/pros"),
    getTimesheet: CreateLandingRepository(context, "/api/users"),
    getMorePros: CreateLandingRepository(context),
    getChildCategories: CreateLandingRepository(context, "/api/categories"),

    // Orders Resource
    sendOrderRequest: CreateOrdersRepository(context, "/api/order"),
    getOrderDetails: CreateOrdersRepository(context, "/api/order"),
    sendPaymentRequest: CreateOrdersRepository(
      context,
      "/api/user/order/payment"
    ),
    checkPayment: CreateOrdersRepository(context, "/api/user/payment/check"),

    // Posts Resource
    getPost: CreatePostsRepository(context, "/api/posts"),
  };

  inject("repositories", repositories);
};
