using Microsoft.AspNetCore.SignalR;
using SiteSupporter.WebApp.Models;

namespace SiteSupporter.WebApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string name, string message)
        {
            var chatMessage = new ChatMessage()
            {
                FullName = name,
                MessageBody = message,
                Time = DateTime.Now
            };
            await Clients.All.SendAsync("ReceiveMessage", chatMessage.FullName, chatMessage.MessageBody, chatMessage.Time);
        }
    }
}
