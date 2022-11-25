const main_content = document.getElementById('main-content');
const tags_container = document.querySelector('.tags-container');
const tags_section = document.querySelector('.tags-section');
const btn_clear = document.querySelector('.btn-clear');

let filtered_jobs = []; // jobs filtrados
let actived_filters = []; // lista de filtros aplicados (historial de filtros aplicados)

btn_clear.addEventListener('click', () => {
  tags_section.innerHTML = '';
  tags_container.classList.toggle('inactive');
  actived_filters = [];
  filtered_jobs = [];
  loadjobs(jobs);
});


function removeFilter(event) {
  const filter_type = event.target.getAttribute('data-filter-type');
  const filter = event.target.getAttribute('data-filter');

  // const icons_remove_filter = Object.values(document.getElementsByClassName('clear-this-filter'));
  // icons_remove_filter.forEach(icon_remove => {
  //   icon_remove.addEventListener('click', () => {
  //     data_filter = icon_remove.getAttribute('data-filter');

  //     tag_padre = icon_remove.parentNode;

  //     try {
  //       tags_section.removeChild(tag_padre);
  //       let i = active_filters.indexOf(data_filter);
  //       active_filters.splice(i, 1);
  //       loadjobs();
  //       if (active_filters.length == 0) {
  //         tags_container.style.display = 'none';
  //       }
  //     }
  //     catch {
  //     }

  //   });
  // });
  console.log('quita filtro!!');
}

function printFilter(filter_type, filter) {
  if (actived_filters.length == 1) tags_container.classList.toggle('inactive');

  tags_section.insertAdjacentHTML('beforeend', `
    <div class="tag">
      <span>${filter}</span>
      <figure class="clear-this-filter" data-filter='${filter}' data-filter-type='${filter_type}'>
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
    printFilter(filter_type, filter);

    if (filtered_jobs.length != 1) {
      // no filtra si hay solo un job en la lista de jobs filtrados
      filterJobs(filtered_jobs, filter_type, filter);
    }
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
  loadjobs(fJobs);
}

function loadjobs(fJobs) {
  main_content.textContent = '';
  fJobs.forEach(job => {
    let languages_html = '';
    let tools_html = '';

    job.languages.forEach(language => {
      languages_html += `<p data-filter='${language}' data-filter-type='languages' onclick='filterClicked(event)'>${language}</p>`;
    });

    job.tools.forEach(tool => {
      tools_html += `<p data-filter='${tool}' data-filter-type='tools' onclick='filterClicked(event)'>${tool}</p>`;
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
          ${`<p data-filter='${job.role}' data-filter-type='role' onclick='filterClicked(event)'>${job.role}</p>`}
          ${`<p data-filter='${job.level}' data-filter-type='level' onclick='filterClicked(event)'>${job.level}</p>`}
          ${languages_html}
          ${tools_html}
        </section>
      </article>
    `)
  });
}

loadjobs(jobs);
