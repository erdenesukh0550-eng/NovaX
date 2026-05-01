document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const progress = document.getElementById("progress");

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  navToggle?.addEventListener("click", () => navLinks?.classList.toggle("open"));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href").slice(1);
      if (id) {
        e.preventDefault();
        scrollToId(id);
        navLinks?.classList.remove("open");
      }
    });
  });

  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    navbar?.classList.toggle("scrolled", y > 40);
    if (navbar) {
      if (y <= 10 || y < lastY) navbar.style.transform = "translateY(0)";
      else if (y > 140) navbar.style.transform = "translateY(-110%)";
    }
    lastY = y;

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = h > 0 ? `${Math.max(0, Math.min(100, (y / h) * 100))}%` : "0%";
    }
  }, { passive: true });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const contact = document.getElementById("contact");
  if (contact) {
    const contactObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => contact.classList.toggle("light-on", entry.isIntersecting));
    }, { threshold: 0.3 });
    contactObserver.observe(contact);
  }

  const modal = document.getElementById("quoteModal");
  const quoteForm = document.getElementById("quoteForm");
  const quoteSuccess = document.getElementById("quoteSuccess");

  function openModal() {
    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (quoteForm && quoteSuccess) {
      quoteForm.reset();
      quoteForm.style.display = "grid";
      quoteSuccess.classList.remove("show");
    }
  }

  function closeModal() {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-quote-open]").forEach(btn => btn.addEventListener("click", openModal));
  document.querySelectorAll("[data-quote-close]").forEach(btn => btn.addEventListener("click", closeModal));
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  quoteForm?.addEventListener("submit", async e => {
    e.preventDefault();
    const submit = quoteForm.querySelector("button[type='submit']");
    const old = submit.textContent;
    submit.textContent = "Илгээж байна...";
    submit.disabled = true;

    try {
      const res = await fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        quoteForm.reset();
        quoteForm.style.display = "none";
        quoteSuccess?.classList.add("show");
        setTimeout(() => {
          closeModal();
          if (location.pathname.endsWith("catalog.html")) {
            window.location.href = "index.html#home";
          } else {
            scrollToId("home");
          }
        }, 1700);
      } else {
        alert("Илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch {
      alert("Интернет холболт эсвэл серверийн алдаа гарлаа.");
    } finally {
      submit.textContent = old;
      submit.disabled = false;
    }
  });

  const soundToggle = document.getElementById("soundToggle");
  const novaBgm = document.getElementById("novaBgm");
  let novaSoundPlaying = false;
  let novaFadeTimer = null;

  function fadeAudio(targetVolume) {
    if (!novaBgm) return;
    clearInterval(novaFadeTimer);
    novaFadeTimer = setInterval(() => {
      const diff = targetVolume - novaBgm.volume;
      if (Math.abs(diff) < 0.006) {
        novaBgm.volume = targetVolume;
        clearInterval(novaFadeTimer);
        return;
      }
      novaBgm.volume = Math.max(0, Math.min(0.08, novaBgm.volume + diff * 0.18));
    }, 80);
  }

  soundToggle?.addEventListener("click", async () => {
    if (!novaBgm) return;
    if (!novaSoundPlaying) {
      try {
        novaBgm.volume = 0;
        await novaBgm.play();
        novaSoundPlaying = true;
        soundToggle.classList.add("playing");
        soundToggle.querySelector(".sound-on").textContent = "🔇";
        fadeAudio(0.055);
      } catch (err) {
        console.warn("Audio play blocked:", err);
      }
    } else {
      fadeAudio(0);
      setTimeout(() => {
        novaBgm.pause();
        novaSoundPlaying = false;
        soundToggle.classList.remove("playing");
        soundToggle.querySelector(".sound-on").textContent = "🔊";
      }, 650);
    }
  });
});
