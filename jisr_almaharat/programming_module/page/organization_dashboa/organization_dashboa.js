////////////////// Initialization the Page /////////////////////////////
frappe.pages['organization-dashboa'].on_page_load = function (wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Organization Dashboard',
        single_column: true
    });
////////////////// End Initialization the Page /////////////////////////////

///////////////// Create a user interface //////////////////////////////////
    let $main = $(page.main);

    $main.html(`
        <div class="dashboard-container" style="display: flex; height: 100vh;">
            <aside style="width: 260px; background-color: #007bff; color: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h3 style="margin-top: 0; text-align: center;">Menu</h3>
                <nav>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="#" class="menu-item" id="profile-btn">My Profile</a></li>
                        <li><a href="#" class="menu-item" id="jobs-btn">Jobs</a></li>
                        <li><a href="#" class="menu-item" id="trainings-btn">Trainings</a></li>
                        <li><a href="#" class="menu-item" id="applications-btn">Applications</a></li>
                        <li><a href="#" class="menu-item" id="applications-btn">Notifcation</a></li>
                    </ul>
                </nav>
            </aside>

            <main style="flex-grow: 1; padding: 25px; background-color: #f9f9f9; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <div id="content-section">
                    <h2>Welcome to Organization Dashboard</h2>
                    <div id="organization-profile" style="display: flex; gap: 20px; margin-top: 20px;" ></div>
                    <div id="summary-cards" style="display: flex; gap: 20px; margin-top: 20px;"></div><br>
                </div>
            </main>
        </div>
    `);
/////////////////  End the create a user interface //////////////////////////////////

    // Menu item styles
    $('.menu-item').css({
        "color": "white", "font-weight": "bold",
        "text-decoration": "none",
        "display": "block",
        "padding": "10px",
        "border-radius": "5px",
        "margin": "5px 0"
    }).hover(function () {
        $(this).css({ "background-color": "#004090", "border-radius": "8px" });
    }, function () {
        $(this).css({ "background-color": "transparent" });
    });

    // Load organization profile
    const loadoOrganizationProfile = () => {
        $('#organization-profile').html('');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Organization',
                fields: ['name', 'organization_name', 'registration_date', 'logo', 'email', 'website', 'about_organization', 'location']
            },
            callback: function (response) {
                let org = response.message[0] || {};

                $('#content-section').append(`
                    <div class="profile-card" style="background: white; padding: 20px; border-radius: 15px;">
                        <h2>${org.organization_name || 'Organization Name'}</h2>
                        <p><strong>Registered:</strong> ${org.registration_date || 'N/A'}</p>
                        <p><strong>Email:</strong> ${org.email || 'N/A'}</p>
                        <p><strong>Website:</strong> <a href="${org.website}" target="_blank">${org.website || 'N/A'}</a></p>
                        <p><strong>Location:</strong> ${org.location || 'N/A'}</p>
                        <p><strong>About:</strong> ${org.about_organization || 'N/A'}</p>
                        <button id="edit-profile-btn" class="btn btn-primary">Edit Profile</button>
                    </div>
                `);

                // Handle profile editing
                $('#edit-profile-btn').click(function () {
                    frappe.set_route('Form', 'Organization', org.name);
                });
            }
        });
    }

        // Load summary cards
        const loadSummaryCards = () => {
            $('#summary-cards').html('');

            frappe.call({
                method: 'frappe.client.get_count',
                args: { doctype: 'Job' },
                callback: function (r) {
                    $('#summary-cards').append(`
                        <div style="background: white; padding: 20px; border-radius: 10px; width: 200px;">
                            <h3>Jobs Posted</h3>
                            <p>${r.message} jobs</p>
                        </div>
                    `);
                }
            });

            frappe.call({
                method: 'frappe.client.get_count',
                args: { doctype: 'Training' },
                callback: function (r) {
                    $('#summary-cards').append(`
                        <div style="background: white; padding: 20px; border-radius: 10px; width: 200px;">
                            <h3>Trainings Posted</h3>
                            <p>${r.message} trainings</p>
                        </div>
                    `);
                }
            });

           
        };
    

//////////////////////////////////////////////////////////////////////
       
