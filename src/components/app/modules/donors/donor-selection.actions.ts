export const SHOW_DONOR_SELECTION_COMPONENT = "SHOW_DONOR_SELECTION_COMPONENT"
export const HIDE_DONOR_SELECTION_COMPONENT = "HIDE_DONOR_SELECTION_COMPONENT"

export const showDonorSelectionComponent= () => {
    return {
        type: SHOW_DONOR_SELECTION_COMPONENT
    }
}

export const hideDonorSelectionComponent= () => {
    return {
        type: HIDE_DONOR_SELECTION_COMPONENT
    }
}