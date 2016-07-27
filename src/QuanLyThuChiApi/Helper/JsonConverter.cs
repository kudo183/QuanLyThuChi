using Newtonsoft.Json;

namespace QuanLyThuChiApi.Helper
{
    public static class JsonConverter
    {
        private static JsonSerializerSettings settings = new JsonSerializerSettings
        {
            DateFormatHandling = DateFormatHandling.IsoDateFormat,
            DateTimeZoneHandling = DateTimeZoneHandling.Utc
        };

        public static T Deserialize<T>(string json)
        {
            var result = JsonConvert.DeserializeObject<T>(json, settings);
            return result;
        }

        public static JsonSerializer Create()
        {
            return JsonSerializer.Create(settings);
        }
    }
}
