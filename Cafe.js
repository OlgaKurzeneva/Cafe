"use strict";

b4w.register("Cafe_main", function(exports, require) {

var m_anim      = require("animation");
var m_app       = require("app");
var m_cfg       = require("config");
var m_cont      = require("container");
var m_ctl       = require("controls");
var m_data      = require("data");
var m_fps       = require("fps");
var m_mouse     = require("mouse");
var m_preloader = require("preloader");
var m_phy       = require("physics");
var m_scs       = require("scenes");
var m_version   = require("version");

var _previous_selected_obj = null;

var DEBUG = (m_version.type() === "DEBUG");

exports.init = function() {
    m_app.init({
        canvas_container_id: "canvas3d",
        callback: init_cb,
		physics_enabled: true,
        show_fps: DEBUG,
		autoresize: true,
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
	
	// ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

function load() {
    var load_path = m_cfg.get_std_assets_path("Cafe") + "Cafe.json";
    m_data.load(load_path, load_cb, preloader_cb);
}

function load_cb(data_id, success) {
	
	if (!success) {
        console.log("b4w load failure");
        return;
    }
	
	//var character = m_scs.get_first_character();
	m_app.enable_camera_controls();
	//var waiter = m_scs.get_object_by_name("Waiter:Male_casualsuit06");
	//m_fps.enable_fps_controls();
	
	var canvas_elem = m_cont.get_canvas();
    canvas_elem.addEventListener("mousedown", main_canvas_click, false);
    //canvas_elem.addEventListener("touchstart", main_canvas_click, false);
}

function main_canvas_click(e) {
    if (e.preventDefault)
        e.preventDefault();

    var x = m_mouse.get_coords_x(e);
    var y = m_mouse.get_coords_y(e);

    var obj = m_scs.pick_object(x, y);
	
	if (obj) {
		if (obj == m_scs.get_object_by_name("Waiter:Male_casualsuit06")) {
			console.log("Hello!");
		}
		if (_previous_selected_obj) {
			m_anim.stop(_previous_selected_obj);
			m_anim.set_frame(_previous_selected_obj, 250);
		}
		_previous_selected_obj = obj;
		
		m_anim.apply_def(obj);
		if (m_anim.is_animated(obj)) {
			m_anim.play(obj);
		}
	}
}

});

b4w.require("Cafe_main").init();