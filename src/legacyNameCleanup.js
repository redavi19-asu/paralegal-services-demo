const replacements = [
  ["Candice Paralegal", "Paralegal Services"],
  ["Candice is a detail-driven paralegal who prepares filings, organizes discovery, and keeps cases moving—so you can focus on outcomes.", "Detail-driven paralegal support that prepares filings, organizes discovery, and keeps cases moving—so you can focus on outcomes."],
  ["From intake to filing, Candice keeps every document and deadline in check.", "From intake to filing, every document and deadline stays organized and on track."],
  ["Message Candice…", "Message our team…"],
  ["Candice delivers it.", "Professional paralegal support delivers it."],
  ["Candice will reply with next steps and a simple checklist to get moving.", "Our team will reply with next steps and a simple checklist to get moving."],
  ["hello@candiceparalegal.example", "hello@paralegalservices.example"],
];

function cleanText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;
    replacements.forEach(([from, to]) => { text = text.replaceAll(from, to); });
    node.nodeValue = text;
    return;
  }
  node.childNodes?.forEach(cleanText);
}

function cleanAttributes(root = document) {
  root.querySelectorAll?.('[href*="candice"], [title*="Candice"], [aria-label*="Candice"]').forEach((el) => {
    for (const attr of ["href", "title", "aria-label"]) {
      const value = el.getAttribute(attr);
      if (!value) continue;
      let next = value;
      replacements.forEach(([from, to]) => { next = next.replaceAll(from, to).replaceAll(from.toLowerCase(), to.toLowerCase().replaceAll(" ", "")); });
      el.setAttribute(attr, next);
    }
  });
}

export function removeLegacyName() {
  cleanText(document.body);
  cleanAttributes();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach(cleanText));
    cleanAttributes();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
