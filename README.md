## Adding New Logo

```graphql
mutation {
  addLogo(texts: [{text: "Text0", x: 10, y: 10, fontSize: 10, color: "#000000"}], backgroundColor: "#ffec08", 
    borderColor: "#ffec08", borderWidth: 13, borderRadius: 3, height: 10, width: 10,
    padding: 13, margin: 10, imageURL: [{url: "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg", x: 10, y:10, width: 90, height: 100}]) {
    texts {
      text
    }
  }
}
```


## Deleting a Logo

```graphql
mutation {
  removeLogo(id: "5e8e7f242c3d9614d53807c3") {
    _id
    texts {
      text
    }
  }
}
```

## Updating a Logo

```graphql
mutation {
  updateLogo(id: "5ec17d90a893c64c7da0fba7", texts: [{text: "Text0", x: 10, y: 10, fontSize: 10, color: "#000000"}], backgroundColor: "#ffec08", 
    borderColor: "#ffec08", borderWidth: 13, borderRadius: 3, height: 10, width: 10,
    padding: 13, margin: 10, imageURL: [{url: "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg", x: 10, y:10, width: 90, height: 100}]) {
    texts {
      text
    }
  }
}
```

## Querying for All Logos

```graphql
{
  logos {
    texts {
      text
      fontSize
      color
      x
      y
    }
    imageURL{
      url
      x
      y
      width
      height
    }
    borderColor
    backgroundColor
    borderWidth
    borderRadius
    height
    width
    padding
    margin
  }
}
```

## Querying for Specific Logo

```graphql
{
  logo(id:"5ec17d90a893c64c7da0fba7") {
    texts {
      text
      fontSize
      color
      x
      y
    }
    imageURL{
      url
      x
      y
      width
      height
    }
    borderColor
    backgroundColor
    borderWidth
    borderRadius
    height
    width
    padding
    margin
  }
}
```
