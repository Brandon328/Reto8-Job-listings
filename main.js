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
  const tag = document.createElement('div');
  const span = document.createElement('span');
  const figure = document.createElement('figure');
  const img = document.createElement('img');

  tag.classList.add('tag');
  figure.classList.add('clear-this-filter');
  span.textContent = filter;
  figure.setAttribute('data-filter', filter);
  img.src = "./images/icon-remove.svg";
  img.alt = "icon remove";
  img.onclick = removeFilter;

  tag.append(span, figure);
  figure.appendChild(img);
  tags_section.appendChild(tag);

  // <div class="tag">
  //   <span>${filter}</span>
  //   <figure class="clear-this-filter" data-filter='${filter}'>
  //     <img src="./images/icon-remove.svg" alt="icon remove" onclick='removeFilter(event)'>
  //   </figure>
  // </div>
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
      if (job[filter_type].indexOf(filter) >= 0) return job;
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
    const article = document.createElement('article');

    const card_main_section = document.createElement('section');
    const img = document.createElement('img');
    const card_main_2 = document.createElement('div');
    const card_header = document.createElement('section');
    const h3 = document.createElement('h3');
    const h2 = document.createElement('h2');
    const extra_info = document.createElement('p');

    const hr = document.createElement('hr');

    const card_tags_section = document.createElement('section');
    const p_role = document.createElement('p');
    const p_level = document.createElement('p');

    card_main_section.classList.add('card-main');
    img.classList.add('logo');
    img.src = job.logo;
    img.alt = job.company;
    card_main_2.classList.add('card-main-2');
    card_header.classList.add('card-header');
    h3.textContent = job.company;
    h2.textContent = job.position;
    extra_info.classList.add('extra-info');
    extra_info.textContent = `${job.postedAt}  •  ${job.contract}  •  ${job.location}`;

    card_tags_section.classList.add('card-tags');
    p_role.setAttribute('data-filter', job.role);
    p_role.setAttribute('data-filter-type', 'role');
    p_role.onclick = filterClicked;
    p_role.textContent = job.role;
    if (actived_filters.includes(job.role)) p_role.classList.add('actived-filter');

    p_level.setAttribute('data-filter', job.level);
    p_level.setAttribute('data-filter-type', 'level');
    p_level.onclick = filterClicked;
    p_level.textContent = job.level;
    if (actived_filters.includes(job.level)) p_level.classList.add('actived-filter');

    article.append(card_main_section, hr, card_tags_section);
    card_main_section.append(img, card_main_2);
    card_main_2.append(card_header, h2, extra_info);
    card_header.appendChild(h3);
    if (job.new) {
      const p_new = document.createElement('p');
      p_new.classList.add('new');
      p_new.textContent = 'NEW!';
      card_header.appendChild(p_new);
    }
    if (job.featured) {
      const p_fetured = document.createElement('p');
      p_fetured.classList.add('featured');
      p_fetured.textContent = 'FEATURED';
      card_header.appendChild(p_fetured);
    }

    card_tags_section.append(p_role, p_level);
    job.languages.forEach(language => {
      const p_language = document.createElement('p');
      p_language.setAttribute('data-filter', language);
      p_language.setAttribute('data-filter-type', 'languages');
      p_language.onclick = filterClicked;
      p_language.textContent = language;
      if (actived_filters.includes(language)) p_language.classList.add('actived-filter');
      card_tags_section.appendChild(p_language);
    });
    job.tools.forEach(tool => {
      const p_tool = document.createElement('p');
      p_tool.setAttribute('data-filter', tool);
      p_tool.setAttribute('data-filter-type', 'tools');
      p_tool.onclick = filterClicked;
      p_tool.textContent = tool;
      if (actived_filters.includes(tool)) p_tool.classList.add('actived-filter');
      card_tags_section.appendChild(p_tool);
    });

    main_content.appendChild(article);
    // <article>
    //   <section class="card-main">
    //     <img src="${job.logo}" alt="${job.company}" class="logo">
    //     <div class="card-main-2">
    //       <section class="card-header">
    //         <h3>${job.company}</h3>
    //         ${job.new ? '<p class="new">NEW!</p>' : ''}
    //         ${job.featured ? '<p class="featured">FEATURED</p>' : ''}
    //       </section>
    //       <h2>${job.position}</h2>
    //       <p class="extra-info">${job.postedAt}  •  ${job.contract}  •  ${job.location}</p>
    //     </div>
    //   </section>
    //   <hr>
    //   <section class="card-tags">
    //     <p data-filter='${job.role}' data-filter-type='role' onclick='filterClicked(event)' ${actived_filters.includes(job.role) ? "class='actived-filter'" : ''}>${job.role}</p>
    //     <p data-filter='${job.level}' data-filter-type='level' onclick='filterClicked(event)' ${actived_filters.includes(job.level) ? "class='actived-filter'" : ''}>${job.level}</p>
    //     ${languages_html}
    //     ${tools_html}
    //   </section>
    // </article>
  });
}

loadjobs(jobs);
