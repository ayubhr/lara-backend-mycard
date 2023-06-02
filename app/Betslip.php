<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Betslip extends Model{


    protected $table = 'betslip';

    protected $primaryKey = 'id';

    protected $fillable = ['coupon_code', 'user_id', 'evt_count', 'stake', 'coef', 'gain', 'gainMax', 'prime', 'json', 'type', 'state', 'created_at', 'updated_at'];


}
