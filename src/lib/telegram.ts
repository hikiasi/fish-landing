export async function sendTelegramNotification(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID // Should be the chat ID for @hikiasi

  if (!token || !chatId) {
    console.log("Telegram notification (simulated):", message)
    return
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Telegram API error:", error)
    }
  } catch (error) {
    console.error("Failed to send Telegram notification:", error)
  }
}
