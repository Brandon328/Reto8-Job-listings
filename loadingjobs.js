const main_content = document.getElementById('main-content');
let active_filters = [];

function filterjobs() {
  let filtered_jobs = jobs.filter(job => {
    let job_passed = active_filters.some(filter => {
      if (job.role == filter || job.level == filter) {
        return true;
      }
      if (job.languages) {
        return job.languages.some(language => language == filter);
        
      }
      if (job.tools) {
        return job.tools.some(tool => tool == filter);
      }
    });
    if (job_passed) return job;
  });
  console.log(filtered_jobs);
  return filtered_jobs;
}

function loadjobs() {
  let filtered_jobs = [];
  main_content.textContent = '';
  if (active_filters.length != 0) filtered_jobs = filterjobs();
  else filtered_jobs = jobs;

  filtered_jobs.forEach(job => {
    let languages_html = '';
    let tools_html = '';

    if (job.languages) {
      job.languages.forEach(language => {
        languages_html += `<p id='filter-${language}-${job.id}' data-filter='${language}'>${language}</p>`;
      });
    }
    if (job.tools) {
      job.tools.forEach(tool => {
        tools_html += `<p id='filter-${tool}-${job.id}' data-filter='${tool}'>${tool}</p>`;
      });
    }
    main_content.insertAdjacentHTML("beforeend", `
      <article id='filter-${job.id}'>
        <section class="card-main">
          <img src="${job.logo}" alt="${job.company}" class="logo">
          <div class="card-main-2">
            <section class="card-header">
              <h3>${job.company}</h3>
              ${job.new ? '<p class="new">NEW!</p>' : ''}
              ${job.featured ? '<p class="featured">FEATURED</p>' : ''}
            </section>
            <h2>${job.position}</h2>
            <p class="extra-info">${job.postedAt}  •  ${job.contract}  •  ${job.location}</p>
          </div>
        </section>
        <hr>
        <section class="card-tags">
          ${job.role ? `<p id='filter-${job.role}-${job.id}' data-filter='${job.role}'>${job.role}</p>` : ''}
          ${job.level ? `<p id='filter-${job.level}-${job.id}' data-filter='${job.level}'>${job.level}</p>` : ''}
          ${languages_html}
          ${tools_html}
        </section>
      </article>
    `)
  });
}

loadjobs();
