# Configuração do Cloudflare Turnstile

O Cloudflare Turnstile é um sistema de verificação anti-bot gratuito e mais amigável que o reCAPTCHA tradicional.

## 📋 Passo a Passo

### 1. Criar Conta no Cloudflare (se não tiver)

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Crie uma conta gratuita (não precisa de plano pago)
3. Faça login

### 2. Obter Site Key e Secret Key

1. No dashboard do Cloudflare, vá em **Turnstile**
2. Clique em **Add Site**
3. Configure:
   - **Site name**: BOREH Waitlist (ou qualquer nome)
   - **Domain**: `boreh.com.br` (adicione seu domínio)
   - **Widget mode**: **Managed** (recomendado - verificação automática invisível)
   - **Pre-Clearance**: Opcional (deixe desativado)
4. Clique em **Create**
5. Você receberá:
   - **Site Key** (pública - vai no frontend)
   - **Secret Key** (privada - para validação no backend, opcional)

### 3. Configurar no Projeto

#### Para Desenvolvimento Local:

Crie ou edite o arquivo `.env` na raiz do projeto:

```env
VITE_TURNSTILE_SITE_KEY=sua_site_key_aqui
```

#### Para Produção:

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Configure:
   - **Name**: `VITE_TURNSTILE_SITE_KEY`
   - **Secret**: Cole sua Site Key do Turnstile
5. Clique em **Add secret**

### 4. Atualizar o Workflow (se necessário)

O workflow já está configurado para usar secrets. Se precisar adicionar explicitamente:

```yaml
env:
  VITE_TURNSTILE_SITE_KEY: ${{ secrets.VITE_TURNSTILE_SITE_KEY }}
```

### 5. Fazer Novo Deploy

Após adicionar o secret:

1. Faça um commit
2. Faça push para a branch `main`
3. O GitHub Actions vai fazer o build com a variável configurada

## 🎨 Modos do Widget

O Turnstile suporta diferentes modos:

- **Managed** (recomendado): Verificação automática invisível na maioria dos casos
- **Non-interactive**: Sempre mostra um desafio, mas sem cliques
- **Invisible**: Completamente invisível, valida em background

O código atual usa o modo **Managed** por padrão, que é o mais amigável.

## 🔒 Validação no Backend (Opcional)

Se quiser validar o token no backend (Google Apps Script), você pode adicionar validação:

### No Google Apps Script:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const turnstileToken = data.turnstileToken;
    
    // Valida o token do Turnstile
    if (turnstileToken) {
      const isValid = validateTurnstileToken(turnstileToken);
      if (!isValid) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Invalid token' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // ... resto do código
  } catch (error) {
    // ...
  }
}

function validateTurnstileToken(token) {
  const SECRET_KEY = 'SUA_SECRET_KEY_AQUI';
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  
  const payload = {
    'secret': SECRET_KEY,
    'response': token
  };
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const result = JSON.parse(response.getContentText());
  
  return result.success;
}
```

### No código React (se quiser enviar o token):

Você precisaria modificar `googleSheets.ts` para incluir o token:

```typescript
const entry: WaitlistEntry = {
  phone,
  timestamp: new Date().toISOString(),
  source: window.location.href,
  turnstileToken, // Adicionar aqui
};
```

## 🐛 Troubleshooting

### O widget não aparece

1. **Verifique se a Site Key está configurada:**
   - Console do navegador: `console.log(import.meta.env.VITE_TURNSTILE_SITE_KEY)`
   - Deve mostrar a key ou `undefined`

2. **Verifique o domínio:**
   - O domínio deve estar registrado no Cloudflare Turnstile
   - Para localhost, use o modo de teste (veja abaixo)

### Modo de Teste (Desenvolvimento)

Para testar em localhost sem configurar domínio:

1. No Cloudflare Turnstile, adicione `localhost` como domínio
2. Ou use as chaves de teste:
   - **Site Key**: `1x00000000000000000000AA`
   - **Secret Key**: `1x0000000000000000000000000000000AA`

### Erro: "Invalid site key"

- Verifique se a Site Key está correta
- Verifique se o domínio está registrado no Turnstile
- Limpe o cache do navegador

## 📝 Notas

- **Gratuito**: O Turnstile é completamente gratuito, sem limites
- **Privacidade**: Não coleta dados pessoais dos usuários
- **Performance**: Mais rápido que reCAPTCHA
- **UX**: Na maioria dos casos, é invisível para o usuário

## 🚀 Próximos Passos

Depois de configurado:
1. Teste em localhost primeiro
2. Faça deploy para produção
3. Monitore no dashboard do Cloudflare se necessário
