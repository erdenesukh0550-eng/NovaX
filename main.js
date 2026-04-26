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
      else if (y > 120) navbar.style.transform = "translateY(-110%)";
    }
    lastY = y;

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${Math.max(0, Math.min(100, (y / h) * 100))}%`;
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
});
