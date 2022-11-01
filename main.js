const tags_container = document.getElementById('tags-container');
const tags_section = document.getElementById('tags-section');
const btn_clear = document.getElementById('btn-clear');
let active_filters = [];

btn_clear.addEventListener('click', () => {
  tags_section.innerHTML = '';
  tags_container.style.display = 'none';
  active_filters = [];
});

function filterClicked(data_filter) {
  if (tags_container.style.display != 'flex') {
    tags_container.style.display = 'flex';
  }
  if (!active_filters.includes(data_filter)) {
    active_filters.push(data_filter);
    tags_section.insertAdjacentHTML('beforeend', `
      <div class="tag">
        <span>${data_filter}</span>
        <figure><img src="./images/icon-remove.svg" alt="icon remove"></figure>
      </div>
    `);
  }
}

jobs.forEach(job => {
  let role_filter = document.querySelector(`#filter-${job.role}-${job.id}`);
  let level_filter = document.querySelector(`#filter-${job.level}-${job.id}`);
  role_filter.addEventListener('click', filterClicked(role_filter.getAttribute('data-filter')));
  level_filter.addEventListener('click', filterClicked(role_filter.getAttribute('data-filter')));
  
  if (job.languages) {
    job.languages.forEach(language => {
      let language_filter = document.querySelector(`#filter-${language}-${job.id}`);
      language_filter.addEventListener('click', filterClicked(language_filter.getAttribute('data-filter')));
    });
  }
  if (job.tools) {
    job.tools.forEach(tool => {
      let tool_filter = document.querySelector(`#filter-${tool}-${job.id}`);
      tool_filter.addEventListener('click', filterClicked(tool_filter.getAttribute('data-filter')));
    });
  }
});

