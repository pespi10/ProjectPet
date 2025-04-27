const Post = require('/models/Post');

exports.getHomePage = async (req, res) => {
  try {
    // Obtener los últimos 5 posts para mostrar en la página de inicio
    const latestPosts = await Post.findAll();
    const recentPosts = latestPosts.slice(0, 5);
    
    res.render('index', { 
      title: 'Inicio', 
      recentPosts,
      featuredPost: recentPosts[0] // El post más reciente como destacado
    });
  } catch (error) {
    res.status(500).render('error', { 
      message: 'Error al cargar la página de inicio', 
      error: { status: 500, stack: error.stack } 
    });
  }
};