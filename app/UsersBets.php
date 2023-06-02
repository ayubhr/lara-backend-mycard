<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersBets extends Model
{

    protected $table = 'users_bets';

    protected $primaryKey = 'id';

    protected $fillable = ['bet', 'gain', 'user_id', 'shop_id', 'trade', 'res', 'game_id', 'created_at', 'updated_at'];


}
