$(document).ready(() => {
  const flex = $("flex");
  const fetcher = $("fetch");
  const vars = $("data").toAttributesObject();
  const bodyHTML = $(document.body).html();
  const regExp = /{{([^}]+)}}/g;
  const literals = bodyHTML.match(regExp);

  flex
    .flex()
    .flexDirection(flex.getAttribute("direction"))
    .justifyContent(flex.getAttribute("justify-content"))
    .alignItems(flex.getAttribute("align-items"));

  if (fetcher.length) {
    const fetchSrc = fetcher.getAttribute("src").first();
    const fetchLiterals = fetcher.html().match(regExp);
    $.get(fetchSrc, {}, function (data) {
      if (data instanceof Array) {
        const columns = fetchLiterals.map((column) =>
          column.replace(/{{|}}/g, "")
        );
        const mapper = $("fetch [map]");
        let finalRow = "";
        data.forEach((row) => {
          const v = {};
          columns.forEach((column) => {
            v[column] = row[column];
          });
          const rowData = mapper.outerHTML().map((ht) => {
            const keys = v.keys();
            keys.map((key) => {
              ht = ht.replace(`{{${key}}}`, v[key]);
              return ht;
            });
            return ht;
          });
          finalRow += rowData.join("");
        });
        mapper.outerHTML(finalRow);
      } else {
        const vars = {};
        fetchLiterals.forEach((literal) => {
          const key = literal.replace(/{{|}}/g, "");
          vars[key] = data[key];
        });
        fetchLiterals.forEach((literal) => {
          fetcher.html(
            fetcher.html().replace(literal, vars[literal.replace(/{{|}}/g, "")])
          );
        });
      }
    }).always(() => {
      $("body").replaceHTML(literals, vars);
    });
  } else {
    $("body").replaceHTML(literals, vars);
  }
});
