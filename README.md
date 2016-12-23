SNMD - Scotty Network Monitoring Dashboard
==========================================

About
-----

SNMD uses HTML5 and JavaScript code to build a monitoring dashboard. Any data
which is to be visualized needs to be published via MQTT. The nagios plugin
[nag2mqtt](liske/nag2mqtt) can be used to publish nagios performance data to
a MQTT broker.

The following JavaScript frameworks and librarys are embedded:
* [jQuery SVG](http://keith-wood.name/svg.html) 1.5.0
* [Modernizr](https://modernizr.com/) 3.3.1
* [Paho JavaScript Client](https://www.eclipse.org/paho/clients/js/) 1.0.2
* [SVGPathData](https://github.com/nfroidure/SVGPathData) 1.0.3

The following resources are included via `bower`:
* [Font Awesome](http://fontawesome.io/) 4.7.0
* [Open Sans @font-face kit](https://github.com/FontFaceKit/open-sans) 1.4.2
* [jQuery](https://jquery.com/) 2.2.4
* [qTip²](http://qtip2.com/) 3.0.3
* [sprintf.js](https://github.com/alexei/sprintf.js) 1.0.3
