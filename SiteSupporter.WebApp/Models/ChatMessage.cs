namespace SiteSupporter.WebApp.Models
{
    public class ChatMessage
    {
        public string FullName { get; set; }
        public string MessageBody { get; set; }
        public DateTimeOffset Time { get; set; }
    }
}
