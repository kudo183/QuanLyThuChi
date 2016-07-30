using huypq.SwaMiddleware;
using Microsoft.EntityFrameworkCore;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using QuanLyThuChiApi.Helper;
using QueryBuilder;

namespace QuanLyThuChiApi.Controllers
{
    public abstract class BaseEntityController<DtoType, EntityType> : BaseController
        where DtoType : class, IDto<EntityType>, new()
        where EntityType : class, IEntity
    {
        protected IQueryable<EntityType> EntitiesFilteredByUser
        {
            get
            {
                return DBContext.Set<EntityType>().Where(p => p.MaUser == UserId);
            }
        }

        protected class PagingResult
        {
            public int totalItemCount { get; set; }
            public int pageIndex { get; set; }
            public int pageCount { get; set; }
            public List<DtoType> items { get; set; }
        }

        protected class ChangedItem
        {
            public string State { get; set; }
            public DtoType Data { get; set; }
        }

        public SwaActionResult GetAll(IQueryable<EntityType> includedQuery)
        {
            var result = new PagingResult();
            result.items = includedQuery.AsEnumerable().Select(p =>
            {
                var dto = new DtoType();
                dto.FromEntity(p);
                return dto;
            }).ToList();

            result.totalItemCount = result.items.Count;
            result.pageCount = 1;
            result.pageIndex = 1;
            return CreateJsonResult(result);
        }

        protected SwaActionResult Get(string json, IQueryable<EntityType> includedQuery)
        {
            var filter = JsonConverter.Deserialize<QueryExpression>(json);

            int pageCount;

            var query = QueryExpression.AddQueryExpression(
                includedQuery, filter, Constant.DefaultPageSize, out pageCount);

            var result = new PagingResult
            {
                pageIndex = filter.PageIndex,
                pageCount = pageCount,
                items = query.AsEnumerable().Select(p =>
                {
                    var a = new DtoType();
                    a.FromEntity(p);
                    return a;
                }).ToList()
            };

            return CreateJsonResult(result);
        }

        protected SwaActionResult Save(string json)
        {
            var items = JsonConverter.Deserialize<List<ChangedItem>>(json);

            var added = new List<EntityType>();

            foreach (var changeItem in items)
            {
                EntityType item = changeItem.Data.ToEntity();

                switch (changeItem.State)
                {
                    case Constant.ChangeState.Insert:
                        item.MaUser = UserId;
                        DBContext.Set<EntityType>().Add(item);
                        added.Add(item);
                        break;
                    case Constant.ChangeState.Update:
                        if (item.MaUser != UserId)
                        {
                            return CreateStatusResult(System.Net.HttpStatusCode.Forbidden);
                        }
                        DBContext.Entry(item).State = EntityState.Modified;
                        break;
                    case Constant.ChangeState.Delete:
                        if (item.MaUser != UserId)
                        {
                            return CreateStatusResult(System.Net.HttpStatusCode.Forbidden);
                        }
                        DBContext.Set<EntityType>().Remove(item);
                        break;
                    default:
                        return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
                }
            }

            try
            {
                DBContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }

            return CreateJsonResult(added.Select(p => p.Ma));
        }
    }
}
