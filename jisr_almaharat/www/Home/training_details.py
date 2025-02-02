import frappe # type: ignore
def get_context(context):
    try:
       context.detail = frappe.get_doc("Training",frappe.form_dict.docname) 
    except Exception as e:   
       frappe.local.flags.redirect_location ='/404'
       raise frappe.Redirect       
    return context
