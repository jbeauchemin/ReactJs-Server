// Variables
const users = [
    { '_id': '1', 'prenom': 'Jonathan', 'nom': 'Beauchemin', 'code': 'beaJo' },
    { '_id': '2', 'prenom': 'Jacob', 'nom': 'Lamontagne', 'code': 'lamJo' },
    { '_id': '3', 'prenom': 'France', 'nom': 'Lajoie', 'code': 'lajfa' },
];


//@desc		Get all users
//@route	Get /users
//@access	Public
exports.getUsers = ((req, res) => {
    res.status(201).send({
        'success': true,
        'data': users,
        'length': users.length
    });
});

//@desc		Get single user
//@route	Get /users/:id
//@access	Public
exports.getUser = ((req, res) => {
    const { id } = req.params;

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user._id == id) {
            return res.status(201).send({
                'success': true,
                'data': user,
            });
        }
    }

    error(res, `Attention, aucun utilisateur trouvé avec le id : ${id}`);
});


//@desc		Create user
//@route	Post /users
//@access	Public
exports.createUser = ((req, res) => {
    const { prenom, nom, code } = req.body;

    checkBodyVariable(req, res);

    users.push({
        '_id': users.length + 1,
        'prenom': prenom,
        'nom': nom,
        'code': code
    })

    res.status(201).send({
        'success': true,
        'msg': 'Élément ajouté',
        'data': []
    });
});

//@desc		Update Single User
//@route	Put /users
//@access	Public
exports.updateUser = ((req, res) => {
    const { id } = req.params;
    const { prenom, nom, code } = req.body;

    checkBodyVariable(req, res);

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user._id == id) {
            user.code = code;
            user.prenom = prenom;
            user.nom = nom;
            return res.status(201).send({
                'success': true,
            });
        }
    }

    error(res, `Attention, aucun utilisateur trouvé avec le id : ${id}`);
});

//@desc		Delete user
//@route	Delete /users/:id
//@access	Public
exports.deleteUser = ((req, res) => {
    const { id } = req.params;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user._id == id) {
            users.splice(i, 1);
            return res.status(201).send({
                'success': true,
            });
        }
    }

    error(res, `Attention, aucun utilisateur trouvé avec le id : ${id}`);
});

const checkBodyVariable = (req, res) => {
    const { prenom, nom, code } = req.body;
    if (prenom == undefined) {
        return error(res, `Attention, le server n'a pas reçu 'prenom'`);
    }

    if (nom == undefined) {
        return error(res, `Attention, le server n'a pas reçu 'nom'`);
    }

    if (code == undefined) {
        return error(res, `Attention, le server n'a pas reçu 'code'`);
    }
}

const error = (res, message) => {
    res.status(400).send({
        'success': false,
        'msg': message || 'Bad request',
        'data': []
    });
}