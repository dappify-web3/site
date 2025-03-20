
async function sendVisitorNotification() {
    const webhookUrl = "https://discord.com/api/webhooks/1352354983714095188/oFd0JP6UMnjfjG8MPn2OiB72OHdfO-1vrYBu8rlII4DvchLfjlBc8ePwjFwh03Jss4Q9"; // Replace with your Discord webhook URL
  
    try {
      // Build the notification message
      const message = {
        content: `New site visitor from ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
      };
  
      // Send the notification to Discord
      if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
          await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(message)
          });
      }
      console.log("Notification sent to Discord!");
    } catch (error) {
      console.error("Error sending notification:", error);
      // Fallback notification
      const fallbackMessage = {
        content: `New site visitor from unknown timezone`
      };
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fallbackMessage)
      });
    }
  }
  
  // Send notification when the page loads
  window.onload = sendVisitorNotification;