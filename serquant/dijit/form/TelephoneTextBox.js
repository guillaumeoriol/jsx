define("serquant/dijit/form/TelephoneTextBox", ["dojo", "dijit", "text!serquant/dijit/form/templates/TelephoneTextBox.html", "dojo/i18n", "dijit/form/TextBox", "dijit/Tooltip", "serquant/dojo/telephone"], function(dojo, dijit) {

dojo.declare(
    "serquant.dijit.form.TelephoneTextBox",
    dijit.form.TextBox,
    {
        // summary:
        //      Class for textbox widget with the ability to validate
        //      a telephone number and provide user feedback.
        // tags:
        //      protected

        templateString: dojo.cache("serquant.dijit.form", "templates/TelephoneTextBox.html"),
        baseClass: "dijitTextBox dijitTelephoneTextBox",

        // required: Boolean
        //      User is required to enter data into this field.
        required: false,
        
        // intermediateChanges: Boolean
        //      Fires onChange for each value change or only on demand
        intermediateChanges: false,

        // promptMessage: String
        //      If defined, display this hint string immediately on focus to the textbox, if empty.
        //      Also displays if the textbox value is Incomplete (not yet valid but will be with additional input).
        //      Think of this like a tooltip that tells the user what to do, not an error message
        //      that tells the user what they've done wrong.
        //
        //      Message disappears when user starts typing.
        promptMessage: "",

        // invalidMessage: String
        //      The message to display if value is invalid.
        //      The translated string value is read from the message file by default.
        //      Set to "" to use the promptMessage instead.
        invalidMessage: "$_unset_$",

        // missingMessage: String
        //      The message to display if value is empty and the field is required.
        //      The translated string value is read from the message file by default.
        //      Set to "" to use the invalidMessage instead.
        missingMessage: "$_unset_$",

        // message: String
        //      Currently error/prompt message.
        //      When using the default tooltip implementation, this will only be
        //      displayed when the field is focused.
        message: "",

        // constraints: Object
        //      user-defined object needed to pass parameters to the formatter
        //      and parser functions
        constraints: {},

        // state: [readonly] String
        //      Shows current state (ie, validation result) of input (""=Normal, Incomplete, or Error)
        state: "",

        // tooltipPosition: String[]
        //      See description of `dijit.Tooltip.defaultPosition` for details on this parameter.
        tooltipPosition: [],

        // country: String
        //      The ISO 3166 alpha-2 country code used by telephone functions
        //      to filter a domestic telephone number or to format it.
        country: undefined,
        
        _setValueAttr: function(){
            // summary:
            //      Hook so set('value', ...) works.
            
            // @todo Understand why validate() is needed
            this.inherited(arguments);
            this.validate(this._focused);
        },

        isValid: function(/*Boolean*/ isFocused){
            // summary:
            //      Tests if value is valid.
            //      Can override with your own routine in a subclass.
            // tags:
            //      protected
            return serquant.dojo.telephone.isValidCanonical(this.valueNode.value);
        },

        _isEmpty: function(value){
            // summary:
            //      Checks for whitespace
            return (this.trim ? /^\s*$/ : /^$/).test(value); // Boolean
        },

        getErrorMessage: function(/*Boolean*/ isFocused){
            // summary:
            //      Return an error message to show if appropriate
            // tags:
            //      protected
            return (this.required && this._isEmpty(this.textbox.value)) ? this.missingMessage : this.invalidMessage; // String
        },

        getPromptMessage: function(/*Boolean*/ isFocused){
            // summary:
            //      Return a hint message to show when widget is first focused
            // tags:
            //      protected
            return this.promptMessage; // String
        },

        _formatter: serquant.dojo.telephone.format,

        format: function(/*String*/ value, /*Object*/ constraints){
            // summary:
            //      Formats a value (internal E.164 representation) into a human
            //      readable string.
            // tags:
            //      protected extension
            return this._formatter(value, constraints);
        },
        
        filter: function(val){
            // summary:
            //      Auto-corrections (such as trimming) that are applied to
            //      textbox value on blur or form submit.
            // description:
            //      For telephone numbers, filter() should only convert 
            //      letters into digits and remove anything that is not a digit,
            //      and parse() should produce the internal E.164 value. 
            //      Unfortunately, filtering would remove the international 
            //      prefix placeholder ("+") that is necessary to interpret user
            //      input. For this reason, filter() does nothing and parse() 
            //      does everything.
            //
            //      TODO: break this into two methods in 2.0
            //
            // tags:
            //      protected extension
            if(val === null){ return this._blankValue; }
            return val; // String
        },

        _parser: serquant.dojo.telephone.filter,
        
        parse: function(/*String*/ val, /*Object*/ constraints){
            // summary:
            //      Converts a formatted string to an internal value
            // tags:
            //      protected extension

            return this._parser(val, constraints); // String
        },
        
        serialize: function(/*anything*/ val, /*Object?*/ options){
            // summary:
            //      Overridable function used to convert the get('value') result
            //      to a canonical (non-localized) string. For example, will 
            //      print dates in ISO format, and numbers the same way as they
            //      are represented in javascript. 
            //      For telephone numbers, no transformation happens as the
            //      internal representation is aready a string.
            // tags:
            //      protected extension
            return val.toString ? val.toString() : ""; // String
        },
        
        toString: function(){
            // summary:
            //      Returns widget as a printable string using the widget's value
            // tags:
            //      protected
            
            // Process:
            // [1] get('value') proxies to dijit.form.TextBox#_getValueAttr() [2]
            // [2] parses the value returned by dijit.form.TextBox#_getDisplayedValueAttr() [3]
            // [3] filters this.textbox.value
            var val = this.get('value');
            return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : ""; // String
        },

        validate: function(/*Boolean*/ isFocused){
            // summary:
            //      Called by oninit, onblur, and onkeypress.
            // description:
            //      Show missing or invalid messages if appropriate, and highlight textbox field.
            // tags:
            //      protected

            // Filters, parses and finally serializes the input value to store 
            // its canonical form into the hidden input.
            this.valueNode.value = this.toString();
            
            var message = "";
            var isEmpty = this._isEmpty(this.textbox.value);
            var isValid = this.disabled 
                || (isEmpty && !this.required)
                || this.isValid(isFocused);
            this._set("state", isValid ? "" : 
                ((!this._hasBeenBlurred || isFocused) && isEmpty) ? "": "Error");
            dijit.setWaiState(this.focusNode, "invalid", isValid ? "false" : "true");

            if(!isValid){
                message = this.getErrorMessage(isFocused);
            }else if(isEmpty){
                message = this.getPromptMessage(isFocused); // show the prompt whenever there's no error and no text
            }
            this.set("message", message);

            return isValid;
        },

        displayMessage: function(/*String*/ message){
            // summary:
            //      Overridable method to display validation errors/hints.
            //      By default uses a tooltip.
            // tags:
            //      extension
            dijit.hideTooltip(this.domNode);
            if(message && this._focused){
                dijit.showTooltip(message, this.domNode, this.tooltipPosition, !this.isLeftToRight());
            }
        },

        _refreshState: function(){
            // Overrides TextBox._refreshState()
            //
            // This function is called by dijit.form.TextBox#_onInput()
            // and dijit.form.TextBox#_onFocus().
            this.validate(this._focused);
            this.inherited(arguments);
        },

        //////////// INITIALIZATION METHODS ///////////////////////////////////////

        constructor: function(){
            this.constraints = {};
        },

        _setCountryAttr: function(/*String*/ country){
            if (country) {
                var constraints = this.get('constraints');
                constraints.country = country;
                this.set('constraints', constraints);
                this._refreshState();
            }
        },
        
        _setConstraintsAttr: function(/*Object*/ constraints){
            if(!constraints.locale && dojo.locale){
                constraints.locale = dojo.locale;
            }
            if(!constraints.country){
                constraints.country = dojo.cldr.supplemental._region(constraints.locale);
            }
            if(!constraints.type){
                constraints.type = 'mixed';
            }
            this._set("constraints", constraints);
        },

        postMixInProperties: function(){
            this.inherited(arguments);
            this.messages = dojo.i18n.getLocalization("dijit.form", "validate", this.lang);
            if(this.invalidMessage == "$_unset_$"){ this.invalidMessage = this.messages.invalidMessage; }
            if(!this.invalidMessage){ this.invalidMessage = this.promptMessage; }
            if(this.missingMessage == "$_unset_$"){ this.missingMessage = this.messages.missingMessage; }
            if(!this.missingMessage){ this.missingMessage = this.invalidMessage; }
            this._setConstraintsAttr(this.constraints); // this needs to happen now (and later) due to codependency on _set*Attr calls attachPoints
            // we want the name attribute to go to the hidden <input>, not the displayed <input>,
            // so override _FormWidget.postMixInProperties() setting of nameAttrSetting
            this.nameAttrSetting = "";
        },

        _setDisabledAttr: function(/*Boolean*/ value){
            this.inherited(arguments);  // call FormValueWidget._setDisabledAttr()
            this._refreshState();
        },

        _setRequiredAttr: function(/*Boolean*/ value){
            this._set("required", value);
            dijit.setWaiState(this.focusNode, "required", value);
            this._refreshState();
        },

        _setMessageAttr: function(/*String*/ message){
            this._set("message", message);
            this.displayMessage(message);
        },

        _onFocus: function(){
            // summary:
            //      This is where widgets do processing for when they are active,
            //      such as changing CSS classes. See onFocus() for more details.
            // description:
            //      The internal E.164 representation consists of digits only
            //      starting with the country code. It has to be formatted 
            //      before user input to be able to validate telephone on blur. 
            // tags:
            //      protected
            if(this.disabled || this.readOnly){ return; }
            
            var formattedValue = this.format(this.get('value'), this.constraints);
            if(formattedValue !== undefined){
                this.textbox.value = formattedValue;
            }
            this.inherited(arguments);
        },
        
        buildRendering: function(){
            // Overrides `dijit._Templated.buildRendering`

            this.inherited(arguments);

            // Create a hidden <input> node with the serialized value used for submit
            // (as opposed to the displayed value).
            // Passing in name as markup rather than calling dojo.create() with an attrs argument
            // to make dojo.query(input[name=...]) work on IE. (see #8660)
            this.valueNode = dojo.place("<input type='hidden'" + (this.name ? " name='" + this.name.replace(/'/g, "&quot;") + "'" : "") + "/>", this.textbox, "after");
        },

        reset: function(){
            // Overrides `dijit.form._FormWidget#reset` to
            // reset the hidden textbox value to ''
            this.valueNode.value = '';
            this.inherited(arguments);
        }
    }
);

return serquant.dijit.form.TelephoneTextBox;
});
