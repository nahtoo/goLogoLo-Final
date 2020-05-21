import  React, {Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {Rnd} from 'react-rnd';
import htmlToImage from 'html-to-image';

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
                width
                height
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

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    handleExport = (event) => {
        htmlToImage.toJpeg(document.getElementById("workspace"), { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'myLogo.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    renderTextLinks = (text, index) => {
        console.log(text);
        return (
        <Rnd key={index} enableResizing="Disable" disableDragging="True"
            style={{fontSize: text.fontSize + "pt", color: text.color}}
            position={{x: text.x, y: text.y}}>{text ? text.text : ":("}</Rnd>
        )
    }

    renderImagesSpaces = (image, index) => {
        console.log(image);
        return (
        <Rnd key={index} bounds="parent"
            position={{x: image.x, y: image.y}} size={{width: image.width + "px", height: image.height + "px"}}
            onResizeStop={(event, direction, ref) => this.handleResizeImage(event,ref,index)}
            onDragStop={(event,data) => this.handleMoveImage(event,data,index)}><img src={image.url} alt={"whoops"} style={{maxWidth: "100%", maxHeight: "100%"}}></img></Rnd>
        )
    }
 
    renderWorkspace = (data) => {
        return (
            <div className="col-6" id="workspace">
                <span style={{
                    display: "inline-block",
                    backgroundColor: data.logo.backgroundColor,
                    borderColor: data.logo.borderColor,
                    borderStyle: "solid",
                    borderWidth: data.logo.borderWidth + "pt",
                    borderRadius: data.logo.borderRadius + "pt",
                    padding: data.logo.padding + "pt",
                    margin: data.logo.margin + "pt"
                }}>{data.logo.texts ? data.logo.texts.map(this.renderTextLinks): ""}
                    {data.logo.imageURL ? data.logo.imageURL.map(this.renderImagesSpaces): ":("}</span>
            </div>
        )
    }

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body row">
                                    <div className="col-6">
                                        <dl>
                                            <dt>BackgroundColor:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>BorderColor:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Height:</dt>
                                            <dd>{data.logo.height}</dd>
                                            <dt>Width:</dt>
                                            <dd>{data.logo.width}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                            <button type="button" onClick={this.handleExport}>Export</button>
                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                    </div>
                                    {this.renderWorkspace(data)}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;