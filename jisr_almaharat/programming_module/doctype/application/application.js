// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("Application", {
	refresh(frm) {
        let userEmail = frappe.session.user;
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
              doctype: 'User1',
              fields: ['name', 'name1', 'email', 'phone_number', 'address'], 
              filters: {
                email: userEmail
              }
            },
            callback: function (response) {
              const user = response.message || [];
                if (user.length > 0) {
                    frm.set_value('applicant_name', user[0].name1);
                    frm.set_value('phone', user[0].phone_number);
                    frm.set_value('email', user[0].email);
                    frm.set_value('address',user[0].address);
                   
                }

        }});

	},
    // make job_name unhidden if kind is job and make training_name unhidden if kind is training
    kind: function (frm) {
        if (frm.doc.kind === 'Job') {
            frm.toggle_display('job_name', true);
            frm.toggle_display('training_name', false);
        } else {
            frm.toggle_display('training_name', true);
            frm.toggle_display('job_name', false);
        }
    },
    
});
