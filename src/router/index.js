import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/views/NotFoundPage.vue";
/* Layouts */
const Layout = () => import("../layouts/Layout");
const Default = () => import("../layouts/BlankLayout");
const AuthLayout = () => import("../layouts/AuthLayouts/AuthLayout");

/* all routes */
const SocialProfile = () => import("../views/SocailMain/Profile/Profile");
const ProfileImage = () => import("../views/SocailMain/Profile/ProfileImage");
const ProfileVideo = () => import("../views/SocailMain/Profile/ProfileVideo");
const ProfileEvent = () => import("../views/SocailMain/Profile/ProfileEvent");
const ProfileBadges = () => import("../views/SocailMain/Profile/ProfileBadges");
const ProfileForum = () => import("../views/SocailMain/Profile/Forum");
const FriendList = () => import("../views/SocailMain/Friends/FriendList");
const BlogGrid = () => import("../views/SocailMain/Blog/BlogGrid");
const BlogList = () => import("../views/SocailMain/Blog/BlogList");
const BlogDetail = () => import("../views/SocailMain/Blog/BlogDetail");
const CategoryGrid = () => import("../views/SocailMain/Store/CategoryGrid");
const CategoryList = () => import("../views/SocailMain/Store/CategoryList");
const StoreDetail = () => import("../views/SocailMain/Store/Storedetail");
const StoreCheckout = () =>
  import("../views/SocailMain/Store/StoreCheckout-cart");
const StoreCheckoutaddress = () =>
  import("../views/SocailMain/Store/StoreCheckout-address");
const StoreCheckoutpayment = () =>
  import("../views/SocailMain/Store/StoreCheckout-payment");
const File = () => import("../views/SocailMain/File/File");
const GroupOld = () => import("../views/SocailMain/Group/Group");
const Birthday = () => import("../views/SocailMain/Bithdate/Bithdate");
const Music = () => import("../views/SocailMain/Music/Music");
const Notification = () =>
  import("../views/SocailMain/Notifications/Notification");
const Weather = () => import("../views/SocailMain/Weather/Weather");
const FriendRequest = () => import("../views/SocailMain/Friends/FriendRequest");
/* UIElements View */
const UiAlerts = () => import("../views/core/UiAlerts.vue");
const UiButtons = () => import("../views/core/UiButtons.vue");
const UiBadges = () => import("../views/core/UiBadges.vue");
const UiBreadcrumb = () => import("../views/core/UiBreadcrumb.vue");
const UiColors = () => import("../views/core/UiColors.vue");
const UiTypography = () => import("../views/core/UiTypography.vue");
const UiCards = () => import("../views/core/UiCards.vue");
const UiCarousel = () => import("../views/core/UiCarousel.vue");
const UiEmbedVideo = () => import("../views/core/UiEmbedVideo.vue");
const UiGrid = () => import("../views/core/UiGrid.vue");
const UiModal = () => import("../views/core/UiModal.vue");
const UiListGroup = () => import("../views/core/UiListGroup.vue");
const UiImages = () => import("../views/core/UiImages.vue");
const UiMediaObject = () => import("../views/core/UiMediaObject.vue");
const UiTooltips = () => import("../views/core/UiTooltips.vue");
const UiPopovers = () => import("../views/core/UiPopovers.vue");
const UiNotifications = () => import("../views/core/UiNotifications.vue");
const UiTabs = () => import("../views/core/UiTabs.vue");
const UiPagination = () => import("../views/core/UiPagination.vue");
const UiProgressBars = () => import("../views/core/UiProgressBars.vue");
/* Authentic View */
const SignIn1 = () => import("../views/AuthPages/Default/SignIn1");
const SignUp1 = () => import("../views/AuthPages/Default/SignUp1");
const RecoverPassword1 = () =>
  import("../views/AuthPages/Default/RecoverPassword1");
