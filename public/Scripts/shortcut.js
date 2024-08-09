document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById('mySidebar');
    sidebar.style.setProperty('display', 'none', 'important'); // Initial hiding of the sidebar

    document.getElementById('sidebarToggle').addEventListener('click', function() {
        const sidebar = document.getElementById('mySidebar');
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.setProperty('display', 'block', 'important'); // Show sidebar
        } else {
            sidebar.style.setProperty('display', 'none', 'important'); // Hide sidebar
        }
    });

    document.getElementById('closeSidebar').addEventListener('click', function() {
        document.getElementById('mySidebar').style.setProperty('display', 'none', 'important'); // Hide sidebar on close button click
    });

    document.querySelectorAll('#mySidebar a').forEach(function(link) {
        link.addEventListener('click', function() {
            document.getElementById('mySidebar').style.setProperty('display', 'none', 'important'); // Hide sidebar on link click
        });
    });
});
