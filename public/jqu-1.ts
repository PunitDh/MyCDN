type GlobalValues = "inherit" | "initial" | "revert" | "revert-layer" | "unset";

type FlexGrow = number | GlobalValues;

type BGRepeat =
  | "repeat-x"
  | "repeat-y"
  | "repeat"
  | "space"
  | "round"
  | "no-repeat";

type BackgroundRepeat = `${BGRepeat} ${BGRepeat}`;

type FontStyle = "normal" | "italic" | "oblique" | `oblique ${number}deg`;

type Display =
  | "block"
  | "inline"
  | "inline-block"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline-grid"
  | "flow-root"
  | "none"
  | "contents"
  | "block flex"
  | "block flow"
  | "block flow-root"
  | "block grid"
  | "inline flex"
  | "inline flow"
  | "inline flow-root"
  | "inline grid"
  | "table"
  | "table-row"
  | "list-item"
  | GlobalValues;

class ElementCollection extends Array {
  ready(callback: () => unknown) {
    const isReady = this.some((e) => e.readyState && e.readyState != "loading");
    if (isReady) {
      callback();
    } else {
      this.on("DOMContentLoaded", callback);
    }
    return this;
  }

  on(event: string, callbackOrSelector: () => unknown, callback?: () => void) {
    if (typeof callbackOrSelector === "function") {
      this.forEach((element) =>
        element.addEventListener(event, callbackOrSelector)
      );
    } else {
      this.forEach((element) => {
        element.addEventListener(event, (e) => {
          if (e.target.matches(callbackOrSelector)) callback!(e);
        });
      });
    }
    return this;
  }

