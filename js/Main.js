/*
SNMD - Simple Network Monitoring Dashboard
  https://github.com/DE-IBH/snmd/

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/]
  2014 - 2017 (C) IBH IT-Service GmbH [https://www.ibh.de/]

License:
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this package; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
*/

/*jslint
    devel: true,
    plusplus: true,
    vars: true
*/

/*global
    define,
    require
*/

require.config({
    map: {
        '*': {
            'css': 'require-css'
        }
    },
    paths: {
        "moment": "moment/min/moment.min",
        "sprintf": "sprintf/src/sprintf",
        "jquery.svg": "snmd-core/lib/svg-1.5.0/jquery.svg.min",
        "jquery.svggraph": "snmd-core/lib/svg-1.5.0/jquery.svggraph.min",
        "svgpathdata": "snmd-core/lib/svgpathdata-1.0.3/SVGPathData",
        "paho": "snmd-core/lib/paho.javascript-1.0.2/mqttws31-min",
        "push": "push.js/push.min",
        "require-css": "require-css/css.min",
        "js-cookie": "js-cookie/src/js.cookie",
        "qtip2": "qtip2/dist/jquery.qtip.min",
        "howler": "howler.js/dist/howler.core.min"
    },
    shim: {
        "jquery.svg" : ["jquery"],
        "jquery.svggraph" : ["jquery.svg", "jquery"],
        "paho": {
            exports: "Paho"
        }
    }
});

define([], function () {
    'use strict';

    var Main = function (snmd_conf) {
        require(["snmd-core/js/Core"], function (Core) {
            Core.snmdInit(snmd_conf);
        });

    };

    return Main;
});