const LockScreen1 = () => import("../views/AuthPages/Default/LockScreen1");
const ConfirmMail1 = () => import("../views/AuthPages/Default/ConfirmMail1");
/* Extra Pages */
const ErrorPage = () => import("../views/Pages/ErrorPage");
const ComingSoon = () => import("../views/Pages/ComingSoon");
const Maintenance = () => import("../views/Pages/Maintenance");
const TimeLine = () => import("../views/Pages/TimeLines");
const Pricing = () => import("../views/Pages/Pricing");
const Pricing1 = () => import("../views/Pages/Pricing1");
const BlankPage = () => import("../views/Pages/BlankPage");
const FAQ = () => import("../views/Pages/FAQ");
const Invoice = () => import("../views/Pages/Invoice");
/* Apps Views */
const EmailListing = () => import("../views/Apps/Email/EmailListing");
const EmailCompose = () => import("../views/Apps/Email/EmailCompose");
const Calendar = () => import("../views/Apps/Calendar/Calendar");
/* Icon Views */
const IconDripicons = () => import("../views/Icons/IconDripicons");
const IconFontawesome5 = () => import("../views/Icons/IconFontawesome5");
const IconLineAwesome = () => import("../views/Icons/IconLineAwesome");
const IconRemixicon = () => import("../views/Icons/IconRemixicon");
const IconUnicons = () => import("../views/Icons/IconUnicons");
/* Tables Views */
const TablesBasic = () => import("../views/Tables/TablesBasic");
const EditableTable = () => import("../views/Tables/EditableTable");
/* Form View */
const FormLayout = () => import("../views/Forms/FormLayout");
const FormValidates = () => import("../views/Forms/FormValidates");
const FormSwitches = () => import("../views/Forms/FormSwitches");
const FormRadios = () => import("../views/Forms/FormRadios");
const FormCheckboxes = () => import("../views/Forms/FormCheckboxes");
/* User View */
const Profile = () => import("../views/User/Profile");
const ProfileEdit = () => import("../views/User/ProfileEdit");
const AddUser = () => import("../views/User/AddUser");
const SocialApp = () => import("../views/Apps/Social/SocialApp");
/* Todo */
const TodoListing = () => import("../views/Apps/Todo/TodoListing");
const ChatIndex = () => import("../views/Apps/Chat/Index");
const AccountSettings = () => import("../views/User/AccountSetting");

const Partners = () =>
  import(
    /* webpackChunkName: "Partners" */ "../components/partner/partners.vue"
  );
const Partner = () =>
  import(/* webpackChunkName: "Partner" */ "../components/partner/partner.vue");
const admins = () =>
  import(/* webpackChunkName: "admins" */ "../components/admin/admins.vue");
const forum = () =>
  import(/* webpackChunkName: "social" */ "../components/forum/main");
const subjects = () =>
  import(/* webpackChunkName: "subjects" */ "../components/settings/subjects");
const languages = () =>
  import(
    /* webpackChunkName: "languages" */ "../components/settings/languages"
  );
const onboardingsubjects = () =>
  import(
    /* webpackChunkName: "OnboardingSubjects" */ "../components/onBoarding/subjects"
  );
const onBoardingEducation = () =>
  import(
    /* webpackChunkName: "onBoardingEducation" */ "../components/onBoarding/education"
  );
const chat = () =>
  import(/* webpackChunkName: "Chat" */ "../components/Chat/main");
const chatrooms = () =>
  import(/* webpackChunkName: "chatrooms" */ "../components/Chat/rooms");
const education = () =>
  import(
    /* webpackChunkName: "education" */ "../components/settings/education"
  );
const schedule = () =>
  import(/* webpackChunkName: "schedule" */ "components/settings/schedule");
const reviews = () =>
  import(/* webpackChunkName: "schedule" */ "components/settings/reviews");
const meetings = () => import("../components/meeting/meetings.vue");
const meetingCreate = () => import("../components/meeting/meetingCreate.vue");
const meetingEdit = () => import("../components/meeting/meetingEdit.vue");
const meetingDetails = () => import("../components/meeting/meetingDetails.vue");
const meetingInfo = () => import("../components/sidebar/meetingInfo.vue");
const meetingDelete = () => import("../components/meeting/meetingDelete.vue");
const meetingList = () => import("../components/meeting/meetingList.vue");
const bookMeetings = () => import("../components/meeting/bookMeeting.vue");
const profile = () => import("../views/Pages/UserProfile.vue");
const editProfileName = () =>
  import("../components/settings/profile-sub-components/editProfileName.vue");
const editDisplayName = () =>
  import("../components/settings/profile-sub-components/editDisplayName.vue");
const editStuttieAddress = () =>
  import(
    "../components/settings/profile-sub-components/editStuttieAddress.vue"
  );
const organizationProfile = () =>
  import("../components/settings/organizationProfile.vue");
const editOrganizationName = () =>
  import(
    "../components/settings/organization-sub-components/editOrganizationName.vue"
  );
const editOrganizationRate = () =>
  import("../components/settings/organization-sub-components/editRate.vue");
