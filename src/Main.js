/*
scotty-rev - Scotty REVOLUTION Network Management Dashboard

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/tag/scotty]
  2014 - 2016 (C) IBH IT-Service GmbH [http://www.ibh.de/OSS/Scotty]

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
    require
*/

require.config({
    baseUrl: "blib",
    map: {
        '*': {
            'css': 'require-css'
        }
    },
    paths: {
        "snmd-core": "snmd-core/src",
        "snmd-widgets-nagios": "snmd-widgets-nagios/src",
        "sprintf": "sprintf/src/sprintf",
        "jquery": "jquery/dist/jquery",
        "jquery.svg": "snmd-core/lib/svg-1.5.0/jquery.svg.min",
        "jquery.svggraph": "snmd-core/lib/svg-1.5.0/jquery.svggraph.min",
        "svgpathdata": "snmd-core/lib/svgpathdata-1.0.3/SVGPathData",
        "paho": "snmd-core/lib/paho.javascript-1.0.2/mqttws31-min",
        "require-css": "snmd-core/blib/require-css/css"
    },
    shim: {
        "jquery.svg" : ["jquery"],
        "jquery.svggraph" : ["jquery.svg", "jquery"],
        "paho": {
            exports: "Paho"
        }
    },
    enforceDefine: true,
    urlArgs: "bust=0.124s"
});

require(["snmd-core/Core"], function (Core) {
    'use strict';

    Core.srInit();
});
