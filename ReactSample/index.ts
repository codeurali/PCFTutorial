// PPCF Component = Handle data on the form.

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IHelloWorldProps, Address } from "../types";
import { HelloWorld } from "./HelloWorld";
import * as React from "react";

export class ReactSample
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private _theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private _notifyOutputChanged: () => void;

  // Define the shape of the HelloWorld component's props and initialize them with default values
  private _props: IHelloWorldProps = {
    address: {} as Address,
    onChangeAddress: (address: Address) => {
      this._props.address = address;
    },
  };

  /*
   *
   * On some PCF using react, you can see this type of synthax code fot the callback function:
   * private _props: IHelloWorldProps = {
   *  address: {} as Address,
   * onChangeAddress: _updateProps.bind(this),
   * };
   *
   * This is a way to bind the onChangeAddress function to the ReactSample class.
   * It is not necessary here because we are using an arrow function.
   * And I think it is not a good practice to bind a function to a class.
   * Because it can be confusing when you are using the 'this' keyword in the function.
   * Also, binding a function to a class can cause performance issues because the class is regenerated on every render.
   *
   */

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this._notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    // Update the props based on the context values set by the customizer in the manifest editor
    this._updateProps(context);
    return React.createElement(HelloWorld, this._props);
  }

  // Update the props based on the context values set by the customizer in the manifest editor
  private _updateProps(context: ComponentFramework.Context<IInputs>): void {
    // Change to the desired Address format
    if (context.parameters.address_id.raw) {
      this._props.address = {
        id: context.parameters.address_id.raw || "",
        street_number: context.parameters.street_number.raw || "",
        street_name: context.parameters.street_name.raw || "",
        postcode: context.parameters.postcode.raw || "",
        city: context.parameters.city.raw || "",
      };
      this._notifyOutputChanged();
    }
  }

  private _clearProps(): void {
    this._props.address = {
      id: "",
      street_number: "",
      street_name: "",
      postcode: "",
      city: "",
    };
    this._notifyOutputChanged();
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      // Change to the desired data to be sent to the form
      address_id: this._props.address.id,
      street_number: this._props.address.street_number,
      street_name: this._props.address.street_name,
      postcode: this._props.address.postcode,
      city: this._props.address.city,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
