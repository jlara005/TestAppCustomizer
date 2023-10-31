import * as React from "react";
import {
    DefaultButton
} from "office-ui-fabric-react";

export default class App extends React.Component {
    constructor() {
        super();
    }

    public render(): JSX.Element {
        return (<DefaultButton
            text="Test Button"
        ></DefaultButton>)
    }
}