"use strict";
const $ = (id) => document.getElementById(id);
let posts = [],
  current = null,
  read = [];
const get = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    $("notice").textContent = "This device cannot save reading progress.";
    return false;
  }
};
try {
  const data = JSON.parse(get("read") || "[]");
  if (Array.isArray(data)) read = data.filter((x) => typeof x === "string");
} catch {
  /* safe defaults */
}
const font = get("font");
if (["18", "22", "26"].includes(font)) {
  $("size").value = font;
  document.documentElement.style.fontSize = font + "px";
}
$("size").onchange = () => {
  document.documentElement.style.fontSize = $("size").value + "px";
  save("font", $("size").value);
};
function list() {
  const query = $("search").value.trim().toLocaleLowerCase();
  const matches = posts.filter((p) =>
    `${p.title} ${p.excerpt}`.toLocaleLowerCase().includes(query),
  );
  $("results").textContent = "";
  for (const post of matches) {
    const li = document.createElement("li"),
      button = document.createElement("button");
    button.textContent = `${post.order}. ${post.title}${read.includes(post.slug) ? " — read" : ""}`;
    button.onclick = () => {
      location.hash = post.slug;
    };
    li.append(button);
    $("results").append(li);
  }
  $("count").textContent = `${matches.length} lessons`;
}
function route() {
  let slug;
  try {
    slug = decodeURIComponent(location.hash.slice(1));
  } catch {
    slug = "";
  }
  current = posts.find((p) => p.slug === slug);
  $("library").hidden = !!current;
  $("lesson").hidden = !current;
  if (!current) {
    list();
    return;
  }
  save("last", current.slug);
  $("continue").hidden = false;
  $("continue").onclick = () => { location.hash = get("last") || ""; };
  $("title").textContent = current.title;
  $("body").textContent = "";
  $("notice").textContent = "";
  for (const block of current.body) {
    let el;
    if (block.type === "ul") {
      el = document.createElement("ul");
      for (const item of block.items) {
        const li = document.createElement("li");
        li.textContent = item;
        el.append(li);
      }
    } else if (block.type === "figure") {
      el = document.createElement("aside");
      el.textContent = `Picture description: ${block.alt}. ${block.caption} (Picture available in the online lesson.)`;
    } else {
      el = document.createElement(block.type === "h2" ? "h3" : "p");
      el.textContent = block.text;
    }
    $("body").append(el);
  }
  $("next").hidden = posts.indexOf(current) === posts.length - 1;
  $("title").focus();
  window.scrollTo(0, 0);
}
$("search").oninput = list;
$("back").onclick = () => {
  location.hash = "";
};
$("complete").onclick = () => {
  if (!current) return;
  if (!read.includes(current.slug)) read.push(current.slug);
  if (save("read", JSON.stringify(read)))
    $("notice").textContent = "Marked as read on this device.";
};
$("next").onclick = () => {
  const next = posts[posts.indexOf(current) + 1];
  if (next) location.hash = next.slug;
};
window.addEventListener("hashchange", route);
fetch("lessons.json")
  .then((r) => {
    if (!r.ok) throw new Error();
    return r.json();
  })
  .then((bundle) => {
    posts = bundle.posts.sort((a, b) => a.order - b.order);
    $("version").textContent =
      `Included with this app · updated ${bundle.updated}. Online lessons may be newer.`;
    const last = get("last");
    if (posts.some((p) => p.slug === last)) {
      $("continue").hidden = false;
      $("continue").onclick = () => {
        location.hash = last;
      };
    }
    route();
  })
  .catch(() => {
    $("count").textContent =
      "The lesson bundle could not be opened. Close and reopen the reader, or use the website when connected.";
  });
