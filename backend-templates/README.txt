================================================================
ReviewMint — Backend Template Files
================================================================

PURPOSE
-------
This branch contains the website's HTML structure split into separate
template files (.txt). Each file is a focused fragment ready to be
wired into a backend (Django, Flask, Jinja2, EJS, Handlebars, PHP, etc.).

If you are a BACKEND DEVELOPER:
  - You only edit files in `pages/`, `components/`, and `layout/`.
  - You DO NOT touch `assets/styles.css` or `assets/app.js`.
  - You DO NOT touch the HTML structure or class names — only fill in
    the {{ placeholders }} and {% loops %} with your engine's syntax.

If you are a FRONTEND/DESIGN DEVELOPER:
  - You only edit `assets/styles.css` (and rarely `assets/app.js` for
    new interactivity).
  - You DO NOT need to know how the backend renders the templates.

================================================================
DIRECTORY MAP
================================================================
backend-templates/
  README.txt                  This file.
  INTEGRATION.txt             Step-by-step "how to wire to a backend".

  layout/                     Persistent fragments shown on every page.
    head.txt                  <head> contents (meta, fonts, css link).
    nav.txt                   Top navigation bar.
    footer.txt                Site footer with links + newsletter.
    login-modal.txt           Login modal markup (mount point).
    toast.txt                 Toast notification mount point.
    base.txt                  Recommended skeleton: doctype + head +
                              nav + {% block content %} + footer.

  pages/                      Full page templates. One per route.
    home.txt                  GET /
    city-detail.txt           GET /destinations/<slug>/
    destinations.txt          GET /destinations/
    persona-guides.txt        GET /personas/
    about.txt                 GET /about/
    search.txt                GET /search/?q=...
    info.txt                  GET /info/<topic>/

  components/                 Reusable fragments included by pages.
                              Use {% include "components/X.txt" %}.
    city-card.txt
    persona-strip.txt
    page-header.txt
    score-gauge.txt
    matrix-row.txt
    timeline-step.txt
    reach-item.txt
    tip-item.txt
    must-try-card.txt
    pros-cons.txt
    budget-card.txt
    info-section.txt
    newsletter-form.txt

  data/                       Reference data — port to your DB schema.
    destinations.txt          All 7 cities as JSON.
    personalities.txt         Persona list as JSON.
    info-content.txt          Info-page content as JSON.
    icons.txt                 SVG icon strings (used by templates).

  assets/                     DO NOT EDIT THESE FILES.
    styles.css                Full design system.
    app.js                    Client-side interactivity (modal, toast,
                              search refine). Replace only if you
                              re-implement the same behavior.

================================================================
PLACEHOLDER SYNTAX (Django/Jinja2 style)
================================================================
The templates use Django/Jinja2-style placeholders because that
syntax is the most universal and transfers cleanly to most engines.

  Single value:        {{ city.name }}
  Loop:                {% for city in cities %} ... {% endfor %}
  Conditional:         {% if city.must_try %} ... {% endif %}
  Include component:   {% include "components/city-card.txt" with city=city %}

If you use a different engine, do a one-time find-and-replace.
Translation table:

   PLACEHOLDER         DJANGO/JINJA2          HANDLEBARS         EJS
   --------------------------------------------------------------
   value               {{ x }}                {{ x }}            <%= x %>
   raw HTML            {{ x|safe }}           {{{ x }}}          <%- x %>
   loop                {% for i in xs %}      {{#each xs}}       <% xs.forEach(...) %>
   end loop            {% endfor %}           {{/each}}          <% }) %>
   if                  {% if c %}             {{#if c}}          <% if (c) { %>
   end if              {% endif %}            {{/if}}            <% } %>
   include             {% include "X" %}      {{> X}}            <%- include('X') %>

================================================================
DATA EXPECTED PER PAGE
================================================================
Each page template starts with a comment block declaring what variables
it expects. Your backend view function must build that context and
pass it in. Example:

  pages/city-detail.txt expects:
      city — full Destination object (see data/destinations.txt)

  pages/search.txt expects:
      query   — the user's search string
      results — list of DestinationSummary objects

================================================================
ASSETS — IMPORTANT
================================================================
Every page must:
  1. Link to assets/styles.css in <head>.
  2. Include assets/app.js before </body>.
  3. Mount layout/login-modal.txt and layout/toast.txt somewhere in
     the body (they're empty containers used by app.js to render
     modals and toasts dynamically).

If you use a base layout (layout/base.txt), it already does all four
of these — your individual pages just need {% block content %}.

================================================================
QUICK START FOR BACKEND DEVELOPER
================================================================
1. Pick your templating engine (Django recommended for Python).
2. Copy the contents of `backend-templates/` into your project's
   templates directory (rename .txt to .html if your engine wants
   that — most don't care).
3. Replace `{% include "X.txt" %}` paths with your engine's include
   syntax + correct path.
4. For each page in `pages/`, write a corresponding view function
   that builds the context and renders that template.
5. Port `data/destinations.txt` (JSON) into your DB models — see
   the existing MOCK_DJANGO_STRUCTURE.md in the repo root for a
   recommended schema.
6. Serve `assets/styles.css` and `assets/app.js` as static files.

That's it. The design system is locked, the structure is fixed, and
you only need to wire data and routes.
