<h3>Dear {{ doc.applicant_name | default("Applicant") }},</h3>

<p>Your application to join the {{ doc.kind | default("application") }} of  
{% if doc.kind == "Job" %}  
  {{ doc.job_name | default("Unknown Job") }}  
{% else %}  
  {{ doc.training_name | default("Unknown Training") }}  
{% endif %}  
at {{ doc.organization_name | default("Esteemed Organization") }} has been approved.</p>

<p>Please contact the company to schedule a work date.</p>

<p>
  <a href="mailto:{{ doc.organization_email }}" style="display: inline-block; text-decoration: none;">
    {{ doc.organization_email }}
  </a>
</p>

<br><br>
<p>All the best,</p>
<p><strong>Jisr Almaharat</strong></p>
