<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GasinoSlots extends Model
{

    protected $table = 'casino_games';

    protected $primaryKey = 'id';

    protected $fillable = ['name', 'uuid', 'provider', 'type', 'mobile', 'image', 'created_at', 'updated_at'];


}
