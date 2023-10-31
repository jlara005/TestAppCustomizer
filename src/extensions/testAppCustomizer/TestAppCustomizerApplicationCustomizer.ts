
//Setting fabric config before all imports
window["FabricConfig"] = {
  fontBaseUrl: 'https://mycdn.com'
};

import * as React from "react";
import * as ReactDOM from "react-dom";
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'TestAppCustomizerApplicationCustomizerStrings';
import App from "../../App";

const LOG_SOURCE: string = 'TestAppCustomizerApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITestAppCustomizerApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TestAppCustomizerApplicationCustomizer
  extends BaseApplicationCustomizer<{}> {
  
  private _topPlaceholder: PlaceholderContent | undefined;

  private _onDispose(): void {

  }

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    console.log(`Initialized ${strings.Title}`);

     // Check if the place holder exists and if not, end cleanly
     if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });
          window.addEventListener('beforeunload', (_e) =>{
            this._topPlaceholder.dispose();
          });

      if (!this._topPlaceholder) {
        return Promise.resolve();
      }
    }

    const foremanElement: React.ReactElement<any> = React.createElement(App);

    ReactDOM.render(foremanElement, this._topPlaceholder.domElement);

    return Promise.resolve();
  }
}
