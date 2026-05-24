# Admin protegido - etapa 4

Esta etapa separa visualmente a area administrativa do site publico e adiciona uma protecao simples por credenciais.

## Rotas

- `/admin/login`: tela de entrada.
- `/admin`: painel administrativo protegido.

O site publico fica no grupo de rotas `app/(site)` e o admin fica em `app/admin`, com layout proprio.

## Como funciona

1. O middleware protege todas as rotas `/admin/*`.
2. `/admin/login` fica liberada para visitantes sem sessao.
3. O login compara `ADMIN_USERNAME` e `ADMIN_PASSWORD`.
4. Quando as credenciais estao corretas, um cookie HTTP-only de sessao e criado.
5. O botao "Sair" remove a sessao e volta para `/admin/login`.

## Variaveis

```text
ADMIN_USERNAME=admin_login_placeholder
ADMIN_PASSWORD=admin_password_placeholder
ADMIN_SESSION_SECRET=random_session_secret_placeholder
```

No desenvolvimento local, essas variaveis podem ficar em `.env.local`. Esse arquivo nao deve ser versionado.

## Limites conhecidos

- Esta e uma autenticacao simples para prototipo.
- Ainda nao ha usuarios individuais, recuperacao de senha ou permissoes por perfil.
- Para producao, a recomendacao continua sendo trocar para Supabase Auth, Auth.js ou outro provedor dedicado.
