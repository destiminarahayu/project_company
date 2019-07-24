// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Client) {
    Client.remoteMethod(
        'getInamaPerusahaan',{
            description:'get id client like -> desti',
            accepts:[
                {arg: 'namaperusahaan', type:'string'}
            ],
            returns:{
                arg:'namaperusahaan', type:'object', root: true
            },
            http:{path: '/namaperusahaan', verb:'get'}
        }
     );

     Client.getInamaPerusahaan = function(namaperusahaan, callback){
        new Promise(function(resolve, reject){
            var filter ={
                where :{
                    nama_perusahaan : {
                        like : namaperusahaan
                    }
                }
            }
            Client.find(filter,function(err,result){
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