/////////////////////////////////////////////////////////////////////
 
    // Load organization profile
        $('#profile-btn').click(function () {
        $('#content-section').html('');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Organization',
                fields: ['name', 'organization_name', 'registration_date', 'logo', 'email', 'website', 'about_organization', 'location']
            },
            callback: function (response) {
                let org = response.message[0] || {};

                $('#content-section').append(`
                    <div class="profile-card" style="background: white; padding: 20px; border-radius: 15px;">
                       <h1>${org.organization_name || 'Organization Name'}</h1>
                        <p><strong>Registered:</strong> ${org.registration_date || 'N/A'}</p>
                        <p><strong>Email:</strong> ${org.email || 'N/A'}</p>
                        <p><strong>Website:</strong> <a href="${org.website}" target="_blank">${org.website || 'N/A'}</a></p>
                        <p><strong>Location:</strong> ${org.location || 'N/A'}</p>
                        <p><strong>About:</strong> ${org.about_organization || 'N/A'}</p>
                        <button id="edit-profile-btn" class="btn btn-primary">Edit Profile</button>
                    </div>
                `);

                // Handle profile editing
                $('#edit-profile-btn').click(function () {
                    frappe.set_route('Form', 'Organization', org.name);
                });
            }
        });
    });
 
    // Load jobs section
    $('#jobs-btn').click(function () {
        $('#content-section').html('<h3>Loading Jobs...</h3>');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Job',
                fields: ['name', 'jop_title', 'posting_date', 'jop_description']
            },
            callback: function (response) {
                let jobs = response.message || [];
                $('#content-section').html(`
                    <div>
                        <h3>Jobs Posted</h3>
                        <button class="btn btn-primary" id="add-job-btn">Add New Job</button>
                        <ul id="job-list" class="list-group mt-3"></ul>
                    </div>
                `);

                if (jobs.length === 0) {
                    $('#job-list').append('<li class="list-group-item text-muted">No jobs posted yet.</li>');
                } else {
                    jobs.forEach(job => {
                        $('#job-list').append(`
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>${job.jop_title}</strong>
                                    <small class="text-muted">(Posted on: ${job.posting_date})</small>
                                    <p>${job.jop_description || 'No description available.'}</p>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-warning edit-job" data-name="${job.name}">Edit</button>
                                    <button class="btn btn-sm btn-danger delete-job" data-name="${job.name}">Delete</button>
                                </div>
                            </li>
                        `);
                    });
                }

                // Handle add, edit, and delete actions
                $('#add-job-btn').click(function () {
                    //frappe.new_doc('Job');
                    window.location.href = '/add-job';
                });

                $('.edit-job').click(function () {
                    let job_name = $(this).data('name');
                    frappe.set_route('Form', 'Job', job_name);
                });

                $('.delete-job').click(function () {
                    let job_name = $(this).data('name');
                    frappe.call({
                        method: 'frappe.client.delete',
                        args: { doctype: 'Job', name: job_name },
                        callback: function () {
                            frappe.msgprint('Job deleted successfully.');
                            $('#jobs-btn').trigger('click');
                        }
                    });
                });
            }
        });
    });

    // Load trainings section
    $('#trainings-btn').click(function () {
        $('#content-section').html('<h3>Loading Trainings...</h3>');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Training',
                fields: ['name', 'training_title', 'training_post_date']
            },
            callback: function (response) {
                let trainings = response.message || [];
                $('#content-section').html(`
                    <div>
                        <h3>Trainings Posted</h3>
                        <button class="btn btn-primary" id="add-training-btn">Add New Training</button>
                        <ul id="training-list" class="list-group mt-3"></ul>
                    </div>
                `);

                if (trainings.length === 0) {
                    $('#training-list').append('<li class="list-group-item text-muted">No trainings posted yet.</li>');
                } else {
                    trainings.forEach(training => {
                        $('#training-list').append(`
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>${training.training_title}</strong>
                                    <small class="text-muted">(Posted on: ${training.training_post_date})</small>
                                    <p>${training.about_training || 'No description available.'}</p>
                                </div>
                                <div>
                                    <button class="btn btn-sm btn-warning edit-training" data-name="${training.name}">Edit</button>
                                    <button class="btn btn-sm btn-danger delete-training" data-name="${training.name}">Delete</button>
                                </div>
                            </li>
                        `);
                    });
                }

                $('#add-training-btn').click(function () {
                    // frappe.new_doc('Training');
                    window.location.href = '/add-training';
                });

                $('.edit-training').click(function () {
                    let training_name = $(this).data('name');
                    frappe.set_route('Form', 'Training', training_name);
                });

                $('.delete-training').click(function () {
                    let training_name = $(this).data('name');
                    frappe.call({
                        method: 'frappe.client.delete',
                        args: { doctype: 'Training', name: training_name },
                        callback: function () {
                            frappe.msgprint('Training deleted successfully.');
                            $('#trainings-btn').trigger('click');
                        }
                    });
                });
            }
        });
    });

    // Load applications section
    $('#applications-btn').click(function () {
        $('#content-section').html('<h3>Loading Applications...</h3>');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Application',
                fields: ['name', 'applicant_name', 'kind']
            },
            callback: function (response) {
                let applications = response.message || [];
                $('#content-section').html(`
                    <div>
                        <h3>Applications</h3>
                        <ul id="application-list" class="list-group mt-3"></ul>
                    </div>
                `);

                if (applications.length === 0) {
                    $('#application-list').append('<li class="list-group-item text-muted">No applications found.</li>');
                } else {
                    applications.forEach(app => {
                        $('#application-list').append(`
                            <li class="list-group-item">
                                <strong>${app.applicant_name}</strong>
                                <small class="text-muted">(Applied on: ${app.kind})</small>
                                <button class="btn btn-sm btn-warning edit-app" data-name="${app.name}">Edit</button>
                                <button class="btn btn-sm btn-danger delete-app" data-name="${app.name}">Delete</button>
                            </li>
                        `);
                    });
                }

                $('.edit-app').click(function () {
                    let app_name = $(this).data('name');
                    frappe.set_route('Form', 'Application', app_name);
                });

                $('.delete-app').click(function () {
                    let app_name = $(this).data('name');
                    frappe.call({
                        method: 'frappe.client.delete',
                        args: { doctype: 'Application', name: app_name },
                        callback: function () {
                            frappe.msgprint('Application deleted successfully.');
                            $('#applications-btn').trigger('click');
                        }
                    });
                });
            }
        });
    });
    loadoOrganizationProfile();
    loadSummaryCards();
    
};
