export default class Constants {
  static ACCESS_TOKEN = "access_token";
  static REFRESH_TOKEN = "refresh_token";
  static PUBLIC_ROUTES = ["/", "/home", "/hotel", "/sign-in", "/sign-up"];

  static INPUT_TYPE = {
    TEXT: "text",
    EMAIL: "email",
    PASSWORD: "password",
    CHECKBOX: "checkbox",
    CIRCLE_CHECKBOX: "circle_checkbox",
    SELECT: "select",
    TEXTAREA: "textarea",
    MONTH_PICKER: "month_picker",
    MONTH_RANGE_PICKER: "month_range_picker",
    EDITOR: "editor",
    FILE_UPLOAD: "file",
    RADIO: "radio",
    INPUT_CHECK: "input_check",
    RE_CAPTCHA: "re_captcha",
    AVATAR: "avatar",
    DATE_RANGE_PICKER: "date_range_picker",
    AUTOCOMPLETE: "autocomplete",
    INCREMENT_NUMBER: "increment_number",
    RANGE_SLIDER: "range_slider",
  };

  static DEFAULT_PAGESIZE = 6;

  static ROLE = {
    ADMIN: 1,
    USER: 10,
  };

  static PAGINATION = {
    LIMIT: 6,
    SIBLING_COUNT: 8,
  };

  static HOTEL_STAR = [
    { key: 1, label: 1 },
    { key: 2, label: 2 },
    { key: 3, label: 3 },
    { key: 4, label: 4 },
    { key: 5, label: 5 },
  ];
  static HOTEL_REVIEW_SCORE = [
    { key: 1, label: 1 },
    { key: 2, label: 2 },
    { key: 3, label: 3 },
    { key: 4, label: 4 },
    { key: 5, label: 5 },
    { key: 6, label: 6 },
    { key: 7, label: 7 },
    { key: 8, label: 8 },
    { key: 9, label: 9 },
    { key: 10, label: 10 },
  ];
  static TAX = 10;

  static PAYMENT_METHOD = {
    CREDIT_CARD: "CREDIT CARD",
  };

  static RESERVATION_STATUS = {
    CANCELLED: "CANCELLED",
    CONFIRMED: "CONFIRMED",
    PENDING: "PENDING",
    REFUND: "REFUND",
  };
}
