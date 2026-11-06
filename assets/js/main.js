/* Titip Kos — interaksi kecil: menu ponsel, lacak kardus (data contoh), kalkulator, filter berita, formulir demo */
(function () {
  "use strict";

  // Menu ponsel
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Tutup" : "Menu";
    });
  }

  var rupiah = function (n) { return "Rp" + n.toLocaleString("id-ID"); };

  // Lacak kardus (data contoh, tidak terhubung ke server)
  var DATA = {
    "TK-2611-0042": {
      owner: "Nadia R., kos di Tembalang", isi: "5 kardus, 1 kipas angin", rak: "Rak B-04",
      steps: [
        ["done", "Dijemput dari kos", "2 Nov 2026, 09.20"],
        ["done", "Isi difoto dan kardus disegel", "2 Nov 2026, 09.45"],
        ["now", "Disimpan di gudang, Rak B-04", "sejak 2 Nov 2026, 13.10"],
        ["todo", "Diantar kembali", "dijadwalkan 18 Feb 2027"]
      ]
    },
    "TK-2611-0107": {
      owner: "Fikri A., kos di Kaligawe", isi: "3 kardus, 1 kasur lipat", rak: "Rak A-11",
      steps: [
        ["done", "Dijemput dari kos lama", "31 Okt 2026, 15.00"],
        ["done", "Isi difoto dan kardus disegel", "31 Okt 2026, 15.30"],
        ["done", "Disimpan sementara, Rak A-11", "31 Okt 2026, 18.40"],
        ["now", "Dalam perjalanan ke kos baru", "hari ini, kurir berangkat 10.15"]
      ]
    },
    "TK-2608-0318": {
      owner: "Rara P., kos di Sekaran", isi: "6 kardus", rak: "Rak C-02",
      steps: [
        ["done", "Dijemput dari kos", "3 Jul 2026, 08.10"],
        ["done", "Isi difoto dan kardus disegel", "3 Jul 2026, 08.40"],
        ["done", "Disimpan di gudang, Rak C-02", "3 Jul 2026, 12.00"],
        ["done", "Diantar dan diterima pemilik", "29 Agu 2026, 16.25"]
      ]
    }
  };
  var STATUS = { "TK-2611-0042": "Disimpan", "TK-2611-0107": "Diantar", "TK-2608-0318": "Selesai" };

  var tForm = document.getElementById("track-form");
  var tOut = document.getElementById("track-result");
  function renderTrack(raw) {
    var code = raw.trim().toUpperCase().replace(/\s+/g, "");
    if (/^TK\d/.test(code)) code = code.replace(/^TK/, "TK-");
    var d = DATA[code];
    if (!d) {
      tOut.innerHTML = '<div class="empty"><div><p><b>Kode ' + (code || "kosong") + ' tidak ditemukan.</b></p>' +
        '<p class="small">Format kode: TK-xxxx-xxxx, tertulis di label kardus. Masih bingung? Tanya admin lewat halaman Kontak.</p></div></div>';
      return;
    }
    var items = d.steps.map(function (s) {
      return '<li class="' + s[0] + '"><span class="dot"></span><b>' + s[1] + '</b><span class="when">' + s[2] + "</span></li>";
    }).join("");
    tOut.innerHTML =
      '<div class="tr-head"><div><span class="code">' + code + '</span><div class="small muted">' + d.owner + "</div></div>" +
      '<span class="stamp stamp-tape">' + STATUS[code] + "</span></div>" +
      '<p class="small"><b>Isi:</b> ' + d.isi + " &nbsp; <b>Lokasi:</b> " + d.rak + "</p>" +
      '<ol class="timeline">' + items + "</ol>";
  }
  if (tForm && tOut) {
    tForm.addEventListener("submit", function (e) { e.preventDefault(); renderTrack(tForm.kode.value); });
    document.querySelectorAll("[data-code]").forEach(function (b) {
      b.addEventListener("click", function () { tForm.kode.value = b.dataset.code; renderTrack(b.dataset.code); });
    });
    renderTrack("TK-2611-0042");
    tForm.kode.value = "TK-2611-0042";
  }

  // Kalkulator Titip Libur
  var calc = document.getElementById("calc");
  if (calc) {
    var get = function (n) { return Math.max(+calc.querySelector('[name="' + n + '"]').value || 0, 0); };
    var update = function () {
      var k = get("kardus"), b = get("besar"), m = Math.max(get("bulan"), 1);
      var titip = k * 30000 * m, besar = b * 50000 * m;
      var ongkir = (k + b) === 0 ? 0 : (k >= 4 ? 0 : 20000);
      document.getElementById("c-kardus").textContent = rupiah(titip);
      document.getElementById("c-kardus-l").textContent = k + " kardus × " + m + " bln";
      document.getElementById("c-besar").textContent = rupiah(besar);
      document.getElementById("c-besar-l").textContent = b + " barang besar × " + m + " bln";
      document.getElementById("c-ongkir").textContent = ongkir ? rupiah(ongkir) : "Gratis";
      document.getElementById("c-total").textContent = rupiah(titip + besar + ongkir);
    };
    calc.querySelectorAll(".stepper").forEach(function (st) {
      var input = st.querySelector("input");
      st.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var v = (+input.value || 0) + (+btn.dataset.step);
          var min = +input.min, max = +input.max;
          input.value = Math.min(Math.max(v, min), max);
          update();
        });
      });
      input.addEventListener("input", update);
    });
    update();
  }

  // Filter berita
  var filter = document.querySelector(".filter");
  if (filter) {
    filter.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      filter.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      var cat = btn.dataset.cat;
      document.querySelectorAll("[data-cat-item]").forEach(function (el) {
        el.hidden = !(cat === "semua" || el.dataset.catItem === cat);
      });
    });
  }

  // Formulir kontak (demo, tidak mengirim data ke mana pun)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("form-msg");
      var nama = (form.nama.value || "").trim().split(" ")[0] || "kamu";
      msg.hidden = false;
      msg.innerHTML = "<b>Terima kasih, " + nama.replace(/[<>&"]/g, "") + ".</b> Karena Titip Kos adalah perusahaan fiktif untuk tugas kuliah, pesan ini tidak dikirim ke mana pun dan datamu tidak disimpan.";
      msg.focus();
    });
  }
})();
