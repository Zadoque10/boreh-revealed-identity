# Configuração do Google Sheets para Waitlist

Este guia explica como configurar o Google Sheets e Apps Script para receber os números de telefone da waitlist.

## 📋 Passo a Passo

### 1. Criar a Planilha do Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione os cabeçalhos:
   - **Coluna A**: `Nome`
   - **Coluna B**: `Telefone`
   - **Coluna C**: `Data/Hora`
   - **Coluna D**: `Origem` (opcional - URL de onde veio a inscrição)

### 2. Configurar o Google Apps Script

1. Na planilha, vá em **Extensões** → **Apps Script**
2. Delete o código padrão e cole o seguinte código:

```javascript
/**
 * Função que recebe dados do formulário e adiciona na planilha
 */
function doPost(e) {
  try {
    // Obtém a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    
    // Extrai os dados
    const name = data.name || '';
    const phone = data.phone || '';
    const timestamp = data.timestamp || new Date().toISOString();
    const source = data.source || '';
    
    // Adiciona uma nova linha na planilha
    sheet.appendRow([
      name,
      phone,
      new Date(timestamp),
      source
    ]);
    
    // Retorna sucesso (mesmo com no-cors, é bom ter)
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Em caso de erro, loga e retorna erro
    console.error('Erro:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função de teste (opcional)
 */
function testDoPost() {
  const testData = {
    phone: '5511999999999',
    timestamp: new Date().toISOString(),
    source: 'https://teste.com'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

3. Salve o projeto (Ctrl+S ou Cmd+S)
4. Dê um nome ao projeto, por exemplo: "Waitlist BOREH"

### 3. Implantar como Web App

1. No Apps Script, clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Tipo" e selecione **Aplicativo da Web**
3. Configure:
   - **Descrição**: "Waitlist API"
   - **Executar como**: "Eu"
   - **Quem tem acesso**: "Qualquer pessoa" (importante para funcionar sem autenticação)
4. Clique em **Implantar**
5. **Copie a URL do Web App** que será gerada (algo como: `https://script.google.com/macros/s/.../exec`)
6. Autorize o acesso quando solicitado (primeira vez)

### 4. Configurar no Projeto

1. Crie um arquivo `.env` na raiz do projeto (ou `.env.local`):
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID_AQUI/exec
```

2. **IMPORTANTE**: Adicione `.env` ao `.gitignore` para não commitar a URL:
```
.env
.env.local
```

3. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

### 5. Testar

1. Acesse a página da waitlist no navegador
2. Digite um número de telefone válido (ex: `11999999999`)
3. Clique em "Entrar na Lista"
4. Verifique na planilha do Google Sheets se o número foi adicionado

## 🔒 Segurança (Opcional - Recomendado)

Para aumentar a segurança, você pode adicionar uma chave de autenticação:

### No Apps Script:

```javascript
const SECRET_KEY = 'SUA_CHAVE_SECRETA_AQUI'; // Defina uma chave forte

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Verifica a chave
    if (data.secretKey !== SECRET_KEY) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // ... resto do código
  } catch (error) {
    // ...
  }
}
```

### No código React (`googleSheets.ts`):

```typescript
const entry: WaitlistEntry = {
  phone,
  timestamp: new Date().toISOString(),
  source: window.location.href,
  secretKey: import.meta.env.VITE_GOOGLE_SCRIPT_SECRET || '',
};
```

E adicione no `.env`:
```env
VITE_GOOGLE_SCRIPT_SECRET=sua_chave_secreta_aqui
```

## 📊 Visualizar os Dados

Os dados serão salvos automaticamente na planilha. Você pode:
- Exportar para CSV
- Criar gráficos e análises
- Integrar com outras ferramentas do Google (Google Analytics, etc.)
- Compartilhar com sua equipe

## 🐛 Troubleshooting

### Erro: "Script function not found"
- Verifique se a função `doPost` está salva e nomeada corretamente
- Certifique-se de que implantou como Web App

### Erro: "Access denied"
- Verifique se configurou "Quem tem acesso" como "Qualquer pessoa"
- Reimplante o Web App se necessário

### Dados não aparecem na planilha
- Verifique os logs no Apps Script (Execuções)
- Teste a função `testDoPost` no editor
- Verifique se a URL do Web App está correta no `.env`

### Erro CORS
- O código já usa `mode: "no-cors"`, então não deve ter problemas
- Se ainda assim houver, verifique se a URL está correta

## 📝 Notas

- O Google Apps Script tem limites de execução (6 minutos por execução)
- Limite de 20.000 requisições por dia (suficiente para a maioria dos casos)
- Os dados são salvos em tempo real na planilha
- Você pode adicionar mais colunas na planilha e atualizar o código do Apps Script

## 🚀 Próximos Passos

Depois de configurado, você pode:
1. Adicionar validação de duplicatas no Apps Script
2. Enviar email de confirmação automaticamente
3. Integrar com serviços de SMS (Twilio, etc.) para notificações
4. Criar dashboard de análise dos dados
