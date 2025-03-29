import frappe # type: ignore

def get_user_roles():
    """Fetch current user's roles"""
    user = frappe.session.user  # Get the currently logged-in user
    user_doc = frappe.get_doc("User", user)  # Fetch the user document
    roles = [role.role for role in user_doc.roles]  # Extract roles

    # Log the output (for debugging)
    frappe.logger().info(f"User: {user}, Roles: {roles}")

    return {"user": user, "roles": roles}
def get_context(context):
    try:
       context.detail = frappe.get_doc("Training",frappe.form_dict.docname) 
    except Exception as e:   
       frappe.local.flags.redirect_location ='/404'
       raise frappe.Redirect  

     # Add user roles to context
    context.user_data = get_user_roles()      
    return context
