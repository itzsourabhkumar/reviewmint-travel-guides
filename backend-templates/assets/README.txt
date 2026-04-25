============================================================
backend-templates/assets/  —  DO NOT EDIT
============================================================

These files are part of the locked design system. The frontend
team owns them. Backend developers MUST NOT modify them.

  styles.css   The full stylesheet for the entire site.
               Mirrors what the React/vanilla version uses.

  app.js       Client-side interactivity:
                 - login modal open/close
                 - toast notifications (showToast(message))
                 - newsletter form validation
                 - search-refine live filtering on /search/
               Built for the standalone vanilla version. After
               backend integration the in-memory routing becomes
               unused — that is fine. The interactive pieces
               (modal, toast, newsletter) keep working.

INTEGRATION
-----------
1. Configure your backend's static file handler to serve this
   folder (or copy these two files into your existing static
   directory).

2. Reference them in your base template:
     <link rel="stylesheet" href="/static/styles.css">
     <script src="/static/app.js" defer></script>

3. Adjust the paths in `layout/head.txt` and `layout/base.txt`
   if you serve static files from a different prefix
   (e.g. /assets/ instead of /static/).

NEED A NEW INTERACTIVE FEATURE?
-------------------------------
Talk to the frontend developer first. Do not append your own
JS to app.js — write a separate file and include it after.
