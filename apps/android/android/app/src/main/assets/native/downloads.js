(function () {
  if (window.__ceaDownloads) return;
  window.__ceaDownloads = true;
  const original = HTMLAnchorElement.prototype.click;
  function downloadable(a) {
    return a && a.download && (a.href.startsWith('blob:' + location.origin + '/') || a.href.startsWith('data:'));
  }
  async function save(a) {
    try {
      const blob = await (await fetch(a.href)).blob();
      if (blob.size > 10 * 1024 * 1024) throw new Error('This file is larger than 10 MB. Export it using the website instead.');
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      await window.Capacitor.nativePromise('CeaDocuments', 'save', { name: a.download, mime: blob.type.split(';')[0], base64 });
    } catch (error) { window.alert(error.message || 'Could not save the file. Please try again.'); }
  }
  HTMLAnchorElement.prototype.click = function () { if (downloadable(this)) { void save(this); return; } return original.call(this); };
  document.addEventListener('click', event => {
    const anchor = event.target.closest && event.target.closest('a[download]');
    if (downloadable(anchor)) { event.preventDefault(); event.stopImmediatePropagation(); void save(anchor); }
  }, true);
})();
