/**
 * Função para enviar dados para Google Sheets via Apps Script
 */

export interface WaitlistEntry {
  phone: string;
  timestamp: string;
  source?: string;
}

/**
 * Envia dados para Google Sheets através do Web App do Apps Script
 * 
 * @param phone - Número de telefone formatado
 * @param webAppUrl - URL do Web App do Google Apps Script
 * @returns Promise com resultado do envio
 */
export const submitToGoogleSheets = async (
  phone: string,
  webAppUrl: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const entry: WaitlistEntry = {
      phone,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    const response = await fetch(webAppUrl, {
      method: "POST",
      mode: "no-cors", // Apps Script Web App não retorna CORS headers por padrão
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    // Com no-cors, não podemos verificar o status da resposta
    // Mas se não houver erro, assumimos sucesso
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar para Google Sheets:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
