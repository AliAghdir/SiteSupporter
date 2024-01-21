using Microsoft.AspNetCore.SignalR;
using SiteSupporter.WebApp.Models;

namespace SiteSupporter.WebApp.Hubs
{
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReciveMessage", "Support", "Hello! What can we help you?", DateTimeOffset.UtcNow);
            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string name, string message)
        {
            var chatMessage = new ChatMessage()
            {
                FullName = name,
                MessageBody = message,
                Time = DateTimeOffset.UtcNow
            };
            await Clients.All.SendAsync("ReciveMessage", chatMessage.FullName, chatMessage.MessageBody, chatMessage.Time);
        }
    }
}
