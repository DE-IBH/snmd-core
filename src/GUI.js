/*
SNMD - Scotty Network Management Dashboard
  https://github.com/DE-IBH/snmd/

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/]
  2014 - 2016 (C) IBH IT-Service GmbH [https://www.ibh.de/]

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
    define
*/

define(["snmd-core/Core", "snmd-core/HTML", "snmd-core/SVG", "../blib/moment/min/moment.min.js", "require", "jquery", "css!../../snmd-core/css/gui.css"], function (Core, HTML, SVG, moment, require, $) {
    'use strict';

    var instance = null;

    var GUI = function () {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one instance, use getInstance()!");
        }

        this.idCounter = 0;
        this.TO_SCREEN = 600000;
        this.TO_SWITCH = 30000;
        this.screenState = 0;
        this.viewStates = {};
        this.viewFinalStates = {};
        this.currentStep = 0;
    };

    GUI.getInstance = function () {
        if (instance === null) {
            instance = new GUI();
        }

        return instance;
    };

    GUI.prototype.srScreenTimeOut = (function () {
        if (this.screenState === 0) {
            this.screenState += 1;
            $(document.body).addClass('on-screensaver');
        }

        var that = this;
        $('.srViews').each(function () {
            var a = $(this).children('.srViewsNav').find('a');
            var cur = 0;
            var i;
            for (i = 0; i < a.length; i++) {
                if (a[i].hash === that.currentView) {
                    cur = i;
                }
            }

            cur += 1;
            if (cur >= a.length) {
                cur = 0;
            }

            a[cur].click();
        });

        this.screenTimeOut = window.setTimeout(this.srScreenTimeOut, this.TO_SWITCH);
    }).bind(this);
    
    GUI.prototype.srStateChanged = function (root, svg, state) {
        this.viewStates[root][svg] = state;

        if (this.viewFinalStates[root] < state) {
            this.viewFinalStates[root] = state;
            $('#switch-' + root).css('color', require("snmd-core/Core").srNagStateColor(this.viewFinalStates[root]));
        } else {
            if (this.viewFinalStates[root] > state) {
                var fs = state;
                var that = this;
                Object.keys(this.viewStates[root]).forEach(function (k) {
                    if (that.viewStates[root][k] > fs) {
                        fs = that.viewStates[root][k];
                    }
                });
                this.viewFinalStates[root] = fs;
                $('#switch-' + root).css('color', require("snmd-core/Core").srNagStateColor(this.viewFinalStates[root]));
            }
            
        }
    };
    
    GUI.prototype.srInit = function (views) {
        var that = this;
        $('.srViews').each(function () {
            var views2id = {};
            
            var nav = $(this).children('.srViewsNav');
            Object.keys(views).forEach(function (k) {
                views2id[k] = 'srView-' + (this.idCounter += 1).toString(16);
                this.viewStates[views2id[k]] = {};
                this.viewFinalStates[views2id[k]] = -1;
                nav.append('<li><a id="switch-' + views2id[k] + '" href="#' + views2id[k] + '"><span>' + views[k].title + "</span></a></li>");
            }, that);

            var div = $('#snmd-views');
            var dps = 360 / Object.keys(views).length;
            var step = 0;
            var r = (Object.keys(views).length > 1 ? (1906 / 2) / Math.tan(Math.PI / Object.keys(views).length) : 0);
            var oy = ($('#snmd-views').height() - 30 - 1038) / 2 + 30;
            
            Object.keys(views).forEach(function (k) {
                div.append('<div class="svgview" id="' + views2id[k] + '"></div>');

                if ($(document.body).hasClass('enable-3d')) {
                    $('#' + views2id[k]).css(
                        'transform',
                        'rotateY(' + (dps * step) + 'deg) translateZ(' + r + 'px)'
                    );
                }

                switch (views[k].render) {
                case 'html':
                    HTML.srLoadHTML(views2id[k], views[k].url, views[k].reload);
                    break;

//              case 'svg':
                default:
                    SVG.srLoadSVG(views2id[k], views[k].url);
                    break;
                }

                step += 1;
            });

            $('#snmd-views').css(
                'transform-origin',
                '100% 50% 50%'
            );
            var tabDivs = div;

            var alignView = (function () {
                var f = 1; //Math.min(($('#snmd-views').width() - 10) / 1906, ($('#snmd-views').height()) / 1038);

                if ($(document.body).hasClass('enable-3d')) {
                    $('#snmd-views').css(
                        'transform',
                        'scale(' + f + ') translateZ(-' + r  + 'px) rotateY(' + (-1 * dps * this.currenStep) + 'deg)'
                    );
                }
            }).bind(this);
            
            nav.find('a').click(function (event) {
                console.debug('Viewing '  + this.hash);
                that.currentView = this.hash;

                div.children().removeClass('current').filter(this.hash).removeClass('next').removeClass('prev').addClass('current');
                $(that.currentView).prevAll().removeClass('next').addClass('prev');
                $(that.currentView).nextAll().removeClass('prev').addClass('next');

                nav.find('a').removeClass('selected').filter(this).addClass('selected');

                that.currenStep = $(that.currentView).prevAll().length;
                alignView();
                
                return false;
            }).filter(':first').click();

            if (window.location.hash !== "undefined") {
                var nth = parseInt(window.location.hash.replace(/^#srView-/, ""), 10) - 1;
                var a = nav.find('a:eq(' + nth + ')').click();
            }

            $('#snmd-ctrl').find('a').click(function (event) {
                console.debug('Control: '  + this.hash);

                return false;
            }).filter(':first').click();
        }, this);

        // Update time of day
        window.setInterval(function () {
            $('div#snmd_clock').text(moment().format("YYYY-MM-DDTHH:mm:ssZZ"));
        }, 1000);

        // Screensaver
        this.screenTimeOut = window.setTimeout(this.srScreenTimeOut, this.TO_SCREEN);

        // Handle mouse moves (reset screen saver timeout)
        $(document).mousemove((function () {
            this.screenState = 0;

            if (typeof this.screenTimeOut !== "undefined") {
                window.clearTimeout(this.screenTimeOut);
                this.screenTimeOut = window.setTimeout(this.srScreenTimeOut, this.TO_SCREEN);
                $(document.body).removeClass('on-screensaver');
            }
        }).bind(this));

        // Handle key press (reset screen saver time, handle shortcuts)
        $(document).keypress((function (ev) {
            this.screenState = 0;

            if (typeof this.screenTimeOut !== "undefined") {
                window.clearTimeout(this.screenTimeOut);
                this.screenTimeOut = window.setTimeout(this.srScreenTimeOut, this.TO_SCREEN);
            }

            // Select view by numpad
            if (ev.which > 47 && ev.which < 58) {
                var key = (ev.which === 48 ? '10' : String.fromCharCode(ev.which));

                $('a[href="#srView-' + key + '"]').click();
            }
        }).bind(this));
    };

    return GUI.getInstance();
});
