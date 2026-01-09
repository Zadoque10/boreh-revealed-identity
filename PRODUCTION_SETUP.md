# Configuração para Produção

## 🔧 Problema: Variável de Ambiente não funciona em Produção

No Vite, as variáveis de ambiente que começam com `VITE_` são **embutidas no código durante o build**. Isso significa que elas precisam estar disponíveis no momento da compilação, não em runtime.

## ✅ Solução: Configurar Secret no GitHub

### Passo 1: Adicionar Secret no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Configure:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`
   - **Secret**: Cole a URL do seu Google Apps Script Web App
     (ex: `https://script.google.com/macros/s/SEU_ID/exec`)
5. Clique em **Add secret**

### Passo 2: Verificar o Workflow

O arquivo `.github/workflows/deploy.yml` já está configurado para usar o secret:

```yaml
env:
  VITE_GOOGLE_SCRIPT_URL: ${{ secrets.VITE_GOOGLE_SCRIPT_URL }}
```

### Passo 3: Fazer Novo Deploy

Após adicionar o secret:

1. Faça um commit (pode ser qualquer mudança pequena)
2. Faça push para a branch `main`
3. O GitHub Actions vai fazer o build automaticamente com a variável de ambiente
4. Aguarde o deploy completar

### Passo 4: Verificar

1. Acesse https://boreh.com.br/
2. Abra o Console do navegador (F12 → Console)
3. Tente fazer uma inscrição
4. Você deve ver logs como:
   - `"Enviando para Google Sheets..."`
   - `"Dados enviados com sucesso!"`

Se não aparecer a URL no log, significa que o secret não foi configurado corretamente.

## 🐛 Troubleshooting

### A variável ainda não funciona

1. **Verifique se o secret foi adicionado corretamente:**
   - GitHub → Settings → Secrets and variables → Actions
   - Deve aparecer `VITE_GOOGLE_SCRIPT_URL` na lista

2. **Verifique se fez um novo build:**
   - O secret só é usado durante o build
   - Faça um novo commit e push para triggerar um novo build

3. **Verifique os logs do GitHub Actions:**
   - GitHub → Actions → Último workflow
   - Veja se há erros no build

4. **Teste no console do navegador:**
   - Abra https://boreh.com.br/
   - Console (F12)
   - Digite: `console.log(import.meta.env.VITE_GOOGLE_SCRIPT_URL)`
   - Deve mostrar a URL (se estiver configurada) ou `undefined` (se não estiver)

### Erro: "URL do Google Script não configurada"

Isso significa que a variável de ambiente não está disponível. Verifique:
- Se o secret foi adicionado no GitHub
- Se fez um novo build após adicionar o secret
- Se o nome do secret está correto: `VITE_GOOGLE_SCRIPT_URL`

### Dados não aparecem no Google Sheets

1. **Verifique se a URL está correta:**
   - A URL deve terminar com `/exec`
   - Deve ser a URL do Web App, não do editor do Apps Script

2. **Verifique os logs do Apps Script:**
   - Google Apps Script → Execuções
   - Veja se há erros nas execuções

3. **Verifique as permissões do Web App:**
   - Deve estar configurado como "Qualquer pessoa"
   - Reimplante se necessário

## 📝 Notas Importantes

- **Variáveis de ambiente no Vite são públicas**: Qualquer variável que começa com `VITE_` é embutida no código JavaScript e pode ser vista por qualquer pessoa no código fonte do site. Não use para informações sensíveis.
- **Secrets do GitHub são seguros**: Eles são usados apenas durante o build e não aparecem no código final.
- **Reconstrua após mudanças**: Sempre que mudar um secret, precisa fazer um novo build.

## 🔒 Alternativa: Usar Variável de Ambiente no Servidor

Se você estiver usando um servidor próprio (não GitHub Pages), pode configurar a variável diretamente no servidor:

```bash
export VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
npm run build
```

Mas para GitHub Pages, a única forma é usando Secrets do GitHub Actions.
