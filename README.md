# A Paint Company

An app with kanban style lanes for keeping track of paint inventory.

## Features

1. kanban view of paints with their quantites
2. Paints are automatically placed in Kanban lanes based on quantity of stock
3. kanban reflows from horizontal to vertical for small screen devices
2. edit paint quantities
3. delete paints
4. add new paints

## The next features to add

1. authentication
2. user management
3. backend validation
4. an edit page for swim lane settings

## Design

This is a backend for frontend React + Node app deployed to Heroku.  The database is MongoDB. 

### Database model

* paints
  * _id
  * colour
  * quantity
* settings
  * _id
  * swim_lanes[]
    * name
    * min_qty
    * max_qty

The settings collection has only one document which stores the settings for the swim lanes.

**Paint doc example**

```json 
{  
  "_id": "62869a88e02d28f0a0407e55",  "qty": 0,  
  "colour": "Blue"
}
```

**Settings doc example**

```json 
{
  "_id": "62869a451ce5add2c2aaffe5",
  "swim_lanes": [
    {
      "name": "Available",
      "min_qty": 10
    },
    {
      "name": "Running Low",
      "min_qty": 1,
      "max_qty": 9
    },
    {
      "name": "Out of Stock",
      "max_qty": 0
    }
  ]
}
```

### API endpoints

| Path | Method | Body | Response |
| --- | --- | --- | --- |
| `/api/paints` | POST | list of paints | na |
| `/api/paints` | GET | na | list of paints |
| `/api/paints` | PUT | list of paints. Only `_id` and attributes being changed are required | na |
| `/api/paints/id` | DELETE | na | na |
| `/api/lanes` | GET | na | list of swim lanes: each lane has a list of paints. |

For the kanban, the get lanes API endpoint constructs the lanes using the settings document and the paints collection.

**Get lanes: response body example**

```json
[
    {
        "name": "Available",
        "min_qty": 10,
        "paints": [
            {
                "_id": "62869acce02d28f0a0407e57",
                "qty": 10,
                "colour": "Black"
            }
        ]
    },
    {
        "name": "Running Low",
        "min_qty": 1,
        "max_qty": 9,
        "paints": [
            {
                "_id": "62869afee02d28f0a0407e59",
                "qty": 1,
                "colour": "Purple"
            },
            {
                "_id": "62869ae0e02d28f0a0407e58",
                "qty": 5,
                "colour": "White"
            },
            {
                "_id": "62869aa9e02d28f0a0407e56",
                "qty": 9,
                "colour": "Grey"
            }
        ]
    },
    {
        "name": "Out of Stock",
        "max_qty": 0,
        "paints": [
            {
                "_id": "62869a88e02d28f0a0407e55",
                "qty": 0,
                "colour": "Blue"
            }
        ]
    }
]
```

**Get paints: response body example**

```json
[
    {
        "_id": "62869acce02d28f0a0407e57",
        "qty": 10,
        "colour": "Black"
    },
    {
        "_id": "62869a88e02d28f0a0407e55",
        "qty": 0,
        "colour": "Blue"
    },
    {
        "_id": "62869aa9e02d28f0a0407e56",
        "qty": 9,
        "colour": "Grey"
    },
    {
        "_id": "62869afee02d28f0a0407e59",
        "qty": 1,
        "colour": "Purple"
    },
    {
        "_id": "62869ae0e02d28f0a0407e58",
        "qty": 5,
        "colour": "White"
    }
]
```

### Frontend component tree

* ChakraProvider
  * App
    * Router
      * WithData
        * Home
          * SpinnerBox
          * KanbanStack
            * LaneCard
              * PaintCard
      * WithData
        * Edit
          * SpinnerBox
          * NewPaintModal
          * EditRow
          *   DeletePaintDialog


## Installation and deployment

Create a mongo database.

Install node modules with `npm install`.

In the project root folder, create the file `.env.local` with the following:

```
MONGO_URI="your-mongo-connection-string"
MONGO_DB="your-mongo-database"
STAGE="dev"
```

The commands to run the application are in the package.json file:

`npm run dev` to run both the server and the React app locally.
`npm run local` to run only the server locally.

To set up a Heroku app to deploy to and the Heroku CLI, follow instructions on Heroku:
https://devcenter.heroku.com/articles/git

Add the config variables `MONGO_URI` and `MONGO_DB` to you Heroku app.

`git push heroku main` to deploys latest changes in git to the Heroku app.  

No additionally configuration is required.  Heroku will detect that it is a node application, and will automatically run `npm build` then `npm start`.

