*************
Configuration
*************

Three different JSON files are used to configure *snmd*'s behavoir.


Global config
=============

The global configuration file `config.json` configures the included snmd widget
libraries and other *JavaScript* related configurations.

.. code:: json

   {
       "amd_baseUrl": "blib",
       "amd_paths": { },
       "amd_shim": { },
   
       "snmd_widgets": {
           "Nagios": "snmd-widgets-nagios"
       }
   }


View lists
==========

You need a list of views to be loaded by *snmd*. These view lists are located
in the `views/` directory. Example content of a view list file:

.. code:: json

   [
    { "title": "Check_MK", "url": "/cmk-rproxy/dashboard.py?name=snmd", "render": "html", "reload": 300 },
    { "title": "Core",     "url": "svg/LAN-Core.svg" },
    { "title": "Distri",   "url": "svg/LAN-Distri.svg" },
    { "title": "Access",   "url": "svg/LAN-Access.svg" }
   ]

The JSON structure is an array of objects with the following keys:

* **title** (required) - The label of the view used for the navigation bar.
* **render** (optional) - The rendering type of the view. Defaults to 'svg'. The 'html' renderer will load
  a html site in an *iframe* to embed arbitrary websites into the *snmd* GUI. Could be used to embed
  a state or event dashboard of your network monitoring system.
* **url** (required) - URL to load the content of the renderer (i.e. path to the SVG file).
* **reload** (html; optional) - Reload the *iframe* content periodically (value in seconds).

.. hint::
  If you want to embed the nagios or Check_MK dashboard you might want to use a reverse proxy to inject
  an HTTP authentication header for read-only access to your monitoring dashboard with-out any user query
  (i.e. digital signage).


Terminal config
===============
