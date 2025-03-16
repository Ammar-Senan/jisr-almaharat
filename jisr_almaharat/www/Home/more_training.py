import frappe # type: ignore
def get_context(context):
    context.oline=frappe.get_all("Training",
    fields=["name","training_title","about_training","aplication_deadline","training_post_date","organization_name","training_pattren","location", "image", "training_status", "creation"])
    return context
 
