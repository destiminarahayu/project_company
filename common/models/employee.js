// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Employee) {
    Employee.remoteMethod(
        'getName',{
            description:'get name like -> desti',
            accepts:[
                {arg: 'firstname', type:'string'}
            ],
            returns:{
                arg:'firstname', type:'object', root: true
            },
            http:{path: '/getName', verb:'get'}
        }
     );
     
     Employee.remoteMethod(
        'getLastName',{
            description:'get last name like ->',
            accepts:[
                {arg: 'lastname', type:'string'}
            ],
            returns:{
                arg: 'lastname', type:'object', root:true
            },
            http:{path:'/getLastName', verb:'get'}
        }
    );

    Employee.getName = function(firstname, callback){
        new Promise(function(resolve, reject){
            var filter ={
                where :{
                    first_name : {
                        like : firstname
                    }
                }
            }
            Employee.find(filter,function(err,result){
                if (err) reject (err)
                if (result===null){
                    err = new Error('Cannot find that name')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback(null,res)
        }).catch(function(err){
            callback(err)
        });
    },

    Employee.getLastName =function(lastname,callback){
        new Promise(function(resolve,reject){
            var filter ={
                where :{
                    last_name : {
                        like : lastname
                    }
                }
            }
            Employee.find(filter,function(err,result){
                if (err) reject (err)
                if (result===null){
                    err = new Error('cannot find that last name')
                    err.statusCode=404
                    reject(err)
                }
                resolve(result)
            })
        }).then(function(res){
          if (!res) callback (err)
          return callback(null,res)  
        }).catch(function(err){
            callback(err)
        });
    }

};
