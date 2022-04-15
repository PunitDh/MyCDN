$(document).ready(() => {
  const data = $("data").hide();

  const text = data
    .text()
    .replace(";", "")
    .split("\n")
    .trimEach()
    .filter((n) => n.length > 0);

  text
    .splitEach("=")
    .forEach((v) => data.setAttribute(v[0].trim(), v[1].trim()));

  let bodyHTML = $("body").html();

  const regExp = /{{([^}]+)}}/g;

  const literals = bodyHTML.match(regExp);

  literals.forEach((literal) => {
    bodyHTML = bodyHTML.replace(
      literal,
      eval(data.getAttribute(literal.slice(2, -2))) || ""
    ); //TODO Make this safeEval
  });

  function replaceRecursively(element, from, to) {
    if (element.childNodes.length) {
      element.childNodes.forEach((child) =>
        replaceRecursively(child, from, to)
      );
    } else {
      const cont = element.textContent;
      if (cont) element.textContent = cont.replace(from, to);
    }
  }

  literals.forEach((literal) => {
    replaceRecursively(
      document.body,
      literal,
      eval(data.getAttribute(literal.slice(2, -2))) || ""
    );
  });

  const flex = $("flex");

  flex
    .flex()
    .flexDirection(flex.getAttribute("direction"))
    .justifyContent(flex.getAttribute("justify-content"))
    .alignItems(flex.getAttribute("align-items"));
});
