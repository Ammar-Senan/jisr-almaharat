////////////////// Initialization the Page /////////////////////////////
frappe.pages['admin-dashboard'].on_page_load = function (wrapper) {
    let page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Admin Dashboard',
        single_column: true
    });
////////////////// End Initialization the Page /////////////////////////////

///////////////// Create a user interface //////////////////////////////////
let counter = 0;
let n = 0 ;
let $main = $(page.main);

$main.html(`
    <div class="dashboard-container" style="display: flex; height: 100vh;">
        <aside style="width: 260px; background-color: #2c3e50; color: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <nav>
                <ul style="list-style: none; padding: 0;"> 
                    <li><a href="#" class="menu-item" id="users-btn">Users</a></li>
                    <li><a href="#" class="menu-item" id="organizations-btn">Organizations</a></li>
                    <li><a href="#" class="menu-item" id="jobs-btn">Jobs</a></li>
                    <li><a href="#" class="menu-item" id="trainings-btn">Trainings</a></li>
                    <li><a href="#" class="menu-item" id="applications-btn">Applications</a></li>
                   
                </ul>
            </nav>
        </aside>

        <main style="flex-grow: 1; padding: 25px; background-color: #f9f9f9; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            
            <div id="content-section">
                <!-- Welcome Section -->
                <div style="background-color: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #2c3e50;">Dashboard</h2>
                    <p style="color: #7f8c8d;">Welcome Admin</p>

                    <div style="display: flex; gap: 20px; margin-top: 20px;">

                        <div Class="cards" id="userCard">
                            <h3 style="margin: 0;">Users</h3>
                            <p style="font-size: 24px; margin: 10px 0;"></p>
                        </div>

                         <div Class="cards" id="organizationCard">
                            <h3 style="margin: 0;">Organizations</h3>
                            <p style="font-size: 24px; margin: 10px 0;"></p>
                        </div>
                        
                        <div Class="cards" id="jobCard">
                            <h3 style="margin: 0;">Jobs</h3>
                            <p style="font-size: 24px; margin: 10px 0;"></p>
                        </div>

                        <div Class="cards" id="trainingCard">
                            <h3 style="margin: 0;">Trainings</h3>
                            <p style="font-size: 24px; margin: 10px 0;"></p>
                        </div>

                    </div>
                </div>
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
    $(this).css({ "background-color": "#34495e", "border-radius": "8px" });
}, function () {
    $(this).css({ "background-color": "transparent" });
});
$('.cards').css({
    "background-color":"rgb(194, 205, 206)",
    "color": "white",
    "padding": "20px",
    "border-radius": "10px",
    "flex": "1"
}).hover(function () {
    $(this).css({ "background-color":"rgb(169, 179, 180)", "border-radius": "8px","cursor": "pointer" });
}, function () {
    $(this).css({ "background-color": "rgb(194, 205, 206)" });
});





    // Load summary cards
    const userCard = () => {
        $('#userCard').html('');
        frappe.call({
            method: 'frappe.client.get_count',
            args: { doctype: 'User1' },
            callback: function (r) {
                $('#userCard').append(`
                     <div Class="cards" id="userCard">
                            <h3 style="margin: 0;">Users</h3>
                            <p style="font-size: 24px; margin: 10px 0;">Total: ${r.message}</p>
                        </div>
                `);
            }
        });   
    };

    const organizationCard = () => {
        $('#organizationCard').html('');
        frappe.call({
            method: 'frappe.client.get_count',
            args: { doctype: 'Organization' },
            callback: function (r) {
                $('#organizationCard').append(`
                     <div Class="cards" id="organizationCard">
                            <h3 style="margin: 0;">Organizations</h3>
                            <p style="font-size: 24px; margin: 10px 0;">Total: ${r.message}</p>
                        </div>
                `);
            }
        });   
    };

    const jobCard = () => {
        $('#jobCard').html('');
        frappe.call({
            method: 'frappe.client.get_count',
            args: { doctype: 'Job' },
            callback: function (r) {
                $('#jobCard').append(`
                     <div Class="cards" id="jobCard">
                            <h3 style="margin: 0;">Jobs</h3>
                            <p style="font-size: 24px; margin: 10px 0;">Total: ${r.message}</p>
                        </div>
                `);
            }
        });   
    };

    const trainingCard = () => {
        $('#trainingCard').html('');
        frappe.call({
            method: 'frappe.client.get_count',
            args: { doctype: 'Training' },
            callback: function (r) {
                $('#trainingCard').append(`
                     <div Class="cards" id="trainingCard">
                            <h3 style="margin: 0;">Trainings</h3>
                            <p style="font-size: 24px; margin: 10px 0;">Total: ${r.message}</p>
                        </div>
                `);
            }
        });   
    };


//////////////////////////////////////////////////////////////////////
   
/////////////////////////////////////////////////////////////////////

// Load User1 section
function loadUser1() {
    $('#content-section').html('<h3>Loading Users...</h3>');
    
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'User1',
            fields: ['name','name1', 'email', 'creation']
        },
        callback: function (response) {
            let users = response.message || [];
            $('#content-section').html(`
                <div>
                    <h3>Users Posted</h3>
                    <button class="btn btn-primary" id="add-user-btn">Add New User</button>
                    <ul id="user-list" class="list-group mt-3"></ul>
                </div>
            `);

            if (users.length === 0) {
                $('#user-list').append('<li class="list-group-item text-muted">No users posted yet.</li>');
            } else {
                users.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                users.forEach(user => {
                    $('#user-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${user.name1}</strong>
                                <p>${user.email || 'No email available.'}</p>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-warning edit-user" data-name="${user.name1}">Edit</button>
                                <button class="btn btn-sm btn-danger delete-user" data-name="${user.name1}">Delete</button>
                            </div>
                        </li>
                    `);
                });
            }

            $('#add-user-btn').click(function () {
                window.location.href = '/add-user';
            });

            $('.edit-user').click(function () {
                let user_name = $(this).data('name');
                frappe.set_route('Form', 'User1', user_name);
            });

            $('.delete-user').click(function () {
                let user_name = $(this).data('name');
                frappe.call({
                    method: 'frappe.client.delete',
                    args: { doctype: 'User1', name: user_name },
                    callback: function () {
                        frappe.msgprint('User deleted successfully.');
                        $('#users-btn').trigger('click');
                    }
                });
            });
        }
    });
}

