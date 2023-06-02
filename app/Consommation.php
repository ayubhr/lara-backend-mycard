<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consommation extends Model
{

    protected $table = 'consommation';

    protected $primaryKey = 'id';

    protected $fillable = ['period', 'super', 'bets', 'wins', 'created_at', 'updated_at'];

}
