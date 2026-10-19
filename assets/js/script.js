$(document).ready(function () {
  const header = $("#header");
  const sections = $("main section[id]");
  const navItems = $("#nav_list .nav-item");
  const backToTop = $("#back_to_top");

  /* ---------- Mobile menu ---------- */
  $("#mobile_btn").on("click", function () {
    $("#mobile_menu").toggleClass("active");
    $(this).find("i").toggleClass("fa-bars fa-xmark");
  });

  $("#mobile_menu a").on("click", function () {
    $("#mobile_menu").removeClass("active");
    $("#mobile_btn i").removeClass("fa-xmark").addClass("fa-bars");
  });

  /* ---------- Scroll: header, active link, back to top ---------- */
  function onScroll() {
    const scrollTop = $(window).scrollTop();

    header.toggleClass("scrolled", scrollTop > 10);
    backToTop.toggleClass("visible", scrollTop > 600);

    const navTargets = ["home", "features", "menu", "testimonials", "contact"];
    let activeIndex = 0;
    const offset = scrollTop + header.outerHeight() + 120;

    sections.each(function () {
      const index = navTargets.indexOf(this.id);
      if (index !== -1 && offset >= $(this).offset().top) {
        activeIndex = index;
      }
    });

    navItems.removeClass("active");
    $(navItems[activeIndex]).addClass("active");
  }

  $(window).on("scroll", onScroll);
  onScroll();

  backToTop.on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(icon, message) {
    const toast = $("#toast");
    toast.html(`<i class="fa-solid ${icon}"></i> ${message}`).addClass("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.removeClass("show"), 2600);
  }

  /* ---------- Menu filters ---------- */
  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    $(".dish").each(function () {
      const match = filter === "all" || $(this).data("category") === filter;
      $(this).toggleClass("hide", !match);
    });
  });

  /* ---------- Favorites ---------- */
  $(".dish-heart").on("click", function () {
    $(this).toggleClass("liked");
    const liked = $(this).hasClass("liked");
    $(this).find("i").toggleClass("fa-regular", !liked).toggleClass("fa-solid", liked);

    const dish = $(this).closest(".dish").find(".dish-title").text();
    if (liked) showToast("fa-heart", `${dish} adicionado aos favoritos`);
  });

  /* ---------- Cart ---------- */
  let cartCount = 0;
  $(".add-to-cart").on("click", function () {
    cartCount++;
    $("#cart_count").text(cartCount);

    const cartButton = $(".cart-button");
    cartButton.removeClass("bump");
    void cartButton[0].offsetWidth;
    cartButton.addClass("bump");

    const dish = $(this).closest(".dish").find(".dish-title").text();
    showToast("fa-circle-check", `${dish} adicionado ao carrinho`);
  });

  /* ---------- Newsletter ---------- */
  $("#newsletter").on("submit", function (event) {
    event.preventDefault();
    this.reset();
    showToast("fa-envelope-circle-check", "Inscrição realizada! Fique de olho no seu e-mail.");
  });

  /* ---------- Footer year ---------- */
  $("#year").text(new Date().getFullYear());

  /* ---------- Scroll animations ---------- */
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({ distance: "40px", duration: 1000, easing: "cubic-bezier(0.4, 0, 0.2, 1)", reset: false });

    sr.reveal("#cta", { origin: "left", distance: "15%" });
    sr.reveal("#banner", { origin: "right", distance: "15%", delay: 200 });
    sr.reveal(".feature", { origin: "bottom", interval: 120 });
    sr.reveal("#menu .section-header, #menu_filters", { origin: "top" });
    sr.reveal(".dish", { origin: "bottom", interval: 120 });
    sr.reveal(".step", { origin: "bottom", interval: 150 });
    sr.reveal("#chef_wrapper", { origin: "left", distance: "15%" });
    sr.reveal(".feedback", { origin: "right", interval: 150 });
    sr.reveal(".order-banner-inner", { scale: 0.9, distance: "0px" });
    sr.reveal(".contact-card", { origin: "bottom", interval: 120 });
  }
});
