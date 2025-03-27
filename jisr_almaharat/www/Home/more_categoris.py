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
    context.Categories=frappe.get_all("Job",
    fields=["name","jop_title","aplication_deadline","organization_name","jop_type","job_categories","jop_location"])
    context.user_data = get_user_roles()  
    return context
 
