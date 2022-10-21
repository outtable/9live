function search(data) {
  let text = new URL(location.href).searchParams.get("q");
  let lang = new URL(location.href).searchParams.get("lang") || ui.lang;

  $("input[name='q']").val(text);

  let results = [];
  let regexp = new RegExp();
  try {
    regexp = new RegExp(text, "im");
  } catch (e) {
    $(".search-results .content").empty();
    $(".search-results .summary").html(ui.i18n.search_results_not_found);
    $(".search-results h2").html(ui.i18n.search_results);
    return debug(e.message);
  }

  function slice(content, min, max) {
    return content
      .slice(min, max)
      .replace(regexp, (match) => `<span class="bg-yellow">${match}</span>`);
  }
  for (page of data) {
    let [title, content] = [null, null];
    try {
      if (page.title) {
        title = page.title.match(regexp);
      } else {
        if (page.url == "/") {
          page.title = ui.title;
        } else {
          page.title = page.url;
        }
      }
    } catch (e) {
      debug(e.message);
    }
    try {
      if (page.content) {
        page.content = $("<div/>").html(page.content).text();
        content = page.content.match(regexp);
      }
    } catch (e) {
      debug(e.message);
    }
    if (title || content) {
      let result = [
        `<a href="${ui.baseurl}${page.url}?highlight=${text}">${page.title}</a>`,
      ];
      if (content) {
        let [min, max] = [content.index - 100, content.index + 100];
        let [prefix, suffix] = ["...", "..."];

        if (min < 0) {
          prefix = "";
          min = 0;
        }
        if (max > page.content.length) {
          suffix = "";
          max = page.content.length;
        }
        result.push(
          `<p class="text-gray">${prefix}${slice(
            page.content,
            min,
            max
          )}${suffix}</p>`
        );
      }
      results.push(`<li class="border-top py-4">${result.join("")}</li>`);
    }
  }
  if (results.length > 0 && text.length > 0) {
    $(".search-results .content").html(results.join(""));
    $(".search-results .summary").html(
      ui.i18n.search_results_found.replace("#", results.length)
    );
  } else {
    $(".search-results .content").empty();
    $(".search-results .summary").html(ui.i18n.search_results_not_found);
  }
  $(".search-results h2").html(ui.i18n.search_results);
}

function initialize(name) {
  let link = $(".toctree").find(`[href="${decodeURI(name)}"]`);

  if (link.length > 0) {
    $(".toctree .current").removeClass("current");
    link.addClass("current");
    link.closest(".level-1").parent().addClass("current");
    for (let i = 1; i <= 11; i++) {
      link.closest(`.level-${i}`).addClass("current");
    }
  }
}

function toggleCurrent(link) {
  let closest = link.closest("li");
  closest.siblings("li.current").removeClass("current");
  closest.siblings().find("li.current").removeClass("current");
  closest.find("> ul li.current").removeClass("current");
  closest.toggleClass("current");
}

function toc() {
  $(".toctree li.current")
    .append('<ul class="content-toc"></ul>')
    .html(function () {
      let level = parseInt(this.dataset.level);
      let temp = 0;
      let stack = [$(this).find(".content-toc")];

      $(".markdown-body")
        .find("h2,h3,h4,h5,h6")
        .each(function () {
          let anchor = $("<a/>")
            .addClass("d-flex flex-items-baseline")
            .text($(this).text())
            .attr("href", `#${this.id}`);
          let tagLevel = parseInt(this.tagName.slice(1)) - 1;

          if (tagLevel > temp) {
            let parent = stack[0].children("li:last")[0];
            if (parent) {
              stack.unshift($("<ul/>").appendTo(parent));
            }
          } else {
            stack.splice(
              0,
              Math.min(temp - tagLevel, Math.max(stack.length - 1, 0))
            );
          }
          temp = tagLevel;

          $("<li/>")
            .addClass(`toc level-${level + tagLevel}`)
            .append(anchor)
            .appendTo(stack[0]);
        });
      if (!stack[0].html()) {
        stack[0].remove();
      }
    });
}

function set(name, value) {
  return localStorage.setItem(name, value);
}

function get(name) {
  return localStorage.getItem(name) || false;
}

function debug() {
  console.debug.apply(console, arguments);
}

function restore() {
  let scroll = get("scroll");
  let scrollTime = get("scrollTime");
  let scrollHost = get("scrollHost");

  if (scroll && scrollTime && scrollHost) {
    if (scrollHost == location.host && Date.now() - scrollTime < 6e5) {
      $(".sidebar").scrollTop(scroll);
    }
  }
  $(".sidebar").scroll(function () {
    set("scroll", this.scrollTop);
    set("scrollTime", Date.now());
    set("scrollHost", location.host);
  });
}

function highlight() {
  let text = new URL(location.href).searchParams.get("highlight");

  if (text) {
    $(".markdown-body")
      .find("*")
      .each(function () {
        try {
          if (this.outerHTML.match(new RegExp(text, "im"))) {
            $(this).addClass("search-result");
            $(this).parentsUntil(".markdown-body").removeClass("search-result");
          }
        } catch (e) {
          debug(e.message);
        }
      });
    // last node
    $(".search-result").each(function () {
      $(this).html(function (i, html) {
        return html.replace(text, `<span class="bg-yellow">${text}</span>`);
      });
    });
    $(".search input").val(text);
  }
}

$(window).bind("hashchange", () =>
  initialize(location.hash || location.pathname)
);

$(document).on("scroll", function () {
  let start = $(this).scrollTop() + 5;
  let items = [];

  $(".markdown-body")
    .find("h1,h2,h3,h4,h5,h6")
    .each(function () {
      items.push({
        offset: $(this).offset().top,
        id: this.id,
        level: parseInt(this.tagName.slice(1)),
      });
    });
  for (let i = 0; i < items.length; i++) {
    if (start > items[i].offset) {
      if (i < items.length - 1) {
        if (start < items[i + 1].offset) {
          if (items[i].level == 1) {
            initialize(location.pathname);
          } else {
            initialize("#" + items[i].id);
          }
        }
      } else {
        initialize("#" + items[i].id);
      }
    }
  }
});

$("#toggle").click(function () {
  $(".sidebar-wrap,.content-wrap,.addons-wrap").toggleClass("shift");
});
$(".status").click(function () {
  $(".addons").toggleClass("d-none");
});

if (location.pathname == `${ui.baseurl}/search.html`) {
  $.ajax(`${ui.baseurl}/data.json`)
    .done(search)
    .fail((xhr, message) => debug(message));
}

toc();
initialize(location.pathname);
initialize(location.hash);
restore();
highlight();

/* nested ul */
$(".toc ul")
  .siblings("a")
  .each(function () {
    let link = $(this);
    let expand = $('<i class="fa fa-plus-square-o"></i>');

    expand.on("click", function (e) {
      e.stopPropagation();
      toggleCurrent(link);
      return false;
    });
    link.prepend(expand);
  });

$(".markdown-body :header").append(function () {
  return `<a href="#${this.id}" class="anchor"><i class="octicon-link fa fa-link text-blue"></i></a>`;
});

$("div.highlighter-rouge").each(function () {
  const match = $(this)
    .attr("class")
    .match(/language-(\w+)/);
  if (match) {
    $(this).attr("data-lang", match[1]);
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(`${ui.baseurl}/sw.caches.js`);
} else {
  debug("Service Worker not supported!");
}
