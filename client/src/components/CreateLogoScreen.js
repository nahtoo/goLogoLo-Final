import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import {Rnd} from 'react-rnd';

const ADD_LOGO = gql`
    mutation AddLogo(
        $texts: [textInput],
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!) {
        addLogo(
            texts: $texts,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin,
            height: $height,
            width: $width) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    changeflag=false;

    componentDidUpdate() {
        console.log("Component Update:")
        console.log(this.state);
    }

    handleFocusChange = (event, data, index) => {
        this.state.focus = index;
        this.state.renderTexts[index].x=data.x;
        this.state.renderTexts[index].y=data.y;
        console.log(this.state.renderTexts[this.state.focus].fontSize);
        console.log("Focus change to " + this.state.focus);
        this.setState({renderTexts: this.state.renderTexts, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius, 
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleTextChange = (event) => {
        let text = event.target;
        this.changeflag = true;
        this.state.renderTexts[this.state.focus].text=text.value;
        this.setState({renderTexts: this.state.renderTexts, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleColorChange = (event) => {
        let color = event.target;
        this.changeflag = true;
        this.state.renderTexts[this.state.focus].color=color.value;
        this.setState({renderTexts: this.state.renderTexts, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleBorderColorChange = (event) => {
        let borderColor = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: borderColor.value, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleBackgroundColorChange = (event) => {
        let backgroundColor = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: backgroundColor.value,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleFontSizeChange = (event) => {
        let fontSize = event.target;
        this.state.renderTexts[this.state.focus].fontSize = parseInt(fontSize.value);
        console.log(fontSize.value)
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius, 
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleBorderWidthChange = (event) => {
        let borderWidth = event.target;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: borderWidth.value, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleBorderRadiusChange = (event) => {
        let borderRadius = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: borderRadius.value,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handlePaddingChange = (event) => {
        let padding = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: padding.value, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleMarginChange = (event) => {
        let margin = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: margin.value,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleWidthChange = (event) => {
        let width = event.target;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: width.value, focus: this.state.focus, numText: this.state.numText});
    }

    handleHeightChange = (event) => {
        let height = event.target;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: height.value, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }
    
    handleMarginChange = (event) => {
        let margin = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: margin.value,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText});
    }

    handleAddText = () => {
        let newtext = {text: "Text" + (this.state.numText), x: 10, y: 10, fontSize: 10, color: "#000000"};
        this.state.renderTexts.push(newtext);
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.numText, numText: (this.state.numText + 1)});
    }

    renderTextLinks = (text, index) => {
        console.log(this.state.renderTexts[index].fontSize);
        return (
        <Rnd key={index} bounds="parent" onDragStop={(event,data) => this.handleFocusChange(event,data,index)} enableResizing="Disable"
            style={{fontSize: this.state.renderTexts[index].fontSize + "pt", color: this.state.renderTexts[index].color}}
            position={{x: this.state.renderTexts[index].x, y: this.state.renderTexts[index].y}}>{text ? text.text : ":("}</Rnd>
        )
    }
 
    renderWorkspace = () => {
        return (
            <div className="col-6">
                <span style={{
                    display: "inline-block",
                    backgroundColor: this.state.renderBackgroundColor,
                    borderColor: this.state.renderBorderColor,
                    borderStyle: "solid",
                    borderWidth: this.state.renderBorderWidth + "pt",
                    borderRadius: this.state.renderBorderRadius + "pt",
                    padding: this.state.renderPadding + "pt",
                    margin: this.state.renderMargin + "pt"
                }}>{this.state.renderTexts ? this.state.renderTexts.map(this.renderTextLinks): ""}</span>
            </div>
        )
    }

    render() {
        let texts, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, height, width;
        if(!this.changeflag) {
            this.state = {
                renderTexts: [],
                renderBackgroundColor: "#FFFFFF",
                renderBorderColor: "#000000",
                renderBorderWidth: 1,
                renderBorderRadius: 1,
                renderPadding: 10,
                renderMargin: 10,
                renderHeight: 10,
                renderWidth: 10,
                focus: null,
                numText: 0
            }
        }
        console.log(this.state);
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body row">
                                <form className="col-6" onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: {  texts: this.state.renderTexts,
                                                            backgroundColor: this.state.renderBackgroundColor, borderColor: this.state.renderBorderColor,
                                                            borderWidth: parseInt(this.state.renderBorderWidth), borderRadius: parseInt(this.state.renderBorderRadius),
                                                            padding: parseInt(this.state.renderPadding), margin: parseInt(this.state.renderMargin), height: parseInt(this.state.renderHeight),
                                                            width: parseInt(this.state.renderWidth)}});
                                    texts.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderWidth.value = "";
                                    borderRadius.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                    height.value = "";
                                    width.value = "";
                                }}>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            texts = node;
                                        }} onChange={this.handleTextChange} placeholder="Texts" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={this.handleColorChange} placeholder="Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={this.handleBackgroundColorChange} placeholder="Background Color" />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={this.handleBorderColorChange} placeholder="Border Color" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={this.handleFontSizeChange}
                                        value={this.state.renderTexts && (this.state.focus != null) && this.state.renderTexts[this.state.focus].fontSize ? this.state.renderTexts[this.state.focus].fontSize : 12}/>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={this.handleBorderWidthChange} placeholder="Border Width" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={this.handleBorderRadiusChange} placeholder="Border Radius" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={this.handlePaddingChange} placeholder="Padding" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={this.handleMarginChange} placeholder="Margin" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Height:</label>
                                        <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 100);}} className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} onChange={this.handleHeightChange} placeholder="Height" />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Width:</label>
                                        <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 100);}} className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} onChange={this.handleWidthChange} placeholder="Width" />
                                    </div>
                                    <button type="button" onClick={this.handleAddText}>Add Text</button>
                                    <button type="button">Add Image</button>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {this.renderWorkspace()}
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;