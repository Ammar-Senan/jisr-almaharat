// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("Application", {
	// refresh(frm) {

	// },
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
