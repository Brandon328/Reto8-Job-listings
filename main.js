const main_content = document.getElementById('main-content');
const tags_container = document.querySelector('.tags-container');
const tags_section = document.querySelector('.tags-section');
const btn_clear = document.querySelector('.btn-clear');

let filtered_jobs = []; // jobs filtrados
let actived_filters = []; // lista de filtros aplicados (historial de filtros aplicados)
let actived_type_filters = [];

btn_clear.addEventListener('click', () => {
  tags_section.innerHTML = '';
  tags_container.classList.toggle('inactive');
  actived_filters = [];
  actived_type_filters = [];
  filtered_jobs = [];
  loadjobs(jobs);
});


function removeFilter(event) {
  let fJobs = [];
  const filter = event.target.getAttribute('data-filter');
  const index = actived_filters.indexOf(filter);
  const tag = event.target.parentNode.parentNode;

  actived_filters.splice(index, 1);
  actived_type_filters.splice(index, 1);

  // Quitando el tag del front
  tags_section.removeChild(tag);
  if (actived_filters.length == 0) {
    tags_container.classList.toggle('inactive');
    filtered_jobs = [];
  }

  // Volviendo a filtrar los jobs
  fJobs = jobs;
  actived_filters.forEach((filter, index) => {
    filterJobs(fJobs, actived_type_filters[index], filter);
    fJobs = filtered_jobs;
  });

  // Imprimiendo los jobs filtrados
  loadjobs(fJobs);
}

function printFilter(filter_type, filter) {
  if (actived_filters.length == 1) tags_container.classList.toggle('inactive');

  tags_section.insertAdjacentHTML('beforeend', `
    <div class="tag">
      <span>${filter}</span>
      <figure class="clear-this-filter" data-filter='${filter}'>
        <img src="./images/icon-remove.svg" alt="icon remove" onclick='removeFilter(event)'>
      </figure>
    </div>
  `);
}

function filterClicked(event) {
  const filter_type = event.target.getAttribute('data-filter-type');
  const filter = event.target.getAttribute('data-filter');
  if (!actived_filters.includes(filter)) {
    // filtra si el filtro no fue aplicado con anterioridad
    actived_filters.push(filter);
    actived_type_filters.push(filter_type);
    printFilter(filter_type, filter);

    if (filtered_jobs.length != 1) {
      // no filtra si hay solo un job en la lista de jobs filtrados
      filterJobs(filtered_jobs, filter_type, filter);
    }
    loadjobs(filtered_jobs);
  }
}

function filterJobs(jobs_list, filter_type, filter) {
  if (jobs_list.length == 0) {
    jobs_list = jobs;
  }
  const fJobs = jobs_list.filter(job => {
    if (typeof job[filter_type] == 'object') {
      if (job[filter_type].indexOf(filter)>=0) return job;
    }
    else {
      if (job[filter_type] == filter) return job;
    }
  });
  filtered_jobs = fJobs;
}

function loadjobs(fJobs) {
  main_content.textContent = '';
  fJobs.forEach(job => {
    let languages_html = '';
    let tools_html = '';

    job.languages.forEach(language => {
      languages_html += `<p data-filter='${language}' data-filter-type='languages' onclick='filterClicked(event)' ${actived_filters.includes(language) ? "class='actived-filter'" : ''}>${language}</p>`;
    });

    job.tools.forEach(tool => {
      tools_html += `<p data-filter='${tool}' data-filter-type='tools' onclick='filterClicked(event)' ${actived_filters.includes(tool) ? "class='actived-filter'" : ''}>${tool}</p>`;
    });

    main_content.insertAdjacentHTML("beforeend", `
      <article>
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
          ${`<p data-filter='${job.role}' data-filter-type='role' onclick='filterClicked(event)' ${actived_filters.includes(job.role) ? "class='actived-filter'" : ''}>${job.role}</p>`}
          ${`<p data-filter='${job.level}' data-filter-type='level' onclick='filterClicked(event)' ${actived_filters.includes(job.level) ? "class='actived-filter'" : ''}>${job.level}</p>`}
          ${languages_html}
          ${tools_html}
        </section>
      </article>
    `)
  });
}

loadjobs(jobs);
