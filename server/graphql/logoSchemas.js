var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderWidth: {
                type: GraphQLInt
            },
            borderRadius: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            imageURL: {
                type: new GraphQLList(imageURLType)
            },
            texts: {
                type: new GraphQLList(textType)
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var imageURLType = new GraphQLObjectType({
    name: "imageURL",
    fields: function() {
        return {
            url: {
                type: GraphQLString
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            }
        }
    }
})

var imageURLInputType = new GraphQLInputObjectType({
    name: "imageURLInput",
    fields: function() {
        return {
            url: {
                type: GraphQLString
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            }
        }
    }
})

var textType = new GraphQLObjectType({
    name: "text",
    fields: function() {
        return {
            text: {
                type: GraphQLString
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            },
            fontSize: {
                type: GraphQLInt
            },
            color: {
                type: GraphQLString
            }
        }
    }
});

var textTypeInput = new GraphQLInputObjectType({
    name: "textInput",
    fields: function() {
        return {
            text: {
                type: GraphQLString
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            },
            fontSize: {
                type: GraphQLInt
            },
            color: {
                type: GraphQLString
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            getLogoByText: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: params.text}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            },
            getLogosByTextContains: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: {$regex: params.text, $options: 'i'}}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }, 
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageURL: {
                        type: new GraphQLList(imageURLInputType)
                    },
                    texts: {
                        type: new GraphQLList(textTypeInput)
                    },
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }, 
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageURL: {
                        type: new GraphQLList(imageURLInputType)
                    },
                    texts: {
                        type: new GraphQLList(textTypeInput)
                    },
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id,
                        { texts: params.texts,
                            backgroundColor : params.backgroundColor, borderColor : params.borderColor,
                            borderWidth: params.borderWidth, borderRadius: params.borderRadius,
                            padding: params.padding, margin: params.margin, lastUpdate: new Date(), height: params.height, width: params.width, 
                            imageURL: params.imageURL}, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });