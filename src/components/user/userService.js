import User from '../../models/User'

// create new user
export async function createUser(user) {
    try {
        const newUser = await User.create(user)
        return newUser
    } catch (e) {
        console.log(`Error in createUser - ${e.message}`)
        throw e
    }
}

export async function updateUser(id, user) {
    try {
        await User.findByIdAndUpdate(id, user)
        return {
            success: true,
        }
    } catch (e) {
        console.log(`Error in updateUser - ${e.message}`)
        throw e
    }
}

export async function fetchUserList(params) {
    const attributes = { name: 1, address: 1, phone: 1, email: 1, role: 1, avatar: 1 }

    const { keyword = '', page = 0, limit = 10, order, orderBy } = params

    const searchKeyword = {
        $regex: keyword,
        $options: 'i',
    }
    const sort = {}
    if (order && orderBy) sort[orderBy] = order

    const userWhere = {
        $or: [
            {
                name: searchKeyword,
            },
            {
                email: searchKeyword,
            },
            {
                address: searchKeyword,
            },
            {
                phone: searchKeyword,
            },
        ],
    }
    try {
        const rawData = {}
        rawData.rows = await User.find(userWhere, attributes)
            .sort({ ...sort })
            .limit(+limit)
            .skip(+page * +limit)

        rawData.count = await User.find(userWhere, attributes).count()

        return rawData
    } catch (e) {
        console.log(`Error in fetchUserList - ${e.message}`)
        throw e
    }
}
