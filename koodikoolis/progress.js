// Progress calculation script
// - Watches the iframe's loaded page (either ilustaja.html or filmid.html)
// - Expects task lists inside those pages to be checkboxes with class `task-checkbox`
// - Calculates percentage of checked tasks and updates the appropriate button in the parent page

(function(){
  // Cache DOM elements in parent
  const viewer = document.getElementById('viewer');
  const btnIlustaja = document.getElementById('percent-ilustaja');
  const btnFilmid = document.getElementById('percent-filmid');

  function updateButtonFor(path, percent) {
    if (path.endsWith('ilustaja.html')) btnIlustaja.textContent = percent + ' %';
    else if (path.endsWith('filmid.html')) btnFilmid.textContent = percent + ' %';
  }

  // When iframe loads a page, try to read its checkboxes (same-origin assumed)
  viewer.addEventListener('load', function(){
    let win;
    try {
      win = viewer.contentWindow;
      const doc = win.document;
      // Prefer explicit `.task-checkbox` class but fall back to any checkbox inputs
      // Exclude checkboxes used as group toggles (class `group-checkbox`) so we count only leaf tasks
      let checkboxes = Array.from(doc.querySelectorAll('.task-checkbox:not(.group-checkbox)'));
      if (!checkboxes.length) {
        checkboxes = Array.from(doc.querySelectorAll('input[type="checkbox"]:not(.group-checkbox)'));
      }
      if (!checkboxes.length) {
        // No tasks yet; show 0
        const current = viewer.getAttribute('src') || (win.location && win.location.pathname ? win.location.pathname.split('/').pop() : '');
        updateButtonFor(current, 0);
        return;
      }

      function computeAndUpdate(){
        const checked = checkboxes.filter(cb => cb.checked).length;
        const percent = Math.round((checked / checkboxes.length) * 100);
        const current = (win.location && win.location.pathname) ? win.location.pathname.split('/').pop() : viewer.getAttribute('src');
        updateButtonFor(current, percent);
      }

      // Initial compute
      computeAndUpdate();

      // Listen for changes inside iframe
      checkboxes.forEach(cb => cb.addEventListener('change', computeAndUpdate));

    } catch (e) {
      // Cross-origin or other access error — can't compute
      console.warn('Could not access iframe contents to compute progress:', e);
    }
  });

})();
