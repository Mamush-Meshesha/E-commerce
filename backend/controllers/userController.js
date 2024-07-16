import asyncHandler from "../middleware/asyncHandler.js"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"



//auth user get token
// route   POST /api/users/login
//access Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
        
        generateToken(res, user.id)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email Address or Password");
    }

    
})


// register user
//route POST /api/users
//access Public

const registerUser = asyncHandler(async (req, res) => { 
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })
    
    if (userExist) {
        res.status(400)
        throw new Error("User already exist")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user.id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// logout user / clear cookies
//route POST /api/users/logout
//  access Private


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ messsage: 'logged out successfully' })
})

// Get user profile
//route GET /api/users/profile
// access Public

const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)
    
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("user not found")
    }
})

// update user profile
// PUT /api/users/profile
// access Private


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if (user) { 
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("user not found")
    }
})


// Get user
//route GET /api/users
// access Private/Admin

const getUser = asyncHandler(async (req, res) => { 
    const users = await User.find({})
    res.status(200).json(users)
}
)

// Get user
//route GET /api/users/:id
// access Private/Admin

const getUserById = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id).select('-password')
    
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error("user not found")
    }
}
)


//  delete user
//route DELETE /api/users
// access Private/Admin

const deleteUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("you can't delete an admin")
        }
        await User.deleteOne({ _id: user.id })
        res.status(200).json({messsage: "user deleted successfully"})
    } else {
        res.status(404)
        throw new Error("user not found")
    }
})


// update user
//route PUt /api/users/:id
//access private/admin

const updateUser = asyncHandler(async (req, res) => { 
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("user not found")
    }
    
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUser,
    deleteUser,
    getUserById,
    updateUser
}
