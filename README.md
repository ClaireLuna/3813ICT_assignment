# 3813ICT Assignment

## Git Organisation
### Branching
I did not use any branches for this project as I was the only one working on it. 

### Update Frequency
I committed and pushed my changes when I had finished a component or set of related endpoints.

### Frontend/Backend
The frontend and backend of this project are in two separate repos. This was to make it easier to mentally separate the work.

## Data Structures
### User
__id__: string

__username__: string

__email__: string

__hash__: string - stored in db, generated from password

__apiToken__: string

__role__: string - User, Admin, or SuperAdmin

### Group
__id__: string

__name__: string

__createdBy__: User - The user who created the group

### Channel
__id__: string

__name__: string

__group__: Group - The group the channel belongs to

### GroupUser
Used in db for relationship between user and group

__id__: string

__user__: User

__group__: Group

## Angular Architecture
### Components
- login
- register
- groups
- channels
- channel-details
- users

### Services
- auth
- channel
- error
- group
- user

### Models
- channel
- group
- user

### Routes
- /login
- /register
- /groups
- /channels
- /channels/details
- /users

## Server Routes
### Auth
__Register__

__params__: username, email, password

__returns__: user object

__purpose__: Allow users to register and access the site


__Login__

__params__: username, password

__returns__: user object

__purpose__: Allow users to login and access the site

### Channel
