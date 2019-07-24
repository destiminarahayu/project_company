// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var app = require('../../server/server')
module.exports = function(Report) {  

    Report.remoteMethod(
        'getByid',{
            description:'get id  like -> Number',
            accepts:[
                {arg: 'id', type:'string'}
            ],
            returns:{
                arg:'id', type:'object', root: true
            },
            http:{path: '/getByid', verb:'get'}
        }
     );

     Report.getByid = function(id, callback){
        new Promise(function(resolve, reject){
            var filter ={
                where :{
                    id : {
                        like : id
                    }
                }
            }
            Report.find(filter,function(err,result){
                if (err) reject (err)
                if (result===null){
                    err = new Error('Cannot find that id')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(res){
            var client = app.models.Client

            var clientId = res[0].id_client
            var filter = {
                where : {
                    id : clientId
                }
            }

            //console log(filter)

            client.find(filter, function(err, resclient){
                if (err) return (err)
                if (resclient===null) {
                    err =new Error('cannot find that name')
                    err.statusCode = 404
                    return(err)
                }
                // console.log ('2', resclient)
                res[0].client = resclient[0]
                return callback(null,res)
            })
        }).catch(function(err){
            callback(err);
        })

    },

    Report.remoteMethod(
        'getnoTransaksi',{
            description:'get no transaksi like -> desti',
            accepts:[
                {arg: 'noTransaksi', type:'string'}
            ],
            returns:{
                arg:'noTransaksi', type:'object', root: true
            },
            http:{path: '/noTransaksi', verb:'get'}
        }
     );

     Report.getnoTransaksi = function(noTransaksi, callback){
        new Promise(function(resolve, reject){
            var filter ={
                where :{
                    no_transaksi : {
                        like : noTransaksi
                    }
                }
            }
            Report.find(filter,function(err,result){
                if (err) reject (err)
                if (result===null){
                    err = new Error('Cannot find that id')
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
    }

  

};