  click(callback: () => void) {
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

  addClass(className: string) {
    this.forEach((e) => e.classList.add(className));
    return this;
  }

  toggleClass(className: string) {
    this.forEach((e) => e.classList.toggle(className));
    return this;
  }

  removeClass(className: string) {
    this.forEach((e) => e.classList.remove(className));
    return this;
  }

  value(value: string) {
    if (!value) {
      return this.map((e) => e.value);
    } else {
      this.forEach((e) => (e.value = value));
      return this;
    }
  }

  val(val: string) {
    return this.value(val);
  }

  caretPosition() {
    return this.map((e) => e.selectionStart);
  }

  css(property: string, value: string) {
    const camelProp = property.replace(/(-[a-z])/, (g) =>
      g.replace("-", "").toUpperCase()
    );
    this.forEach((e) => (e.style[camelProp] = value));
    return this;
  }

  html(html: string) {
    if (!html) {
      return this.map((e) => e.innerHTML);
    } else {
      this.forEach((e) => (e.innerHTML = html));
      return this;
    }
  }

  outerHTML(html: string) {
    if (!html) {
      return this.map((e) => e.outerHTML);
    } else {
      this.forEach((e) => (e.outerHTML = html));
      return this;
    }
  }

  indicesOf(element: string) {
    // TODO
    return this.map((e) => this.indexOf(e)).filter((e) => e);
  }

  text(content: string) {
    if (!content) {
      return this.map((e) => e.innerText);
    } else {
      this.forEach((e) => (e.innerText = content));
      return this;
    }
  }

  split(splitter: string) {
    this.forEach((e) => (e.innerHTML = e.innerHTML.split(splitter)));
    return this;
  }

  replace(element, string: string) {
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

  each(callback: (element: HTMLElement) => void) {
    this.forEach((e) => callback(e));
    return this;
  }

  replaceHTML(literals: string[], vars) {
    this.forEach((e) => {
      literals.forEach((literal) => {
        replaceRecursively(e, literal, vars[literal.slice(2, -2)] || "");
      });
    });
    return this;
  }

  replaceLiterals(literals: string[], vars) {
    this.map((e) => {
      literals.forEach((literal) => {
        e.replace(literal, vars[literal.slice(2, -2)] || "");
      });
    });

    return this;
  }

  setAttribute(attribute: string, value: string) {
    this.forEach((e) => e.setAttribute(attribute, value));
    return this;
  }

  getAttribute(attribute: string) {
    return this.map((e) => e.getAttribute(attribute));
  }

  get attributes() {
    return this.map((e: HTMLElement) => e.attributes);
  }

  getAttributes() {
    return this.map((e: HTMLElement) => e.attributes)
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
    return this.map((e) => Object.fromEntries(e));
  }

  display(display: Display): Display[] | ElementCollection {
    if (!display) {
      return this.map((e) => getComputedStyle(e).display as Display);
    } else {
      this.forEach((e: HTMLElement) => (e.style.display = display));
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

  paddingLeft(padding) {
    if (!padding) {
      return this.map((e) => getComputedStyle(e).paddingLeft);
    } else {
      this.forEach((e) => (e.style.paddingLeft = padding));
      return this;
    }
  }

  paddingRight(padding) {
    if (!padding) {
      return this.map((e) => getComputedStyle(e).paddingRight);
    } else {
      this.forEach((e) => (e.style.paddingRight = padding));
      return this;
    }
  }

  paddingTop(padding) {
    if (!padding) {
      return this.map((e) => getComputedStyle(e).paddingTop);
    } else {
      this.forEach((e) => (e.style.paddingTop = padding));
      return this;
    }
  }

  paddingBottom(padding) {
    if (!padding) {
      return this.map((e) => getComputedStyle(e).paddingBottom);
    } else {
      this.forEach((e) => (e.style.paddingBottom = padding));
      return this;
    }
  }

  hide() {
    this.forEach((e) => (e.style.display = "none"));
    return this;
  }

  alignItems(
    align:
      | "normal"
      | "stretch"
      | "center"
      | "start"
      | "end"
      | "flex-start"
      | "flex-end"
      | "self-start"
      | "self-end"
      | "baseline"
      | "first baseline"
      | "last baseline"
      | "safe center"
      | "unsafe center"
      | GlobalValues
  ) {
    if (!align) {
      return this.map((e) => getComputedStyle(e).alignItems);
    } else {
      this.forEach((e) => (e.style.alignItems = align));
      return this;
    }
  }

  justifyContent(justify) {
    if (!justify) {
      return this.map((e) => getComputedStyle(e).justifyContent);
    } else {
      this.forEach((e) => (e.style.justifyContent = justify));
      return this;
    }
  }

  flexWrap(wrap: "nowrap" | "wrap" | "wrap-reverse") {
    this.forEach((e) => (e.style.flexWrap = wrap));
    return this;
  }

  flexDirection(
    direction: "row" | "row-reverse" | "column" | "column-reverse"
  ) {
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

  flexGrow(grow: FlexGrow) {
    this.forEach((e) => (e.style.flexGrow = grow));
    return this;
  }

  flexShrink(shrink: FlexGrow) {
    this.forEach((e) => (e.style.flexShrink = shrink));
    return this;
  }

  flexBasis(basis: string) {
    if (!basis) {
      return this.map((e) => getComputedStyle(e).flexBasis);
    } else {
      this.forEach((e) => (e.style.flexBasis = basis));
      return this;
    }
  }

  gap(gap: string) {
    if (!gap) {
      return this.map((e) => getComputedStyle(e).gap);
    } else {
      this.forEach((e) => (e.style.gap = gap));
      return this;
    }
  }

  position(
    pos: "static" | "relative" | "absolute" | "fixed" | "sticky" | GlobalValues
  ) {
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

  top(top: string) {
    if (!top) {
      return this.map((e) => getComputedStyle(e).top);
    } else {
      this.forEach((e) => (e.style.top = top));
      return this;
    }
  }

  left(left: string) {
    if (!left) {
      return this.map((e) => getComputedStyle(e).left);
    } else {
      this.forEach((e) => (e.style.left = left));
      return this;
    }
  }

  right(right: string) {
    if (!right) {
      return this.map((e) => getComputedStyle(e).right);
    } else {
      this.forEach((e) => (e.style.right = right));
      return this;
    }
  }

  bottom(bottom: string) {
    if (!bottom) {
      return this.map((e) => getComputedStyle(e).bottom);
    } else {
      this.forEach((e) => (e.style.bottom = bottom));
      return this;
    }
  }

  width(width: string) {
    if (!width) {
      return this.map((e) => getComputedStyle(e).width);
    } else {
      this.forEach((e) => (e.style.width = width));
      return this;
    }
  }

  height(height: string) {
    if (!height) {
      return this.map((e) => getComputedStyle(e).height);
    } else {
      this.forEach((e) => (e.style.height = height));
      return this;
    }
  }

  opacity(opacity: number) {
    if (!opacity) {
      return this.map((e) => getComputedStyle(e).opacity);
    } else {
      this.forEach((e) => (e.style.opacity = opacity));
      return this;
    }
  }

  background(background: string) {
    this.forEach((e) => (e.style.background = background));
    return this;
  }

  backgroundImage(backgroundImage: string) {
    this.forEach((e) => (e.style.backgroundImage = backgroundImage));
    return this;
  }

  backgroundSize(backgroundSize: string) {
    this.forEach((e) => (e.style.backgroundSize = backgroundSize));
    return this;
  }

  backgroundPosition(backgroundPosition: string) {
    this.forEach((e) => (e.style.backgroundPosition = backgroundPosition));
    return this;
  }

  backgroundRepeat(backgroundRepeat: BackgroundRepeat) {
    this.forEach((e) => (e.style.backgroundRepeat = backgroundRepeat));
    return this;
  }

  backgroundColor(backgroundColor: string) {
    this.forEach((e) => (e.style.backgroundColor = backgroundColor));
    return this;
  }

  bg(bg: string) {
    return this.background(bg);
  }

  bgColor(bg: string) {
    return this.backgroundColor(bg);
  }

  border(border: string) {
    this.forEach((e) => (e.style.border = border));
    return this;
  }

  borderTop(borderTop: string) {
    this.forEach((e) => (e.style.borderTop = borderTop));
    return this;
  }

  borderRight(borderRight: string) {
    this.forEach((e) => (e.style.borderRight = borderRight));
    return this;
  }

  borderBottom(borderBottom: string) {
    this.forEach((e) => (e.style.borderBottom = borderBottom));
    return this;
  }

  borderLeft(borderLeft: string) {
    this.forEach((e) => (e.style.borderLeft = borderLeft));
    return this;
  }

  borderColor(borderColor: string) {
    this.forEach((e) => (e.style.borderColor = borderColor));
    return this;
  }

  borderStyle(borderStyle: string) {
    this.forEach((e) => (e.style.borderStyle = borderStyle));
    return this;
  }

  borderWidth(borderWidth: string) {
    this.forEach((e) => (e.style.borderWidth = borderWidth));
    return this;
  }

  borderRadius(borderRadius: string) {
    this.forEach((e) => (e.style.borderRadius = borderRadius));
    return this;
  }

  boxShadow(boxShadow: string) {
    this.forEach((e) => (e.style.boxShadow = boxShadow));
    return this;
  }

  transform(transform: string) {
    this.forEach((e) => (e.style.transform = transform));
    return this;
  }

  transition(transition: string) {
    this.forEach((e) => (e.style.transition = transition));
    return this;
  }

  transitionDelay(transitionDelay: string) {
    this.forEach((e) => (e.style.transitionDelay = transitionDelay));
    return this;
  }

  transitionDuration(transitionDuration: string) {
    this.forEach((e) => (e.style.transitionDuration = transitionDuration));
    return this;
  }

  transitionProperty(transitionProperty: string) {
    this.forEach((e) => (e.style.transitionProperty = transitionProperty));
    return this;
  }

  transitionTimingFunction(transitionTimingFunction: string) {
    this.forEach(
      (e) => (e.style.transitionTimingFunction = transitionTimingFunction)
    );
    return this;
  }

  transformOrigin(transformOrigin: string) {
    this.forEach((e) => (e.style.transformOrigin = transformOrigin));
    return this;
  }

  transformStyle(transformStyle: "flat" | "preserve-3d" | GlobalValues) {
    this.forEach((e) => (e.style.transformStyle = transformStyle));
    return this;
  }

  userSelect(userSelect: string) {
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

  pointerEvents(
    pointerEvents:
      | "auto"
      | "none"
      | "visiblePainted"
      | "visibleFill"
      | "visibleStroke"
      | "visible"
      | "painted"
      | "fill"
      | "stroke"
      | "all"
      | GlobalValues
  ) {
    this.forEach((e) => (e.style.pointerEvents = pointerEvents));
    return this;
  }

  visibility(visibility: "visible" | "hidden" | "collapse" | GlobalValues) {
    this.forEach((e) => (e.style.visibility = visibility));
    return this;
  }

  zIndex(zIndex: number) {
    this.forEach((e) => (e.style.zIndex = zIndex));
    return this;
  }

  textAlign(
    textAlign:
      | "start"
      | "end"
      | "left"
      | "right"
      | "center"
      | "justify"
      | "justify-all"
      | "match-parent"
      | GlobalValues
      | "-moz-center"
      | "-webkit-center"
  ) {
    this.forEach((e) => (e.style.textAlign = textAlign));
    return this;
  }

  textDecoration(
    textDecoration: "underline" | "overline red" | "none" | GlobalValues
  ) {
    this.forEach((e) => (e.style.textDecoration = textDecoration));
    return this;
  }

  textTransform(
    textTransform:
      | "none"
      | "capitalize"
      | "uppercase"
      | "lowercase"
      | "full-width"
      | "full-size-kana"
      | GlobalValues
  ) {
    this.forEach((e) => (e.style.textTransform = textTransform));
    return this;
  }

  textOverflow(textOverflow: string) {
    this.forEach((e) => (e.style.textOverflow = textOverflow));
    return this;
  }

  textShadow(textShadow: string) {
    this.forEach((e) => (e.style.textShadow = textShadow));
    return this;
  }

  whiteSpace(
    whiteSpace:
      | "normal"
      | "nowrap"
      | "pre"
      | "pre-wrap"
      | "pre-line"
      | "break-spaces"
      | "collapse balance"
      | "preserve nowrap"
      | GlobalValues
  ) {
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

  fontSize(fontSize: string) {
    if (!fontSize) {
      return this.map((e) => getComputedStyle(e).fontSize);
    } else {
      this.forEach((e) => (e.style.fontSize = fontSize));
      return this;
    }
  }

  fontStyle(fontStyle: FontStyle) {
    this.forEach((e) => (e.style.fontStyle = fontStyle));
    return this;
  }

  fontWeight(fontWeight: string | number) {
    this.forEach((e) => (e.style.fontWeight = fontWeight));
    return this;
  }

  bold() {
    this.forEach((e) => (e.style.fontWeight = "bolder"));
    return this;
  }

  fontVariant(
    fontVariant: "small-caps" | "common-ligatures small-caps" | GlobalValues
  ) {
    this.forEach((e) => (e.style.fontVariant = fontVariant));
    return this;
  }

  font(font: string) {
    this.forEach((e) => (e.style.font = font));
    return this;
  }

  color(color: string) {
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

  device(
    device:
      | "iphone"
      | "ipad"
      | "galaxy"
      | "htc"
      | "google"
      | "samsung"
      | "nexus"
      | "tablet"
      | "desktop"
      | "laptop"
      | "mobile",
    orientation: "portrait" | "landscape" = "portrait",
    callback: () => void
  ) {
    // window.addEventListener("resize", () => {
    //   if (window.matchMedia("(max-width: 700px)").matches) {
    //     console.log("mobile");
    //   }
    // });
    const getMediaQuery = (o: "portrait" | "landscape") => {
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

  hover(
    hoverFunction: (collection: ElementCollection) => void,
    revertFunction: (collection: ElementCollection) => void
  ) {
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

  mouseOver(
    mouseOverFn: (collection: ElementCollection) => void,
    revertFunction: (collection: ElementCollection) => void
  ) {
    return this.hover(mouseOverFn, revertFunction);
  }

  mouseOut(
    mouseOutFn: (collection: ElementCollection) => void,
    revertFunction: (collection: ElementCollection) => void
  ) {
    this.forEach((e) => {
      e.addEventListener("mouseout", () => {
        mouseOutFn(new ElementCollection(e));
      });
    });
    return this;
  }

  tabIndex(tabIndex: number) {
    if (!tabIndex) {
      return this.map((e) => e.tabIndex);
    } else {
      this.forEach((e) => (e.tabIndex = tabIndex));
      return this;
    }
  }

  bgAliceBlue() {
    this.forEach((e) => (e.style.backgroundColor = "aliceblue"));
    return this;
  }

  bgAntiqueWhite() {
    this.forEach((e) => (e.style.backgroundColor = "antiquewhite"));
    return this;
  }

  bgAqua() {
    this.forEach((e) => (e.style.backgroundColor = "aqua"));
    return this;
  }

  bgAquamarine() {
    this.forEach((e) => (e.style.backgroundColor = "aquamarine"));
    return this;
  }

  bgAzure() {
    this.forEach((e) => (e.style.backgroundColor = "azure"));
    return this;
  }

  bgBeige() {
    this.forEach((e) => (e.style.backgroundColor = "beige"));
    return this;
  }

  bgBisque() {
    this.forEach((e) => (e.style.backgroundColor = "bisque"));
    return this;
  }

  bgBlack() {
    this.forEach((e) => (e.style.backgroundColor = "black"));
    return this;
  }

  bgBlanchedAlmond() {
    this.forEach((e) => (e.style.backgroundColor = "blanchedalmond"));
    return this;
  }

  bgBlue() {
    this.forEach((e) => (e.style.backgroundColor = "blue"));
    return this;
  }

  bgBlueViolet() {
    this.forEach((e) => (e.style.backgroundColor = "blueviolet"));
    return this;
  }

  bgBrown() {
    this.forEach((e) => (e.style.backgroundColor = "brown"));
    return this;
  }

  bgBurlyWood() {
    this.forEach((e) => (e.style.backgroundColor = "burlywood"));
    return this;
  }

  bgCadetBlue() {
    this.forEach((e) => (e.style.backgroundColor = "cadetblue"));
    return this;
  }

  bgChartreuse() {
    this.forEach((e) => (e.style.backgroundColor = "chartreuse"));
    return this;
  }

  bgChocolate() {
    this.forEach((e) => (e.style.backgroundColor = "chocolate"));
    return this;
  }

  bgCoral() {
    this.forEach((e) => (e.style.backgroundColor = "coral"));
    return this;
  }

  bgCornflowerBlue() {
    this.forEach((e) => (e.style.backgroundColor = "cornflowerblue"));
    return this;
  }

  bgCornsilk() {
    this.forEach((e) => (e.style.backgroundColor = "cornsilk"));
    return this;
  }

  bgCrimson() {
    this.forEach((e) => (e.style.backgroundColor = "crimson"));
    return this;
  }

  bgCyan() {
    this.forEach((e) => (e.style.backgroundColor = "cyan"));
    return this;
  }

  bgDarkBlue() {
    this.forEach((e) => (e.style.backgroundColor = "darkblue"));
    return this;
  }

  bgDarkCyan() {
    this.forEach((e) => (e.style.backgroundColor = "darkcyan"));
    return this;
  }

  bgDarkGoldenRod() {
    this.forEach((e) => (e.style.backgroundColor = "darkgoldenrod"));
    return this;
  }

  bgDarkGrey() {
    this.forEach((e) => (e.style.backgroundColor = "darkgrey"));
    return this;
  }

  bgDarkGreen() {
    this.forEach((e) => (e.style.backgroundColor = "darkgreen"));
    return this;
  }

  bgDarkKhaki() {
    this.forEach((e) => (e.style.backgroundColor = "darkkhaki"));
    return this;
  }

  bgDarkMagenta() {
    this.forEach((e) => (e.style.backgroundColor = "darkmagenta"));
    return this;
  }

  bgDarkOliveGreen() {
    this.forEach((e) => (e.style.backgroundColor = "darkolivegreen"));
    return this;
  }

  bgDarkorange() {
    this.forEach((e) => (e.style.backgroundColor = "darkorange"));
    return this;
  }

  bgDarkOrchid() {
    this.forEach((e) => (e.style.backgroundColor = "darkorchid"));
    return this;
  }

  bgDarkRed() {
    this.forEach((e) => (e.style.backgroundColor = "darkred"));
    return this;
  }

  bgDarkSalmon() {
    this.forEach((e) => (e.style.backgroundColor = "darksalmon"));
    return this;
  }

  bgDarkSeaGreen() {
    this.forEach((e) => (e.style.backgroundColor = "darkseagreen"));
    return this;
  }

  bgDarkSlateBlue() {
    this.forEach((e) => (e.style.backgroundColor = "darkslateblue"));
    return this;
  }

  bgDarkSlateGrey() {
    this.forEach((e) => (e.style.backgroundColor = "darkslategrey"));
    return this;
  }

  bgDarkTurquoise() {
    this.forEach((e) => (e.style.backgroundColor = "darkturquoise"));
    return this;
  }

  bgDarkViolet() {
    this.forEach((e) => (e.style.backgroundColor = "darkviolet"));
    return this;
  }

  bgDeepPink() {
    this.forEach((e) => (e.style.backgroundColor = "deeppink"));
    return this;
  }

  bgDeepSkyBlue() {
    this.forEach((e) => (e.style.backgroundColor = "deepskyblue"));
    return this;
  }

  bgDimGray() {
    this.forEach((e) => (e.style.backgroundColor = "dimgray"));
    return this;
  }

  bgDodgerBlue() {
    this.forEach((e) => (e.style.backgroundColor = "dodgerblue"));
    return this;
  }

  bgFireBrick() {
    this.forEach((e) => (e.style.backgroundColor = "firebrick"));
    return this;
  }

  bgFloralWhite() {
    this.forEach((e) => (e.style.backgroundColor = "floralwhite"));
    return this;
  }

  bgForestGreen() {
    this.forEach((e) => (e.style.backgroundColor = "forestgreen"));
    return this;
  }

  bgFuchsia() {
    this.forEach((e) => (e.style.backgroundColor = "fuchsia"));
    return this;
  }

  bgGainsboro() {
    this.forEach((e) => (e.style.backgroundColor = "gainsboro"));
    return this;
  }

  bgGhostWhite() {
    this.forEach((e) => (e.style.backgroundColor = "ghostwhite"));
    return this;
  }

  bgGold() {
    this.forEach((e) => (e.style.backgroundColor = "gold"));
    return this;
  }

  bgGoldenRod() {
    this.forEach((e) => (e.style.backgroundColor = "goldenrod"));
    return this;
  }

  bgGrey() {
    this.forEach((e) => (e.style.backgroundColor = "grey"));
    return this;
  }

  bgGreen() {
    this.forEach((e) => (e.style.backgroundColor = "green"));
    return this;
  }

  bgGreenYellow() {
    this.forEach((e) => (e.style.backgroundColor = "greenyellow"));
    return this;
  }

  bgHoneyDew() {
    this.forEach((e) => (e.style.backgroundColor = "honeydew"));
    return this;
  }

  bgHotPink() {
    this.forEach((e) => (e.style.backgroundColor = "hotpink"));
    return this;
  }

  bgIndianRed() {
    this.forEach((e) => (e.style.backgroundColor = "indianred"));
    return this;
  }

  bgIndigo() {
    this.forEach((e) => (e.style.backgroundColor = "indigo"));
    return this;
  }

  bgIvory() {
    this.forEach((e) => (e.style.backgroundColor = "ivory"));
    return this;
  }

  bgKhaki() {
    this.forEach((e) => (e.style.backgroundColor = "khaki"));
    return this;
  }

  bgLavender() {
    this.forEach((e) => (e.style.backgroundColor = "lavender"));
    return this;
  }

  bgLavenderBlush() {
    this.forEach((e) => (e.style.backgroundColor = "lavenderblush"));
    return this;
  }

  bgLawnGreen() {
    this.forEach((e) => (e.style.backgroundColor = "lawngreen"));
    return this;
  }

  bgLemonChiffon() {
    this.forEach((e) => (e.style.backgroundColor = "lemonchiffon"));
    return this;
  }

  bgLightBlue() {
    this.forEach((e) => (e.style.backgroundColor = "lightblue"));
    return this;
  }

  bgLightCoral() {
    this.forEach((e) => (e.style.backgroundColor = "lightcoral"));
    return this;
  }

  bgLightCyan() {
    this.forEach((e) => (e.style.backgroundColor = "lightcyan"));
    return this;
  }

  bgLightGoldenRodYellow() {
    this.forEach((e) => (e.style.backgroundColor = "lightgoldenrodyellow"));
    return this;
  }

  bgLightGrey() {
    this.forEach((e) => (e.style.backgroundColor = "lightgrey"));
    return this;
  }

  bgLightGreen() {
    this.forEach((e) => (e.style.backgroundColor = "lightgreen"));
    return this;
  }

  bgLightPink() {
    this.forEach((e) => (e.style.backgroundColor = "lightpink"));
    return this;
  }

  bgLightSalmon() {
    this.forEach((e) => (e.style.backgroundColor = "lightsalmon"));
    return this;
  }

  bgLightSeaGreen() {
    this.forEach((e) => (e.style.backgroundColor = "lightseagreen"));
    return this;
  }

  bgLightSkyBlue() {
    this.forEach((e) => (e.style.backgroundColor = "lightskyblue"));
    return this;
  }

  bgLightSlateGrey() {
    this.forEach((e) => (e.style.backgroundColor = "lightslategrey"));
    return this;
  }

  bgLightSteelBlue() {
    this.forEach((e) => (e.style.backgroundColor = "lightsteelblue"));
    return this;
  }

  bgLightYellow() {
    this.forEach((e) => (e.style.backgroundColor = "lightyellow"));
    return this;
  }

  bgLime() {
    this.forEach((e) => (e.style.backgroundColor = "lime"));
    return this;
  }

  bgLimeGreen() {
    this.forEach((e) => (e.style.backgroundColor = "limegreen"));
    return this;
  }

  bgLinen() {
    this.forEach((e) => (e.style.backgroundColor = "linen"));
    return this;
  }

  bgMagenta() {
    this.forEach((e) => (e.style.backgroundColor = "magenta"));
    return this;
  }

  bgMaroon() {
    this.forEach((e) => (e.style.backgroundColor = "maroon"));
    return this;
  }

  bgMediumAquaMarine() {
    this.forEach((e) => (e.style.backgroundColor = "mediumaquamarine"));
    return this;
  }

  bgMediumBlue() {
    this.forEach((e) => (e.style.backgroundColor = "mediumblue"));
    return this;
  }

  bgMediumOrchid() {
    this.forEach((e) => (e.style.backgroundColor = "mediumorchid"));
    return this;
  }

  bgMediumPurple() {
    this.forEach((e) => (e.style.backgroundColor = "mediumpurple"));
    return this;
  }

  bgMediumSeaGreen() {
    this.forEach((e) => (e.style.backgroundColor = "mediumseagreen"));
    return this;
  }

  bgMediumSlateBlue() {
    this.forEach((e) => (e.style.backgroundColor = "mediumslateblue"));
    return this;
  }

  bgMediumSpringGreen() {
    this.forEach((e) => (e.style.backgroundColor = "mediumspringgreen"));
    return this;
  }

  bgMediumTurquoise() {
    this.forEach((e) => (e.style.backgroundColor = "mediumturquoise"));
    return this;
  }

  bgMediumVioletRed() {
    this.forEach((e) => (e.style.backgroundColor = "mediumvioletred"));
    return this;
  }

  bgMidnightBlue() {
    this.forEach((e) => (e.style.backgroundColor = "midnightblue"));
    return this;
  }

  bgMintCream() {
    this.forEach((e) => (e.style.backgroundColor = "mintcream"));
    return this;
  }

  bgMistyRose() {
    this.forEach((e) => (e.style.backgroundColor = "mistyrose"));
    return this;
  }

  bgMoccasin() {
    this.forEach((e) => (e.style.backgroundColor = "moccasin"));
    return this;
  }

  bgNavajoWhite() {
    this.forEach((e) => (e.style.backgroundColor = "navajowhite"));
    return this;
  }

  bgNavy() {
    this.forEach((e) => (e.style.backgroundColor = "navy"));
    return this;
  }

  bgOldLace() {
    this.forEach((e) => (e.style.backgroundColor = "oldlace"));
    return this;
  }

  bgOlive() {
    this.forEach((e) => (e.style.backgroundColor = "olive"));
    return this;
  }

  bgOliveDrab() {
    this.forEach((e) => (e.style.backgroundColor = "olivedrab"));
    return this;
  }

  bgOrange() {
    this.forEach((e) => (e.style.backgroundColor = "orange"));
    return this;
  }

  bgOrangeRed() {
    this.forEach((e) => (e.style.backgroundColor = "orangered"));
    return this;
  }

  bgOrchid() {
    this.forEach((e) => (e.style.backgroundColor = "orchid"));
    return this;
  }

  bgPaleGoldenRod() {
    this.forEach((e) => (e.style.backgroundColor = "palegoldenrod"));
    return this;
  }

  bgPaleGreen() {
    this.forEach((e) => (e.style.backgroundColor = "palegreen"));
    return this;
  }

  bgPaleTurquoise() {
    this.forEach((e) => (e.style.backgroundColor = "paleturquoise"));
    return this;
  }

  bgPaleVioletRed() {
    this.forEach((e) => (e.style.backgroundColor = "palevioletred"));
    return this;
  }

  bgPapayaWhip() {
    this.forEach((e) => (e.style.backgroundColor = "papayawhip"));
    return this;
  }

  bgPeachPuff() {
    this.forEach((e) => (e.style.backgroundColor = "peachpuff"));
    return this;
  }

  bgPeru() {
    this.forEach((e) => (e.style.backgroundColor = "peru"));
    return this;
  }

  bgPink() {
    this.forEach((e) => (e.style.backgroundColor = "pink"));
    return this;
  }

  bgPlum() {
    this.forEach((e) => (e.style.backgroundColor = "plum"));
    return this;
  }

  bgPowderBlue() {
    this.forEach((e) => (e.style.backgroundColor = "powderblue"));
    return this;
  }

  bgPurple() {
    this.forEach((e) => (e.style.backgroundColor = "purple"));
    return this;
  }

  bgRed() {
    this.forEach((e) => (e.style.backgroundColor = "red"));
    return this;
  }

  bgRosyBrown() {
    this.forEach((e) => (e.style.backgroundColor = "rosybrown"));
    return this;
  }

  bgRoyalBlue() {
    this.forEach((e) => (e.style.backgroundColor = "royalblue"));
    return this;
  }

  bgSaddleBrown() {
    this.forEach((e) => (e.style.backgroundColor = "saddlebrown"));
    return this;
  }

  bgSalmon() {
    this.forEach((e) => (e.style.backgroundColor = "salmon"));
    return this;
  }

  bgSandyBrown() {
    this.forEach((e) => (e.style.backgroundColor = "sandybrown"));
    return this;
  }

  bgSeaGreen() {
    this.forEach((e) => (e.style.backgroundColor = "seagreen"));
    return this;
  }

  bgSeaShell() {
    this.forEach((e) => (e.style.backgroundColor = "seashell"));
    return this;
  }

  bgSienna() {
    this.forEach((e) => (e.style.backgroundColor = "sienna"));
    return this;
  }

  bgSilver() {
    this.forEach((e) => (e.style.backgroundColor = "silver"));
    return this;
  }

  bgSkyBlue() {
    this.forEach((e) => (e.style.backgroundColor = "skyblue"));
    return this;
  }

  bgSlateBlue() {
    this.forEach((e) => (e.style.backgroundColor = "slateblue"));
    return this;
  }

  bgSlateGrey() {
    this.forEach((e) => (e.style.backgroundColor = "slategrey"));
    return this;
  }

  bgSnow() {
    this.forEach((e) => (e.style.backgroundColor = "snow"));
    return this;
  }

  bgSpringGreen() {
    this.forEach((e) => (e.style.backgroundColor = "springgreen"));
    return this;
  }

  bgSteelBlue() {
    this.forEach((e) => (e.style.backgroundColor = "steelblue"));
    return this;
  }

  bgTan() {
    this.forEach((e) => (e.style.backgroundColor = "tan"));
    return this;
  }

  bgTeal() {
    this.forEach((e) => (e.style.backgroundColor = "teal"));
    return this;
  }

  bgThistle() {
    this.forEach((e) => (e.style.backgroundColor = "thistle"));
    return this;
  }

  bgTomato() {
    this.forEach((e) => (e.style.backgroundColor = "tomato"));
    return this;
  }

  bgTurquoise() {
    this.forEach((e) => (e.style.backgroundColor = "turquoise"));
    return this;
  }

  bgViolet() {
    this.forEach((e) => (e.style.backgroundColor = "violet"));
    return this;
  }

  bgWheat() {
    this.forEach((e) => (e.style.backgroundColor = "wheat"));
    return this;
  }

  bgWhite() {
    this.forEach((e) => (e.style.backgroundColor = "white"));
    return this;
  }

  bgWhiteSmoke() {
    this.forEach((e) => (e.style.backgroundColor = "whitesmoke"));
    return this;
  }

  bgYellow() {
    this.forEach((e) => (e.style.backgroundColor = "yellow"));
    return this;
  }

  bgYellowGreen() {
    this.forEach((e) => (e.style.backgroundColor = "yellowgreen"));
    return this;
  }

  aliceblue() {
    this.forEach((e) => (e.style.color = "aliceblue"));
    return this;
  }

  antiquewhite() {
    this.forEach((e) => (e.style.color = "antiquewhite"));
    return this;
  }

  aqua() {
    this.forEach((e) => (e.style.color = "aqua"));
    return this;
  }

  aquamarine() {
    this.forEach((e) => (e.style.color = "aquamarine"));
    return this;
  }

  azure() {
    this.forEach((e) => (e.style.color = "azure"));
    return this;
  }

  beige() {
    this.forEach((e) => (e.style.color = "beige"));
    return this;
  }

  bisque() {
    this.forEach((e) => (e.style.color = "bisque"));
    return this;
  }

  black() {
    this.forEach((e) => (e.style.color = "black"));
    return this;
  }

  blanchedalmond() {
    this.forEach((e) => (e.style.color = "blanchedalmond"));
    return this;
  }

  blue() {
    this.forEach((e) => (e.style.color = "blue"));
    return this;
  }

  blueviolet() {
    this.forEach((e) => (e.style.color = "blueviolet"));
    return this;
  }

  brown() {
    this.forEach((e) => (e.style.color = "brown"));
    return this;
  }

  burlywood() {
    this.forEach((e) => (e.style.color = "burlywood"));
    return this;
  }

  cadetblue() {
    this.forEach((e) => (e.style.color = "cadetblue"));
    return this;
  }

  chartreuse() {
    this.forEach((e) => (e.style.color = "chartreuse"));
    return this;
  }

  chocolate() {
    this.forEach((e) => (e.style.color = "chocolate"));
    return this;
  }

  coral() {
    this.forEach((e) => (e.style.color = "coral"));
    return this;
  }

  cornflowerblue() {
    this.forEach((e) => (e.style.color = "cornflowerblue"));
    return this;
  }

  cornsilk() {
    this.forEach((e) => (e.style.color = "cornsilk"));
    return this;
  }

  crimson() {
    this.forEach((e) => (e.style.color = "crimson"));
    return this;
  }

  cyan() {
    this.forEach((e) => (e.style.color = "cyan"));
    return this;
  }

  darkblue() {
    this.forEach((e) => (e.style.color = "darkblue"));
    return this;
  }

  darkcyan() {
    this.forEach((e) => (e.style.color = "darkcyan"));
    return this;
  }

  darkgoldenrod() {
    this.forEach((e) => (e.style.color = "darkgoldenrod"));
    return this;
  }

  darkgrey() {
    this.forEach((e) => (e.style.color = "darkgrey"));
    return this;
  }

  darkgreen() {
    this.forEach((e) => (e.style.color = "darkgreen"));
    return this;
  }

  darkkhaki() {
    this.forEach((e) => (e.style.color = "darkkhaki"));
    return this;
  }

  darkmagenta() {
    this.forEach((e) => (e.style.color = "darkmagenta"));
    return this;
  }

  darkolivegreen() {
    this.forEach((e) => (e.style.color = "darkolivegreen"));
    return this;
  }

  darkorange() {
    this.forEach((e) => (e.style.color = "darkorange"));
    return this;
  }

  darkorchid() {
    this.forEach((e) => (e.style.color = "darkorchid"));
    return this;
  }

  darkred() {
    this.forEach((e) => (e.style.color = "darkred"));
    return this;
  }

  darksalmon() {
    this.forEach((e) => (e.style.color = "darksalmon"));
    return this;
  }

  darkseagreen() {
    this.forEach((e) => (e.style.color = "darkseagreen"));
    return this;
  }

  darkslateblue() {
    this.forEach((e) => (e.style.color = "darkslateblue"));
    return this;
  }

  darkslategrey() {
    this.forEach((e) => (e.style.color = "darkslategrey"));
    return this;
  }

  darkturquoise() {
    this.forEach((e) => (e.style.color = "darkturquoise"));
    return this;
  }

  darkviolet() {
    this.forEach((e) => (e.style.color = "darkviolet"));
    return this;
  }

  deeppink() {
    this.forEach((e) => (e.style.color = "deeppink"));
    return this;
  }

  deepskyblue() {
    this.forEach((e) => (e.style.color = "deepskyblue"));
    return this;
  }

  dimgray() {
    this.forEach((e) => (e.style.color = "dimgray"));
    return this;
  }

  dodgerblue() {
    this.forEach((e) => (e.style.color = "dodgerblue"));
    return this;
  }

  firebrick() {
    this.forEach((e) => (e.style.color = "firebrick"));
    return this;
  }

  floralwhite() {
    this.forEach((e) => (e.style.color = "floralwhite"));
    return this;
  }

  forestgreen() {
    this.forEach((e) => (e.style.color = "forestgreen"));
    return this;
  }

  fuchsia() {
    this.forEach((e) => (e.style.color = "fuchsia"));
    return this;
  }

  gainsboro() {
    this.forEach((e) => (e.style.color = "gainsboro"));
    return this;
  }

  ghostwhite() {
    this.forEach((e) => (e.style.color = "ghostwhite"));
    return this;
  }

  gold() {
    this.forEach((e) => (e.style.color = "gold"));
    return this;
  }

  goldenrod() {
    this.forEach((e) => (e.style.color = "goldenrod"));
    return this;
  }

  grey() {
    this.forEach((e) => (e.style.color = "grey"));
    return this;
  }

  green() {
    this.forEach((e) => (e.style.color = "green"));
    return this;
  }

  greenyellow() {
    this.forEach((e) => (e.style.color = "greenyellow"));
    return this;
  }

  honeydew() {
    this.forEach((e) => (e.style.color = "honeydew"));
    return this;
  }

  hotpink() {
    this.forEach((e) => (e.style.color = "hotpink"));
    return this;
  }

  indianred() {
    this.forEach((e) => (e.style.color = "indianred"));
    return this;
  }

  indigo() {
    this.forEach((e) => (e.style.color = "indigo"));
    return this;
  }

  ivory() {
    this.forEach((e) => (e.style.color = "ivory"));
    return this;
  }

  khaki() {
    this.forEach((e) => (e.style.color = "khaki"));
    return this;
  }

  lavender() {
    this.forEach((e) => (e.style.color = "lavender"));
    return this;
  }

  lavenderblush() {
    this.forEach((e) => (e.style.color = "lavenderblush"));
    return this;
  }

  lawngreen() {
    this.forEach((e) => (e.style.color = "lawngreen"));
    return this;
  }

  lemonchiffon() {
    this.forEach((e) => (e.style.color = "lemonchiffon"));
    return this;
  }

  lightblue() {
    this.forEach((e) => (e.style.color = "lightblue"));
    return this;
  }

  lightcoral() {
    this.forEach((e) => (e.style.color = "lightcoral"));
    return this;
  }

  lightcyan() {
    this.forEach((e) => (e.style.color = "lightcyan"));
    return this;
  }

  lightgoldenrodyellow() {
    this.forEach((e) => (e.style.color = "lightgoldenrodyellow"));
    return this;
  }

  lightgrey() {
    this.forEach((e) => (e.style.color = "lightgrey"));
    return this;
  }

  lightgreen() {
    this.forEach((e) => (e.style.color = "lightgreen"));
    return this;
  }

  lightpink() {
    this.forEach((e) => (e.style.color = "lightpink"));
    return this;
  }

  lightsalmon() {
    this.forEach((e) => (e.style.color = "lightsalmon"));
    return this;
  }

  lightseagreen() {
    this.forEach((e) => (e.style.color = "lightseagreen"));
    return this;
  }

  lightskyblue() {
    this.forEach((e) => (e.style.color = "lightskyblue"));
    return this;
  }

  lightslategrey() {
    this.forEach((e) => (e.style.color = "lightslategrey"));
    return this;
  }

  lightsteelblue() {
    this.forEach((e) => (e.style.color = "lightsteelblue"));
    return this;
  }

  lightyellow() {
    this.forEach((e) => (e.style.color = "lightyellow"));
    return this;
  }

  lime() {
    this.forEach((e) => (e.style.color = "lime"));
    return this;
  }

  limegreen() {
    this.forEach((e) => (e.style.color = "limegreen"));
    return this;
  }

  linen() {
    this.forEach((e) => (e.style.color = "linen"));
    return this;
  }

  magenta() {
    this.forEach((e) => (e.style.color = "magenta"));
    return this;
  }

  maroon() {
    this.forEach((e) => (e.style.color = "maroon"));
    return this;
  }

  mediumaquamarine() {
    this.forEach((e) => (e.style.color = "mediumaquamarine"));
    return this;
  }

  mediumblue() {
    this.forEach((e) => (e.style.color = "mediumblue"));
    return this;
  }

  mediumorchid() {
    this.forEach((e) => (e.style.color = "mediumorchid"));
    return this;
  }

  mediumpurple() {
    this.forEach((e) => (e.style.color = "mediumpurple"));
    return this;
  }

  mediumseagreen() {
    this.forEach((e) => (e.style.color = "mediumseagreen"));
    return this;
  }

  mediumslateblue() {
    this.forEach((e) => (e.style.color = "mediumslateblue"));
    return this;
  }

  mediumspringgreen() {
    this.forEach((e) => (e.style.color = "mediumspringgreen"));
    return this;
  }

  mediumturquoise() {
    this.forEach((e) => (e.style.color = "mediumturquoise"));
    return this;
  }

  mediumvioletred() {
    this.forEach((e) => (e.style.color = "mediumvioletred"));
    return this;
  }

  midnightblue() {
    this.forEach((e) => (e.style.color = "midnightblue"));
    return this;
  }

  mintcream() {
    this.forEach((e) => (e.style.color = "mintcream"));
    return this;
  }

  mistyrose() {
    this.forEach((e) => (e.style.color = "mistyrose"));
    return this;
  }

  moccasin() {
    this.forEach((e) => (e.style.color = "moccasin"));
    return this;
  }

  navajowhite() {
    this.forEach((e) => (e.style.color = "navajowhite"));
    return this;
  }

  navy() {
    this.forEach((e) => (e.style.color = "navy"));
    return this;
  }

  oldlace() {
    this.forEach((e) => (e.style.color = "oldlace"));
    return this;
  }

  olive() {
    this.forEach((e) => (e.style.color = "olive"));
    return this;
  }

  olivedrab() {
    this.forEach((e) => (e.style.color = "olivedrab"));
    return this;
  }

  orange() {
    this.forEach((e) => (e.style.color = "orange"));
    return this;
  }

  orangered() {
    this.forEach((e) => (e.style.color = "orangered"));
    return this;
  }

  orchid() {
    this.forEach((e) => (e.style.color = "orchid"));
    return this;
  }

  palegoldenrod() {
    this.forEach((e) => (e.style.color = "palegoldenrod"));
    return this;
  }

  palegreen() {
    this.forEach((e) => (e.style.color = "palegreen"));
    return this;
  }

  paleturquoise() {
    this.forEach((e) => (e.style.color = "paleturquoise"));
    return this;
  }

  palevioletred() {
    this.forEach((e) => (e.style.color = "palevioletred"));
    return this;
  }

  papayawhip() {
    this.forEach((e) => (e.style.color = "papayawhip"));
    return this;
  }

  peachpuff() {
    this.forEach((e) => (e.style.color = "peachpuff"));
    return this;
  }

  peru() {
    this.forEach((e) => (e.style.color = "peru"));
    return this;
  }

  pink() {
    this.forEach((e) => (e.style.color = "pink"));
    return this;
  }

  plum() {
    this.forEach((e) => (e.style.color = "plum"));
    return this;
  }

  powderblue() {
    this.forEach((e) => (e.style.color = "powderblue"));
    return this;
  }

  purple() {
    this.forEach((e) => (e.style.color = "purple"));
    return this;
  }

  red() {
    this.forEach((e) => (e.style.color = "red"));
    return this;
  }

  rosybrown() {
    this.forEach((e) => (e.style.color = "rosybrown"));
    return this;
  }

  royalblue() {
    this.forEach((e) => (e.style.color = "royalblue"));
    return this;
  }

  saddlebrown() {
    this.forEach((e) => (e.style.color = "saddlebrown"));
    return this;
  }

  salmon() {
    this.forEach((e) => (e.style.color = "salmon"));
    return this;
  }

  sandybrown() {
    this.forEach((e) => (e.style.color = "sandybrown"));
    return this;
  }

  seagreen() {
    this.forEach((e) => (e.style.color = "seagreen"));
    return this;
  }

  seashell() {
    this.forEach((e) => (e.style.color = "seashell"));
    return this;
  }

  sienna() {
    this.forEach((e) => (e.style.color = "sienna"));
    return this;
  }

  silver() {
    this.forEach((e) => (e.style.color = "silver"));
    return this;
  }

  skyblue() {
    this.forEach((e) => (e.style.color = "skyblue"));
    return this;
  }

  slateblue() {
    this.forEach((e) => (e.style.color = "slateblue"));
    return this;
  }

  slategrey() {
    this.forEach((e) => (e.style.color = "slategrey"));
    return this;
  }

  snow() {
    this.forEach((e) => (e.style.color = "snow"));
    return this;
  }

  springgreen() {
    this.forEach((e) => (e.style.color = "springgreen"));
    return this;
  }

  steelblue() {
    this.forEach((e) => (e.style.color = "steelblue"));
    return this;
  }

  tan() {
    this.forEach((e) => (e.style.color = "tan"));
    return this;
  }

  teal() {
    this.forEach((e) => (e.style.color = "teal"));
    return this;
  }

  thistle() {
    this.forEach((e) => (e.style.color = "thistle"));
    return this;
  }

  tomato() {
    this.forEach((e) => (e.style.color = "tomato"));
    return this;
  }

  turquoise() {
    this.forEach((e) => (e.style.color = "turquoise"));
    return this;
  }

  violet() {
    this.forEach((e) => (e.style.color = "violet"));
    return this;
  }

  wheat() {
    this.forEach((e) => (e.style.color = "wheat"));
    return this;
  }

  white() {
    this.forEach((e) => (e.style.color = "white"));
    return this;
  }

  whitesmoke() {
    this.forEach((e) => (e.style.color = "whitesmoke"));
    return this;
  }

  yellow() {
    this.forEach((e) => (e.style.color = "yellow"));
    return this;
  }

  yellowgreen() {
    this.forEach((e) => (e.style.color = "yellowgreen"));
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
  promise: Promise<unknown>;

  constructor(promise: Promise<unknown>) {
    this.promise = promise;
  }

  done(callback: (arg: unknown) => void) {
    this.promise = this.promise.then((data) => {
      callback(data);
      return data;
    });
    return this;
  }

  fail(callback: (arg: unknown) => void) {
    this.promise.catch(callback);
    return this;
  }

  always(callback: () => void) {
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
        ? [...document.querySelectorAll(arg.toString())]
        : arg
    )
    .flat();

  return new ElementCollection(...queryArgs);
}

$.get = function (
  url: string,
  query = {},
  success: (arg: unknown) => void = () => {},
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
        else throw new Error(res.status.toString());
      })
      .then((data) => success(data))
  );
};

String.prototype.indicesOf = function (
  searchString: string | any,
  position = 0
) {
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

Array.prototype.splitEach = function (separator: string) {
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
