import frappe # type: ignore
def get_context(context):
    context.Job_info=frappe.get_all("Job",fields=["name","jop_title","aplication_deadline","organization_name","jop_type"])
    context.Training_info=frappe.get_all("Training",
    fields=["name","training_title","aplication_deadline","organization_name","training_pattren","about_training","training_post_date"])
    return context
 
