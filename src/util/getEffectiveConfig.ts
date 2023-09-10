export default function getEffectiveConfig(
  cmdrString: string | undefined, 
  showOnlyOwnInteraction: boolean, 
  highlightOwnInteractions: boolean, 
  highlightOwnInteractionsColor: string, 
  interactionsColor: string,
  backgroundColor: string,
  useGreenScreen: boolean,
  alignment: string) {

    const ownCmdrs = (cmdrString ?? "").split(",").map(e => e.trim()).filter(e => e.length > 0)
    const showOtherInteractions = !showOnlyOwnInteraction
    const ownInteractionColor = highlightOwnInteractions ? highlightOwnInteractionsColor : interactionsColor
    const otherInteractionColor = interactionsColor
    if(!["topLeft", "topRight", "bottomLeft", "bottomRight"].includes(alignment)) {
      console.error("alignment includes invalid "+alignment+" entry. Falling back to topRight")
      alignment = "topRight"
    }

    const alignmentEnum = alignment as "topLeft" | "topRight" | "bottomLeft" | "bottomRight"

    return {
      ownCmdrs,
      showOnlyOwnInteraction,
      ownInteractionColor,
      otherInteractionColor,
      showOtherInteractions,
      backgroundColor,
      useGreenScreen,
      alignment: alignmentEnum
    }


}