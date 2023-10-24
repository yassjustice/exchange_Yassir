const getUsers = async (req, res) =>{
    // console.log(req);
    const users = await userServ.getUsers(req);
    res.json(users)
}