const editOrganizationAddress = () =>
  import(
    "../components/settings/organization-sub-components/editOrganizationAddress.vue"
  );
const aboutOrganization = () =>
  import(
    "../components/settings/organization-sub-components/aboutOrganization.vue"
  );
const school = () => import("../components/settings/school.vue");
const userDirectory = () => import("../components/settings/userDirectory.vue");
const reports = () => import("../components/reports/reports.vue");
const billing = () => import("../components/settings/billing.vue");
const accountSettings = () =>
  import("../components/settings/account-settings.vue");
const passwordChange = () =>
  import("../components/settings/account-settings-save/password-change.vue");
const paymentInfo = () =>
  import("../components/settings/billing-payment-info/paymentInfo.vue");
const editOrganizationPhone = () =>
  import("../components/settings/organization-sub-components/editPhone.vue");
const onBoardingMyProfile = () =>
  import("../components/onBoarding/my-profile.vue");
const onBoardingAddCreditCard = () =>
  import("../components/onBoarding/addCreditCard.vue");
const userIvites = () => import("../components/onBoarding/user-invite.vue");
const invitedUser = () => import("../components/onBoarding/invited-user.vue");
const post = () =>
  import(/* webpackChunkName: "post" */ "../components/forum/post");
const messages = () =>
  import(/* webpackChunkName: "Messages" */ "../components/messages/main");
const tutorslist = () =>
  import(/* webpackChunkName: "Tutor" */ "../components/tutor/list");
const roomslist = () =>
  import(/* webpackChunkName: "Rooms" */ "../components/rooms/list");
const mainroom = () =>
  import(/* webpackChunkName: "Mainroom" */ "../components/rooms/main");
const roommembers = () =>
  import(/* webpackChunkName: "roommembers" */ "../components/rooms/members");
const courses = () =>
  import(/* webpackChunkName: "courses" */ "../components/courses/list");
const course = () =>
  import(/* webpackChunkName: "course" */ "../components/courses/course");
const courseroom = () =>
  import(/* webpackChunkName: "courseroom" */ "../components/courses/main");
const jobs = () =>
  import(/* webpackChunkName: "jobs" */ "../components/jobs/list");
const groupdocuments = () =>
  import(
    /* webpackChunkName: "groupdocuments" */ "../components/rooms/documents/list"
  );
const groupmeetings = () =>
  import(
    /* webpackChunkName: "groupmeetings" */ "../components/rooms/meetings/list"
  );
const feed = () =>
  import(/* webpackChunkName: "feed" */ "components/feed/main");
const friends = () =>
  import(/* webpackChunkName: "friends" */ "components/friends/list");
const onBoardingSurvey = () =>
  import("components/onBoarding/onboarding-survey");

