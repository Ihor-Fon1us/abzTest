class Mapper {
    static UserToAPI(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: user.position.name,
            position_id: user.position_id,
            registration_timestamp: Math.round(user.createdAt / 1000),
            photo: user.photo
        }
    }

    static UsersToAPI(req, users, totalUsers, offset, host) {

        const totalPages = Math.ceil(totalUsers / req.query.count);
        const nextPage = req.query.page >= totalPages ? null : +req.query.page + 1;
        const prevPage = req.query.page <= 1 ? null : req.query.page - 1;
        const page = (offset / req.query.count) + 1;
        return {
            success: true,
            page: page,
            total_pages: totalPages,
            total_users: totalUsers,
            count: req.query.count,
            links: {
                next_url: !nextPage ? null : `${host}/users?page=${nextPage}&count=${req.query.count}`,
                prev_url: !prevPage ? null : `${host}/users?page=${prevPage}&count=${req.query.count}`
            },
            users: users.map((x) => {
                return this.UserToAPI(x);
            })
        }
    }
}
module.exports = Mapper;