const { widget } = figma
const { AutoLayout, Text, Ellipse, useSyncedState, useWidgetNodeId, usePropertyMenu } = widget

import * as config from './config'
import * as validate from './scripts/validation'
import * as visibility from './scripts/visibility'

import { inputField } from './ui/text-input'
import { divider } from './ui/divider'
import { button } from './ui/button'
import { settingsIcon } from './assets/icon-settings'


function Toggle() {

  const [ settingsVisible, setSettingsVisibility ] = useSyncedState('settingsVisible', false),
        [ settingsButtonActive, setSettingsButtonActive ] = useSyncedState('settingsButtonActive', false)

  const [ label, setLabel ] = useSyncedState('label', config.defaultValue.label),
        [ labelColor, setLabelColor ] = useSyncedState('labelColor', config.color.brand1.primary),
        [ fontSize, setFontSize ] = useSyncedState('fontSize', config.typography.size.large),
        [ padding, setPadding ] = useSyncedState('padding', config.defaultValue.padding),
        [ toggleTrackColor, setToggleTrackColor ] = useSyncedState('labelTrackColor', config.color.brand1.contrast),
        [ toggleHeight, setToggleHeight ] = useSyncedState('toggleHeight', config.defaultValue.toggleHeight),
        [ layerOpacity, setLayerOpacity ] = useSyncedState('layerOpacity', config.defaultValue.layerOpacity)

  const [ visible, setVisibility ] = useSyncedState('visibility', true),
        [ leftPadding, setLeftPadding ] = useSyncedState('leftPadding', 8),
        [ rightPadding, setRightPadding ] = useSyncedState('rightPadding', toggleHeight),
        [ toggleHandleOpacity, setToggleHandleOpacity ] = useSyncedState('toggleHandleOpacity', config.defaultValue.toggleOnHandleOpacity)

  const widgetId = useWidgetNodeId()

  const settingsButton: WidgetPropertyMenuItem = {
    itemType: 'toggle',
    tooltip: 'Settings',
    propertyName: 'settings',
    isToggled: settingsButtonActive,
    icon: settingsIcon
  }

  usePropertyMenu(
    [
      settingsButton
    ],
    ({ propertyName, propertyValue }) => {
      
      if (settingsVisible) {
        setSettingsVisibility(false)
        setSettingsButtonActive(false)
      } else {
        setSettingsVisibility(true)
        setSettingsButtonActive(true)
      }

    },
  )

  return (
    <AutoLayout
      direction='vertical'
      padding={{ left: 0, right: 0, top: 0, bottom: 0 }}
      spacing={0}
      height={'hug-contents'}
    >

      {/* Toggle UI */}

      <AutoLayout
        verticalAlignItems='center'
        padding={{ left: 0, right: 0, top: padding, bottom: padding }}
        spacing={fontSize < 12 ? 12 : fontSize}
        height={'hug-contents'}
        hidden={settingsVisible}
      >

        {/* Label */}

        <Text
          fontFamily={config.typography.family}
          fontSize={fontSize}
          fill={labelColor}
        >
          {label}
        </Text>


        {/* Toggle */}

        <AutoLayout
          verticalAlignItems='center'
          padding={{ left: leftPadding, right: rightPadding, top: 8, bottom: 8 }}
          height={'hug-contents'}
          fill={toggleTrackColor}
          cornerRadius={toggleHeight}
          onClick={async () => {

            setVisibility(!visible)

            if (!visible) {
              setLeftPadding(toggleHeight)
              setRightPadding(8)
              setToggleHandleOpacity(config.defaultValue.toggleOnHandleOpacity)
            } else {
              setLeftPadding(8)
              setRightPadding(toggleHeight)
              setToggleHandleOpacity(config.defaultValue.toggleOffHandleOpacity)
            }

            await visibility.toggle(widgetId, !visible)

          }}
        >
          <Ellipse
            width={toggleHeight - 16}
            height={toggleHeight - 16}
            fill={labelColor}
            opacity={toggleHandleOpacity}
          />
        </AutoLayout>

      </AutoLayout>


      {/* Settings UI */}

      <AutoLayout
        direction={'vertical'}
        spacing={16}
        padding={{ left: 0, right: 0, top: 16, bottom: 16 }}
        fill={config.color.surface.primary}
        stroke={config.color.divider.secondary}
        cornerRadius={4}
        height={'hug-contents'}
        hidden={!settingsVisible}
      >

        {/* Label for toggle */}
        {inputField({
          label: 'Label for toggle',
          value: label,
          placeholder: 'Enter label here',
          onClick: setLabel
        })}

        {divider({variant: 'secondary'})}

        {/* Inactive layer opacity */}
        {inputField({
          label: 'Inactive layer opacity',
          value: String(layerOpacity),
          placeholder: String(layerOpacity),
          onClick: setLayerOpacity,
          inputType: 'percentage'
        })}

        {divider({variant: 'primary'})}

        {/* Font size */}
        {inputField({
          label: 'Font size (px)',
          value: String(fontSize),
          placeholder: String(fontSize),
          onClick: setFontSize,
          inputType: 'number'
        })}

        {divider({variant: 'secondary'})}

        {/* Toggle height */}
        {inputField({
          label: 'Toggle height (px)',
          value: String(toggleHeight),
          placeholder: String(toggleHeight),
          onClick: setToggleHeight,
          inputType: 'number'
        })}

        {divider({variant: 'secondary'})}

        {/* Padding */}
        {inputField({
          label: 'Top and bottom padding (px)',
          value: String(padding),
          placeholder: String(padding),
          onClick: setPadding,
          inputType: 'number'
        })}

        {divider({variant: 'secondary'})}

        {/* Label and toggle handle color */}
        {inputField({
          label: 'Label and toggle handle color',
          value: labelColor,
          placeholder: config.color.brand1.primary,
          onClick: setLabelColor,
          inputType: 'hex'
        })}

        {divider({variant: 'secondary'})}

        {/* Toggle track color */}
        {inputField({
          label: 'Toggle track color',
          value: toggleTrackColor,
          placeholder: config.color.brand1.contrast,
          onClick: setToggleTrackColor,
          inputType: 'hex'
        })}

        {divider({variant: 'secondary'})}

        {/* Done button */}
        {button({
          label: 'Done',
          onClick: setSettingsVisibility
        })}

      </AutoLayout>

    </AutoLayout>
  )
}

widget.register(Toggle)
