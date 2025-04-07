frappe.pages['user-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'User Dashboard',
        single_column: true
    });

    let $content = $(`
        <style>
            .profile-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 40px;
            }

            .profile-item {
                display: grid;
                grid-template-columns: 180px 1fr;
                gap: 40px;
                border-bottom: 2px solid #f0f0f0;
                padding: 30px 0;
            }

            .profile-item:last-child {
                border-bottom: none;
            }

            .profile-image {
                width: 180px;
                height: 180px;
                border-radius: 15px;
                object-fit: cover;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }

            .profile-details {
                position: relative;
            }

            .profile-name {
                font-size: 24px;
                font-weight: 600;
                color: #2c3e50;
                margin: 10px 0 5px;
            }

            .profile-specialization {
                color: #7f8c8d;
                margin-bottom: 15px;
            }

            .profile-contact {
                margin: 20px 0;
                line-height: 1.8;
            }

            .profile-contact i {
                margin-right: 10px;
                
            }

            .profile-about {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                margin-top: 10px;
                font-size: 16px;
                color: #34495e;
            }

            .action-buttons {
                margin-top: 15px;
            }

            .action-buttons button {
                margin-right: 10px;
                padding: 8px 20px;
                border-radius: 5px;
            }

            @media (max-width: 768px) {
                .profile-item {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                
                .action-buttons {
                    text-align: center;
                    margin-top: 20px;
                }
            }

            #hide-applications-btn {
                display: none;
            }

            #application {
                cursor: pointer;
            }
            .navbar{
                display: none;
        </style>
        

        <div class="profile-container">
            <h1 class="text-center" id="user-profile-title">User Profiles</h1>
            <h5 class="profile-specialization text-center" id="user-specialization">specialization</h5>
            <div id="user-profile-list"></div>
        </div>
    `);
    $(page.main).append($content);

    function loadUserProfiles() {
        $('#user-profile-list').html('<div class="text-center py-5"><i class="fas fa-spinner fa-spin"></i> Loading...</div>');

        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'User1',
                fields: ['name','name1', 'email', 'phone_number', 'specialization', 'address', 'about_me', 'image']
            },
            callback: function (response) {
                let users = response.message || [];
                $('#user-profile-list').html('');

                if (users.length === 0) {
                    $('#user-profile-list').html('<p class="text-muted text-center">No user profiles found</p>');
                } else {
                    $('#user-profile-title').text(users[0].name1);
                    $('#user-specialization').text(users[0].specialization);
                    users.forEach(user => {
                        const profile = `
                            <div class="profile-item">
                                <img src="${user.image || '/files/default-avatar.png'}" class="profile-image">
                                <div class="profile-details">
                                    <div class="profile-about">${user.about_me || 'No information available'}</div>
                                    <div class="profile-contact">

                                        <div><i class="bi bi-envelope">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                                        </svg>
                                        </i> ${user.email}</div>
                                        
                                        <div><i class="bi bi-telephone">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                        </svg>
                                        </i> ${user.phone_number || 'N/A'}</div>

                                        <div><i class="bi bi-geo-alt">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                        </svg>
                                        </i> ${user.address || 'No address'}</div>
                                    </div>
                                    <div class="action-buttons">
                                        <button class="btn btn-primary btn-sm" id="edit-profile-btn">Edit My Profile</button>
                                        <button class="btn btn-secondary btn-sm" id="applications-btn">Show My Application</button>
                                        <button class="btn btn-secondary btn-sm" id="hide-applications-btn" >Hide My Application</button>
                                    </div>
                                </div>
                            </div>

                            <div id="content-section"></div>    
                        `;
                        $('#user-profile-list').append(profile);

                        $('#edit-profile-btn').click(function () {
                            frappe.set_route('Form', 'User1', user.name);
                        });
                        
                        $('#hide-applications-btn').click(hideApplicaitions);
                        $('#applications-btn').click(loadApplications);
                    });

                
                
                }
            }
        });
    }
    //////////////////////////////////////////
    function hideApplicaitions(){

        $('#applications-btn').show();
        $('#hide-applications-btn').hide();

       

        //to hide the application
        $('#content-section').html('');

        

    }
    /////////////////////////////////////////////////
    function loadApplications() {
        $('#applications-btn').hide();
        $('#hide-applications-btn').show();

        $('#content-section').html('<h3>Loading Applications...</h3>');

        
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Application',
                fields: ['name', 'kind', 'job_name', 'training_name', 'applicant_name', 'workflow_state'],
                filters: {
                    applicant_name: frappe.session.user_fullname // Filter by current organization
                  }
            },
            callback: function (response) {
                let applications = response.message || [];
                $('#content-section').html(`
                    <div>
                        <h3>Your Applications</h3>
                        <ul id="application-list" class="list-group mt-3"></ul>
                    </div>
                `);
    
                if (applications.length === 0) {
                    $('#application-list').append('<li class="list-group-item text-muted">You do not hove any  applications yet.</li>');
                } else {
                    applications.reverse().forEach(app => {
                        $('#application-list').append(`
<li class="list-group-item d-flex justify-content-between align-items-center" id='application' onclick="if('${app.kind}' === 'Job') { location.href='/Home/jobDetails/${app.job_name}'; } else { location.href='/Home/training_details/${app.training_name}'; }">                            <div>
                                <strong style="color: #7f8c8d;;">${app.kind}</strong>
                                <p class="mb-1">
                                    You applied for 
                                    <b><span class="fw-bold">${app.kind === "Job" ? app.job_name : app.training_name}</span></b>
                                </p>
                            </div>
                            <div>
                                <span class="badge ${app.workflow_state === 'Approval Pending' ? 'bg-secondary text-white' : app.workflow_state === 'Approved' ? 'bg-success text-white' : 'bg-danger text-white'}"
                                    style="font-size: 14px; padding: 5px 10px; border-radius: 8px; font-weight: 500;">
                                    ${app.workflow_state}
                                </span>
                            </div>

                        </li>

                        `);
                    });
                }
    
               
    
               
    
                
            }
        });
    }
    ////////////////////////////////////////////////

    ////////////////////////////////////////////

    loadUserProfiles();
};
