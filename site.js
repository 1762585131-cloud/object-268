/* Object-268 — small, dependency-free interactions */
(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navLinks = document.querySelectorAll(".site-nav a");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      siteNav.classList.toggle("is-open", !open);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 720px)").matches) {
          navToggle.setAttribute("aria-expanded", "false");
          siteNav.classList.remove("is-open");
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        navToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
        navToggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  var randomButton = document.querySelector("[data-random-note]");
  var notes = Array.prototype.slice.call(document.querySelectorAll(".note"));

  if (randomButton && notes.length) {
    randomButton.addEventListener("click", function () {
      var pick = notes[Math.floor(Math.random() * notes.length)];
      notes.forEach(function (note) {
        note.classList.remove("is-picked");
      });
      pick.classList.add("is-picked");
      pick.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(function () {
        pick.classList.remove("is-picked");
      }, 2200);
    });
  }

  var joystick = document.querySelector("[data-joystick]");
  var stick = document.querySelector("[data-joystick-stick]");
  var joystickOutput = document.querySelector("[data-joystick-output]");

  if (joystick && stick && joystickOutput) {
    var pointerActive = false;
    var dragged = false;
    var suppressClick = false;
    var startX = 0;
    var startY = 0;
    var keyTimer = 0;

    var say = function (message) {
      joystickOutput.textContent = message;
    };

    var maxOffset = function () {
      return Math.max(22, joystick.clientWidth * 0.29);
    };

    var setStick = function (x, y) {
      var limit = maxOffset();
      var distance = Math.sqrt(x * x + y * y);
      if (distance > limit) {
        x = (x / distance) * limit;
        y = (y / distance) * limit;
      }
      stick.style.transform = "translate(" + x + "px, " + y + "px)";
    };

    var resetStick = function () {
      joystick.classList.remove("is-dragging");
      stick.style.transform = "translate(0, 0)";
    };

    var directionOf = function (x, y) {
      if (Math.abs(x) > Math.abs(y)) {
        return x > 0 ? "right" : "left";
      }
      return y > 0 ? "down" : "up";
    };

    var release = function () {
      pointerActive = false;
      joystick.classList.remove("is-dragging");
      var numbers = stick.style.transform.match(/-?[0-9.]+/g) || [0, 0];
      var x = parseFloat(numbers[0]) || 0;
      var y = parseFloat(numbers[1]) || 0;
      suppressClick = dragged;
      resetStick();
      if (dragged) {
        say("Moved " + directionOf(x, y) + ". Nothing happened.");
        dragged = false;
      }
    };

    joystick.addEventListener("pointerdown", function (event) {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }
      pointerActive = true;
      dragged = false;
      suppressClick = false;
      startX = event.clientX;
      startY = event.clientY;
      joystick.setPointerCapture(event.pointerId);
      joystick.classList.add("is-dragging");
    });

    joystick.addEventListener("pointermove", function (event) {
      if (!pointerActive) {
        return;
      }
      var rect = joystick.getBoundingClientRect();
      var x = event.clientX - (rect.left + rect.width / 2);
      var y = event.clientY - (rect.top + rect.height / 2);
      if (Math.abs(event.clientX - startX) > 3 || Math.abs(event.clientY - startY) > 3) {
        dragged = true;
      }
      setStick(x, y);
    });

    joystick.addEventListener("pointerup", release);
    joystick.addEventListener("pointercancel", release);

    joystick.addEventListener("click", function () {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      say("You pressed it. Nothing happened.");
    });

    joystick.addEventListener("keydown", function (event) {
      var step = maxOffset() * 0.7;
      var map = {
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0]
      };
      if (!map[event.key]) {
        return;
      }
      event.preventDefault();
      window.clearTimeout(keyTimer);
      joystick.classList.add("is-dragging");
      setStick(map[event.key][0], map[event.key][1]);
      say("Moved " + directionOf(map[event.key][0], map[event.key][1]) + ". Nothing happened.");
      keyTimer = window.setTimeout(resetStick, 320);
    });
  }
})();
