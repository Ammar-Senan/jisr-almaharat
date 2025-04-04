import frappe # type: ignore
# ////////////////////////// code to get the session role 
def get_user_roles():
    """Fetch current user's roles"""
    user = frappe.session.user  # Get the currently logged-in user
    user_doc = frappe.get_doc("User", user)  # Fetch the user document
    roles = [role.role for role in user_doc.roles]  # Extract roles

    # Log the output (for debugging)
    frappe.logger().info(f"User: {user}, Roles: {roles}")

    return {"user": user, "roles": roles}


def get_context(context):
    # try:
    # cate=frappe.form_dict.cate
    # context.Jcategories = frappe.get_doc("Job",frappe.form_dict.cate) 
    context.Jcategories=frappe.get_all("Job",filters={"job_categories":frappe.form_dict.cate},
    fields=["name","jop_title", "job_categories",  "status", "aplication_deadline", "organization_name", "jop_location", "jop_type"])
    #print(f"\n\n\n\n\n\n{frappe.form_dict.cate}\n\n\n\n\n")
    # except Exception as e:   
    #    frappe.local.flags.redirect_location ='/404'
    #    raise frappe.Redirect  
    context.Tcategories=frappe.get_all("Training",filters={"training_categories":frappe.form_dict.cate},
    fields=["name","training_title", "training_categories",  "training_status", "aplication_deadline", "training_pattren", "location", "organization_name"])

     # Add user roles to context
    context.user_data = get_user_roles()      
    return context
