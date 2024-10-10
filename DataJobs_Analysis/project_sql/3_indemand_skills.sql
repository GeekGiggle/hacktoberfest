/*  Created By: Maninder Sidhu
    Created Date: 10/07/2024
    Description: To find In Demand skills for Data Analyst
*/

with sjd As (SELECT 
    skills, 
    skills_job_dim.skill_id,
    job_id 
FROM skills_dim
INNER JOIN 
    skills_job_dim on 
    skills_dim.skill_id = skills_job_dim.skill_id)

SELECT
    count(skills) as indemand, skills
from
    job_postings_fact 
INNER JOIN sjd on sjd.job_id = job_postings_fact.job_id
WHERE job_title_short = 'Data Analyst' AND job_work_from_home = TRUE
GROUP BY skills
order by indemand desc
limit 5;

