frappe.ready(function() {
    if (frappe.session.user !== "Guest") {
        let redirectPath = localStorage.getItem("redirect_after_login");
        if (redirectPath && redirectPath !== "/login") {
            localStorage.removeItem("redirect_after_login");
            window.location.href = redirectPath;
        }
    }
});
