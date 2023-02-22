
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		header.classList.add('mobile-nav-active')
	}

	if($('.header__mobile-nav--close button') || $('.header__mobile-nav--bg')) {
		header.classList.remove('mobile-nav-active')
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-


	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	let btnToScroll = $('.btn-to-scroll');
	if(btnToScroll) {
		event.preventDefault();
		
		let section;
	
		if(btnToScroll.classList.contains('_on-top')) {
			window.scrollTo({
				left: 0,
				top: 0,
				behavior: 'smooth'
			})
		} else {
			section = document.querySelector(btnToScroll.getAttribute('href'))

			//console.log('scroll')
			window.scrollTo({
				left: 0,
				top: (section) ? section.offsetTop : 0,
				behavior: 'smooth'
			})
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <save anchor id in URL> -=-=-=-=-=-=-=-=-=-=-=-=

	const anchorLink = $('.anchor-link'),
	activeAnchorLink = document.querySelector('.anchor-link._active');
	if(anchorLink) {
		if(activeAnchorLink) activeAnchorLink.classList.remove('_active')
		anchorLink.classList.add('_active');
		history.pushState('', "", anchorLink.getAttribute('href'));
	}

	// =-=-=-=-=-=-=-=-=-=-=-=- </save anchor id in URL> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <custom select> -=-=-=-=-=-=-=-=-=-=-=-=

	const 
	selectSelected = $('.select-selected'),
	activeSelect = document.querySelectorAll('.select._active');

	if(selectSelected) {
		
		const select = selectSelected.closest('.select');
		
		if(select.classList.contains('_active')) {
			select.classList.remove('_active')
		} else {
			activeSelect.forEach(activeSelect => {
				activeSelect.classList.remove('_active');
			})
			select.classList.add('_active');
		}
		
	} else if(activeSelect.length && !$('.select')) {
		activeSelect.forEach(activeSelect => {
			activeSelect.classList.remove('_active');
		})
	}

	// =-=-=-=-=-=-=-=-=-=-=-=- </custom select> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <set active star> -=-=-=-=-=-=-=-=-=-=-=-=

	const ratingStar = $('.rating__star');
	if(ratingStar) {
		const parent = ratingStar.closest('.rating'),
			  activeStar = parent.querySelector('.rating__star._active');
		
		if(activeStar) activeStar.classList.remove('_active');
		ratingStar.classList.add('_active');
	}

	// =-=-=-=-=-=-=-=-=-=-=-=- </set active star> -=-=-=-=-=-=-=-=-=-=-=-=

	// =-=-=-=-=-=-=-=-=-=-=-=- <games nav list open> -=-=-=-=-=-=-=-=-=-=-=-=

	const gamesNavItem = $('.games-nav__current .games-nav__item');
	if(gamesNavItem) {
		const parent = gamesNavItem.closest('.games-nav-mob');
		event.preventDefault()
		const list = parent.querySelector('.games-nav__list');

		if(parent.classList.contains('_active')) {

			list.style.transitionProperty = 'height';
			const height = list.offsetHeight;
			list.style.height = height + 'px';

			function hidden() {
				list.style.removeProperty('transition-property')
				list.style.display = 'none';
				list.style.removeProperty('height')
				parent.classList.remove('_animating');
				list.removeEventListener('transitionend', hidden)
			}

			list.addEventListener('transitionend', hidden)

			setTimeout(() => {
				list.style.height = 0;
				parent.classList.remove('_active')
			},0)

		} else {

			parent.classList.add('_active');
			list.style.height = 'auto';
			list.style.display = 'flex';
			const height = list.offsetHeight;
			list.style.height = 0;
			list.style.transitionProperty = 'height';

			function visible() {
				list.style.removeProperty('transition-property')
				//list.style.removeProperty('height');
				parent.classList.remove('_animating');
				list.removeEventListener('transitionend', visible)
			}

			list.addEventListener('transitionend', visible);
			
			setTimeout(() => {
				list.style.height = height + 'px';
			},0)
			
		}
	}

	// =-=-=-=-=-=-=-=-=-=-=-=- </games nav list open> -=-=-=-=-=-=-=-=-=-=-=-=

})

const stickyBlock = new Sticky('[data-sticky-container] .sticky');


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

const 
gamesNavWrapper = document.querySelector('.games-nav__wrapper'),
gamesNavContainer = document.querySelector('.games-nav__sticky-container'),
gamesNavMobContainer = document.querySelector('.games-nav-mob');

function resize() {

	windowSize = window.innerWidth

	html.style.setProperty("--height-header", header.offsetHeight + "px")

	resizeCheckFunc(992,
		function () {  // screen > 992px

			if(gamesNavContainer && gamesNavWrapper) gamesNavContainer.append(gamesNavWrapper);

		},
		function () {  // screen < 992px

			if(gamesNavMobContainer && gamesNavWrapper) gamesNavMobContainer.append(gamesNavWrapper);

		}
	);

}

resize();

window.onresize = resize;

/* document.querySelectorAll('img').forEach(img => {
	img.addEventListener('load', function (event) {
		event.target.classList.add('loaded')
	})
}) */

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let lastNewsSlider = new Swiper('.last-news__slider', {

	spaceBetween: 20,
	slidesPerView: 2,
	reverseDirection: true,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
	  1550: {
		slidesPerView: 4,
	  },
	  1200: {
		slidesPerView: 3,
	  },
	  350: {
		spaceBetween: 10,
	  },
	  /* 600: {
		slidesPerView: 2,
		centeredSlides: false,
	  }, */
	}
});

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

const scrollAnchorContainer = document.querySelectorAll('.scroll-anchor-container');

function scroll() {
	
	scrollAnchorContainer.forEach(scrollAnchorContainer => {
		
		const items = scrollAnchorContainer.querySelectorAll('[id]'),
		nav = document.querySelectorAll(scrollAnchorContainer.dataset.nav);

		nav.forEach(nav => {
			
			for(let index = items.length-1; index >= 0; index--) {
				//console.log(items[index])
				if(items[index].getBoundingClientRect().top < 0) {
					
					const anchorLink = nav.querySelector(`.anchor-link[href="#${items[index].getAttribute('id')}"]`);
					
					if(anchorLink) {
						
						const activeLink = nav.querySelector('.anchor-link._active');
						if(activeLink) {
							if(activeLink.getAttribute('href') != '#' + items[index].getAttribute('id')) {
								activeLink.classList.remove('_active');
								anchorLink.classList.add('_active');
							}
						} else {
							anchorLink.classList.add('_active');
						}
					}				
					break;	
				}
			}

		})

	})
}

scroll()

window.addEventListener('scroll', scroll);

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	//disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
