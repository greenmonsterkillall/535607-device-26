// CAROUSEL
var j = 0;
var time = 6000;

var carouselSlidesClass = 'carousel__slide';
var carouselBtnsClass = 'carousel__btn';

var carouselSlides = document.querySelectorAll('.' + carouselSlidesClass);
var carouselBtns = document.querySelectorAll('.' + carouselBtnsClass);

function addClass(classMod, element, cssClass) {
	newClass = cssClass + '--' + classMod;
	var current = document.querySelector('.' + newClass);
	if (current != null) {
		current.classList.remove(newClass);
		element.className += ' ' + newClass;
	}
}

function slideChange() {
	addClass('active', this, carouselBtnsClass);
	var currentSlide = carouselSlides[this.value];
	addClass('active', currentSlide, carouselSlidesClass);
	j = this.value;
}

for (var i = 0; i < carouselBtns.length; i++) {
	carouselBtns[i].value = i;
	carouselBtns[i].addEventListener('click', slideChange);
}

function slideTimechange() {
	addClass('active', carouselBtns[j], carouselBtnsClass);
	addClass('active', carouselSlides[j], carouselSlidesClass);
	if (j < carouselSlides.length - 1) {
		j++;
	} else {
		j = 0;
	}
	setTimeout('slideTimechange()', time);
}

window.onload = slideTimechange;

var servicesBtnsClass = 'services__link';
var servicesControlsClass = 'services__control';
var servicesTabsClass = 'services__tab';

var servicesBtns = document.querySelectorAll('.' + servicesBtnsClass);
var servicesControls = document.querySelectorAll('.' + servicesControlsClass);
var servicesTabs = document.querySelectorAll('.' + servicesTabsClass);

for (var k = 0; k < servicesBtns.length; k++) {
	servicesBtns[k].value = k;
	servicesBtns[k].addEventListener('click', tabChange);
}

function tabChange(link) {
	link.preventDefault();
	var currentTab = servicesTabs[this.value];
	addClass('active', currentTab, servicesTabsClass);
	var currentControl = servicesControls[this.value];
	addClass('active', currentControl, servicesControlsClass);
}

// MODAL
var writeUsLink = document.querySelector('.contacts__show-form');
var modalFeedback = document.querySelector('.contacts__feedback');
var feedbackCloseBtn = modalFeedback.querySelector('.modal__close');

var feedbackForm = modalFeedback.querySelector('form');
var nameField = modalFeedback.querySelector('[name=name]');
var emailField = modalFeedback.querySelector('[name=email]');

function showModal(link) {
	link.preventDefault();
	modalFeedback.classList.toggle('modal--shown');
	modalFeedback.classList.remove('modal--error');
	nameField.focus();
}

feedbackForm.addEventListener('submit', function(evt) {
	if (!nameField.value || !emailField.value) {
		evt.preventDefault();
		modalFeedback.classList.remove('modal--error');
		modalFeedback.offsetWidth = modalFeedback.offsetWidth;
		modalFeedback.classList.add('modal--error');
	}
});

writeUsLink.addEventListener('click', showModal);
feedbackCloseBtn.addEventListener('click', showModal);

window.addEventListener('keydown', function(evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (modalFeedback.classList.contains('modal--shown')) {
			modalFeedback.classList.remove('modal--shown');
			modalFeedback.classList.remove('modal--error');
		}
	}
});

var map = document.querySelector('.contacts__show-map');
var modalMap = document.querySelector('.contacts__map');
var mapCloseBtn = modalMap.querySelector('.modal__close');

function showModalMap(link) {
	link.preventDefault();
	modalMap.classList.toggle('modal--shown');
}

map.addEventListener('click', showModalMap);
mapCloseBtn.addEventListener('click', showModalMap);

window.addEventListener('keydown', function(evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (modalMap.classList.contains('modal--shown')) {
			modalMap.classList.remove('modal--shown');
		}
	}
});

