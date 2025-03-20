
async function sendVisitorNotification() {
    const webhookUrl = "https://discord.com/api/webhooks/1352354983714095188/oFd0JP6UMnjfjG8MPn2OiB72OHdfO-1vrYBu8rlII4DvchLfjlBc8ePwjFwh03Jss4Q9"; // Replace with your Discord webhook URL

    try {
    // Fetch visitor's IP and location data from ip-api.com
    const response = await fetch('https://ip-api.com/json/?fields=city,country,query');
    const data = await response.json();

    // Extract location info
    const ip = data.query || "Unknown IP";
    const city = data.city || "Unknown City";
    const country = data.country || "Unknown Country";

    // Get browser user agent
    const userAgent = navigator.userAgent || "Unknown Browser";

    // Build the notification message
    const message = {
        content: `New visitor on your site!\n` +
                `Time: ${new Date().toLocaleString()}\n` +
                `IP: ${ip}\n` +
                `Location: ${city}, ${country}\n` +
                `Browser: ${userAgent}`
    };

    // Send the notification to Discord
    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    });
    console.log("Notification sent to Discord!");
    } catch (error) {
    console.error("Error sending notification:", error);
    // Fallback notification if the API fails
    const fallbackMessage = {
        content: `New visitor on your site!\nTime: ${new Date().toLocaleString()}\nDetails unavailable due to error.`
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