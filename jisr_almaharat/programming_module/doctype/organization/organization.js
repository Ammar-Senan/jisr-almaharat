// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("Organization", {
	refresh(frm) {

        // to get the User information from docType User by session
        let userEmail = frappe.session.user_email;
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
            doctype: 'User',
            fields: ['name', 'email', 'full_name'], 
            filters: {
                email: userEmail
            }
            },
            callback: function (response) {
            const user = response.message || [];
                if (user.length > 0) {
                    
                    frm.set_value('organization_name', user[0].full_name);
                    frm.set_value('email', user[0].email);
                }
                

        }});

        frm.set_value('registration_date', frappe.datetime.get_today());


    },
         
});
