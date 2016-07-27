namespace QuanLyThuChiApi.Models.Entities
{
    public interface IEntity
    {
        int GetKey();
        int GetUserID();
        void SetUserID(int userID);
    }
}
