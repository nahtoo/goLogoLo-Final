import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import {Rnd} from 'react-rnd';
import { filter } from 'graphql-anywhere';
import update from 'immutability-helper';
import htmlToImage from 'html-to-image';
var _ = require('lodash');

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            texts {
                text
                x
                y
                color
                fontSize
            }
            imageURL {
                url
                x
                y
            }
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            lastUpdate
            height 
            width
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $texts: [textInput],
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!) {
            updateLogo(
                id: $id,
                texts: $texts
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin,
                height: $height,
                width: $width) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    changeflag=false;

    setInitialState = (cleandata) => {
        this.changeflag = true;
        this.setState({
            renderTexts: _.cloneDeep(cleandata.logo.texts),
            renderImages: _.cloneDeep(cleandata.logo.images),
            renderBackgroundColor: cleandata.logo.backgroundColor,
            renderBorderColor: cleandata.logo.borderColor,
            renderBorderWidth: cleandata.logo.borderWidth,
            renderBorderRadius: cleandata.logo.borderWidth,
            renderPadding: cleandata.logo.padding,
            renderMargin: cleandata.logo.margin,
            renderHeight: cleandata.logo.height,
            renderWidth: cleandata.logo.width,
            focus: cleandata.logo.texts.length-1,
            numText: cleandata.logo.texts.length-1
        })
    }

    componentDidUpdate() {
        console.log("Component Update:")
        console.log(this.state);
    }

    handleFocusChange = (event, data, index) => {
        let temp = _.cloneDeep(this.state.renderTexts);
        temp[index].x=data.x;
        temp[index].y=data.y;
        this.changeflag = true;
        this.setState({renderTexts: temp, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: index, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleTextChange = (event) => {
        let text = event.target;
        this.changeflag = true;
        let temp = _.cloneDeep(this.state.renderTexts);
        temp[this.state.focus].text = text.value;
        this.setState({renderTexts: temp, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleColorChange = (event) => {
        let color = event.target;
        this.changeflag = true;
        console.log("Handle Color Change");
        console.log("Color: " + color.value + " Focus" + this.state.focus);
        let temp = _.cloneDeep(this.state.renderTexts);
        temp[this.state.focus].color = color.value;
        this.setState({renderTexts: temp, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleBorderColorChange = (event) => {
        let borderColor = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: borderColor.value, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleBackgroundColorChange = (event) => {
        let backgroundColor = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: backgroundColor.value,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleFontSizeChange = (event) => {
        let fontSize = event.target;
        let temp = _.cloneDeep(this.state.renderTexts);
        temp[this.state.focus].fontSize = parseInt(fontSize.value);
        console.log(fontSize.value)
        this.changeflag = true;
        this.setState({renderTexts: temp, renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius, 
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleBorderWidthChange = (event) => {
        let borderWidth = event.target;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: borderWidth.value, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleBorderRadiusChange = (event) => {
        let borderRadius = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: borderRadius.value,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handlePaddingChange = (event) => {
        let padding = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: padding.value, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleMarginChange = (event) => {
        let margin = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderFontSize: this.state.renderFontSize, renderPadding: this.state.renderPadding, renderMargin: margin.value,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleWidthChange = (event) => {
        let width = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: width.value, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleHeightChange = (event) => {
        let height = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: height.value, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }
    
    handleMarginChange = (event) => {
        let margin = event.target;
        this.changeflag = true;
        this.setState({renderTexts: this.state.renderTexts,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: margin.value,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: this.state.focus, numText: this.state.numText, renderImages: this.state.renderImages});
    }

    handleAddImage = (event) => {
        console.log("Add Image: " + event.target.value)
    }

    checkImageURL = (event) => {
        let url = event.target.value;
        if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            this.handleAddImage(event);
        }
    }

    handleAddText = () => {
        let newtext = {text: "Text" + (this.state.numText), x: 10, y: 10, fontSize: 10, color: "#000000"};
        let temp = _.cloneDeep(this.state.renderTexts);
        temp.push(newtext);
        let newNumtext = this.state.numText + 1;
        this.changeflag = true;
        this.setState({renderTexts: temp,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: newNumtext, numText: newNumtext});
    }

    handleDeleteText = () => {
        let temp = _.cloneDeep(this.state.renderTexts);
        temp.splice(this.state.focus,1);
        let newNumtext = temp.length-1;
        this.changeflag = true;
        this.setState({renderTexts: temp,renderBackgroundColor: this.state.renderBackgroundColor,
            renderBorderColor: this.state.renderBorderColor, renderBorderWidth: this.state.renderBorderWidth, renderBorderRadius: this.state.renderBorderRadius,
            renderPadding: this.state.renderPadding, renderMargin: this.state.renderMargin,
            renderHeight: this.state.renderHeight, renderWidth: this.state.renderWidth, focus: newNumtext, numText: newNumtext});
    }

    renderTextLinks = (text, index) => {
        return (
        <Rnd key={index} bounds="parent" onDragStop={(event,data) => this.handleFocusChange(event,data,index)} enableResizing="Disable"
            style={{fontSize: this.state.renderTexts[index].fontSize + "pt", color: this.state.renderTexts[index].color}}
            position={{x: this.state.renderTexts[index].x, y: this.state.renderTexts[index].y}}>{text ? text.text : ":("}</Rnd>
        )
    }
 
    renderWorkspace = () => {
        return (
            <div className="col-6" id="workspace">
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
        let texts, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, height, width, images;

        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(!this.changeflag) {
                        let cleandata = filter(GET_LOGO, data);
                        this.state = {
                            renderTexts: _.cloneDeep(cleandata.logo.texts),
                            renderBackgroundColor: cleandata.logo.backgroundColor,
                            renderBorderColor: cleandata.logo.borderColor,
                            renderBorderWidth: cleandata.logo.borderWidth,
                            renderBorderRadius: cleandata.logo.borderWidth,
                            renderPadding: cleandata.logo.padding,
                            renderMargin: cleandata.logo.margin,
                            renderHeight: cleandata.logo.height,
                            renderWidth: cleandata.logo.width,
                            focus: cleandata.logo.texts.length-1,
                            numText: cleandata.logo.texts.length-1
                        };
                    }
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form className="col-6" onSubmit={e => {
                                                console.log(this.state.renderTexts);
                                                console.log(data.logo.texts);
                                                e.preventDefault();
                                                console.log(this.state.renderTexts);
                                                console.log(data.logo.texts);
                                                updateLogo({ variables: { id: data.logo._id, texts: this.state.renderTexts,
                                                    backgroundColor: this.state.renderBackgroundColor, borderColor: this.state.renderBorderColor,
                                                    borderWidth: parseInt(this.state.renderBorderWidth), borderRadius: parseInt(this.state.renderBorderRadius),
                                                    padding: parseInt(this.state.renderPadding), margin: parseInt(this.state.renderMargin), height: parseInt(this.state.renderHeight),
                                                    width: parseInt(this.state.renderWidth)}});

                                                texts.value = "";
                                                color.value = "";
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
                                                    }} onChange={this.handleTextChange} placeholder={this.state.renderTexts[this.state.focus].text ? this.state.renderTexts[this.state.focus].text : "Text"} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Image:</label>
                                                    <input type="text" className="form-control" name="image" ref={node => {
                                                        images = node;
                                                    }} placeholder={"Image"} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }}onChange={this.handleColorChange} value={this.state.renderTexts[this.state.focus].color ? this.state.renderTexts[this.state.focus].color : "black"} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={this.handleBackgroundColorChange} value={this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "black"} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={this.handleBorderColorChange} value={this.state.renderBorderColor ? this.state.renderBorderColor : "black"} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} onChange={this.handleFontSizeChange}
                                                    value={this.state.renderTexts && (this.state.focus != null) && this.state.renderTexts[this.state.focus].fontSize ? parseInt(this.state.renderTexts[this.state.focus].fontSize) : 12}/>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={this.handleBorderWidthChange} value={this.state.renderBorderWidth ? parseInt(this.state.renderBorderWidth) : 10} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={this.handleBorderRadiusChange} value={this.state.renderBorderRadius ? parseInt(this.state.renderBorderRadius) : 10} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={this.handlePaddingChange} value={this.state.renderPadding ? parseInt(this.state.renderPadding) : 10} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} onChange={this.handleMarginChange} value={this.state.renderMargin ? parseInt(this.state.renderMargin) : 10} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Height:</label>
                                                    <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 100);}} className="form-control" name="height" ref={node => {
                                                        height = node;
                                                    }} onChange={this.handleHeightChange} value={this.state.renderHeight ? parseInt(this.state.renderHeight) : 10} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Width:</label>
                                                    <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 100);}} className="form-control" name="width" ref={node => {
                                                        width = node;
                                                    }} onChange={this.handleWidthChange} value={this.state.renderWidth ? parseInt(this.state.renderWidth) : 10} />
                                                </div>
                                                <button type="button" onClick={this.handleAddText}>Add Text</button>
                                                <button type="button" onClick={this.handleDeleteText}>Delete Text</button>
                                                <button type="button" onClick={this.handleAddImage}>Add Image</button>
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;