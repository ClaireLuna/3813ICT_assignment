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

### Group
__Post__

__params__: name

__returns__: group object

__purpose__: create a new group

__Get__

__params__: none

__returns__: list of all groups the user is a member of

__purpose__: Get all of the user's groups

__Get by ID__

__params__: group ID

__returns__: group object

__purpose__: Get the details of a particular group

__Put__

__params__: id, name

__returns__: group object

__purpose__: Allow updating group name

__Delete__

__params__: id

__returns__: group object

__purpose__: Allow deleting a group

### Channel
__Get__

__params__: group ID

__returns__: List of channels in the provided group

__purpose__: Get all channels in a group

__Get by ID__

__params__: id

__returns__: channel object

__purpose__: Get channel by ID

__Post__

__params__: group ID, name

__returns__: channel object

__purpose__: Create a channel

__Put__

__params__: id, name

__returns__: channel object

__purpose__: Update channel name

__delete__

__params__: id

__returns__: response status

__purpose__: delete channel

### User
__Get__

__params__: none

__returns__: List of all users

__purpose__: Get all users

__Get current__

__params__: none

__returns__: Current user object

__purpose__: Get details of current user

__Get by ID__

__params__: id

__returns__: user object

__purpose__: Get user by ID

__Put__

__params__: id, email?, role?

__returns__: user object

__purpose__: Update email or role for user

__Delete__

__params__: id

__returns__: status code

__purpose__: delete user

