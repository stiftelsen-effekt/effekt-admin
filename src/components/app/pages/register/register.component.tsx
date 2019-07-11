import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import React from "react";
import { Page } from "../../style/elements/page.style";
import KIDComponent from "../../modules/kid/kid.component";
import { EffektText } from "../../style/elements/text.style";

class RegisterComponent extends React.Component {
    render() {
        return (
            <Page>
                <MainHeader>Register donations</MainHeader>
                <SubHeader>Upload report</SubHeader>
                <SubHeader>Process single donation</SubHeader>
                <EffektText placeholder="KID"></EffektText>
                <KIDComponent></KIDComponent>
            </Page>
        )
    }
}

export default RegisterComponent;