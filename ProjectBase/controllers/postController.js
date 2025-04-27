const Post = require('/models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('posts/index', { title: 'Posts', posts });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al obtener posts', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { 
        message: 'Post no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.render('posts/detail', { title: post.title, post });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al obtener post', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.showCreateForm = async (req, res) => {
  try {
    // En una implementación real, verificaríamos si el usuario está autenticado
    // y obtendríamos su ID de la sesión
    const userId = 1; // Por defecto, usaremos el usuario con ID 1 para este ejemplo
    res.render('posts/create', { title: 'Crear Post', userId });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al mostrar formulario', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const postId = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id || 1 // Por defecto, usaremos el usuario con ID 1
    });
    res.redirect('/posts');
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al crear post', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).render('error', { 
        message: 'Post no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.render('posts/edit', { title: 'Editar Post', post });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al obtener post para editar', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const success = await Post.update(req.params.id, {
      title: req.body.title,
      content: req.body.content
    });
    if (!success) {
      return res.status(404).render('error', { 
        message: 'Post no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.redirect('/posts');
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al actualizar post', 
      error: { status: 500, stack: error.stack } 
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const success = await Post.delete(req.params.id);
    if (!success) {
      return res.status(404).render('error', { 
        message: 'Post no encontrado', 
        error: { status: 404, stack: '' } 
      });
    }
    res.redirect('/posts');
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al eliminar post', 
      error: { status: 500, stack: error.stack } 
    });
  }
};