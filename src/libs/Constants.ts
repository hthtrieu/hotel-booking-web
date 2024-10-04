
export default class Constants {
    static ACCESS_TOKEN = 'access_token';
    static REFRESH_TOKEN = 'refresh_token';
    static PUBLIC_ROUTES = ['/', '/services', '/jobs', '/case-study', '/inquiry'];

    static INPUT_TYPE = {
        TEXT: 'text',
        EMAIL: 'email',
        PASSWORD: 'password',
        CHECKBOX: 'checkbox',
        CIRCLE_CHECKBOX: 'circle_checkbox',
        SELECT: 'select',
        TEXTAREA: 'textarea',
        MONTH_PICKER: 'month_picker',
        MONTH_RANGE_PICKER: 'month_range_picker',
        EDITOR: 'editor',
        FILE_UPLOAD: 'file',
        RADIO: 'radio',
        INPUT_CHECK: 'input_check',
        RE_CAPTCHA: 're_captcha',
        AVATAR: 'avatar',
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

    // static SidebarNavItems = [
    //     {
    //         href: routerPaths.ADMIN_SETS,
    //         title: 'Sets',
    //     },
    //     {
    //         href: routerPaths.ADMIN_PENDING_SETS,
    //         title: 'Pending Sets',
    //     },
    //     {
    //         href: routerPaths.ADMIN_SETS_MULTIPLE_CHOICE_TEST,
    //         title: 'Tests',
    //     },
    // ];

}