// SVGXUSE
/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function() {
	'use strict';
	if (typeof window !== 'undefined' && window.addEventListener) {
		var cache = Object.create(null); // holds xhr objects to prevent multiple requests
		var checkUseElems;
		var tid; // timeout id
		var debouncedCheck = function() {
			clearTimeout(tid);
			tid = setTimeout(checkUseElems, 100);
		};
		var unobserveChanges = function() {
			return;
		};
		var observeChanges = function() {
			var observer;
			window.addEventListener('resize', debouncedCheck, false);
			window.addEventListener('orientationchange', debouncedCheck, false);
			if (window.MutationObserver) {
				observer = new MutationObserver(debouncedCheck);
				observer.observe(document.documentElement, {
					childList: true,
					subtree: true,
					attributes: true
				});
				unobserveChanges = function() {
					try {
						observer.disconnect();
						window.removeEventListener('resize', debouncedCheck, false);
						window.removeEventListener('orientationchange', debouncedCheck, false);
					} catch (ignore) {}
				};
			} else {
				document.documentElement.addEventListener('DOMSubtreeModified', debouncedCheck, false);
				unobserveChanges = function() {
					document.documentElement.removeEventListener('DOMSubtreeModified', debouncedCheck, false);
					window.removeEventListener('resize', debouncedCheck, false);
					window.removeEventListener('orientationchange', debouncedCheck, false);
				};
			}
		};
		var createRequest = function(url) {
			// In IE 9, cross origin requests can only be sent using XDomainRequest.
			// XDomainRequest would fail if CORS headers are not set.
			// Therefore, XDomainRequest should only be used with cross origin requests.
			function getOrigin(loc) {
				var a;
				if (loc.protocol !== undefined) {
					a = loc;
				} else {
					a = document.createElement('a');
					a.href = loc;
				}
				return a.protocol.replace(/:/g, '') + a.host;
			}
			var Request;
			var origin;
			var origin2;
			if (window.XMLHttpRequest) {
				Request = new XMLHttpRequest();
				origin = getOrigin(location);
				origin2 = getOrigin(url);
				if (Request.withCredentials === undefined && origin2 !== '' && origin2 !== origin) {
					Request = XDomainRequest || undefined;
				} else {
					Request = XMLHttpRequest;
				}
			}
			return Request;
		};
		var xlinkNS = 'http://www.w3.org/1999/xlink';
		checkUseElems = function() {
			var base;
			var bcr;
			var fallback = ''; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
			var hash;
			var href;
			var i;
			var inProgressCount = 0;
			var isHidden;
			var Request;
			var url;
			var uses;
			var xhr;

			function observeIfDone() {
				// If done with making changes, start watching for chagnes in DOM again
				inProgressCount -= 1;
				if (inProgressCount === 0) { // if all xhrs were resolved
					unobserveChanges(); // make sure to remove old handlers
					observeChanges(); // watch for changes to DOM
				}
			}

			function attrUpdateFunc(spec) {
				return function() {
					if (cache[spec.base] !== true) {
						spec.useEl.setAttributeNS(xlinkNS, 'xlink:href', '#' + spec.hash);
						if (spec.useEl.hasAttribute('href')) {
							spec.useEl.setAttribute('href', '#' + spec.hash);
						}
					}
				};
			}

			function onloadFunc(xhr) {
				return function() {
					var body = document.body;
					var x = document.createElement('x');
					var svg;
					xhr.onload = null;
					x.innerHTML = xhr.responseText;
					svg = x.getElementsByTagName('svg')[0];
					if (svg) {
						svg.setAttribute('aria-hidden', 'true');
						svg.style.position = 'absolute';
						svg.style.width = 0;
						svg.style.height = 0;
						svg.style.overflow = 'hidden';
						body.insertBefore(svg, body.firstChild);
					}
					observeIfDone();
				};
			}

			function onErrorTimeout(xhr) {
				return function() {
					xhr.onerror = null;
					xhr.ontimeout = null;
					observeIfDone();
				};
			}
			unobserveChanges(); // stop watching for changes to DOM
			// find all use elements
			uses = document.getElementsByTagName('use');
			for (i = 0; i < uses.length; i += 1) {
				try {
					bcr = uses[i].getBoundingClientRect();
				} catch (ignore) {
					// failed to get bounding rectangle of the use element
					bcr = false;
				}
				href = uses[i].getAttribute('href') ||
					uses[i].getAttributeNS(xlinkNS, 'href') ||
					uses[i].getAttribute('xlink:href');
				if (href && href.split) {
					url = href.split('#');
				} else {
					url = ['', ''];
				}
				base = url[0];
				hash = url[1];
				isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
				if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
					// the use element is empty
					// if there is a reference to an external SVG, try to fetch it
					// use the optional fallback URL if there is no reference to an external SVG
					if (fallback && !base.length && hash && !document.getElementById(hash)) {
						base = fallback;
					}
					if (uses[i].hasAttribute('href')) {
						uses[i].setAttributeNS(xlinkNS, 'xlink:href', href);
					}
					if (base.length) {
						// schedule updating xlink:href
						xhr = cache[base];
						if (xhr !== true) {
							// true signifies that prepending the SVG was not required
							setTimeout(attrUpdateFunc({
								useEl: uses[i],
								base: base,
								hash: hash
							}), 0);
						}
						if (xhr === undefined) {
							Request = createRequest(base);
							if (Request !== undefined) {
								xhr = new Request();
								cache[base] = xhr;
								xhr.onload = onloadFunc(xhr);
								xhr.onerror = onErrorTimeout(xhr);
								xhr.ontimeout = onErrorTimeout(xhr);
								xhr.open('GET', base);
								xhr.send();
								inProgressCount += 1;
							}
						}
					}
				} else {
					if (!isHidden) {
						if (cache[base] === undefined) {
							// remember this URL if the use element was not empty and no request was sent
							cache[base] = true;
						} else if (cache[base].onload) {
							// if it turns out that prepending the SVG is not necessary,
							// abort the in-progress xhr.
							cache[base].abort();
							delete cache[base].onload;
							cache[base] = true;
						}
					} else if (base.length && cache[base]) {
						setTimeout(attrUpdateFunc({
							useEl: uses[i],
							base: base,
							hash: hash
						}), 0);
					}
				}
			}
			uses = '';
			inProgressCount += 1;
			observeIfDone();
		};
		var winLoad;
		winLoad = function() {
			window.removeEventListener('load', winLoad, false); // to prevent memory leaks
			tid = setTimeout(checkUseElems, 0);
		};
		if (document.readyState !== 'complete') {
			// The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
			window.addEventListener('load', winLoad, false);
		} else {
			// No need to add a listener if the document is already loaded, initialize immediately.
			winLoad();
		}
	}
}());
