<h3>Dear {{ doc.applicant_name | default("Applicant") }},</h3>

<p>We appreciate your interest in joining the {{ doc.kind | default("application") }} of  
{% if doc.kind == "Job" %}  
  {{ doc.job_name | default("Unknown Job") }}  
{% else %}  
  {{ doc.training_name | default("Unknown Training") }}  
{% endif %}  
at {{ doc.organization_name | default("Esteemed Organization") }}.</p>

<p>Unfortunately, after careful consideration, we regret to inform you that your application has not been selected at this time.</p>

<p>We encourage you to apply for future opportunities that match your skills and experience.</p>

<br><br>
<p>We wish you all the best in your career journey.</p>
<p><strong>Jisr Almaharat</strong></p>
