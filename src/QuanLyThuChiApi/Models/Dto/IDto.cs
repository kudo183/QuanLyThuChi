namespace QuanLyThuChiApi.Models.Dto
{
    public interface IDto<T> where T : class
    {
        int GetKey();
        void FromEntity(T entity);
        T ToEntity();
    }
}
