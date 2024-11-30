document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', function () {
            dropdown.classList.toggle('show');
        });
        window.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
});