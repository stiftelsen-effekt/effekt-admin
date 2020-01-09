import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { red20, green20 } from "../../colors";

export const EffektToastContainer = styled(ToastContainer)`
    .Toastify__toast {
        font-family: 'Roboto';
    }

    .Toastify__toast--error {
        background: ${red20};
    }

    .Toastify__toast--success {
        background: ${green20};
    }
`