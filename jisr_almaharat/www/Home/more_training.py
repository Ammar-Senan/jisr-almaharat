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
    context.oline=frappe.get_all("Training",
    fields=["name","training_title","about_training","aplication_deadline","training_post_date","organization_name","training_pattren","location", "image", "training_status", "creation"])
    context.user_data = get_user_roles()  
    return context
 
