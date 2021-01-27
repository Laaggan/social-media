using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Dapper_ORM.Models;
using Dapper_ORM.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Dapper_ORM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IDapper _dapper;
        private readonly IDbConnection _db;
        private readonly IConfiguration _config;
        private string Connectionstring = "DefaultConnection";
        //public HomeController(IDapper dapper, IDbConnection db)
        public HomeController(IDapper dapper, IConfiguration config)
        {
            _dapper = dapper;
            _config = config;
            
    }
        [HttpPost(nameof(Create))]
        public async Task<int> Create(Parameters data)
        {
            var dbparams = new DynamicParameters();
            dbparams.Add("Id", data.Id, DbType.Int32);
            var result = await Task.FromResult(_dapper.Insert<int>("[dbo].[SP_Add_Article]"
                , dbparams,
                commandType: CommandType.StoredProcedure));
            return result;
        }
        [HttpGet(nameof(GetById))]
        public async Task<Parameters> GetById(int Id)
        {
            var result = await Task.FromResult(_dapper.Get<Parameters>($"Select * from [Users] where Id = {Id}", null, commandType: CommandType.Text));
            return result;
        }
        [HttpGet(nameof(GetAllProfiles))]
        public async Task<List<Parameters>> GetAllProfiles()
        {
            var fromDatabase = _dapper.GetAll<Parameters>($"Select * from [Users]", null, commandType: CommandType.Text);
            var result = await Task.FromResult(fromDatabase);
            return result;
        }
        [HttpDelete(nameof(Delete))]
        public async Task<int> Delete(int Id)
        {
            var result = await Task.FromResult(_dapper.Execute($"Delete [Users] Where Id = {Id}", null, commandType: CommandType.Text));
            return result;
        }
        [HttpGet(nameof(Count))]
        public Task<int> Count(int num)
        {
            var totalcount = Task.FromResult(_dapper.Get<int>($"select COUNT(*) from [Users] WHERE Age like '%{num}%'", null,
                    commandType: CommandType.Text));
            return totalcount;
        }
        [HttpPatch(nameof(Update))]
        public Task<int> Update(Parameters data)
        {
            var dbPara = new DynamicParameters();
            dbPara.Add("UserName", data.UserName, DbType.String);
            dbPara.Add("Age", data.Age, DbType.String);

            var updateArticle = Task.FromResult(_dapper.Insert<int>($"INSERT INTO [dbo].[Users](UserName, Age) VALUES ({data.UserName}, {data.Age})",
                            dbPara,
                            commandType: CommandType.Text));
            return updateArticle;
        }

        [HttpPost(nameof(AddNewUser))]
        public Task<int> AddNewUser(string userName, int age)
        {
            //var dbPara = new DynamicParameters();
            //dbPara.Add("UserName", userName, DbType.String);
            //dbPara.Add("Age", age, DbType.String);

            //var updateArticle = Task.FromResult(_dapper.Execute($"INSERT INTO [dbo].[Users](UserName, Age) VALUES (userName, age)", dbPara, commandType: CommandType.Text));
            //return updateArticle;
            using IDbConnection db = new SqlConnection(_config.GetConnectionString(Connectionstring));
            return Task.FromResult(db.Execute($"INSERT INTO [dbo].[Users](UserName, Age) VALUES (@UserName, @Age)", new { UserName = userName, Age = age }));
        }
    }
}