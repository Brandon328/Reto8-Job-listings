const tags_container = document.querySelector('.tags-container');
const tags_section = document.querySelector('.tags-section');
const btn_clear = document.querySelector('btn-clear');

// btn_clear.addEventListener('click', () => {
//   tags_section.innerHTML = '';
//   tags_container.style.display = 'none';
//   active_filters = [];
// });

// function removeFilterEvent() {
//   const icons_remove_filter = Object.values(document.getElementsByClassName('clear-this-filter'));
//   icons_remove_filter.forEach(icon_remove => {
//     icon_remove.addEventListener('click', () => {
//       data_filter = icon_remove.getAttribute('data-filter');

//       tag_padre = icon_remove.parentNode;

//       try {
//         tags_section.removeChild(tag_padre);
//         let i = active_filters.indexOf(data_filter);
//         active_filters.splice(i, 1);
//         loadjobs();
//         if (active_filters.length == 0) {
//           tags_container.style.display = 'none';
//         }
//       }
//       catch {
//       }

//     });
//   });
// }

// function printFilter(filter) {
//     data_filter = filter.getAttribute('data-filter');
//     if (tags_container.style.display != 'flex') {
//       tags_container.style.display = 'flex';
//     }
//     if (!active_filters.includes(data_filter)) {
//       active_filters.push(data_filter);
//       tags_section.insertAdjacentHTML('beforeend', `
//         <div class="tag">
//           <span>${data_filter}</span>
//           <figure class="clear-this-filter" data-filter='${data_filter}'><img src="./images/icon-remove.svg" alt="icon remove"></figure>
//         </div>
//       `);
//       loadjobs();
//       loadEvents();
//       removeFilterEvent();
//     }
// }


// function loadEvents() {
//   jobs.forEach(job => {
//     let role_filter = document.getElementById(`filter-${job.role}-${job.id}`);
//     let level_filter = document.getElementById(`filter-${job.level}-${job.id}`);
  
//     role_filter.addEventListener('click', () => filterEvent(role_filter));
//     level_filter.addEventListener('click', () => filterEvent(level_filter));
  
//     if (job.languages) {
//       job.languages.forEach(language => {
//         let language_filter = document.querySelector(`#filter-${language}-${job.id}`);
//         language_filter.addEventListener('click', () => filterEvent(language_filter));
//       });
//     }
  
//     if (job.tools) {
//       job.tools.forEach(tool => {
//         let tool_filter = document.querySelector(`#filter-${tool}-${job.id}`);
//         tool_filter.addEventListener('click', () => filterEvent(tool_filter));
//       });
//     }
//   });
// }

// loadEvents();