// call the function on click on id 
$('#users-btn').click(loadUser1);
$('#userCard').click(loadUser1);


// Load Organizations section
function loadOrganizations() {
    $('#content-section').html('<h3>Loading Organizations...</h3>');
    
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Organization',
            fields: ['name', 'organization_name', 'industry', 'about_organization', 'workflow_state', 'creation']
        },
        callback: function (response) {
            let organizations = response.message || [];
            $('#content-section').html(`
                <div>
                    <h3>Organizations Posted</h3>
                    <button class="btn btn-primary" id="add-organization-btn">Add New Organization</button>
                    <ul id="organization-list" class="list-group mt-3"></ul>
                </div>
            `);

            if (organizations.length === 0) {
                $('#organization-list').append('<li class="list-group-item text-muted">No organizations posted yet.</li>');
            } else {
                organizations.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                organizations.forEach(org => {
                    $('#organization-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <small style="color:#527a7a;">${org.workflow_state}</small><br>
                                <strong>${org.organization_name}</strong>
                                <small class="text-muted">(Industry: ${org.industry || 'Not specified'})</small>
                                <p>${org.about_organization || 'No description available.'}</p>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-warning edit-organization" data-name="${org.name}">Edit</button>
                                <button class="btn btn-sm btn-danger delete-organization" data-name="${org.name}">Delete</button>
                            </div>
                        </li>
                    `);
                });
            }

            $('#add-organization-btn').click(() => window.location.href = '/add-organization');

            $('.edit-organization').click(function () {
                frappe.set_route('Form', 'Organization', $(this).data('name'));
            });

            $('.delete-organization').click(function () {
                let orgName = $(this).data('name');
                frappe.call({
                    method: 'frappe.client.delete',
                    args: { doctype: 'Organization', name: orgName },
                    callback: function () {
                        frappe.msgprint('Organization deleted successfully.');
                        loadOrganizations();
                    }
                });
            });
        }
    });
}

// call the function on click on id 
$('#organizations-btn').click(loadOrganizations);
$('#organizationCard').click(loadOrganizations);



// Load jobs section
function loadJobs() {
    $('#content-section').html('<h3>Loading Jobs...</h3>');
    
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Job',
            fields: ['name', 'organization_name', 'jop_title', 'posting_date', 'jop_description', 'creation']
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
                jobs.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                jobs.forEach(job => {
                    $('#job-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${job.jop_title}</strong>
                                <small class="text-muted">(Posted on: ${job.posting_date} and by ${job.organization_name})</small>
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

            $('#add-job-btn').click(function () {
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
}

// call the fun on click on id 
$('#jobs-btn').click(loadJobs);
$('#jobCard').click(loadJobs);


// Load trainings section
function loadTrainings(){
    $('#content-section').html('<h3>Loading Trainings...</h3>');

    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Training',
            fields: ['name', 'organization_name','training_title', 'training_post_date', 'creation']
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
                trainings.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                trainings.forEach(training => {
                    $('#training-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${training.training_title}</strong>
                                <small class="text-muted">(Posted on: ${training.training_post_date} and by ${training.organization_name})</small>
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
};
// call the fun on click on id 
$('#trainings-btn').click(loadTrainings);
$('#trainingCard').click(loadTrainings);


// Load applications section
function loadApplications() {
    $('#content-section').html('<h3>Loading Applications...</h3>');
    
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Application',
            fields: ['name', 'kind', 'job_name', 'training_name', 'applicant_name', 'creation'],
        },
        callback: function (response) {
            let applications = response.message || [];
            $('#content-section').html(`
                <div>
                    <h3>Applications</h3>
                    <button class="btn btn-primary" id="add-application-btn">Add New Application</button>
                    <ul id="application-list" class="list-group mt-3"></ul>
                </div>
            `);

            if (applications.length === 0) {
                $('#application-list').append('<li class="list-group-item text-muted">No applications found.</li>');
            } else {
                applications.sort((a, b) => new Date(b.creation) - new Date(a.creation));
                applications.forEach(app => {
                    $('#application-list').append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong style="color: #7f8c8d;">${app.kind}</strong>
                                <p><b>${app.applicant_name}</b> apply for ${app.kind === "Job" ? app.job_name : app.training_name}</p>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-warning edit-application" data-name="${app.name}">Edit</button>
                                <button class="btn btn-sm btn-danger delete-application" data-name="${app.name}">Delete</button>
                            </div>
                        </li>
                    `);
                });
            }

            $('#add-application-btn').click(() => window.location.href = '/add-application');

            $('.edit-application').click(function () {
                frappe.set_route('Form', 'Application', $(this).data('name'));
            });

            $('.delete-application').click(function () {
                let appName = $(this).data('name');
                frappe.call({
                    method: 'frappe.client.delete',
                    args: { doctype: 'Application', name: appName },
                    callback: function () {
                        frappe.msgprint('Application deleted successfully.');
                        loadApplications();
                    }
                });
            });
        }
    });
}

// call the fun on click on id 
$('#applications-btn').click(loadApplications);
$('#applicationCard').click(loadApplications);



userCard();
organizationCard();
jobCard();
trainingCard();

};
