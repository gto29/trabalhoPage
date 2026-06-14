// Este código roda escondido na Vercel, ninguém na internet consegue ver!
export default async function handler(req, res) {
    // Pegando a chave secreta que guardamos no cofre da Vercel
    const token = process.env.GITHUB_ACCESS_TOKEN;
    
    // Pegando o nome de usuário que vamos buscar
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'Usuário não informado' });
    }

    try {
        // Buscando os dados do Perfil de forma segura usando a nossa chave trancada
        const resPerfil = await fetch(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `token ${token}` }
        });
        const perfil = await resPerfil.json();

        // Buscando os Repositórios
        const resRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`, {
            headers: { Authorization: `token ${token}` }
        });
        const repos = await resRepos.json();

        // Devolve os dados limpos para o nosso site
        return res.status(200).json({ perfil, repos });

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao conectar com o GitHub' });
    }
}
