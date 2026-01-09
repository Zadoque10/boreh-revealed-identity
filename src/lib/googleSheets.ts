/**
 * Função para enviar dados para Google Sheets via Apps Script
 */

export interface WaitlistEntry {
  name: string;
  phone: string;
  timestamp: string;
  source?: string;
}

/**
 * Envia dados para Google Sheets através do Web App do Apps Script
 * 
 * @param name - Nome do usuário
 * @param phone - Número de telefone formatado
 * @param webAppUrl - URL do Web App do Google Apps Script
 * @returns Promise com resultado do envio
 */
export const submitToGoogleSheets = async (
  name: string,
  phone: string,
  webAppUrl: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!webAppUrl) {
      console.error("❌ URL do Google Script não configurada");
      return {
        success: false,
        message: "URL do Google Script não configurada",
      };
    }

    const entry: WaitlistEntry = {
      name,
      phone,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    console.log("📤 Enviando dados para Google Sheets:", {
      ...entry,
      url: webAppUrl,
    });

    // Tenta primeiro com CORS para poder verificar a resposta
    try {
      const response = await fetch(webAppUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      // Se chegou aqui, a requisição foi feita
      if (response.ok) {
        const result = await response.json();
        console.log("✅ Dados enviados com sucesso:", result);
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error("❌ Erro na resposta do Google Script:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        return {
          success: false,
          message: `Erro do servidor: ${response.status} ${response.statusText}`,
        };
      }
    } catch (corsError) {
      // Se CORS falhar, tenta com no-cors como fallback
      console.warn("⚠️ CORS falhou, tentando com no-cors:", corsError);
      
      try {
        await fetch(webAppUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entry),
        });
        
        // Com no-cors, não podemos verificar o status
        // Mas registramos que a requisição foi enviada
        console.log("📤 Requisição enviada (no-cors mode - não é possível verificar resposta)");
        return { success: true };
      } catch (noCorsError) {
        console.error("❌ Erro ao enviar com no-cors:", noCorsError);
        throw noCorsError;
      }
    }
  } catch (error) {
    console.error("❌ Erro ao enviar para Google Sheets:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
