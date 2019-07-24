// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Report) {
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