Vue.use(VueRouter);
const childRoutes = (prop, mode) => [
  {
    path: "/",
    name: prop + ".list",
    meta: { auth: true, name: "Social App" },
    component: SocialProfile
  },
  {
    path: "/profile",
    name: prop + ".profile",
    meta: { auth: true, name: "Profile" },
    component: SocialProfile
  },
  {
    path: "friend-list",
    name: prop + ".friend-list",
    meta: {
      auth: true,
      name: "Friend List",
      img: require("../assets/images/page-img/profile-bg3.jpg")
    },
    component: FriendList
  },
  {
    path: "groups",
    name: prop + ".groups",
    meta: {
      auth: true,
      name: "Groups",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: roomslist
  },
  {
    path: "profile-image",
    name: prop + ".profile-image",
    meta: {
      auth: true,
      name: "Your Photos",
      img: require("../assets/images/page-img/profile-bg5.jpg")
    },
    component: ProfileImage
  },
  {
    path: "lessons",
    name: prop + ".lessons",
    meta: {
      auth: true,
      name: "Lessons",
      img: require("../assets/images/page-img/profile-bg9.jpg")
    },
    component: meetingList
  },
  {
    path: "profile-event",
    name: prop + ".profile-event",
    meta: {
      auth: true,
      name: "Your Event",
      img: require("../assets/images/page-img/profile-bg6.jpg")
    },
    component: ProfileEvent
  },
  {
    path: "courses",
    name: prop + ".courses",
    meta: { auth: true, name: "Courses" },
    component: courses
  },
  {
    path: "forum",
    name: prop + ".forum",
    meta: { auth: true, name: "Forum" },
    component: forum
  },
  {
    path: "notification",
    name: prop + ".notification",
    meta: { auth: true, name: "Notification" },
    component: Notification
  },
  {
    path: "file",
    name: prop + ".file",
    meta: { auth: true, name: "File" },
    component: File
  },
  {
    path: "friend-request",
    name: prop + ".friend-request",
    meta: { auth: true, name: "Friend Request" },
    component: FriendRequest
  },
  {
    path: "birthday",
    name: prop + ".birthday",
    meta: {
      auth: true,
      name: "Birthday",
      img: require("../assets/images/page-img/profile-bg4.jpg")
    },
    component: Birthday
  },
  {
    path: "weather",
    name: prop + ".weather",
    meta: {
      auth: true,
      name: "Weather",
      img: require("../assets/images/page-img/profile-bg2.jpg")
    },
    component: Weather
  },
  {
    path: "music",
    name: prop + ".music",
    meta: {
      auth: true,
      name: "Music",
      img: require("../assets/images/page-img/profile-bg8.jpg")
    },
    component: Music
  },
  {
    path: "/account-setting",
    name: "accountSetting",
    meta: { auth: true, name: "AccountSettings" },
    component: AccountSettings
  }
];

const coreChildRoute = (prop, mode) => [
  {
    path: "ui-colors",
    name: prop + ".color",
    meta: { auth: true, name: "Colors" },
    component: UiColors
  },
  {
    path: "ui-typography",
    name: prop + ".typography",
    meta: { auth: true, name: "Typography" },
    component: UiTypography
  },
  {
    path: "ui-alerts",
    name: prop + ".alert",
    meta: { auth: true, name: "Alert" },
    component: UiAlerts
  },
  {
    path: "ui-buttons",
    name: prop + ".button",
    meta: { auth: true, name: "Button" },
    component: UiButtons
  },
  {
    path: "ui-breadcrumb",
    name: prop + ".breadcrumb",
    meta: { auth: true, name: "Breadcrumb" },
    component: UiBreadcrumb
  },
  {
    path: "ui-badges",
    name: prop + ".badges",
    meta: { auth: true, name: "Badges" },
    component: UiBadges
  },
  {
    path: "ui-cards",
    name: prop + ".cards",
    meta: { auth: true, name: "Card" },
    component: UiCards
  },
  {
    path: "ui-carousel",
    name: prop + ".carousel",
    meta: { auth: true, name: "Carousel" },
    component: UiCarousel
  },
  {
    path: "ui-grid",
    name: prop + ".grid",
    meta: { auth: true, name: "Grid" },
    component: UiGrid
  },
  {
    path: "ui-embed-video",
    name: prop + ".embed-video",
    meta: { auth: true, name: "Embed Video" },
    component: UiEmbedVideo
  },
  {
    path: "ui-modal",
    name: prop + ".modal",
    meta: { auth: true, name: "Model" },
    component: UiModal
  },
  {
    path: "ui-listgroup",
    name: prop + ".listgroup",
    meta: { auth: true, name: "List Group" },
    component: UiListGroup
  },
  {
    path: "ui-images",
    name: prop + ".images",
    meta: { auth: true, name: "Image" },
    component: UiImages
  },
  {
    path: "ui-media-object",
    name: prop + ".media-object",
    meta: { auth: true, name: "Media Object" },
    component: UiMediaObject
  },
  {
    path: "ui-pagination",
    name: prop + ".pagination",
    meta: { auth: true, name: "Paginations" },
    component: UiPagination
  },
  {
    path: "ui-progressbars",
    name: prop + ".progressbars",
    meta: { auth: true, name: "Progressbar" },
    component: UiProgressBars
  },
  {
    path: "ui-tooltips",
    name: prop + ".tooltips",
    meta: { auth: true, name: "Tooltip" },
    component: UiTooltips
  },
  {
    path: "ui-popovers",
    name: prop + ".popovers",
    meta: { auth: true, name: "Popover" },
    component: UiPopovers
  },
  {
    path: "ui-notifications",
    name: prop + ".notifications",
    meta: { auth: true, name: "Notification" },
    component: UiNotifications
  },
  {
    path: "ui-tabs",
    name: prop + ".tabs",
    meta: { auth: true, name: "Tabs" },
    component: UiTabs
  }
];
const formChildRoute = (prop, mode = false) => [
  {
    path: "form-layout",
    name: prop + ".layout",
    meta: { auth: true, name: "Layout" },
    component: FormLayout
  },
  {
    path: "form-validate",
    name: prop + ".validate",
    meta: { auth: true, name: "Validate" },
    component: FormValidates
  },
  {
    path: "form-switches",
    name: prop + ".switch",
    meta: { auth: true, name: "Switch" },
    component: FormSwitches
  },
  {
    path: "form-radios",
    name: prop + ".radio",
    meta: { auth: true, name: "Radio" },
    component: FormRadios
  },
  {
    path: "form-checkboxes",
    name: prop + ".checkbox",
    meta: { auth: true, name: "Checkbox" },
    component: FormCheckboxes
  }
];

const tableChildRoute = (prop, mode = false) => [
  {
    path: "tables-basic",
    name: prop + ".basic",
    meta: { auth: true, name: "Basic" },
    component: TablesBasic
  },
  {
    path: "editable",
    name: prop + ".editable",
    meta: { auth: true, name: "Editable" },
    component: EditableTable
  }
];

const iconChildRoute = (prop, mode = false) => [
  {
    path: "dripicons",
    name: prop + ".dripicons",
    meta: { auth: true, name: "Dripicons" },
    component: IconDripicons
  },
  {
    path: "fontawesome-5",
    name: prop + ".fontawesome-5",
    meta: { auth: true, name: "Font Awsome" },
    component: IconFontawesome5
  },
  {
    path: "lineawesome",
    name: prop + ".lineawesome",
    meta: { auth: true, name: "Line Awsome" },
    component: IconLineAwesome
  },
  {
    path: "remixicon",
    name: prop + ".remixicon",
    meta: { auth: true, name: "Remixicon" },
    component: IconRemixicon
  },
  {
    path: "unicons",
    name: prop + ".unicons",
    meta: { auth: true, name: "Unicon" },
    component: IconUnicons
  }
];

const appChildRoute = (prop, mode = false) => [
  {
    path: "calendar",
    name: prop + ".calendar",
    meta: {
      auth: true,
      name: "Calendar",
      img: require("../assets/images/page-img/profile-bg6.jpg")
    },
    component: Calendar
  },
  {
    path: "chat",
    name: prop + ".chat",
    meta: { auth: true, name: "Chat" },
    component: chat
  },
  {
    path: "jobs",
    name: prop + ".jobs",
    meta: { auth: true, name: "Jobs" },
    component: jobs
  },
  {
    path: "email",
    name: prop + ".email",
    meta: { auth: true, name: "Email" },
    component: EmailListing
  },
  {
    path: "email-compose",
    name: prop + ".email.compose",
    meta: { auth: true, name: "New Email" },
    component: EmailCompose
  }
];

const authChildRoutes = (prop, mode = false) => [
  {
    path: "sign-in1",
    name: prop + ".sign-in1",
    meta: { auth: true },
    component: SignIn1
  },
  {
    path: "sign-up1",
    name: prop + ".sign-up1",
    meta: { auth: true },
    component: SignUp1
  },
  {
    path: "password-reset1",
    name: prop + ".password-reset1",
    meta: { auth: true },
    component: RecoverPassword1
  },
  {
    path: "lock-screen1",
    name: prop + ".lock-screen1",
    meta: { auth: true },
    component: LockScreen1
  },
  {
    path: "confirm-mail1",
    name: prop + ".confirm-mail1",
    meta: { auth: true },
    component: ConfirmMail1
  }
];
const defaultlayout = (prop, mode = false) => [
  {
    path: "timeline",
    name: prop + ".timeline",
    meta: { auth: true, name: "Timeline" },
    component: TimeLine
  },
  {
    path: "invoice",
    name: prop + ".invoice",
    meta: { auth: true, name: "Invoice" },
    component: Invoice
  },
  {
    path: "blank-page",
    name: prop + ".blank-page",
    meta: { auth: true, name: "Blank Page" },
    component: BlankPage
  },
  {
    path: "pricing",
    name: prop + ".pricing",
    meta: { auth: true, name: "Pricing" },
    component: Pricing
  },
  {
    path: "pricing-1",
    name: prop + ".pricing1",
    meta: { auth: true, name: "Pricing 1" },
    component: Pricing1
  },
  {
    path: "faq",
    name: prop + ".faq",
    meta: { auth: true, name: "Faq" },
    component: FAQ
  }
];

const pagesChildRoutes = (prop, mode = false) => [
  {
    path: "error/:code",
    name: prop + ".error",
    meta: { auth: true },
    component: ErrorPage
  },
  {
    path: "coming-soon",
    name: prop + ".coming-soon",
    meta: { auth: true },
    component: ComingSoon
  },
  {
    path: "maintenance",
    name: prop + ".maintenance",
    meta: { auth: true },
    component: Maintenance
  }
];
const userChildRoute = (prop, mode = false) => [
  {
    path: "profile",
    name: prop + ".profile",
    meta: { auth: true, name: "Profile" },
    component: Profile
  },
  {
    path: "profile-edit",
    name: prop + ".edit",
    meta: { auth: true, name: "Edit Profile" },
    component: ProfileEdit
  },
  {
    path: "add-user",
    name: prop + ".add",
    meta: { auth: true, name: "Add Profile" },
    component: AddUser
  }
];
const blogchildRoutes = (prop, mode = false) => [
  {
    path: "blog-grid",
    name: prop + ".blog-grid",
    meta: { auth: true, name: "blog-grid" },
    component: BlogGrid
  },
  {
    path: "blog-list",
    name: prop + ".blog-list",
    meta: { auth: true, name: "blog-list" },
    component: BlogList
  },
  {
    path: "blog-detail",
    name: prop + ".blog-detail",
    meta: { auth: true, name: "blog-detail" },
    component: BlogDetail
  }
];
const storechildRoutes = (prop, mode = false) => [
  {
    path: "category-grid",
    name: prop + ".category-grid",
    meta: {
      auth: true,
      name: "Store Category",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: CategoryGrid
  },
  {
    path: "category-list",
    name: prop + ".category-list",
    meta: {
      auth: true,
      name: "Store Category ",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: CategoryList
  },
  {
    path: "store-detail",
    name: prop + ".store-detail",
    meta: {
      auth: true,
      name: "Store",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: StoreDetail
  },
  {
    path: "checkout",
    name: prop + ".store-checkout",
    meta: {
      auth: true,
      name: "Store Checkout",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: StoreCheckout
  },
  {
    path: "checkout-address",
    name: prop + ".store-checkoutaddress",
    meta: {
      auth: true,
      name: "Store Checkout",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: StoreCheckoutaddress
  },
  {
    path: "checkout-payment",
    name: prop + ".store-checkoutpayment",
    meta: {
      auth: true,
      name: "Store Checkout",
      img: require("../assets/images/page-img/profile-bg7.jpg")
    },
    component: StoreCheckoutpayment
  }
];

const portalRoutes = (prop, mode) => [
  {
    name: "Partners",
    path: "/portal/partners",
    component: Partners,
    display: "Partners",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Partner",
    path: "/portal/partner",
    component: Partner,
    display: "Partner",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "admins",
    path: "/portal/admins",
    component: admins,
    display: "Admins",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetings",
    path: "/portal/meetings/:id",
    component: meetings,
    display: "Meetings",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetingCreate",
    path: "/portal/meetingCreate/:id",
    component: meetingCreate,
    display: "MeetingsCreate",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetingEdit",
    path: "/portal/meetingEdit/",
    component: meetingEdit,
    display: "MeetingsEdit",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetingDetails",
    path: "/portal/meetingDetails",
    component: meetingDetails,
    display: "MeetingsDetails",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetingInfo",
    path: "/portal/meetingInfo",
    component: meetingInfo,
    display: "MeetingsInfo",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetingDelete",
    path: "/portal/meetingDelete",
    component: meetingDelete,
    display: "MeetingsDetails",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "meetingList",
    path: "/portal/meetingList",
    component: meetingList,
    meta: { title: "Meeting List | Stuttie" },
    display: "Meetings List",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "bookMeetings",
    path: "/portal/bookMeetings",
    component: bookMeetings,
    meta: { title: "Book Meetings | Stuttie" },
    display: "Book Meetings",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "profile",
    path: "/portal/settings/profile",
    component: profile,
    meta: { title: "Profile | Stuttie" },
    display: "Profile",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Profile Name",
    path: "/portal/settings/profile/name",
    component: editProfileName,
    meta: { title: "Edit Name | Stuttie" },
    display: "editProfileName",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Display Name",
    path: "/portal/settings/profile/displayname",
    component: editDisplayName,
    meta: { title: "Edit Display Name | Stuttie" },
    display: "editDisplayName",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Stuttie Address",
    path: "/portal/settings/profile/Stuttieaddress",
    component: editStuttieAddress,
    meta: { title: "Edit Stuttie Address | Stuttie" },
    display: "editStuttieAddress",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "TUTOR PROFILE",
    path: "/portal/settings/organization",
    component: organizationProfile,
    meta: { title: "Tutor Profile | Stuttie" },
    display: "Tutor Profile",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Tutor Name",
    path: "/portal/settings/edit/name",
    component: editOrganizationName,
    meta: { title: "Edit Tutor Name | Stuttie" },
    display: "Edit Tutor Name",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Tutor Rate",
    path: "/portal/settings/edit/rate",
    component: editOrganizationRate,
    meta: { title: "Edit Tutor Rate | Stuttie" },
    display: "Edit Tutor Rate",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Tutor Address",
    path: "/portal/settings/edit/address",
    component: editOrganizationAddress,
    meta: { title: "Edit Tutor Address | Stuttie" },
    display: "Edit Tutor Address",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "About Tutor",
    path: "/portal/settings/edit/about",
    component: aboutOrganization,
    meta: { title: "About Organization | Stuttie" },
    display: "About Organization",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "school",
    path: "/portal/settings/school",
    component: school,
    meta: { title: "School | Stuttie" },
    display: "Profile",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "reports",
    path: "/portal/reports",
    component: reports,
    display: "Reports",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "userDirectory",
    path: "/portal/userDirectory",
    component: userDirectory,
    meta: { title: "User Directory | Stuttie" },
    display: "userDirectory",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "billing",
    path: "/portal/settings/billing",
    component: billing,
    meta: { title: "Billing | Stuttie" },
    display: "Billing",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "account Settings",
    path: "/portal/settings/accountSettings",
    component: accountSettings,
    meta: { title: "Account Settings | Stuttie" },
    display: "accountSettings",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "passwordChange",
    path: "/portal/settings/passwordChange",
    component: passwordChange,
    meta: { title: "Change password | Stuttie" },
    display: "passwordChange",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "paymentInfo",
    path: "/portal/settings/paymentInfo",
    component: paymentInfo,
    meta: { title: "Payment information | Stuttie" },
    display: "paymentInformation",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Edit Tutor Phone",
    path: "/portal/settings/edit/Phone",
    component: editOrganizationPhone,
    meta: { title: "Edit Organization Phone | Stuttie" },
    display: "editOrganizationPhone",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "onBoardingMyProfile",
    path: "/portal/onBoarding/my-profile",
    component: onBoardingMyProfile,
    meta: { title: "Onboarding | Stuttie" },
    display: "onBoardingMyProfile",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "onBoardingAddCreditCard",
    path: "/portal/onBoarding/add-card",
    component: onBoardingAddCreditCard,
    meta: { title: "Onboarding | Stuttie" },
    display: "onBoardingAddCreditCard",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "onBoardingInviteUsers",
    path: "/portal/onBoarding/invite-users",
    component: userIvites,
    meta: { title: "Onboarding | Stuttie" },
    display: "onBoardingInviteUsers",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "onBoardingInvitedUsers",
    path: "/portal/onBoarding/invited-User",
    component: invitedUser,
    meta: { title: "Onboarding | Stuttie" },
    display: "invitedUser",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "onBoardingEducation",
    path: "/portal/onBoarding/education",
    component: onBoardingEducation,
    meta: { title: "Onboarding Education | Stuttie" },
    display: "onBoardingEducation",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "forum",
    path: "/portal/forum",
    component: forum,
    meta: { title: "Forum | Stuttie" },
    display: "Forum",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "post",
    path: "/portal/post/:id",
    component: post,
    meta: { title: "Post | Stuttie" },
    display: "Post",
    icon: "home",
    showOnMenu: false
  },
  {
    name: "messages",
    path: "/messages/",
    component: messages,
    meta: { title: "Messages | Stuttie" },
    display: "Post",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "portalmessages",
    path: "/portal/messages/",
    component: messages,
    meta: { title: "Messages | Stuttie" },
    display: "Post",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "subjects",
    path: "/portal/settings/subjects/",
    component: subjects,
    meta: { title: "Subjects | Stuttie" },
    display: "Subjects",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "languages",
    path: "/portal/settings/languages/",
    component: languages,
    meta: { title: "Languages | Stuttie" },
    display: "Languages",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "onboardingsubjects",
    path: "/portal/onBoarding/subjects/",
    component: onboardingsubjects,
    meta: { title: "Subjects | Stuttie" },
    display: "Subjects",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "tutorslist",
    path: "/portal/tutors/list/",
    component: tutorslist,
    meta: { title: "Tutors | Stuttie" },
    display: "Tutors",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Rooms List",
    path: "/portal/groups/list/",
    component: roomslist,
    meta: { title: "Groups | Stuttie" },
    display: "Rooms",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Room",
    path: "/portal/group/main/",
    component: mainroom,
    meta: { title: "Group | Stuttie" },
    display: "Room",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "roommembers",
    path: "/portal/group/members/",
    component: roommembers,
    meta: { title: "Group Members | Stuttie" },
    display: "Room Members",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "chat",
    path: "/portal/chat/",
    component: chat,
    meta: { title: "Chat | Stuttie" },
    display: "Chat Rooms",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "chatapp",
    path: "/app/chat/",
    component: chat,
    meta: { title: "Chat | Stuttie" },
    display: "Chat Rooms",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "chatrooms",
    path: "/portal/chat/rooms",
    component: chatrooms,
    meta: { title: "Chat Rooms | Stuttie" },
    display: "Chat Rooms",
    icon: "home",
    showOnMenu: true
  },
  //{ name: 'courses', path: '/portal/courses/list', component: courses, meta: { title: 'Courses | Stuttie' }, display: 'Courses', icon: 'home', showOnMenu: true },
  {
    name: "course",
    path: "/portal/course/edit/:id",
    component: course,
    meta: { title: "Course | Stuttie" },
    display: "Course",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "education",
    path: "/portal/settings/education",
    component: education,
    meta: { title: "Education | Stuttie" },
    display: "Education",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Course Room",
    path: "/portal/course/room/:id",
    component: courseroom,
    meta: { title: "Course Room | Stuttie" },
    display: "Rooms",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "jobs",
    path: "/portal/jobs/",
    component: jobs,
    meta: { title: "Jobs Room | Stuttie" },
    display: "Rooms",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "groupdocuments",
    path: "/portal/group/documents/",
    component: groupdocuments,
    meta: { title: "Group Documents | Stuttie" },
    display: "Groups",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "groupmeetings",
    path: "/portal/group/meetings/",
    component: groupmeetings,
    meta: { title: "Group Meetings | Stuttie" },
    display: "Groups",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "Schedule",
    path: "/portal/settings/schedules",
    component: schedule,
    meta: { title: "Schedule | Stuttie" },
    display: "Schedule",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "reviews",
    path: "/portal/settings/reviews",
    component: reviews,
    meta: { title: "Reviews Room | Stuttie" },
    display: "Reviews",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "feed",
    path: "/portal/feed/",
    component: feed,
    meta: { title: "Feed | Stuttie" },
    display: "Feed",
    icon: "home",
    showOnMenu: true
  },
  {
    name: "friends",
    path: "/portal/friends/",
    component: friends,
    meta: { title: "Friends | Stuttie" },
    display: "Friends",
    icon: "home",
    showOnMenu: true
  }
];
const routes = [
  {
    path: "/",
    name: "social",
    component: Layout,
    children: childRoutes("social")
  },
  {
    path: "/core",
    name: "core",
    component: Layout,
    meta: { auth: true },
    children: coreChildRoute("core")
  },
  {
    path: "/table",
    name: "table",
    component: Layout,
    meta: { auth: true },
    children: tableChildRoute("table")
  },
  {
    path: "/icon",
    name: "icon",
    component: Layout,
    meta: { auth: true },
    children: iconChildRoute("icon")
  },
  {
    path: "/auth",
    name: "auth1",
    component: AuthLayout,
    meta: { auth: true },
    children: authChildRoutes("auth1")
  },
  {
    path: "/pages",
    name: "pages",
    component: Default,
    meta: { auth: true },
    children: pagesChildRoutes("default")
  },
  {
    path: "/extra-pages",
    name: "extra-pages",
    component: Layout,
    meta: { auth: true },
    children: defaultlayout("extra-pages")
  },
  {
    path: "/app",
    name: "app",
    component: Layout,
    meta: { auth: true },
    children: appChildRoute("app")
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    meta: { auth: true },
    children: userChildRoute("user")
  },
  {
    path: "/form",
    name: "form",
    component: Layout,
    meta: { auth: true },
    children: formChildRoute("form")
  },
  {
    path: "/blog",
    name: "blog",
    component: Layout,
    children: blogchildRoutes("blog")
  },
  {
    path: "/portal",
    name: "portal",
    component: Layout,
    children: portalRoutes("portal")
  },
  {
    path: "/store",
    name: "store",
    component: Layout,
    children: storechildRoutes("store")
  },
  {
    path: "/survey",
    name: "onboardingSurvey",
    component: onBoardingSurvey
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Pages/Login.vue")
      },
      {
        path: "/register",
        name: "register",
        component: SignUp1
      },
      { path: "*", component: NotFound }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes
});

export default router;
