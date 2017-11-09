"use strict";

b4w.register("Cafe_main", function(exports, require) {

var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_fps       = require("fps");
var m_preloader = require("preloader");
var m_scs       = require("scenes");
var m_version   = require("version");

var DEBUG = (m_version.type() === "DEBUG");

exports.init = function() {
    var show_fps = DEBUG;

    var url_params = m_app.get_url_params();

    if (url_params && "show_fps" in url_params)
        show_fps = true;

    m_app.init({
        canvas_container_id: "canvas3d",
        callback: init_cb,
        show_fps: show_fps,
        assets_dds_available: !DEBUG,
        assets_min50_available: !DEBUG,
        alpha: false,
    });
}

function init_cb(canvas_elem, success) {
    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    load();
}

function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

function load() {
    var load_path = m_cfg.get_std_assets_path("Cafe") + "Cafe.json";
    m_data.load(load_path, load_cb, preloader_cb);
}

function load_cb(data_id) {
	var character = m_scs.get_first_character ();
	m_app.enable_camera_controls ();
	m_fps.enable_fps_controls ();
}

});

b4w.require("Cafe_main").init();