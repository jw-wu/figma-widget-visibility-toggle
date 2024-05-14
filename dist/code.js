(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // widget-src/config.ts
  var color = {
    brand1: {
      primary: "#000000",
      contrast: "#cccccc"
    },
    default: {
      primary: "#000000",
      secondary: "#888888",
      contrast: "#ffffff"
    },
    surface: {
      primary: "#ffffff"
    },
    divider: {
      primary: "#000000",
      secondary: "#dbdbdb"
    },
    error: {
      primary: "#ff3300"
    }
  };
  var typography = {
    family: "Inter",
    size: {
      medium: 14,
      large: 24
    }
  };
  var defaultValue = {
    label: "Label here",
    toggleHeight: 40,
    layerOpacity: 0.2,
    toggleOnHandleOpacity: 1,
    toggleOffHandleOpacity: 0.4,
    padding: 16
  };

  // widget-src/scripts/visibility.ts
  var isFigmaLayer = (node) => node.type === "FRAME" || node.type === "COMPONENT_SET" || node.type === "COMPONENT" || node.type === "INSTANCE" || node.type === "GROUP" || node.type === "SECTION" || node.type === "RECTANGLE" || node.type === "ELLIPSE" || node.type === "POLYGON" || node.type === "STAR" || node.type === "VECTOR" || node.type === "TEXT" || node.type === "BOOLEAN_OPERATION";
  function toggle(widgetId, visible) {
    return __async(this, null, function* () {
      const widget5 = yield figma.getNodeByIdAsync(widgetId), parent = widget5 == null ? void 0 : widget5.parent, children = parent == null ? void 0 : parent.children;
      const opacity = visible ? 1 : 0.2;
      if (children) {
        for (let child of children) {
          setOpacity(child, opacity);
        }
      }
    });
  }
  function setOpacity(node, opacity) {
    if (isFigmaLayer(node)) {
      if (node.type === "SECTION") {
        let children = node.children;
        for (let child of children) {
          setOpacity(child, opacity);
        }
      } else {
        if (!node.locked)
          node.opacity = opacity;
      }
    }
  }

  // widget-src/scripts/validation.ts
  function hexColor(hex) {
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex);
  }
  function percentage(percentage2) {
    return /^(?:\d*)\.?(?:\d+)%?$/.test(String(percentage2));
  }
  function number(number2) {
    return /^\d+$/.test(String(number2));
  }

  // widget-src/ui/text-input.tsx
  var { widget } = figma;
  var { AutoLayout, Text, Input, useSyncedState } = widget;
  function inputField(arg) {
    const [noError, noErrorDetected] = useSyncedState(`error-${arg.label}`, true);
    return /* @__PURE__ */ figma.widget.h(AutoLayout, {
      direction: "vertical",
      spacing: 16,
      padding: { left: 16, right: 16, top: 0, bottom: 0 }
    }, /* @__PURE__ */ figma.widget.h(Text, {
      fontFamily: typography.family,
      fontSize: typography.size.medium,
      fontWeight: 400,
      fill: color.default.secondary
    }, arg.label), /* @__PURE__ */ figma.widget.h(Input, {
      value: arg.value,
      placeholder: arg.placeholder,
      inputBehavior: "wrap",
      fontFamily: typography.family,
      fontSize: typography.size.large,
      fontWeight: 400,
      width: 300,
      onTextEditEnd: (e) => {
        let validInput = false, parsedInput = "";
        switch (arg.inputType) {
          case "hex":
            validInput = hexColor(e.characters);
            parsedInput = e.characters;
            break;
          case "percentage":
            validInput = percentage(e.characters);
            if (e.characters.includes("%")) {
              parsedInput = Number(e.characters.replace("%", "")) / 100;
            } else {
              parsedInput = Number(e.characters);
            }
            break;
          case "number":
            validInput = number(e.characters);
            parsedInput = Number(e.characters);
            break;
          default:
            validInput = true;
            parsedInput = e.characters;
        }
        if (validInput) {
          noErrorDetected(true);
          arg.onClick(parsedInput);
        } else {
          noErrorDetected(false);
        }
      }
    }), /* @__PURE__ */ figma.widget.h(Text, {
      fontFamily: typography.family,
      fontSize: typography.size.medium,
      fontWeight: 400,
      fill: color.error.primary,
      hidden: noError
    }, "Invalid input detected."));
  }

  // widget-src/ui/divider.tsx
  var { widget: widget2 } = figma;
  var { Line } = widget2;
  function divider(arg) {
    return /* @__PURE__ */ figma.widget.h(Line, {
      length: "fill-parent",
      strokeWidth: 1,
      stroke: color.divider[arg.variant]
    });
  }

  // widget-src/ui/button.tsx
  var { widget: widget3 } = figma;
  var { AutoLayout: AutoLayout2, Text: Text2 } = widget3;
  function button(arg) {
    return /* @__PURE__ */ figma.widget.h(AutoLayout2, {
      direction: "vertical",
      spacing: 8,
      padding: { left: 16, right: 16, top: 0, bottom: 0 },
      width: "fill-parent"
    }, /* @__PURE__ */ figma.widget.h(AutoLayout2, {
      direction: "vertical",
      horizontalAlignItems: "center",
      spacing: 8,
      padding: { left: 16, right: 16, top: 16, bottom: 16 },
      fill: color.default.primary,
      cornerRadius: 4,
      height: "hug-contents",
      width: "fill-parent",
      onClick: () => {
        arg.onClick(false);
      }
    }, /* @__PURE__ */ figma.widget.h(Text2, {
      fontFamily: typography.family,
      fontSize: typography.size.medium,
      fill: color.default.contrast
    }, arg.label)));
  }

  // widget-src/assets/icon-settings.ts
  var settingsIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7275 3.48438L10.1807 5.35938C10.0635 5.82813 9.71191 6.17969 9.32129 6.375C9.00879 6.53125 8.73535 6.6875 8.46191 6.84375C8.11035 7.11719 7.60254 7.23438 7.13379 7.11719L5.25879 6.64844C5.18066 6.64844 5.1416 6.64844 5.10254 6.64844C4.86816 6.92188 4.67285 7.19531 4.5166 7.50781L4.32129 7.78125C4.16504 8.09375 4.00879 8.40625 3.8916 8.71875C3.8916 8.75781 3.93066 8.83594 3.96973 8.875L5.33691 10.2422C5.64941 10.5938 5.80566 11.1016 5.7666 11.5313C5.7666 11.6875 5.7666 11.8438 5.7666 12C5.7666 12.1953 5.7666 12.3516 5.7666 12.5078C5.80566 12.9375 5.64941 13.4063 5.33691 13.7578L3.96973 15.1641C3.93066 15.2031 3.8916 15.2813 3.8916 15.3203C4.00879 15.6328 4.16504 15.9453 4.32129 16.2578L4.47754 16.5313C4.67285 16.8047 4.86816 17.1172 5.06348 17.3906C5.1416 17.3906 5.18066 17.3906 5.25879 17.3906L7.13379 16.9219C7.60254 16.8047 8.11035 16.9219 8.46191 17.1563C8.73535 17.3516 9.00879 17.5078 9.32129 17.6641C9.71191 17.8594 10.0635 18.2109 10.1807 18.6797L10.7275 20.5547C10.7275 20.5938 10.7666 20.6328 10.8057 20.6719C11.1963 20.75 11.5869 20.75 12.0166 20.75C12.4072 20.75 12.7979 20.75 13.1885 20.6719C13.2275 20.6328 13.2666 20.5938 13.2666 20.5547L13.8135 18.6797C13.9307 18.2109 14.2822 17.8594 14.6729 17.6641C14.9854 17.5078 15.2588 17.3516 15.5322 17.1563C15.9229 16.9219 16.3916 16.8047 16.8604 16.9219L18.7354 17.3906C18.8135 17.3906 18.8525 17.3906 18.9307 17.3906C19.126 17.1172 19.3213 16.8047 19.5166 16.5313L19.6729 16.2578C19.8291 15.9453 19.9854 15.6328 20.1025 15.3203C20.1025 15.2813 20.0635 15.2031 20.0244 15.1641L18.6572 13.7578C18.3447 13.4063 18.1885 12.9375 18.2275 12.5078C18.2275 12.3516 18.2666 12.1953 18.2666 12C18.2666 11.8438 18.2275 11.6875 18.2275 11.5313C18.1885 11.1016 18.3447 10.5938 18.6572 10.2422L20.0244 8.875C20.0635 8.83594 20.1025 8.75781 20.1025 8.71875C19.9854 8.40625 19.8291 8.09375 19.6729 7.78125L19.5166 7.50781C19.3213 7.19531 19.126 6.92188 18.9307 6.64844C18.8525 6.64844 18.8135 6.64844 18.7354 6.64844L16.8604 7.11719C16.3916 7.23438 15.9229 7.11719 15.5322 6.88281C15.2588 6.6875 14.9854 6.53125 14.6729 6.375C14.2822 6.17969 13.9307 5.82813 13.8135 5.35938L13.2666 3.48438C13.2666 3.44531 13.2275 3.36719 13.1885 3.32813C12.7979 3.28906 12.4072 3.25 12.0166 3.25C11.5869 3.25 11.1963 3.28906 10.8057 3.32813C10.7666 3.36719 10.7275 3.44531 10.7275 3.48438ZM12.0166 2C12.5244 2 12.9932 2.03906 13.501 2.11719C13.5791 2.15625 13.6182 2.15625 13.6963 2.19531C14.0479 2.39063 14.3604 2.74219 14.4775 3.13281L15.0244 5.00781C15.0244 5.08594 15.1025 5.20313 15.2197 5.24219C15.5713 5.39844 15.9229 5.59375 16.2354 5.82813C16.3525 5.90625 16.4697 5.94531 16.5479 5.90625L18.4619 5.4375C18.8525 5.32031 19.3213 5.39844 19.6729 5.63281C19.7119 5.67188 19.751 5.71094 19.8291 5.78906C20.1025 6.10156 20.3369 6.49219 20.5713 6.88281L20.7666 7.15625V7.19531C20.9619 7.58594 21.1572 7.97656 21.3135 8.36719C21.3525 8.44531 21.3525 8.48438 21.3525 8.5625C21.3916 8.99219 21.2354 9.42188 20.9229 9.73438L19.5557 11.1406C19.5166 11.1797 19.4775 11.2969 19.4775 11.4141C19.4775 11.6094 19.5166 11.8047 19.5166 12C19.5166 12.1953 19.4775 12.3906 19.4775 12.5859C19.4775 12.7422 19.5166 12.8594 19.5557 12.8984L20.9229 14.3047C21.2354 14.6172 21.3916 15.0469 21.3525 15.4766C21.3525 15.5156 21.3525 15.5938 21.3135 15.6719C21.1572 16.0625 20.9619 16.4531 20.7666 16.8438L20.5713 17.1563C20.3369 17.5469 20.1025 17.8984 19.79 18.25C19.751 18.3281 19.7119 18.3672 19.6729 18.4063C19.3213 18.6406 18.8525 18.7188 18.4229 18.6016L16.5479 18.1328C16.4697 18.0938 16.3525 18.1328 16.2354 18.2109C15.9229 18.4063 15.5713 18.6016 15.2197 18.7969C15.1025 18.8359 15.0244 18.9531 15.0244 19.0313L14.4775 20.8672C14.3604 21.2969 14.0479 21.6484 13.6963 21.8438C13.6182 21.8828 13.5791 21.8828 13.501 21.9219C12.9932 21.9609 12.5244 22 12.0166 22C11.5088 22 11.001 21.9609 10.4932 21.9219C10.415 21.8828 10.376 21.8828 10.2979 21.8438C9.94629 21.6484 9.63379 21.2969 9.5166 20.8672L8.96973 19.0313C8.96973 18.9531 8.8916 18.8359 8.77441 18.7969C8.42285 18.6406 8.07129 18.4453 7.75879 18.2109C7.6416 18.1328 7.52441 18.1328 7.44629 18.1328L5.57129 18.6016C5.1416 18.7188 4.71191 18.6406 4.36035 18.4063C4.28223 18.3672 4.24316 18.3281 4.2041 18.2891C3.8916 17.9375 3.65723 17.5469 3.42285 17.1563L3.2666 16.8828L3.22754 16.8438C3.03223 16.4531 2.83691 16.0625 2.68066 15.6719C2.68066 15.5938 2.6416 15.5547 2.6416 15.4766C2.6416 15.0469 2.75879 14.6172 3.07129 14.3047L4.43848 12.8984C4.47754 12.8594 4.5166 12.7422 4.5166 12.5859C4.5166 12.4297 4.5166 12.1953 4.5166 12C4.5166 11.8047 4.5166 11.6094 4.5166 11.4141C4.5166 11.2969 4.47754 11.1797 4.43848 11.1406L3.07129 9.73438C2.75879 9.42188 2.6416 8.99219 2.6416 8.5625C2.6416 8.48438 2.68066 8.44531 2.68066 8.36719C2.83691 7.97656 3.03223 7.58594 3.22754 7.19531L3.2666 7.15625L3.42285 6.88281C3.65723 6.49219 3.93066 6.10156 4.2041 5.78906C4.24316 5.71094 4.28223 5.67188 4.36035 5.63281C4.71191 5.39844 5.1416 5.32031 5.57129 5.4375L7.44629 5.90625C7.52441 5.94531 7.6416 5.90625 7.75879 5.82813C8.07129 5.63281 8.42285 5.39844 8.77441 5.24219C8.8916 5.20313 8.96973 5.08594 8.96973 5.00781L9.5166 3.13281C9.63379 2.74219 9.94629 2.39063 10.2979 2.19531C10.376 2.15625 10.415 2.15625 10.4932 2.11719C11.001 2.03906 11.5088 2 12.0166 2ZM9.8291 12C9.8291 12.8203 10.2197 13.5234 10.9229 13.9141C11.5869 14.3047 12.4072 14.3047 13.1104 13.9141C13.7744 13.5234 14.2041 12.8203 14.2041 12C14.2041 11.2188 13.7744 10.5156 13.1104 10.125C12.4072 9.73438 11.5869 9.73438 10.9229 10.125C10.2197 10.5156 9.8291 11.2188 9.8291 12ZM15.4541 12C15.4541 13.25 14.79 14.3828 13.7354 15.0078C12.6416 15.5938 11.3525 15.5938 10.2979 15.0078C9.2041 14.3828 8.5791 13.25 8.5791 12C8.5791 10.7891 9.2041 9.65625 10.2979 9.03125C11.3525 8.44531 12.6416 8.44531 13.7354 9.03125C14.79 9.65625 15.4541 10.7891 15.4541 12Z" fill="white"/></svg>';

  // widget-src/code.tsx
  var { widget: widget4 } = figma;
  var { AutoLayout: AutoLayout3, Text: Text3, Ellipse, useSyncedState: useSyncedState2, useWidgetNodeId, usePropertyMenu } = widget4;
  function Toggle() {
    const [settingsVisible, setSettingsVisibility] = useSyncedState2("settingsVisible", false), [settingsButtonActive, setSettingsButtonActive] = useSyncedState2("settingsButtonActive", false);
    const [label, setLabel] = useSyncedState2("label", defaultValue.label), [labelColor, setLabelColor] = useSyncedState2("labelColor", color.brand1.primary), [fontSize, setFontSize] = useSyncedState2("fontSize", typography.size.large), [padding, setPadding] = useSyncedState2("padding", defaultValue.padding), [toggleTrackColor, setToggleTrackColor] = useSyncedState2("labelTrackColor", color.brand1.contrast), [toggleHeight, setToggleHeight] = useSyncedState2("toggleHeight", defaultValue.toggleHeight), [layerOpacity, setLayerOpacity] = useSyncedState2("layerOpacity", defaultValue.layerOpacity);
    const [visible, setVisibility] = useSyncedState2("visibility", true), [leftPadding, setLeftPadding] = useSyncedState2("leftPadding", 8), [rightPadding, setRightPadding] = useSyncedState2("rightPadding", toggleHeight), [toggleHandleOpacity, setToggleHandleOpacity] = useSyncedState2("toggleHandleOpacity", defaultValue.toggleOnHandleOpacity);
    const widgetId = useWidgetNodeId();
    const settingsButton = {
      itemType: "toggle",
      tooltip: "Settings",
      propertyName: "settings",
      isToggled: settingsButtonActive,
      icon: settingsIcon
    };
    usePropertyMenu([
      settingsButton
    ], ({ propertyName, propertyValue }) => {
      if (settingsVisible) {
        setSettingsVisibility(false);
        setSettingsButtonActive(false);
      } else {
        setSettingsVisibility(true);
        setSettingsButtonActive(true);
      }
    });
    return /* @__PURE__ */ figma.widget.h(AutoLayout3, {
      direction: "vertical",
      padding: { left: 0, right: 0, top: 0, bottom: 0 },
      spacing: 0,
      height: "hug-contents"
    }, /* @__PURE__ */ figma.widget.h(AutoLayout3, {
      verticalAlignItems: "center",
      padding: { left: 0, right: 0, top: padding, bottom: padding },
      spacing: fontSize < 12 ? 12 : fontSize,
      height: "hug-contents",
      hidden: settingsVisible
    }, /* @__PURE__ */ figma.widget.h(Text3, {
      fontFamily: typography.family,
      fontSize,
      fill: labelColor
    }, label), /* @__PURE__ */ figma.widget.h(AutoLayout3, {
      verticalAlignItems: "center",
      padding: { left: leftPadding, right: rightPadding, top: 8, bottom: 8 },
      height: "hug-contents",
      fill: toggleTrackColor,
      cornerRadius: toggleHeight,
      onClick: () => __async(this, null, function* () {
        setVisibility(!visible);
        if (!visible) {
          setLeftPadding(toggleHeight);
          setRightPadding(8);
          setToggleHandleOpacity(defaultValue.toggleOnHandleOpacity);
        } else {
          setLeftPadding(8);
          setRightPadding(toggleHeight);
          setToggleHandleOpacity(defaultValue.toggleOffHandleOpacity);
        }
        yield toggle(widgetId, !visible);
      })
    }, /* @__PURE__ */ figma.widget.h(Ellipse, {
      width: toggleHeight - 16,
      height: toggleHeight - 16,
      fill: labelColor,
      opacity: toggleHandleOpacity
    }))), /* @__PURE__ */ figma.widget.h(AutoLayout3, {
      direction: "vertical",
      spacing: 16,
      padding: { left: 0, right: 0, top: 16, bottom: 16 },
      fill: color.surface.primary,
      stroke: color.divider.secondary,
      cornerRadius: 4,
      height: "hug-contents",
      hidden: !settingsVisible
    }, inputField({
      label: "Label for toggle",
      value: label,
      placeholder: "Enter label here",
      onClick: setLabel
    }), divider({ variant: "secondary" }), inputField({
      label: "Inactive layer opacity",
      value: String(layerOpacity),
      placeholder: String(layerOpacity),
      onClick: setLayerOpacity,
      inputType: "percentage"
    }), divider({ variant: "primary" }), inputField({
      label: "Font size (px)",
      value: String(fontSize),
      placeholder: String(fontSize),
      onClick: setFontSize,
      inputType: "number"
    }), divider({ variant: "secondary" }), inputField({
      label: "Toggle height (px)",
      value: String(toggleHeight),
      placeholder: String(toggleHeight),
      onClick: setToggleHeight,
      inputType: "number"
    }), divider({ variant: "secondary" }), inputField({
      label: "Top and bottom padding (px)",
      value: String(padding),
      placeholder: String(padding),
      onClick: setPadding,
      inputType: "number"
    }), divider({ variant: "secondary" }), inputField({
      label: "Label and toggle handle color",
      value: labelColor,
      placeholder: color.brand1.primary,
      onClick: setLabelColor,
      inputType: "hex"
    }), divider({ variant: "secondary" }), inputField({
      label: "Toggle track color",
      value: toggleTrackColor,
      placeholder: color.brand1.contrast,
      onClick: setToggleTrackColor,
      inputType: "hex"
    }), divider({ variant: "secondary" }), button({
      label: "Done",
      onClick: setSettingsVisibility
    })));
  }
  widget4.register(Toggle);
})();
