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

    if (window.Typed) {
        new Typed('#typed', {
            strings: ['Ph.D. Candidate', 'Data Scientist', 'Researcher'],
            typeSpeed: 50,
            backSpeed: 25,
            loop: true
        });

        new Typed('#abstract-typed', {
            strings: ['Yang Tang is a Ph.D. candidate specializing in geospatial data analysis and remote sensing. This site showcases his research contributions, publications, and professional experiences.'],
            typeSpeed: 40,
            backSpeed: 20,
            showCursor: false
        });
    }
});
