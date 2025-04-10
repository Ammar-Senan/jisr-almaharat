import frappe  # type: ignore

def get_user_roles():
    """Fetch current user's roles"""
    user = frappe.session.user  # Get the currently logged-in user
    user_doc = frappe.get_doc("User", user)  # Fetch the user document
    roles = [role.role for role in user_doc.roles]  # Extract roles

    # Log the output (for debugging)
    frappe.logger().info(f"User: {user}, Roles: {roles}")

    return {"user": user, "roles": roles}

def get_context(context):
    """Pass job, training, and user role data to the template"""
    context.Job_info = frappe.get_all(
        "Job",
        fields=["name", "jop_title", "posting_date", "aplication_deadline",
                "organization_name", "jop_type", "image", "status", "job_categories", "creation"]
    )

    context.Training_info = frappe.get_all(
        "Training",
        fields=["name", "training_title", "aplication_deadline", "organization_name",
                "training_pattren", "about_training", "training_post_date",
                "image", "training_status", "creation"]
    )

    # Add user roles to context
    context.user_data = get_user_roles()  
    
    return context