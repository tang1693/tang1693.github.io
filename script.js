document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('section.collapsible h2').forEach(function (header) {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
