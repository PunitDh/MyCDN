class ElementCollection extends Array {
  ready(callback) {
    const isReady = this.some((e) => e.readyState && e.readyState != "loading");
    if (isReady) {
      callback();
    } else {
      this.on("DOMContentLoaded", callback);
    }
    return this;
  }

  on(event, callbackOrSelector, callback) {
    if (typeof callbackOrSelector === "function") {
      this.forEach((element) =>
        element.addEventListener(event, callbackOrSelector)
      );
    } else {
      this.forEach((element) => {
        element.addEventListener(event, (e) => {
          if (e.target.matches(callbackOrSelector)) callback(e);
        });
      });
    }
    return this;
  }

  click(callback) {
    this.forEach((element) => {
      element.addEventListener("click", callback);
    });
    return this;
  }

  next() {
    return this.map((e) => e.nextElementSibling).filter((e) => e);
  }

  prev() {
    return this.map((e) => e.previousElementSibling).filter((e) => e);
  }

  get children() {
    return this.map((e) => e.children).flat();
  }

  get childNodes() {
    return this.map((e) => e.childNodes).flat();
  }

  addClass(className) {
    this.forEach((e) => e.classList.add(className));
    return this;
  }

  toggleClass(className) {
    this.forEach((e) => e.classList.toggle(className));
    return this;
  }

  removeClass(className) {
    this.forEach((e) => e.classList.remove(className));
    return this;
  }

  value(value) {
    if (!value) {
      return this.map((e) => e.value);
    } else {
      this.forEach((e) => (e.value = value));
      return this;
    }
  }

  val(val) {
    return this.value(val);
  }

  caretPosition() {
    return this.map((e) => e.selectionStart);
  }

  css(property, value) {
    const camelProp = property.replace(/(-[a-z])/, (g) =>
      g.replace("-", "").toUpperCase()
    );
    this.forEach((e) => (e.style[camelProp] = value));
    return this;
  }

  html(html) {
    if (!html) {
      return this.map((e) => e.innerHTML);
    } else {
      this.forEach((e) => (e.innerHTML = html));
      return this;
    }
  }

  outerHTML(html) {
    if (!html) {
      return this.map((e) => e.outerHTML);
    } else {
      this.forEach((e) => (e.outerHTML = html));
      return this;
    }
  }

  indicesOf(element) {
    // TODO
    return this.map((e) => this.indexOf(e)).filter((e) => e);
  }

  text(content) {
    if (!content) {
      return this.map((e) => e.innerText);
    } else {
      this.forEach((e) => (e.innerText = content));
      return this;
    }
  }

  split(splitter) {
    this.forEach((e) => (e.innerHTML = e.innerHTML.split(splitter)));
    return this;
  }

  replace(element, string) {
    const replacedHTML = this.map((e) => e.replace(element, string)).flat();
    return replacedHTML;
  }

  trim() {
    this.forEach((e) => (e.innerHTML = e.innerHTML.trim()));
    return this;
  }

  match(selector) {
    return this.map((e) => e.match(selector)).flat();
  }

  each(callback) {
    this.forEach((e) => callback(e));
    return this;
  }

  replaceHTML(literals, vars) {
    this.forEach((e) => {
      literals.forEach((literal) => {
        replaceRecursively(e, literal, vars[literal.slice(2, -2)] || "");
      });
    });
    return this;
  }

  replaceLiterals(literals, vars) {
    this.map((e) => {
      literals.forEach((literal) => {
        e.replace(literal, vars[literal.slice(2, -2)] || "");
      });
    });

    return this;
  }

  setAttribute(attribute, value) {
    this.forEach((e) => e.setAttribute(attribute, value));
    return this;
  }

  getAttribute(attribute) {
    return this.map((e) => e.getAttribute(attribute));
  }

  get attributes() {
    return this.map((e) => e.attributes);
  }

  getAttributes() {
    return this.map((e) => e.attributes)
      .map((a) => Array.from(a))
      .flat();
  }

  toAttributesObject() {
    const vars = {};
    this.getAttributes().forEach((attribute) => {
      vars[attribute.name] = attribute.value;
    });
    return vars;
  }

  toObject() {
    return this.map((e) => e.toObject());
  }

  color(col) {
    if (!col) {
      return this.map((e) => getComputedStyle(e).color);
    } else {
      this.forEach((e) => (e.style.color = col));
      return this;
    }
  }

  display(display) {
    if (!display) {
      return this.map((e) => getComputedStyle(e).display);
    } else {
      this.forEach((e) => (e.style.display = display));
      return this;
    }
  }

  centerScreen() {
    this.display("flex")
      .alignItems("center")
      .justifyContent("center")
      .width("100vw")
      .height("100vh");
    return this;
  }

  margin(margin) {
    if (!margin) {
      return this.map((e) => getComputedStyle(e).margin);
    } else {
      this.forEach((e) => (e.style.margin = margin));
      return this;
    }
  }

  padding(padding) {
    if (!padding) {
      return this.map((e) => getComputedStyle(e).padding);
    } else {
      this.forEach((e) => (e.style.padding = padding));
      return this;
    }
  }

  hide() {
    this.forEach((e) => (e.style.display = "none"));
    return this;
  }

  alignItems(align) {
    this.forEach((e) => (e.style.alignItems = align));
    return this;
  }

  justifyContent(justify) {
    if (!justify) {
      return this.map((e) => getComputedStyle(e).justifyContent);
    } else {
      this.forEach((e) => (e.style.justifyContent = justify));
      return this;
    }
  }

  flexWrap(wrap) {
    this.forEach((e) => (e.style.flexWrap = wrap));
    return this;
  }

  flexDirection(direction) {
    if (!direction) {
      return this.map((e) => getComputedStyle(e).flexDirection);
    } else {
      this.forEach((e) => (e.style.flexDirection = direction));
      return this;
    }
  }

  flexRow() {
    this.flexDirection("row");
    return this;
  }

  flexColumn() {
    this.flexDirection("column");
    return this;
  }

  flexGrow(grow) {
    this.forEach((e) => (e.style.flexGrow = grow));
    return this;
  }

  flexShrink(shrink) {
    this.forEach((e) => (e.style.flexShrink = shrink));
    return this;
  }

  flexBasis(basis) {
    if (!basis) {
      return this.map((e) => getComputedStyle(e).flexBasis);
    } else {
      this.forEach((e) => (e.style.flexBasis = basis));
      return this;
    }
  }

  gap(gap) {
    if (!gap) {
      return this.map((e) => getComputedStyle(e).gap);
    } else {
      this.forEach((e) => (e.style.gap = gap));
      return this;
    }
  }

  position(pos) {
    if (!pos) {
      return this.map((e) => getComputedStyle(e).position);
    } else {
      this.forEach((e) => (e.style.position = pos));
      return this;
    }
  }

  getPosition() {
    return this.map((e) => [getComputedStyle(e).x, getComputedStyle(e).y]);
  }

  top(top) {
    if (!top) {
      return this.map((e) => getComputedStyle(e).top);
    } else {
      this.forEach((e) => (e.style.top = top));
      return this;
    }
  }

  left(left) {
    if (!left) {
      return this.map((e) => getComputedStyle(e).left);
    } else {
      this.forEach((e) => (e.style.left = left));
      return this;
    }
  }

  right(right) {
    if (!right) {
      return this.map((e) => getComputedStyle(e).right);
    } else {
      this.forEach((e) => (e.style.right = right));
      return this;
    }
  }

  bottom(bottom) {
    if (!bottom) {
      return this.map((e) => getComputedStyle(e).bottom);
    } else {
      this.forEach((e) => (e.style.bottom = bottom));
      return this;
    }
  }

  width(width) {
    if (!width) {
      return this.map((e) => getComputedStyle(e).width);
    } else {
      this.forEach((e) => (e.style.width = width));
      return this;
    }
  }

  height(height) {
    if (!height) {
      return this.map((e) => getComputedStyle(e).height);
    } else {
      this.forEach((e) => (e.style.height = height));
      return this;
    }
  }

  opacity(opacity) {
    if (!opacity) {
      return this.map((e) => getComputedStyle(e).opacity);
    } else {
      this.forEach((e) => (e.style.opacity = opacity));
      return this;
    }
  }

  background(background) {
    this.forEach((e) => (e.style.background = background));
    return this;
  }

  backgroundImage(backgroundImage) {
    this.forEach((e) => (e.style.backgroundImage = backgroundImage));
    return this;
  }

  backgroundSize(backgroundSize) {
    this.forEach((e) => (e.style.backgroundSize = backgroundSize));
    return this;
  }

  backgroundPosition(backgroundPosition) {
    this.forEach((e) => (e.style.backgroundPosition = backgroundPosition));
    return this;
  }

  backgroundRepeat(backgroundRepeat) {
    this.forEach((e) => (e.style.backgroundRepeat = backgroundRepeat));
    return this;
  }

  backgroundColor(backgroundColor) {
    this.forEach((e) => (e.style.backgroundColor = backgroundColor));
    return this;
  }

  bg(bg) {
    return this.background(bg);
  }

  bgColor(bg) {
    return this.backgroundColor(bg);
  }

  border(border) {
    this.forEach((e) => (e.style.border = border));
    return this;
  }

  borderTop(borderTop) {
    this.forEach((e) => (e.style.borderTop = borderTop));
    return this;
  }

  borderRight(borderRight) {
    this.forEach((e) => (e.style.borderRight = borderRight));
    return this;
  }

  borderBottom(borderBottom) {
    this.forEach((e) => (e.style.borderBottom = borderBottom));
    return this;
  }

  borderLeft(borderLeft) {
    this.forEach((e) => (e.style.borderLeft = borderLeft));
    return this;
  }

  borderColor(borderColor) {
    this.forEach((e) => (e.style.borderColor = borderColor));
    return this;
  }

  borderStyle(borderStyle) {
    this.forEach((e) => (e.style.borderStyle = borderStyle));
    return this;
  }

  borderWidth(borderWidth) {
    this.forEach((e) => (e.style.borderWidth = borderWidth));
    return this;
  }

  borderRadius(borderRadius) {
    this.forEach((e) => (e.style.borderRadius = borderRadius));
    return this;
  }

  boxShadow(boxShadow) {
    this.forEach((e) => (e.style.boxShadow = boxShadow));
    return this;
  }

  transform(transform) {
    this.forEach((e) => (e.style.transform = transform));
    return this;
  }

  transition(transition) {
    this.forEach((e) => (e.style.transition = transition));
    return this;
  }

  transitionDelay(transitionDelay) {
    this.forEach((e) => (e.style.transitionDelay = transitionDelay));
    return this;
  }

  transitionDuration(transitionDuration) {
    this.forEach((e) => (e.style.transitionDuration = transitionDuration));
    return this;
  }

  transitionProperty(transitionProperty) {
    this.forEach((e) => (e.style.transitionProperty = transitionProperty));
    return this;
  }

  transitionTimingFunction(transitionTimingFunction) {
    this.forEach(
      (e) => (e.style.transitionTimingFunction = transitionTimingFunction)
    );
    return this;
  }

  transformOrigin(transformOrigin) {
    this.forEach((e) => (e.style.transformOrigin = transformOrigin));
    return this;
  }

  transformStyle(transformStyle) {
    this.forEach((e) => (e.style.transformStyle = transformStyle));
    return this;
  }

  userSelect(userSelect) {
    if (!userSelect) {
      return this.map((e) => getComputedStyle(e).userSelect);
    } else {
      this.forEach((e) => (e.style.userSelect = userSelect));
      return this;
    }
  }

  cursor(cursor) {
    this.forEach((e) => (e.style.cursor = cursor));
    return this;
  }

  pointerEvents(pointerEvents) {
    this.forEach((e) => (e.style.pointerEvents = pointerEvents));
    return this;
  }

  visibility(visibility) {
    this.forEach((e) => (e.style.visibility = visibility));
    return this;
  }

  zIndex(zIndex) {
    this.forEach((e) => (e.style.zIndex = zIndex));
    return this;
  }

  textAlign(textAlign) {
    this.forEach((e) => (e.style.textAlign = textAlign));
    return this;
  }

  textDecoration(textDecoration) {
    this.forEach((e) => (e.style.textDecoration = textDecoration));
    return this;
  }

  textTransform(textTransform) {
    this.forEach((e) => (e.style.textTransform = textTransform));
    return this;
  }

  textOverflow(textOverflow) {
    this.forEach((e) => (e.style.textOverflow = textOverflow));
    return this;
  }

  textShadow(textShadow) {
    this.forEach((e) => (e.style.textShadow = textShadow));
    return this;
  }

  whiteSpace(whiteSpace) {
    this.forEach((e) => (e.style.whiteSpace = whiteSpace));
    return this;
  }

  wordBreak(wordBreak) {
    this.forEach((e) => (e.style.wordBreak = wordBreak));
    return this;
  }

  wordWrap(wordWrap) {
    this.forEach((e) => (e.style.wordWrap = wordWrap));
    return this;
  }

  wordSpacing(wordSpacing) {
    this.forEach((e) => (e.style.wordSpacing = wordSpacing));
    return this;
  }

  letterSpacing(letterSpacing) {
    this.forEach((e) => (e.style.letterSpacing = letterSpacing));
    return this;
  }

  lineHeight(lineHeight) {
    if (!lineHeight) {
      return this.map((e) => getComputedStyle(e).lineHeight);
    } else {
      this.forEach((e) => (e.style.lineHeight = lineHeight));
      return this;
    }
  }

  fontFamily(fontFamily) {
    if (!fontFamily) {
      return this.map((e) => getComputedStyle(e).fontFamily);
    } else {
      this.forEach((e) => (e.style.fontFamily = fontFamily));
      return this;
    }
  }

  fontSize(fontSize) {
    if (!fontSize) {
      return this.map((e) => getComputedStyle(e).fontSize);
    } else {
      this.forEach((e) => (e.style.fontSize = fontSize));
      return this;
    }
  }

  fontStyle(fontStyle) {
    this.forEach((e) => (e.style.fontStyle = fontStyle));
    return this;
  }

  fontWeight(fontWeight) {
    this.forEach((e) => (e.style.fontWeight = fontWeight));
    return this;
  }

  bold() {
    this.forEach((e) => (e.style.fontWeight = "bolder"));
    return this;
  }

  fontVariant(fontVariant) {
    this.forEach((e) => (e.style.fontVariant = fontVariant));
    return this;
  }

  font(font) {
    this.forEach((e) => (e.style.font = font));
    return this;
  }

  color(color) {
    if (!color) {
      return this.map((e) => getComputedStyle(e).color);
    } else {
      this.forEach((e) => (e.style.color = color));
      return this;
    }
  }

  getStyle() {
    const map = new Map();
    this.forEach((e) => map.set(e, e.style.cssText));
    return map;
  }

  device(device, orientation = "portrait", callback) {
    // window.addEventListener("resize", () => {
    //   if (window.matchMedia("(max-width: 700px)").matches) {
    //     console.log("mobile");
    //   }
    // });
    const getMediaQuery = (o) => {
      const orientation = o.toLowerCase();
      switch (device.toLowerCase()) {
        case "iphone": {
          if (orientation === "portrait") {
            return window.matchMedia(
              "(min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
            );
          } else if (orientation === "landscape") {
            return window.matchMedia(
              "(min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape)"
            );
          } else {
            return window.matchMedia(
              "(min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)"
            );
          }
        }
        case "ipad": {
          break;
        }
        case "galaxy": {
          break;
        }
        case "htc": {
          break;
        }
        case "google": {
          break;
        }
        case "samsung": {
        }
        case "nexus": {
          break;
        }
        case "tablet": {
          break;
        }
        case "desktop": {
          break;
        }
        case "laptop": {
          break;
        }
        case "mobile": {
          break;
        }
      }
    };
  }

  hover(hoverFunction, revertFunction) {
    const originalStyleMap = this.getStyle();
    this.forEach((e) => {
      e.addEventListener("mouseover", () => {
        hoverFunction(new ElementCollection(e));
      });
      e.addEventListener("mouseout", () => {
        if (revertFunction) {
          revertFunction(new ElementCollection(e));
        } else {
          e.style = originalStyleMap.get(e);
        }
      });
    });
    return this;
  }

  mouseOver(mouseOverFn, revertFunction) {
    return this.hover(mouseOverFn, revertFunction);
  }

  mouseOut(mouseOutFn, revertFunction) {
    this.forEach((e) => {
      e.addEventListener("mouseout", () => {
        mouseOutFn(new ElementCollection(e));
      });
    });
    return this;
  }

  tabIndex(tabIndex) {
    if (!tabIndex) {
      return this.map((e) => e.tabIndex);
    } else {
      this.forEach((e) => (e.tabIndex = tabIndex));
      return this;
    }
  }

  bgRed() {
    this.forEach((e) => (e.style.backgroundColor = "red"));
    return this;
  }

  bgGreen() {
    this.forEach((e) => (e.style.backgroundColor = "green"));
    return this;
  }

  bgBlue() {
    this.forEach((e) => (e.style.backgroundColor = "blue"));
    return this;
  }

  bgYellow() {
    this.forEach((e) => (e.style.backgroundColor = "yellow"));
    return this;
  }

  bgCyan() {
    this.forEach((e) => (e.style.backgroundColor = "cyan"));
    return this;
  }

  bgMagenta() {
    this.forEach((e) => (e.style.backgroundColor = "magenta"));
    return this;
  }

  bgWhite() {
    this.forEach((e) => (e.style.backgroundColor = "white"));
    return this;
  }

  bgBlack() {
    this.forEach((e) => (e.style.backgroundColor = "black"));
    return this;
  }

  bgGray() {
    this.forEach((e) => (e.style.backgroundColor = "gray"));
    return this;
  }

  red() {
    this.forEach((e) => (e.style.color = "red"));
    return this;
  }

  blue() {
    this.forEach((e) => (e.style.color = "blue"));
    return this;
  }

  green() {
    this.forEach((e) => (e.style.color = "green"));
    return this;
  }

  yellow() {
    this.forEach((e) => (e.style.color = "yellow"));
    return this;
  }

  orange() {
    this.forEach((e) => (e.style.color = "orange"));
    return this;
  }

  purple() {
    this.forEach((e) => (e.style.color = "purple"));
    return this;
  }

  pink() {
    this.forEach((e) => (e.style.color = "pink"));
    return this;
  }

  brown() {
    this.forEach((e) => (e.style.color = "brown"));
    return this;
  }

  black() {
    this.forEach((e) => (e.style.color = "black"));
    return this;
  }

  gray() {
    this.forEach((e) => (e.style.color = "gray"));
    return this;
  }

  white() {
    this.forEach((e) => (e.style.color = "white"));
    return this;
  }

  center() {
    this.forEach((e) => {
      if (e.style.display === "flex") {
        e.style.justifyContent = "center";
        e.style.alignItems = "center";
      } else {
        e.style.textAlign = "center";
      }
    });

    return this;
  }

  grid() {
    this.forEach((e) => (e.style.display = "grid"));
    return this;
  }

  flex() {
    this.forEach((e) => (e.style.display = "flex"));
    return this;
  }

  first() {
    return this[0];
  }

  second() {
    return this[1];
  }

  third() {
    return this[2];
  }

  fourth() {
    return this[3];
  }

  fifth() {
    return this[4];
  }

  sixth() {
    return this[5];
  }

  seventh() {
    return this[6];
  }

  eighth() {
    return this[7];
  }

  ninth() {
    return this[8];
  }

  tenth() {
    return this[9];
  }

  hundredth() {
    return this[99];
  }

  thousandth() {
    return this[999];
  }

  millionth() {
    return this[1000000 - 1];
  }

  last() {
    return this[this.length - 1];
  }
}

