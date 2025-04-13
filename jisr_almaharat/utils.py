# your_app/utils.py
import frappe
from frappe.utils import get_url

@frappe.whitelist(allow_guest=True)
def custom_login():
    # احفظ الصفحة السابقة في redirect-to إذا لم تكن موجودة
    if not frappe.local.form_dict.get("redirect-to"):
        referer = frappe.get_request_header("Referer")
        if referer and "/login" not in referer:
            frappe.local.form_dict["redirect-to"] = referer

    return frappe.auth.login()
