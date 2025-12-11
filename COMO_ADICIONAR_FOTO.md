# 📸 Como Adicionar Sua Foto de Perfil

## Passo 1: Prepare Sua Foto

1. Tire uma foto profissional sua (recomendado: fundo simples, rosto bem iluminado)
2. Redimensione para **200x200 pixels** (quadrada)
3. Salve como: `admin-profile.jpg` ou `admin-profile.png`

## Passo 2: Adicione à Pasta do Projeto

Coloque a foto na pasta `public/` do projeto:

```
mateus-multimarcas/
├── public/
│   └── admin-profile.jpg  ← Sua foto aqui
├── app/
└── ...
```

## Passo 3: Atualize no Painel Admin

1. Acesse **http://localhost:3000/admin**
2. Digite a senha: `mateus2025`
3. Clique em **"⚙️ Meu Perfil"** no canto superior direito
4. No campo "Foto de Perfil", digite: `/admin-profile.jpg`
5. Clique em **"Salvar Perfil"**

## Alternativa: Usar URL Externa

Se preferir, use uma URL completa de uma imagem online:

```
https://exemplo.com/minha-foto.jpg
```

---

## ✅ Pronto!

Sua foto agora aparecerá:
- No footer do site (seção "Conheça Mateus")
- Na página de detalhe do veículo
- Quando clientes visitarem o site

---

## 💡 Dicas

- **Tamanho recomendado**: 200x200 pixels (quadrado)
- **Formato**: JPG, PNG ou WebP
- **Peso**: Máximo 500 KB (para carregar rápido)
- **Qualidade**: Alta resolução para se ver bem

Precisa de ajuda? Acesse o painel admin e clique em "Meu Perfil" para ver dicas adicionais!
