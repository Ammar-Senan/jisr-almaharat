frappe.ready(function() {  
    // bind events here 
	//Organization Site add value to it
	// $('input[data-fieldname="organization"]').on('change', function() {
	// 	var organization = $('input[data-fieldname="organization"]').val();
	// 	frappe.db.get_value("Organization", organization, "site", function(value) {
	// 		$('input[data-fieldname="site"]').val(value.message.site);
	// 	});
	// });


	/////////////////////////////////////////
	frappe.web_form.on('after_load', () => {
		const user_email = "{{ user_email }}";
		if (user_email) {
			frappe.web_form.set_value('jop_title', user_email);
		}
	});
	///////////////////////////////////
	let session = frappe.session
	// frappe.web_form.set_value("jop_title", session.user);
	// frappe.web_form.set_value("jop_title", session.user_email);
	// frappe.web_form.on('after_load', () => {
	// 	frappe.msgprint('تم تحميل الصفحة');
	// });
	frappe.web_form.after_load = () => {
		frappe.msgprint('Value must be more than 1000');
	}
	
	
	
 
});