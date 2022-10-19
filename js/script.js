'use strict';

let noJs = document.querySelector('html');
noJs.classList.remove('no-js');

/* Navigation block */

let activeMenu = document.querySelector('.site-menu-open');
let subMenuWrapper = document.querySelector('.site-submenu-wrapper');

function menuHendler(evt) {
	evt.preventDefault();
	subMenuWrapper.classList.toggle('hide');
}

if (activeMenu) {
	activeMenu.addEventListener('click', menuHendler);
}

/* Search block */

let searchLink = document.querySelector('.header-search-link');
let searchWrapper = document.querySelector('.header-search-wrapper');

function searchLinkHendler(evt) {
	evt.preventDefault();
	searchWrapper.classList.toggle('hide');
}

if (searchLink) {
	searchLink.addEventListener('click', searchLinkHendler);
}

/* Login block */

let loginLink = document.querySelector('.header-login-link');
let loginWrapper = document.querySelector('.header-login-wrapper');

function loginLinkHendler(evt) {
	evt.preventDefault();
	loginWrapper.classList.toggle('hide');
}

if (loginLink) {
	loginLink.addEventListener('click', loginLinkHendler);
}

/* Card block */

let cardLink = document.querySelector('.header-card-full');
let cardWrapper = document.querySelector('.header-card-wrapper');

function cardLinkHendler(evt) {
	evt.preventDefault();
	cardWrapper.classList.toggle('hide');
}

if (cardLink) {
	cardLink.addEventListener('click', cardLinkHendler);
}

/* Subscribe block */

let subscribe = document.querySelector('.subscription');
let subscribeForm = subscribe.querySelector('form');
let subscribeInput = subscribeForm.querySelector('.subscription-input');
let subscribeLabel = subscribeForm.querySelector('.subscription-label');
let subscribeSend = subscribeForm.querySelector('.subscription-send');

function subscribeHendler(evt) {
	if (!subscribeInput.value) {
		evt.preventDefault();
		subscribeInput.classList.add('subscription-error');
		subscribeLabel.classList.add('subscription-label-on');
	}
}

if (subscribe) {
	subscribeSend.addEventListener('click', subscribeHendler);
}

/* Feedback block */

let writeUs = document.querySelector('.legend-contact');
let writeUsModal = document.querySelector('.writeus')
let modalOverlay = document.querySelector('.modal-overlay');

let formSend, userName, userEmail, userText;

let isStorageSupport = true;
let storageName = '';
let storageEmail = '';

if (writeUs) {
	formSend = writeUsModal.querySelector('form');
	userName = formSend.querySelector('.writeus-name');
	userEmail = formSend.querySelector('.writeus-email');
	userText = formSend.querySelector('.writeus-text');
}

function setCloseEvent(root) {
	let modalClose = root.querySelector('.modal-close');
	modalClose.addEventListener('click', function(evt) {
		evt.preventDefault();
		root.classList.add('hide');
		modalOverlay.classList.add('hide');
	});
	modalOverlay.addEventListener('click', function() {
		root.classList.add('hide');
		modalOverlay.classList.add('hide');
	});

}

function setCloseEsc(root) {
	window.addEventListener('keydown', function(evt) {
		if (evt.keyCode === 27) {
			evt.preventDefault();
			if (!root.classList.contains('hide')) {
				root.classList.add('hide');
				modalOverlay.classList.add('hide');
			}
		}
 	});
}

function writeUsHendler(evt) {
	evt.preventDefault();
	writeUsModal.classList.remove('hide');
	modalOverlay.classList.remove('hide');
	setCloseEvent(writeUsModal);
	setCloseEsc(writeUsModal);

	try {
		storageName = localStorage.getItem('name');
		storageEmail = localStorage.getItem('email');
	} catch(err) {
		isStorageSupport = false;
	}

	if (storageName) {
		userName.value = storageName;
	}

	if (storageName && storageEmail) {
		userName.value = storageName;
		userEmail.value = storageEmail;
	}

	formSend.addEventListener('submit', function(evt) {
		writeUsModal.classList.remove('modal-error');
		if(!userName.value) {
			evt.preventDefault();
			userName.focus();
			writeUsModal.classList.add('modal-error');
		} else if (userName.value && !userEmail.value) {
			evt.preventDefault();
			userEmail.focus();
			writeUsModal.classList.add('modal-error');
		} else {
			localStorage.setItem('name', userName.value);
			localStorage.setItem('email', userEmail.value);
		}
	});
}

if (writeUs) {
	writeUs.addEventListener('click', writeUsHendler);
}