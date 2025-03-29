import frappe
from frappe.model.document import Document
from frappe.utils import validate_email_address

class Organization(Document):
    # Function executed when the document is updated
    def on_update(self):
        # Execute the code when the document is updated
        if self.workflow_state == "Approved":
            # Get the email from Organization
            organization_email = self.email

            # Check if a user with this email exists
            if frappe.db.exists("User", {"email": organization_email}):
                # Get the user document
                user_doc = frappe.get_doc("User", {"email": organization_email})

                # The role you want to add
                role_name = "Organization Role"

                # Check if the user already has the role
                if not any(role.role == role_name for role in user_doc.roles):
                    # Add the role to the user
                    user_doc.append("roles", {"role": role_name})
                    user_doc.save(ignore_permissions=True)
                    frappe.db.commit()
                    frappe.msgprint(f'The {self.organization_name} , Actived successfully!')
                else:
                    frappe.msgprint(f'User {organization_email} already has the required role.')
            else:
                frappe.msgprint(f'No user is registered with the email {organization_email}.')