frappe.ready(function() {

	frappe.web_form.set_value("kind", "{{Job_kind}}");

	if ("{{Job_kind}}" == "Training") {
		frappe.web_form.set_value("training_name", "{{detail.jop_title }}");
	}else if ("{{Job_kind}}" == "Job") {
		frappe.web_form.set_value("job_name", "{{detail.jop_title }}");
	};
	
	//make job_name unhidden if kind is job and make training_name unhidden if kind is training in frappe web form
	frappe.web_form.on('kind', (field, value) => {
		if (value == "Training") {
			frappe.web_form.set_df_property('job_name', 'hidden', 1);
			frappe.web_form.set_df_property('training_name', 'hidden', 0);
		}else if(value == "Job") {
			frappe.web_form.set_df_property('job_name', 'hidden', 0);
			frappe.web_form.set_df_property('training_name', 'hidden', 1);
		};
		
	});

	
})