class AjaxPromise {
  constructor(promise) {
    this.promise = promise;
  }

  done(callback) {
    this.promise = this.promise.then((data) => {
      callback(data);
      return data;
    });
    return this;
  }

  fail(callback) {
    this.promise.catch(callback);
    return this;
  }

  always(callback) {
    this.promise.finally(callback);
    return this;
  }
}

function replaceRecursively(element, from, to) {
  if (element.childNodes.length) {
    element.childNodes.forEach((child) => replaceRecursively(child, from, to));
  } else {
    const cont = element.textContent;
    if (cont) element.textContent = cont.replace(from, to);
  }
}

function $() {
  let queryArgs = Array.from(arguments)
    .map((arg) =>
      typeof arg === "string" || arg instanceof String
        ? [...document.querySelectorAll(arg)]
        : arg
    )
    .flat();

  return new ElementCollection(...queryArgs);
}

$.get = function (
  url,
  query = {},
  success = () => {},
  dataType = "application/json"
) {
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return new AjaxPromise(
    fetch(`${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": dataType,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(res.status);
      })
      .then((data) => {
        success(data);
      })
  );
};

String.prototype.indicesOf = function (searchString, position = 0) {
  const indices = [];
  let index = -1;
  if (typeof searchString === "string" || searchString instanceof String) {
    while ((index = this.indexOf(searchString, index + 1)) !== -1) {
      indices.push(index);
    }
  } else if (searchString instanceof Array) {
    return searchString.map((string) => this.indexOf(string));
  } else if (searchString instanceof Object) {
    Object.keys(searchString).forEach((key) => {
      while ((index = this.indexOf(key, index + 1)) !== -1) {
        indices.push(index);
      }
    });
  }

  return indices;
};

Array.prototype.splitEach = function (separator) {
  return this.map((e) => e.split(separator));
};

Array.prototype.trimEach = function () {
  return this.map((e) => e.trim());
};

Array.prototype.joinEach = function (separator = "") {
  return this.map((e) => e.join(separator));
};

Array.prototype.first = function (operator) {
  // TODO
  if (this[0]) return this[0];
  else throw new Error("Null Pointer Exception");
};

Array.prototype.firstOrNull = function (operator) {
  // TODO
  return this[0] ? this[0] : null;
};

Array.prototype.second = function () {
  // TODO
  if (this[1]) return this[1];
  else throw new Error("Null Pointer Exception");
};

Array.prototype.secondOrNull = function (operator) {
  // TODO
  return this[1] ? this[1] : null;
};

Array.prototype.toUpperCase = function () {
  return this.map((elem) => elem.toUpperCase());
};

Array.prototype.toLowerCase = function () {
  return this.map((elem) => elem.toLowerCase());
};

Array.prototype.firstOfEach = function () {
  return this.map((elem) => elem[0]);
};

Object.prototype.keys = function () {
  return Object.keys(this);
};

Object.prototype.values = function () {
  return Object.values(this);
};

String.prototype.map = function (callback) {
  return this.split("")
    .map((elem) => callback(elem))
    .join("");
};

String.prototype.forEach = function (callback) {
  this.split("")
    .forEach((elem) => callback(elem))
    .join("");
};

String.prototype.charsAt = function (...indices) {
  return indices.map((index) => this[index]);
};

String.prototype.first = function () {
  return this.charAt(0);
};

String.prototype.capitalize = function (separator = " ") {
  const strings = this.split(separator);
  return strings
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(separator);
};

window.$ = $;
