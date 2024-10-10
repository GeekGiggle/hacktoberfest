/*  Created By: Maninder Sidhu
    Created Date: 10/06/2024
    Description: To find top paying jobs for Data Analyst
*/

SELECT 
        job_postings_fact.job_id,
        job_postings_fact.job_title,
        job_postings_fact.job_location,
        job_postings_fact.job_schedule_type,
        job_postings_fact.salary_year_avg,
        job_postings_fact.job_posted_date,
        name as company_name
from job_postings_fact 
INNER JOIN company_dim on company_dim.company_id=job_postings_fact.company_id
where job_title_short like 'Data Analyst' 
    and salary_year_avg is NOT NULL
    and job_location = 'Anywhere'
    and job_work_from_home = TRUE
ORDER BY salary_year_avg desc
limit 10;

--