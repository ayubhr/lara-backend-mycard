<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBetsLive extends Model{

    protected $table = 'users_betsLive';

    protected $primaryKey = 'id';

    protected $fillable = ['type', 'user', 'amount', 'tid', 'gameid', 'game', 'actionid', 'created_at', 'updated_at'];


}
