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
    devel: true
*/

if (typeof Scotty === "undefined") {
    Scotty = {};
}
if (typeof Scotty.HTML === "undefined") {
    Scotty.HTML = {};
}

(function ($) {
    "use strict";

    this.srLoadHTML = function (id, url, reload) {
        console.debug('Loading #' + id + ': ' + url);

        var iframe = $('<iframe>', {
            src: url,
	    width: '95%',
	    height: '95%',
            scrolling: 'no'
        }).addClass('htmlview').appendTo($('#' + id));

        if (typeof reload !== "undefined") {
            window.setInterval(function () {
                iframe[0].contentWindow.location.reload(false);
            }, reload * 1000);
        }
    };
}).call(Scotty.HTML, jQuery);
