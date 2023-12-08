document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  
  /*Pré-carregador*/
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /* Cabeçalho fixo na rolagem*/
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /* A barra de navegação vincula o estado ativo na rolagem */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /* Alternar navegação móvel */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /* Ocultar navegação móvel em links de mesma página */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /* Alternar menus suspensos de navegação móvel */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /* Iniciar Glightbox */
  const glightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    autoplayVideos: true
  });

  /* Botão de rolagem superior */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }


  /* Animação na função de rolagem e inicialização */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  const projectData = [
    {
      title: "Votos & Versos",
      description: "Site do grupo musical Votos & Versos. Uma celebração da arte musical que combina votos de amor com versos envolventes. Divulgação de agenda, eventos e videos de perfomances.",
      imageSrc: "./assets/img/site-votoseversos-desktop.png",
      linkProject: "https://yaravarges.github.io/votoseversos-site/"
    },
    {
      title: "AmiCrochês",
      description: "Site AmiCrochês, sobre o universo dos amigurumis. Explora sobre pelúcias feitas à mão, onde cada ponto se transforma em personagens adoráveis e coloridos.",
      imageSrc: "./assets/img/site-amicroches-desktop.png",
      linkProject: "https://yaravarges.github.io/amicroches-site/"
    },
    {
      title: "Rick and Morty Dex",
      description: "Projeto desenvolvido durante o curso da DIO. Um catálogo de personagens do multiverso Rick and Morty, explorando diversas características dos personagens.",
      imageSrc: "./assets/img/site-rickandmorty-desktop.png",
      linkProject: "https://yaravarges.github.io/rick-morty/"
    },
    {
      title: "Gerador de Senhas",
      description: "Site que cria senhas robustas com facilidade, garantindo a proteção de suas contas online. Além disso, simplifique a geração de códigos QR personalizados para diversas finalidades.",
      imageSrc: "./assets/img/site-geradorsenha-desktop.png",
      linkProject: "https://yaravarges.github.io/utilitario/senhas/index.html"
    },
    
  ];

  function addProjects() {
    const projectContainer = document.querySelector("#projects .sections-projects");

    projectData.forEach((project) => {
       const template = document.getElementById("project-template").cloneNode(true);
       template.removeAttribute("id");
 
       template.querySelector(".project-title").textContent = project.title;
       template.querySelector(".project-description").textContent = project.description;
       template.querySelector(".project-image").src = project.imageSrc;
       template.querySelector(".project-link").href = project.linkProject;

       template.style.display = "block";
       projectContainer.appendChild(template);
    });
  }

  addProjects();
});
