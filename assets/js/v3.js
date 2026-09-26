(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const html = document.documentElement;
  const themeButton = $("[data-theme-toggle]");
  const syncTheme = () => {
    const dark = html.dataset.theme === "dark";
    if (themeButton) themeButton.setAttribute("aria-label", dark ? "切换到浅色模式" : "切换到深色模式");
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#1c201d" : "#f3f1eb";
  };
  syncTheme();
  themeButton?.addEventListener("click", () => {
    const theme = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = theme;
    try { localStorage.setItem("v3-pref-theme", theme); } catch (_) {}
    syncTheme();
  });

  const menu = $("#main-nav"), menuButton = $("[data-menu-toggle]");
  const closeMenu = (restoreFocus = false) => { const wasOpen = menu?.classList.contains("is-open"); menu?.classList.remove("is-open"); menuButton?.setAttribute("aria-expanded", "false"); menuButton?.setAttribute("aria-label", "展开导航"); if (restoreFocus && wasOpen) menuButton?.focus(); };
  menuButton?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "收起导航" : "展开导航"); if (open) $("a", menu)?.focus();
  });
  menu?.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("click", e => { if (!e.target.closest(".site-header")) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(true); });

  let indexPromise;
  const loadIndex = () => {
    if (!indexPromise) indexPromise = fetch(document.body.dataset.searchIndex)
      .then(response => { if (!response.ok) throw new Error("搜索索引暂时不可用"); return response.json(); })
      .then(rows => rows.map(row => ({
        ...row,
        searchTitle: row.title.normalize("NFKC").toLocaleLowerCase(),
        searchBody: (row.content + " " + (row.tags || []).join(" ") + " " + (row.categories || []).join(" ")).normalize("NFKC").toLocaleLowerCase()
      })))
      .catch(error => { indexPromise = undefined; throw error; });
    return indexPromise;
  };
  const resultNode = (row, query) => {
    const link = document.createElement("a");
    link.className = "result-item";
    link.href = row.permalink;
    const meta = document.createElement("div");
    meta.className = "result-meta";
    meta.textContent = [row.date, (row.categories || []).join(" / ")].filter(Boolean).join(" · ");
    const title = document.createElement("h3");
    const location = row.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
    if (location >= 0 && query) {
      title.append(document.createTextNode(row.title.slice(0, location)));
      const mark = document.createElement("mark");
      mark.textContent = row.title.slice(location, location + query.length);
      title.append(mark, document.createTextNode(row.title.slice(location + query.length)));
    } else title.textContent = row.title;
    const excerpt = document.createElement("p");
    excerpt.textContent = row.summary || "";
    link.append(meta, title, excerpt);
    return link;
  };
  function makeSearch(input, output, status, onEmpty) {
    if (!input) return;
    let timer, revision = 0;
    const update = async () => {
      const current = ++revision;
      const query = input.value.trim();
      output.replaceChildren();
      if (!query) {
        status.textContent = "输入关键词，搜索标题、正文与标签。";
        onEmpty?.(true);
        return;
      }
      onEmpty?.(false);
      status.textContent = "搜索中…";
      try {
        const rows = await loadIndex();
        if (revision !== current) return;
        const tokens = query.normalize("NFKC").toLocaleLowerCase().split(/\s+/).filter(Boolean);
        const results = rows.map(row => {
          if (!tokens.every(token => row.searchTitle.includes(token) || row.searchBody.includes(token))) return null;
          const score = tokens.reduce((sum, token) => sum + (row.searchTitle.includes(token) ? 20 : 1), 0);
          return { row, score };
        }).filter(Boolean).sort((a, b) => b.score - a.score);
        status.textContent = results.length ? "找到 " + results.length + " 篇文章" + (results.length > 30 ? "，先展示前 30 篇。" : "。") : "没有找到相关文章。";
        const fragment = document.createDocumentFragment();
        results.slice(0, 30).forEach(item => fragment.append(resultNode(item.row, query)));
        output.append(fragment);
      } catch (_) {
        if (revision === current) {
          status.textContent = "搜索暂时未能加载。请检查网络后重试，也可以直接浏览文章目录。";
        }
      }
    };
    input.addEventListener("input", () => { clearTimeout(timer); ++revision; timer = setTimeout(update, 140); });
    input.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); clearTimeout(timer); update(); } });
    return update;
  }

  const dialog = $("#search-dialog"), searchInput = $("[data-global-search]");
  const updateGlobal = makeSearch(searchInput, $("[data-search-results]"), $("[data-search-status]"));
  const openSearch = e => {
    if (!dialog?.showModal) return;
    e?.preventDefault();
    closeMenu();
    if (!dialog.open) dialog.showModal();
    searchInput.focus();
    loadIndex().catch(() => {});
  };
  $$("[data-open-search]").forEach(link => link.addEventListener("click", openSearch));
  $("[data-close-search]")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", e => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") openSearch(e);
    if (e.key === "Escape" && dialog?.open) dialog.close();
  });

  const libraryInput = $("[data-library-search]");
  const exploreDefault = $("[data-explore-default]");
  const libraryOutput = $("[data-library-results]");
  const updateLibrary = makeSearch(libraryInput, libraryOutput, $("[data-library-status]"), empty => {
    if (exploreDefault) exploreDefault.hidden = !empty;
    if (libraryOutput) libraryOutput.hidden = empty;
  });
  if (libraryInput) {
    libraryInput.value = new URLSearchParams(location.search).get("q") || "";
    if (libraryInput.value) updateLibrary();
  }

  const feedInput = $("[data-feed-filter]");
  if (feedInput) {
    const rows = $$("[data-feed-search]"), count = $("[data-feed-count]"), empty = $("[data-feed-empty]");
    feedInput.addEventListener("input", () => {
      const term = feedInput.value.trim().normalize("NFKC").toLocaleLowerCase();
      let visible = 0;
      rows.forEach(row => {
        row.hidden = !row.dataset.feedSearch.normalize("NFKC").toLocaleLowerCase().includes(term);
        if (!row.hidden) visible++;
      });
      if (count) count.textContent = "显示 " + visible + " / " + rows.length + " 个订阅";
      if (empty) empty.hidden = visible !== 0;
    });
  }

  const progress = $("[data-reading-progress]"), article = $("[data-article-body]");
  if (progress && article) {
    let scheduled = false;
    const updateProgress = () => {
      const start = article.getBoundingClientRect().top + window.scrollY - 120;
      const distance = Math.max(1, article.scrollHeight - window.innerHeight + 160);
      progress.style.transform = "scaleX(" + Math.max(0, Math.min(1, (window.scrollY - start) / distance)) + ")";
      scheduled = false;
    };
    window.addEventListener("scroll", () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }
  $$("[data-focus-toggle]").forEach(button => button.addEventListener("click", () => {
    const focused = document.body.classList.toggle("focus-reading");
    button.setAttribute("aria-pressed", String(focused));
    button.textContent = focused ? "退出专注" : "专注阅读";
    window.dispatchEvent(new Event("resize"));
  }));
  const toc = $(".toc-disclosure");
  if (toc) {
    const mobile = matchMedia("(max-width: 700px)");
    const adjustToc = () => { toc.open = !mobile.matches; };
    adjustToc();
    mobile.addEventListener?.("change", adjustToc);
    const links = $$("a", toc), headings = $$("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]", article);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          const id = visible[0].target.id;
          links.forEach(link => {
            let fragment = link.hash.slice(1);
            try { fragment = decodeURIComponent(fragment); } catch (_) {}
            link.classList.toggle("is-active", fragment === id);
          });
        }
      }, { rootMargin: "-110px 0px -55% 0px" });
      headings.forEach(heading => observer.observe(heading));
    }
    links.forEach(link => link.addEventListener("click", () => { if (mobile.matches) toc.open = false; }));
  }
  $$(".prose pre").forEach(pre => {
    const code = $("code", pre);
    if (!code) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.textContent = "复制";
    button.setAttribute("aria-label", "复制代码");
    button.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(code.textContent); button.textContent = "已复制"; }
      catch (_) { button.textContent = "请手动复制"; }
      setTimeout(() => { button.textContent = "复制"; }, 1800);
    });
    pre.append(button);
  });
  $$(".mini-book-cover img, .book-cover img").forEach(image => {
    const loaded = () => image.parentElement.classList.add("is-cover-loaded");
    const failed = () => { image.hidden = true; image.parentElement.classList.add("is-cover-missing"); };
    image.addEventListener("load", loaded); image.addEventListener("error", failed);
    if (image.complete) { if (image.naturalWidth) loaded(); else failed(); }
  });
})();
