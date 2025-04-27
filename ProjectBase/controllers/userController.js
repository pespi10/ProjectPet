const User = require('/models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users/index', { title: 'Usuarios', users });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al obtener usuarios', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).render('error', { 
        message: 'Usuario no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.render('users/detail', { title: user.username, user });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al obtener usuario', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.showCreateForm = (req, res) => {
  res.render('users/create', { title: 'Crear Usuario' });
};

exports.createUser = async (req, res) => {
  try {
    // En un escenario real, habría validación y hash de contraseña aquí
    const userId = await User.create(req.body);
    res.redirect('/users');
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al crear usuario', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).render('error', { 
        message: 'Usuario no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.render('users/edit', { title: 'Editar Usuario', user });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al obtener usuario para editar', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const success = await User.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).render('error', { 
        message: 'Usuario no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.redirect('/users');
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al actualizar usuario', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const success = await User.delete(req.params.id);
    if (!success) {
      return res.status(404).render('error', { 
        message: 'Usuario no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.redirect('/users');
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al eliminar usuario', 
      error: { status: 500, stack: error.stack } 
    });
  }
};